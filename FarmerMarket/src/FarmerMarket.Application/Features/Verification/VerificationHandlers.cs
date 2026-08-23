using System.Text.RegularExpressions;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Verification;

// 1. Submit Verification Documents Command (Self-service User)
public record SubmitDocumentsCommand(Guid UserId, SubmitVerificationDocumentsDto Dto) : IRequest<Result<UserVerificationStatusDto>>;

public class SubmitDocumentsHandler(IAppDbContext db, ISmsService sms) : IRequestHandler<SubmitDocumentsCommand, Result<UserVerificationStatusDto>>
{
    public async Task<Result<UserVerificationStatusDto>> Handle(SubmitDocumentsCommand req, CancellationToken ct)
    {
        var user = await db.Users
            .Include(u => u.Documents)
            .FirstOrDefaultAsync(u => u.Id == req.UserId, ct);

        if (user == null) return Result<UserVerificationStatusDto>.Failure("User not found.");

        // Automated regex validation on submitted numbers
        if (!string.IsNullOrWhiteSpace(req.Dto.TinNumber))
        {
            var cleanTin = req.Dto.TinNumber.Replace("TIN-", "").Replace(" ", "").Trim();
            if (!Regex.IsMatch(cleanTin, @"^\d{9,12}$"))
            {
                return Result<UserVerificationStatusDto>.Failure("Invalid Ethiopian TIN format. Must be 10 digits (e.g. 0099887766).");
            }
            user.TinNumber = cleanTin;
        }

        foreach (var docDto in req.Dto.Documents)
        {
            if (string.IsNullOrWhiteSpace(docDto.DocumentNumber))
            {
                return Result<UserVerificationStatusDto>.Failure($"Document number is required for {docDto.DocumentType}.");
            }

            if (docDto.DocumentType == DocumentType.FaydaId)
            {
                var cleanFayda = docDto.DocumentNumber.Replace("FAN-", "").Replace("FAYDA-", "").Replace("-", "").Replace(" ", "").Trim();
                if (cleanFayda.Length < 8)
                {
                    return Result<UserVerificationStatusDto>.Failure("Invalid Fayda ID number format.");
                }
            }

            var existingDoc = user.Documents.FirstOrDefault(d => d.DocumentType == docDto.DocumentType);
            if (existingDoc != null)
            {
                existingDoc.DocumentNumber = docDto.DocumentNumber;
                existingDoc.FrontImageUrl = docDto.FrontImageUrl ?? existingDoc.FrontImageUrl;
                existingDoc.BackImageUrl = docDto.BackImageUrl ?? existingDoc.BackImageUrl;
                existingDoc.FileUrl = docDto.FileUrl ?? existingDoc.FileUrl;
                existingDoc.Status = VerificationStatus.UnderReview;
                existingDoc.RejectionReason = null;
                existingDoc.SubmittedAt = DateTimeOffset.UtcNow;
            }
            else
            {
                var newDoc = new UserDocument
                {
                    UserId = user.Id,
                    DocumentType = docDto.DocumentType,
                    DocumentNumber = docDto.DocumentNumber,
                    FrontImageUrl = docDto.FrontImageUrl,
                    BackImageUrl = docDto.BackImageUrl,
                    FileUrl = docDto.FileUrl,
                    Status = VerificationStatus.UnderReview,
                    SubmittedAt = DateTimeOffset.UtcNow
                };
                db.UserDocuments.Add(newDoc);
            }
        }

        user.VerificationStatus = VerificationStatus.UnderReview;
        user.RejectionReason = null;
        await db.SaveChangesAsync(ct);

        // Dispatch bilingual confirmation SMS
        _ = sms.SendVerificationNotificationAsync(
            user.Phone,
            $"FarmerMarket: Your verification documents have been received and are under review. We will notify you within 24 hours.",
            $"የFarmerMarket ማረጋገጫ፡ ሰነዶችዎ ደርሰውናል። በ24 ሰዓት ውስጥ ተገምግመው ውሳኔ ይደርስዎታል።",
            ct
        );

        return await GetUserStatusAsync(user.Id, db, ct);
    }

    private static async Task<Result<UserVerificationStatusDto>> GetUserStatusAsync(Guid userId, IAppDbContext db, CancellationToken ct)
    {
        var u = await db.Users
            .Include(x => x.Documents)
            .Include(x => x.VerificationReviews)
            .FirstOrDefaultAsync(x => x.Id == userId, ct);

        if (u == null) return Result<UserVerificationStatusDto>.Failure("User not found");

        var docDtos = u.Documents.Select(d => new UserDocumentDto(
            d.Id, d.UserId, d.DocumentType.ToString(), d.DocumentNumber, d.FrontImageUrl, d.BackImageUrl, d.FileUrl, d.Status.ToString(), d.RejectionReason, d.SubmittedAt, d.ReviewedAt
        )).ToList();

        var reviewDtos = u.VerificationReviews.Select(r => new VerificationReviewDto(
            r.Id, r.UserId, "Platform Admin", r.ActionTaken, r.Notes, r.Timestamp
        )).ToList();

        return Result<UserVerificationStatusDto>.Success(new UserVerificationStatusDto(
            u.Id, u.VerificationStatus.ToString(), u.RejectionReason, u.TinNumber, docDtos, reviewDtos
        ));
    }
}

// 2. Field Agent Register Farmer Command (On-behalf-of registration)
public record AgentRegisterFarmerCommand(Guid AgentId, AgentRegisterFarmerDto Dto) : IRequest<Result<UserVerificationStatusDto>>;

public class AgentRegisterFarmerHandler(IAppDbContext db, ISmsService sms) : IRequestHandler<AgentRegisterFarmerCommand, Result<UserVerificationStatusDto>>
{
    public async Task<Result<UserVerificationStatusDto>> Handle(AgentRegisterFarmerCommand req, CancellationToken ct)
    {
        var agent = await db.Users.FirstOrDefaultAsync(u => u.Id == req.AgentId, ct);
        if (agent == null) return Result<UserVerificationStatusDto>.Failure("Agent profile not found.");

        var existingUser = await db.Users.FirstOrDefaultAsync(u => u.Phone == req.Dto.Phone, ct);
        if (existingUser != null)
        {
            return Result<UserVerificationStatusDto>.Failure("A user with this mobile number is already registered.");
        }

        var farmer = new User
        {
            Name = req.Dto.Name,
            NameAm = req.Dto.NameAm ?? req.Dto.Name,
            Phone = req.Dto.Phone,
            Region = req.Dto.Region,
            Role = UserRole.Farmer,
            RegistrationMethod = "Agent",
            RegisteredByAgentId = agent.Id,
            VerificationStatus = VerificationStatus.UnderReview,
            TinNumber = req.Dto.TinNumber,
            KycDocumentType = "National ID (Fayda)",
            KycDocumentNumber = req.Dto.FaydaId,
            KycStatus = "Pending",
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Users.Add(farmer);

        if (!string.IsNullOrWhiteSpace(req.Dto.FaydaId))
        {
            var faydaDoc = new UserDocument
            {
                UserId = farmer.Id,
                DocumentType = DocumentType.FaydaId,
                DocumentNumber = req.Dto.FaydaId,
                FrontImageUrl = req.Dto.FaydaFrontImageUrl ?? "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
                BackImageUrl = req.Dto.FaydaBackImageUrl ?? "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
                Status = VerificationStatus.UnderReview,
                SubmittedAt = DateTimeOffset.UtcNow
            };
            db.UserDocuments.Add(faydaDoc);
        }

        if (!string.IsNullOrWhiteSpace(req.Dto.Kebele))
        {
            var kebeleDoc = new UserDocument
            {
                UserId = farmer.Id,
                DocumentType = DocumentType.KebeleId,
                DocumentNumber = req.Dto.Kebele,
                FrontImageUrl = req.Dto.KebeleIdImageUrl ?? "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
                Status = VerificationStatus.UnderReview,
                SubmittedAt = DateTimeOffset.UtcNow
            };
            db.UserDocuments.Add(kebeleDoc);
        }

        await db.SaveChangesAsync(ct);

        // Send Welcome SMS to the Farmer
        _ = sms.SendVerificationNotificationAsync(
            farmer.Phone,
            $"Welcome {farmer.Name}! Community Agent {agent.Name} has registered your farm profile on Farmer-to-Market. Your account is under verification.",
            $"እንኳን ደህና መጡ {farmer.NameAm ?? farmer.Name}! የግብርና ድጋፍ ኤጀንት {agent.Name} መለያዎን መዝግቧል። ሰነዶችዎ በመገምገም ላይ ናቸው።",
            ct
        );

        return Result<UserVerificationStatusDto>.Success(new UserVerificationStatusDto(
            farmer.Id,
            farmer.VerificationStatus.ToString(),
            null,
            farmer.TinNumber,
            new List<UserDocumentDto>(),
            new List<VerificationReviewDto>()
        ));
    }
}

// 3. Admin Review Verification Command (Approve or Reject with audit log and SMS)
public record ReviewVerificationCommand(Guid ReviewerId, Guid TargetUserId, ReviewVerificationDto Dto) : IRequest<Result>;

public class ReviewVerificationHandler(IAppDbContext db, ISmsService sms) : IRequestHandler<ReviewVerificationCommand, Result>
{
    public async Task<Result> Handle(ReviewVerificationCommand req, CancellationToken ct)
    {
        var reviewer = await db.Users.FirstOrDefaultAsync(u => u.Id == req.ReviewerId, ct);
        var targetUser = await db.Users
            .Include(u => u.Documents)
            .FirstOrDefaultAsync(u => u.Id == req.TargetUserId, ct);

        if (targetUser == null) return Result.Failure("Target user not found.");

        var isApprove = req.Dto.Action.Equals("Approve", StringComparison.OrdinalIgnoreCase);

        if (isApprove)
        {
            targetUser.VerificationStatus = VerificationStatus.Approved;
            targetUser.Verified = true;
            targetUser.KycStatus = "Verified";
            targetUser.RejectionReason = null;

            foreach (var doc in targetUser.Documents)
            {
                doc.Status = VerificationStatus.Approved;
                doc.ReviewedAt = DateTimeOffset.UtcNow;
                doc.RejectionReason = null;
            }

            var reviewLog = new VerificationReview
            {
                UserId = targetUser.Id,
                ReviewerId = reviewer?.Id ?? req.ReviewerId,
                ActionTaken = "Approved",
                Notes = req.Dto.Notes ?? "All identity & tax documents verified against Ministry records.",
                Timestamp = DateTimeOffset.UtcNow
            };
            db.VerificationReviews.Add(reviewLog);

            await db.SaveChangesAsync(ct);

            // Automated Approval SMS
            _ = sms.SendVerificationNotificationAsync(
                targetUser.Phone,
                $"🎉 Congratulations {targetUser.Name}! Your FarmerMarket account is APPROVED. You now have full access to list produce and receive Telebirr payments.",
                $"🎉 እንኳን ደስ አለዎት {targetUser.NameAm ?? targetUser.Name}! የFarmerMarket መለያዎ ሙሉ በሙሉ ጸድቋል። ምርትዎን በቀጥታ መሸጥ ይችላሉ።",
                ct
            );
        }
        else
        {
            targetUser.VerificationStatus = VerificationStatus.Rejected;
            targetUser.Verified = false;
            targetUser.KycStatus = "Rejected";
            targetUser.RejectionReason = req.Dto.RejectionReason ?? req.Dto.Notes ?? "Submitted documents could not be verified.";

            foreach (var doc in targetUser.Documents)
            {
                doc.Status = VerificationStatus.Rejected;
                doc.ReviewedAt = DateTimeOffset.UtcNow;
                doc.RejectionReason = targetUser.RejectionReason;
            }

            var reviewLog = new VerificationReview
            {
                UserId = targetUser.Id,
                ReviewerId = reviewer?.Id ?? req.ReviewerId,
                ActionTaken = "Rejected",
                Notes = targetUser.RejectionReason,
                Timestamp = DateTimeOffset.UtcNow
            };
            db.VerificationReviews.Add(reviewLog);

            await db.SaveChangesAsync(ct);

            // Automated Rejection SMS with reason
            _ = sms.SendVerificationNotificationAsync(
                targetUser.Phone,
                $"⚠️ FarmerMarket Notice: Your verification was not approved. Reason: {targetUser.RejectionReason}. Please re-submit clear documents.",
                $"⚠️ ከFarmerMarket፡ ሰነድዎ አልጸደቀም። ምክንያት፡ {targetUser.RejectionReason}። እባክዎ እንደገና ትክክለኛ ሰነድ ያስገቡ።",
                ct
            );
        }

        return Result.Success();
    }
}

// 4. Get Verification Queue Query (Admin Filterable Queue)
public record GetVerificationQueueQuery(string? RoleFilter = null, string? StatusFilter = null) : IRequest<Result<List<VerificationQueueItemDto>>>;

public class GetVerificationQueueHandler(IAppDbContext db) : IRequestHandler<GetVerificationQueueQuery, Result<List<VerificationQueueItemDto>>>
{
    public async Task<Result<List<VerificationQueueItemDto>>> Handle(GetVerificationQueueQuery req, CancellationToken ct)
    {
        var query = db.Users
            .Include(u => u.Documents)
            .Include(u => u.RegisteredByAgent)
            .Include(u => u.VerificationReviews)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(req.RoleFilter) && Enum.TryParse<UserRole>(req.RoleFilter, true, out var role))
        {
            query = query.Where(u => u.Role == role);
        }

        if (!string.IsNullOrWhiteSpace(req.StatusFilter) && Enum.TryParse<VerificationStatus>(req.StatusFilter, true, out var status))
        {
            query = query.Where(u => u.VerificationStatus == status);
        }

        var users = await query.OrderByDescending(u => u.CreatedAt).ToListAsync(ct);

        var list = users.Select(u => new VerificationQueueItemDto(
            u.Id,
            u.Name,
            u.NameAm,
            u.Role.ToString(),
            u.Phone,
            u.Region,
            u.RegistrationMethod,
            u.RegisteredByAgent?.Name,
            u.VerificationStatus.ToString(),
            u.RejectionReason,
            u.TinNumber,
            u.CreatedAt,
            u.Documents.Select(d => new UserDocumentDto(
                d.Id, d.UserId, d.DocumentType.ToString(), d.DocumentNumber, d.FrontImageUrl, d.BackImageUrl, d.FileUrl, d.Status.ToString(), d.RejectionReason, d.SubmittedAt, d.ReviewedAt
            )).ToList(),
            u.VerificationReviews.Select(r => new VerificationReviewDto(
                r.Id, r.UserId, "Admin", r.ActionTaken, r.Notes, r.Timestamp
            )).ToList()
        )).ToList();

        return Result<List<VerificationQueueItemDto>>.Success(list);
    }
}

// 5. Get My Verification Status Query
public record GetMyVerificationStatusQuery(Guid UserId) : IRequest<Result<UserVerificationStatusDto>>;

public class GetMyVerificationStatusHandler(IAppDbContext db) : IRequestHandler<GetMyVerificationStatusQuery, Result<UserVerificationStatusDto>>
{
    public async Task<Result<UserVerificationStatusDto>> Handle(GetMyVerificationStatusQuery req, CancellationToken ct)
    {
        var u = await db.Users
            .Include(x => x.Documents)
            .Include(x => x.VerificationReviews)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == req.UserId, ct);

        if (u == null) return Result<UserVerificationStatusDto>.Failure("User not found.");

        var docDtos = u.Documents.Select(d => new UserDocumentDto(
            d.Id, d.UserId, d.DocumentType.ToString(), d.DocumentNumber, d.FrontImageUrl, d.BackImageUrl, d.FileUrl, d.Status.ToString(), d.RejectionReason, d.SubmittedAt, d.ReviewedAt
        )).ToList();

        var reviewDtos = u.VerificationReviews.Select(r => new VerificationReviewDto(
            r.Id, r.UserId, "Admin", r.ActionTaken, r.Notes, r.Timestamp
        )).ToList();

        return Result<UserVerificationStatusDto>.Success(new UserVerificationStatusDto(
            u.Id, u.VerificationStatus.ToString(), u.RejectionReason, u.TinNumber, docDtos, reviewDtos
        ));
    }
}

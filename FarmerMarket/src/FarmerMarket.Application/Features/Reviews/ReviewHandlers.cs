using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Reviews;

// 1. Create Review Command
public record CreateReviewCommand(Guid ReviewerId, CreateReviewDto Dto) : IRequest<Result<ReviewDto>>;

public class CreateReviewHandler(IAppDbContext db) : IRequestHandler<CreateReviewCommand, Result<ReviewDto>>
{
    public async Task<Result<ReviewDto>> Handle(CreateReviewCommand req, CancellationToken ct)
    {
        var order = await db.Orders.FirstOrDefaultAsync(o => o.Id == req.Dto.OrderId, ct);
        if (order == null) return Result<ReviewDto>.Failure("Order not found.");

        var reviewer = await db.Users.FirstOrDefaultAsync(u => u.Id == req.ReviewerId, ct);
        var reviewee = await db.Users.FirstOrDefaultAsync(u => u.Id == req.Dto.RevieweeId, ct);
        if (reviewer == null || reviewee == null) return Result<ReviewDto>.Failure("User not found.");

        var rating = Math.Clamp(req.Dto.Rating, 1, 5);

        var review = new Review
        {
            OrderId = req.Dto.OrderId,
            ReviewerId = req.ReviewerId,
            RevieweeId = req.Dto.RevieweeId,
            Rating = rating,
            Comment = req.Dto.Comment?.Trim(),
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Reviews.Add(review);
        await db.SaveChangesAsync(ct);

        return Result<ReviewDto>.Success(new ReviewDto(
            review.Id,
            review.OrderId,
            review.ReviewerId,
            reviewer.Name,
            review.RevieweeId,
            reviewee.Name,
            review.Rating,
            review.Comment,
            review.CreatedAt
        ));
    }
}

// 2. Get Reviews For User Query
public record GetReviewsByUserQuery(Guid UserId) : IRequest<List<ReviewDto>>;

public class GetReviewsByUserHandler(IAppDbContext db) : IRequestHandler<GetReviewsByUserQuery, List<ReviewDto>>
{
    public async Task<List<ReviewDto>> Handle(GetReviewsByUserQuery req, CancellationToken ct)
    {
        var list = await db.Reviews.AsNoTracking()
            .Include(r => r.Reviewer)
            .Include(r => r.Reviewee)
            .Where(r => r.RevieweeId == req.UserId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(ct);

        return list.Select(r => new ReviewDto(
            r.Id,
            r.OrderId,
            r.ReviewerId,
            r.Reviewer.Name,
            r.RevieweeId,
            r.Reviewee.Name,
            r.Rating,
            r.Comment,
            r.CreatedAt
        )).ToList();
    }
}

// 3. Get All Reviews Query
public record GetAllReviewsQuery : IRequest<List<ReviewDto>>;

public class GetAllReviewsHandler(IAppDbContext db) : IRequestHandler<GetAllReviewsQuery, List<ReviewDto>>
{
    public async Task<List<ReviewDto>> Handle(GetAllReviewsQuery req, CancellationToken ct)
    {
        var list = await db.Reviews.AsNoTracking()
            .Include(r => r.Reviewer)
            .Include(r => r.Reviewee)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(ct);

        return list.Select(r => new ReviewDto(
            r.Id,
            r.OrderId,
            r.ReviewerId,
            r.Reviewer != null ? r.Reviewer.Name : "Buyer",
            r.RevieweeId,
            r.Reviewee != null ? r.Reviewee.Name : "Farmer",
            r.Rating,
            r.Comment,
            r.CreatedAt
        )).ToList();
    }
}


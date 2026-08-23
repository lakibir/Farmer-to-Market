using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Application.DTOs;

public record DocumentSubmissionItemDto(
    DocumentType DocumentType,
    string DocumentNumber,
    string? FrontImageUrl,
    string? BackImageUrl,
    string? FileUrl
);

public record SubmitVerificationDocumentsDto(
    string? TinNumber,
    List<DocumentSubmissionItemDto> Documents
);

public record AgentRegisterFarmerDto(
    string Name,
    string? NameAm,
    string Phone,
    string Region,
    string? Kebele,
    string? PrimaryCrop,
    string? FaydaId,
    string? TinNumber,
    string? FaydaFrontImageUrl,
    string? FaydaBackImageUrl,
    string? KebeleIdImageUrl
);

public record ReviewVerificationDto(
    string Action, // "Approve", "Reject", "RequestChanges"
    string? Notes,
    string? RejectionReason
);

public record UserDocumentDto(
    Guid Id,
    Guid UserId,
    string DocumentType,
    string DocumentNumber,
    string? FrontImageUrl,
    string? BackImageUrl,
    string? FileUrl,
    string Status,
    string? RejectionReason,
    DateTimeOffset SubmittedAt,
    DateTimeOffset? ReviewedAt
);

public record VerificationReviewDto(
    Guid Id,
    Guid UserId,
    string ReviewerName,
    string ActionTaken,
    string? Notes,
    DateTimeOffset Timestamp
);

public record VerificationQueueItemDto(
    Guid UserId,
    string UserName,
    string? UserNameAm,
    string UserRole,
    string Phone,
    string Region,
    string RegistrationMethod,
    string? RegisteredByAgentName,
    string VerificationStatus,
    string? RejectionReason,
    string? TinNumber,
    DateTimeOffset RegisteredAt,
    List<UserDocumentDto> Documents,
    List<VerificationReviewDto> Reviews
);

public record UserVerificationStatusDto(
    Guid UserId,
    string VerificationStatus,
    string? RejectionReason,
    string? TinNumber,
    List<UserDocumentDto> Documents,
    List<VerificationReviewDto> AuditLogs
);

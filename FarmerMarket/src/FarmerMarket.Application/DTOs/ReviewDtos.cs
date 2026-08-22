namespace FarmerMarket.Application.DTOs;

public record CreateReviewDto(
    Guid OrderId,
    Guid RevieweeId,
    int Rating,
    string? Comment
);

public record ReviewDto(
    Guid Id,
    Guid OrderId,
    Guid ReviewerId,
    string ReviewerName,
    Guid RevieweeId,
    string RevieweeName,
    int Rating,
    string? Comment,
    DateTimeOffset CreatedAt
);

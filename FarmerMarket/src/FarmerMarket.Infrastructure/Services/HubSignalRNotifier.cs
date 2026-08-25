// This file is intentionally kept as an empty placeholder.
// The real ISignalRNotifier implementation lives in FarmerMarket.API.Services.SignalRNotifier,
// which uses IHubContext<OrderHub> — only available in the API layer.
// Infrastructure uses FallbackSignalRNotifier (log-only) when the hub is not available.
namespace FarmerMarket.Infrastructure.Services;

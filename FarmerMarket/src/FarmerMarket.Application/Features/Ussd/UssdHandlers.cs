using System.Collections.Concurrent;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Ussd;

public record UssdRequest(
    string SessionId,
    string PhoneNumber,
    string Text,
    string ServiceCode = "*804#",
    string Language = "am"
);

public record UssdResponse(
    string SessionId,
    string Message,
    string Action // "CON" = Continue session, "END" = Close session
);

public record ProcessUssdCommand(UssdRequest Request) : IRequest<UssdResponse>;

public class UssdSessionState
{
    public string Step { get; set; } = "MAIN";
    public string Language { get; set; } = "am";
    public string? SelectedCrop { get; set; }
    public decimal? SelectedQtyKg { get; set; }
}

public class UssdHandlers(IAppDbContext db) : IRequestHandler<ProcessUssdCommand, UssdResponse>
{
    private static readonly ConcurrentDictionary<string, UssdSessionState> Sessions = new();

    public async Task<UssdResponse> Handle(ProcessUssdCommand req, CancellationToken ct)
    {
        var r = req.Request;
        var state = Sessions.GetOrAdd(r.SessionId, _ => new UssdSessionState { Language = r.Language });

        var input = (r.Text ?? string.Empty).Trim();
        var isAm = state.Language == "am";

        // Main initial screen or reset
        if (string.IsNullOrWhiteSpace(input) || input == "*804#" || input == "0")
        {
            state.Step = "MAIN";
            var welcome = isAm
                ? "🌾 ወደ ገበያ-ለአርሶ አደር (Farmer-to-Market) እንኳን ደህና መጡ\n\n1. 📈 የገበያ ዋጋ መረጃ (ECX)\n2. 💰 የሒሳብ ቀሪ (Telebirr)\n3. 📦 የትዕዛዝ ሁኔታ\n4. 🚜 አዲስ ምርት መመዝገብ\n5. 🌐 ቋንቋ / Language (EN)\n0. መውጫ"
                : "🌾 Welcome to Farmer-to-Market (*804#)\n\n1. 📈 Market Price Index (ECX)\n2. 💰 Wallet Balance (Telebirr)\n3. 📦 Pending Orders\n4. 🚜 List New Produce\n5. 🌐 Switch to አማርኛ\n0. Exit";
            return new UssdResponse(r.SessionId, welcome, "CON");
        }

        // Split multiple inputs (e.g. "1*2") if telco chained them
        var lastInput = input.Contains('*') ? input.Split('*').Last().Trim() : input;

        // Language toggle
        if (state.Step == "MAIN" && lastInput == "5")
        {
            state.Language = isAm ? "en" : "am";
            isAm = state.Language == "am";
            var toggled = isAm
                ? "ቋንቋ ወደ አማርኛ ተቀይሯል።\n\n1. የገበያ ዋጋ\n2. የሒሳብ ቀሪ\n3. ትዕዛዞች\n0. ዋና ማውጫ"
                : "Language switched to English.\n\n1. Market Prices\n2. Wallet Balance\n3. Orders\n0. Main Menu";
            return new UssdResponse(r.SessionId, toggled, "CON");
        }

        // Option 1: Market Prices
        if (state.Step == "MAIN" && lastInput == "1")
        {
            state.Step = "PRICES";
            var priceMenu = isAm
                ? "የወቅቱ የኢትዮጵያ ምርት ገበያ (ECX) ዋጋዎች፡\n1. ነጭ ጤፍ - 128 ETB/kg\n2. ቡና (ሲዳማ) - 485 ETB/kg\n3. ቀይ ሽንኩርት - 82 ETB/kg\n4. ቲማቲም - 65 ETB/kg\n0. ተመለስ"
                : "Live ECX Market Prices (ETB/kg):\n1. Teff White - 128 ETB\n2. Coffee Sidama - 485 ETB\n3. Red Onion - 82 ETB\n4. Tomatoes - 65 ETB\n0. Back";
            return new UssdResponse(r.SessionId, priceMenu, "CON");
        }

        if (state.Step == "PRICES")
        {
            state.Step = "MAIN";
            var detail = lastInput switch
            {
                "1" => isAm ? "ነጭ ጤፍ (ማግና)፡ 128 ብር/ኪ.ግ (አዲስ አበባ መርካቶ)። በሳምንቱ +3.8% ጭማሪ አሳይቷል።" : "White Teff: 128 ETB/kg (Merkato). 7-day trend: +3.8% Up.",
                "2" => isAm ? "የታጠበ ሲዳማ ቡና፡ 485 ብር/ኪ.ግ (ECX ማዕከል)። ፍላጎት ከፍተኛ ነው።" : "Sidama Coffee Grade 1: 485 ETB/kg (ECX). High demand.",
                "3" => isAm ? "የአዳማ ቀይ ሽንኩርት፡ 82 ብር/ኪ.ግ (ፒያሳ ገበያ)። መካከለኛ አቅርቦት።" : "Adama Red Onions: 82 ETB/kg (Piazza). Moderate supply.",
                "4" => isAm ? "የመቂ ቲማቲም፡ 65 ብር/ኪ.ግ (አትክልት ተራ)። የ+8.1% የዋጋ ጭማሪ።" : "Meki Plum Tomatoes: 65 ETB/kg (Atkilt Tera). +8.1% Up.",
                _ => isAm ? "ዋጋ አልተገኘም።" : "Price not found."
            };
            return new UssdResponse(r.SessionId, detail + (isAm ? "\n\n0. ዋና ማውጫ" : "\n\n0. Main Menu"), "CON");
        }

        // Option 2: Wallet Balance
        if (state.Step == "MAIN" && lastInput == "2")
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Phone == r.PhoneNumber, ct);
            if (user == null)
            {
                var notFoundResp = isAm
                    ? "❌ መለያዎ አልተገኘም። እባክዎ አስቀድመው ይመዝገቡ።"
                    : "❌ Account not found for this mobile number. Please register first.";
                Sessions.TryRemove(r.SessionId, out _);
                return new UssdResponse(r.SessionId, notFoundResp, "END");
            }

            var balance = user.WalletBalanceEtb;
            var heldEscrow = await db.Orders
                .Where(o => o.Listing.FarmerId == user.Id && o.EscrowHeld)
                .SumAsync(o => (decimal?)o.TotalEtb, ct) ?? 0m;

            var resp = isAm
                ? $"💰 የቴሌብር (Telebirr) የሒሳብዎ ቀሪ፡ {balance:N2} ብር\nበኤስክሮው (Escrow) የተያዘ፡ {heldEscrow:N2} ብር\nያለቀ ክፍያ ወዲያውኑ ወደ ስልክዎ ይገባል።"
                : $"💰 Telebirr Escrow Balance: ETB {balance:N2}\nHeld in Active Escrow: ETB {heldEscrow:N2}\nPayouts auto-release on delivery confirmation.";
            Sessions.TryRemove(r.SessionId, out _);
            return new UssdResponse(r.SessionId, resp, "END");
        }

        // Option 3: Orders Status
        if (state.Step == "MAIN" && lastInput == "3")
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Phone == r.PhoneNumber, ct);
            if (user == null)
            {
                var notFoundResp = isAm
                    ? "❌ መለያዎ አልተገኘም። እባክዎ አስቀድመው ይመዝገቡ።"
                    : "❌ Account not found for this mobile number. Please register first.";
                Sessions.TryRemove(r.SessionId, out _);
                return new UssdResponse(r.SessionId, notFoundResp, "END");
            }

            var activeOrdersCount = await db.Orders.CountAsync(o =>
                (o.Listing.FarmerId == user.Id || o.BuyerId == user.Id || o.DriverId == user.Id) &&
                (o.Status == OrderStatus.Confirmed || o.Status == OrderStatus.Pending || o.Status == OrderStatus.PickedUp), ct);

            var resp = isAm
                ? $"📦 የትዕዛዝዎ ሁኔታ፡\n• በሂደት ላይ ያሉ ትዕዛዞች: {activeOrdersCount}\n• የትዕዛዝ ዝርዝር በስልክዎ መተግበሪያ ማየት ይችላሉ።"
                : $"📦 Active Order Status:\n• Active orders in progress: {activeOrdersCount}\n• Check FarmerMarket portal for live tracking.";
            Sessions.TryRemove(r.SessionId, out _);
            return new UssdResponse(r.SessionId, resp, "END");
        }

        // Option 4: Quick Produce Listing Wizard
        if (state.Step == "MAIN" && lastInput == "4")
        {
            state.Step = "LIST_CROP";
            var cropPrompt = isAm
                ? "🚜 የሚሸጡትን ምርት ይምረጡ፡\n1. ጤፍ (Teff)\n2. ቀይ ሽንኩርት (Onion)\n3. ቲማቲም (Tomato)\n4. ስንዴ (Wheat)\n5. ሌላ ምርት"
                : "🚜 Select produce to list:\n1. Teff\n2. Red Onion\n3. Tomato\n4. Wheat\n5. Other Crop";
            return new UssdResponse(r.SessionId, cropPrompt, "CON");
        }

        if (state.Step == "LIST_CROP")
        {
            state.SelectedCrop = lastInput switch
            {
                "1" => "Teff White",
                "2" => "Red Onions",
                "3" => "Fresh Tomatoes",
                "4" => "Durum Wheat",
                _ => "Organic Farm Produce"
            };
            state.Step = "LIST_QTY";
            var qtyPrompt = isAm
                ? $"የምርቱ መጠን በኪሎግራም (ኪ.ግ) ስንት ነው? (ለምሳሌ 500)"
                : $"Enter quantity in Kilograms (kg) for {state.SelectedCrop}: (e.g. 500)";
            return new UssdResponse(r.SessionId, qtyPrompt, "CON");
        }

        if (state.Step == "LIST_QTY")
        {
            if (decimal.TryParse(lastInput, out var qty) && qty > 0)
            {
                state.SelectedQtyKg = qty;
                state.Step = "LIST_PRICE";
                var pricePrompt = isAm
                ? $"የ1 ኪ.ግ መሸጫ ዋጋ በብር ያስገቡ፡ (ለምሳሌ 85)"
                : $"Enter selling price per kg in ETB: (e.g. 85)";
                return new UssdResponse(r.SessionId, pricePrompt, "CON");
            }
            return new UssdResponse(r.SessionId, isAm ? "ትክክለኛ ቁጥር ያስገቡ (ለምሳሌ 500)፦" : "Invalid quantity. Enter number (e.g. 500):", "CON");
        }

        if (state.Step == "LIST_PRICE")
        {
            if (decimal.TryParse(lastInput, out var price) && price > 0)
            {
                var farmer = await db.Users.FirstOrDefaultAsync(u => u.Phone == r.PhoneNumber && u.Role == UserRole.Farmer, ct);

                if (farmer != null)
                {
                    var newListing = new Listing
                    {
                        FarmerId = farmer.Id,
                        ProductName = state.SelectedCrop ?? "Farm Produce",
                        Category = "Vegetable",
                        QtyKg = state.SelectedQtyKg ?? 100,
                        PricePerKg = price,
                        MinOrderKg = 10,
                        Latitude = 9.0300,
                        Longitude = 38.7400,
                        Grade = "Grade 1",
                        Ripeness = "Ready Today",
                        IsOrganic = true,
                        Status = ListingStatus.Active,
                        ModerationStatus = "Approved"
                    };
                    db.Listings.Add(newListing);
                    await db.SaveChangesAsync(ct);
                }

                Sessions.TryRemove(r.SessionId, out _);
                var successMsg = isAm
                    ? $"✅ እናመሰግናለን! {state.SelectedQtyKg} ኪ.ግ {state.SelectedCrop} በ{price} ብር/ኪ.ግ በስኬት ተመዝግቧል። ገዢዎች ሲያዙ በSMS ይደርስዎታል።"
                    : $"✅ Successfully listed {state.SelectedQtyKg} kg of {state.SelectedCrop} at ETB {price}/kg! You will receive SMS alerts when buyers place orders.";
                return new UssdResponse(r.SessionId, successMsg, "END");
            }
            return new UssdResponse(r.SessionId, isAm ? "ትክክለኛ ዋጋ ያስገቡ፦" : "Invalid price. Enter valid amount:", "CON");
        }

        // Fallback default
        Sessions.TryRemove(r.SessionId, out _);
        return new UssdResponse(r.SessionId, isAm ? "እናመሰግናለን! ክፍለ ጊዜው ተዘግቷል።" : "Thank you! Session ended.", "END");
    }
}

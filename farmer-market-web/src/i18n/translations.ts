export type Language = 'en' | 'am';

export const translations = {
  en: {
    brandName: "Farmer-to-Market",
    brandSubtitle: "Direct Produce Exchange · Ethiopia",
    tagline: "Connecting 15M+ Ethiopian smallholder farmers directly with wholesale buyers.",
    heroTitle: "Fresh From Farm To Market · Zero Middlemen",
    heroDesc: "Farmers receive 90% of purchase value. Wholesale buyers get verified bulk produce delivered directly to their doorstep with Telebirr Escrow protection.",

    // Roles
    roleFarmer: "Farmer",
    roleBuyer: "Wholesale Buyer",
    roleDriver: "Partner Driver",
    roleAdmin: "Platform Admin",
    switchRole: "Switch Demo Profile",
    currentRole: "Current Role",

    // Navigation
    navMarketplace: "Marketplace",
    navFarmerPortal: "Farmer Dashboard",
    navDriverPortal: "Delivery Trips",
    navAdminPortal: "Admin Panel",
    navCart: "Bulk Cart",
    navOrders: "My Orders",
    navLogin: "Phone Login",
    navLogout: "Logout",

    // Categories
    catAll: "All Produce",
    catVegetables: "Vegetables",
    catGrains: "Grains & Teff",
    catFruits: "Fruits",
    catCoffee: "Specialty Coffee",
    catSpices: "Spices & Herbs",

    // Filters & Search
    searchPlaceholder: "Search produce, farmer, or region (e.g., Tomatoes, Bishoftu, Teff)...",
    filterRegion: "Filter by Region",
    filterPrice: "Max Price (ETB/kg)",
    filterDistance: "Max Distance (km)",
    sortBy: "Sort By",
    allRegions: "All Regions",
    addisAbaba: "Addis Ababa",
    oromia: "Oromia",
    amhara: "Amhara",
    sidama: "Sidama",
    snnpr: "SNNPR",

    // Produce Card
    pricePerKg: "ETB / kg",
    availableStock: "Stock Available",
    minOrder: "Min. Order",
    harvestDate: "Harvest Date",
    farmDistance: "from Addis",
    verifiedFarmer: "Verified Smallholder",
    addToCart: "Add to Bulk Cart",
    viewDetails: "View Farm Details",
    farmerRating: "Rating",

    // Cart & Checkout
    cartTitle: "Bulk Produce Cart",
    cartEmpty: "Your bulk cart is currently empty.",
    cartSubtotal: "Subtotal",
    deliveryEstimate: "Driver Cut (5%)",
    platformFee: "Platform Cut (5%)",
    farmerShare: "Farmer Payout (90%)",
    totalAmount: "Total Order (ETB)",
    checkoutTelebirr: "Pay Securely with Telebirr Escrow",
    orderQuantity: "Quantity (kg)",
    minOrderWarning: "Below minimum order threshold",

    // Telebirr Modal
    telebirrTitle: "Telebirr C2B Escrow Checkout",
    telebirrDesc: "Your funds will be held in secure escrow until you confirm delivery from the farmer.",
    enterPhone: "Telebirr Mobile Number",
    enterPin: "Telebirr 4-Digit PIN",
    escrowGuarantee: "Escrow Guarantee: 90% released to farmer upon your delivery confirmation.",
    payNow: "Authorize Payment",
    processingPayment: "Processing with Telebirr...",

    // Order Tracking & Statuses
    orderTracking: "Live Order & Escrow Tracker",
    statusPending: "Order Placed (Escrow Held)",
    statusConfirmed: "Farmer Confirmed",
    statusPickedUp: "Driver Picked Up (In Transit)",
    statusDelivered: "Delivered (Escrow Released)",
    statusDisputed: "Dispute Under Review",
    statusCancelled: "Cancelled / Refunded",
    confirmDeliveryBtn: "Confirm Delivery & Release Escrow",
    disputeBtn: "Raise Issue / Dispute",
    rateFarmer: "Rate Farmer Quality",
    submitReview: "Submit 5-Star Review",

    // Farmer Portal
    farmerPortalTitle: "Farmer Produce & Earnings Portal",
    postNewListing: "Post New Produce Listing",
    productNameEn: "Product Name (English)",
    productNameAm: "Product Name (Amharic)",
    categoryLabel: "Category",
    qtyKgLabel: "Total Quantity (kg)",
    priceKgLabel: "Unit Price (ETB / kg)",
    minOrderLabel: "Minimum Bulk Order (kg)",
    farmLocationLabel: "Farm Location / Region",
    publishListingBtn: "Publish Listing to Marketplace",
    myActiveListings: "My Active Listings",
    incomingOrders: "Incoming Buyer Orders",
    confirmOrderAction: "Confirm Order for Pickup",
    earningsToday: "Today's Earnings",
    earningsThisWeek: "This Week",
    earningsThisMonth: "This Month",
    telebirrWalletStatus: "Telebirr Wallet Active",
    depositedToWallet: "Deposited to Wallet",

    // Driver Portal
    driverPortalTitle: "Driver Delivery Hub",
    availableTrips: "Available Farm Pickups",
    acceptTrip: "Accept Delivery Trip",
    uploadProof: "Upload Pickup Photo",
    navigateBuyer: "Navigate to Buyer Depot",
    markCompleted: "Complete Delivery",
    tripCommission: "Guaranteed Driver Cut (5%)",
    totalDeliveredTrips: "Trips Completed",

    // Admin Portal
    adminPortalTitle: "Marketplace Management & Compliance",
    statTotalVolume: "Total Transaction Volume",
    statPlatformRev: "Platform Commission (5%)",
    statActiveEscrow: "Active Escrow Held",
    statDisputes: "Active Disputes",
    verifyUsersTitle: "Farmer & Driver Verification Queue",
    verifyBtn: "Approve & Verify ID",
    resolveDisputeTitle: "Escrow Dispute Arbitration",
    releaseFarmerBtn: "Release Funds to Farmer",
    refundBuyerBtn: "Refund 100% to Buyer",
    broadcastSmsTitle: "Bilingual SMS Announcement Broadcaster",
    sendSmsBtn: "Broadcast SMS to Farmers",

    // Notifications
    liveAlert: "Live Update",
    smsSent: "Bilingual SMS Sent via Twilio",
    telebirrPaid: "Payment Secured via Telebirr Escrow",
    currency: "ETB"
  },
  am: {
    brandName: "ፋርመር-ቱ-ማርኬት (FarmerMarket)",
    brandSubtitle: "የቀጥታ የግብርና ምርት ግብይት · ኢትዮጵያ",
    tagline: "ከ15 ሚሊዮን በላይ አነስተኛ አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር ማገናኘት።",
    heroTitle: "ከእርሻ በቀጥታ ወደ ገበያ · ያለ ደላላ ጣልቃ ገብነት",
    heroDesc: "አርሶ አደሩ የዋጋውን 90% ያገኛል። የጅምላ ገዢዎች ጥራት ያለው ምርት በቴሌብር የዋስትና ክፍያ (Escrow) በቀጥታ ይቀበላሉ።",

    // Roles
    roleFarmer: "አርሶ አደር",
    roleBuyer: "የጅምላ ገዢ",
    roleDriver: "አጓጓዥ ሹፌር",
    roleAdmin: "የሲስተም አስተዳዳሪ",
    switchRole: "የተጠቃሚ መለያ ቀይር",
    currentRole: "የአሁኑ መለያ",

    // Navigation
    navMarketplace: "የምርት ገበያ",
    navFarmerPortal: "የአርሶ አደር ዳሽቦርድ",
    navDriverPortal: "የጭነት ጉዞዎች",
    navAdminPortal: "የአድሚን ክፍል",
    navCart: "የጅምላ ጋሪ",
    navOrders: "ትዕዛዞቼ",
    navLogin: "በስልክ ቁጥር መግቢያ",
    navLogout: "ውጣ",

    // Categories
    catAll: "ሁሉም ምርቶች",
    catVegetables: "አትክልቶች",
    catGrains: "እህሎች እና ጤፍ",
    catFruits: "ፍራፍሬዎች",
    catCoffee: "ልዩ የቡና ምርት",
    catSpices: "ቅመማ ቅመሞች",

    // Filters & Search
    searchPlaceholder: "ምርት፣ አርሶ አደር ወይም አካባቢ ይፈልጉ (ለምሳሌ: ቲማቲም፣ ቢሾፍቱ፣ ጤፍ)...",
    filterRegion: "በክልል / ከተማ ምረጥ",
    filterPrice: "ከፍተኛ ዋጋ (ብር/ኪ.ግ)",
    filterDistance: "ከፍተኛ ርቀት (ኪ.ሜ)",
    sortBy: "ደርድር በ",
    allRegions: "ሁሉም ክልሎች",
    addisAbaba: "አዲስ አበባ",
    oromia: "ኦሮሚያ",
    amhara: "አማራ",
    sidama: "ሲዳማ",
    snnpr: "ደቡብ ክልል",

    // Produce Card
    pricePerKg: "ብር / ኪ.ግ",
    availableStock: "ያለ ምርት መጠን",
    minOrder: "አነስተኛ ትዕዛዝ",
    harvestDate: "የተሰበሰበበት ቀን",
    farmDistance: "ከአዲስ አበባ",
    verifiedFarmer: "የተረጋገጠ አርሶ አደር",
    addToCart: "ወደ ግዢ ጋሪ ጨምር",
    viewDetails: "የእርሻ ዝርዝር ይመልከቱ",
    farmerRating: "ደረጃ",

    // Cart & Checkout
    cartTitle: "የጅምላ ግዢ ጋሪ",
    cartEmpty: "የግዢ ጋሪዎ ባዶ ነው።",
    cartSubtotal: "የምርት ዋጋ ድምር",
    deliveryEstimate: "የአጓጓዥ ድርሻ (5%)",
    platformFee: "የሲስተም ክፍያ (5%)",
    farmerShare: "የአርሶ አደር ክፍያ (90%)",
    totalAmount: "ጠቅላላ ክፍያ (ብር)",
    checkoutTelebirr: "በቴሌብር ዋስትና (Escrow) ይክፈሉ",
    orderQuantity: "የትዕዛዝ መጠን (ኪ.ግ)",
    minOrderWarning: "ከአነስተኛ ትዕዛዝ መጠን ያነሰ ነው",

    // Telebirr Modal
    telebirrTitle: "የቴሌብር አስተማማኝ የክፍያ ዋስትና",
    telebirrDesc: "ክፍያዎ ምርቱን በአካል ተረክበው እስኪያረጋግጡ ድረስ በዋስትና ሂሳብ ውስጥ ይጠበቃል።",
    enterPhone: "የቴሌብር ስልክ ቁጥር",
    enterPin: "የቴሌብር 4-ዲጂት ሚስጥር ቁጥር",
    escrowGuarantee: "የዋስትና ማረጋገጫ: ምርቱ እንደደረስዎት ሲያረጋግጡ 90% ለአርሶ አደሩ ወዲያውኑ ገቢ ይሆናል።",
    payNow: "ክፍያውን አረጋግጥ",
    processingPayment: "ቴሌብር ክፍያውን በማካሄድ ላይ ነው...",

    // Order Tracking & Statuses
    orderTracking: "የቀጥታ ትዕዛዝ እና የክፍያ መከታተያ",
    statusPending: "ትዕዛዝ ተሰጥቷል (ክፍያ ተይዟል)",
    statusConfirmed: "አርሶ አደሩ አረጋግጧል",
    statusPickedUp: "ሹፌሩ ምርቱን ተረክቧል (በመንገድ ላይ)",
    statusDelivered: "ምርቱ ደርሷል (ገንዘብ ተለቋል)",
    statusDisputed: "ቅሬታ እየተመረመረ ነው",
    statusCancelled: "ተሰርዟል / ተመላሽ ተደርጓል",
    confirmDeliveryBtn: "ምርቱ መድረሱን አረጋግጥ እና ገንዘቡን ልቀቅ",
    disputeBtn: "ቅሬታ አስገባ",
    rateFarmer: "የምርቱን ጥራት ደረጃ ይስጡ",
    submitReview: "የ5-ኮከብ ግምገማ ላክ",

    // Farmer Portal
    farmerPortalTitle: "የአርሶ አደር ምርት እና ገቢ ዳሽቦርድ",
    postNewListing: "አዲስ ምርት ለገበያ አቅርብ",
    productNameEn: "የምርት ስም (እንግሊዝኛ)",
    productNameAm: "የምርት ስም (አማርኛ)",
    categoryLabel: "የምርት ዘርፍ",
    qtyKgLabel: "ጠቅላላ መጠን (ኪ.ግ)",
    priceKgLabel: "የአንድ ኪ.ግ ዋጋ (ብር)",
    minOrderLabel: "አነስተኛ የጅምላ ትዕዛዝ (ኪ.ግ)",
    farmLocationLabel: "የእርሻ ቦታ / ክልል",
    publishListingBtn: "ምርቱን ለገበያ አውጣ",
    myActiveListings: "በገበያ ላይ ያሉ ምርቶቼ",
    incomingOrders: "የገዢዎች ትዕዛዞች",
    confirmOrderAction: "ትዕዛዙን አረጋግጥ",
    earningsToday: "የዛሬ ገቢ",
    earningsThisWeek: "የዚህ ሳምንት ገቢ",
    earningsThisMonth: "የዚህ ወር ገቢ",
    telebirrWalletStatus: "የቴሌብር አካውንት ገቢር ነው",
    depositedToWallet: "ወደ ቴሌብር አካውንት የገባ",

    // Driver Portal
    driverPortalTitle: "የአጓጓዥ ሹፌር ክፍል",
    availableTrips: "ዝግጁ የሆኑ የእርሻ ጭነቶች",
    acceptTrip: "ጭነቱን ተቀበል",
    uploadProof: "የጭነት ፎቶ አንሳ",
    navigateBuyer: "ወደ ገዢው መጋዘን አጓጉዝ",
    markCompleted: "ማድረስህን አረጋግጥ",
    tripCommission: "የተረጋገጠ የጉዞ ክፍያ (5%)",
    totalDeliveredTrips: "ያደረስካቸው ጉዞዎች",

    // Admin Portal
    adminPortalTitle: "የገበያ ቁጥጥር እና አስተዳደር",
    statTotalVolume: "ጠቅላላ የግብይት መጠን",
    statPlatformRev: "የሲስተም ገቢ (5%)",
    statActiveEscrow: "በዋስትና የተያዘ ገንዘብ",
    statDisputes: "ያልተፈቱ ቅሬታዎች",
    verifyUsersTitle: "የአርሶ አደሮች እና ሹፌሮች ማረጋገጫ",
    verifyBtn: "መታወቂያ አረጋግጥ",
    resolveDisputeTitle: "የቅሬታዎች ውሳኔ መስጫ",
    releaseFarmerBtn: "ገንዘቡ ለአርሶ አደሩ ይለቀቅ",
    refundBuyerBtn: "100% ለገዢው ይመለስ",
    broadcastSmsTitle: "የጅምላ ኤስኤምኤስ (SMS) ማሰራጫ",
    sendSmsBtn: "ኤስኤምኤስ ለአርሶ አደሮች ላክ",

    // Notifications
    liveAlert: "የቀጥታ መረጃ",
    smsSent: "በTwilio ኤስኤምኤስ ተልኳል",
    telebirrPaid: "ክፍያ በቴሌብር ዋስትና ተይዟል",
    currency: "ብር"
  }
};

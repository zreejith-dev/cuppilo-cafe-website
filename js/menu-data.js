// CUPPILO Full Menu Data — 51 items
const CUPPILO_MENU = [
  // ── ☕ HOT COFFEE ──
  { id:"coffee-001", cat:"Hot Coffee", name:"Kerala Coffee", nameMl:"കേരള കാപ്പി", desc:"Classic Kerala-style milk coffee", descMl:"ക്ലാസിക് കേരള ശൈലി പാൽ കാപ്പി", price:35, premium:false, popular:true, veg:true, emoji:"☕", gradient:"#3e2723,#795548" },
  { id:"coffee-002", cat:"Hot Coffee", name:"Kattan Coffee", nameMl:"കട്ടൻ കാപ്പി", desc:"Strong black coffee, Kerala style", descMl:"ശക്തമായ കറുത്ത കാപ്പി, കേരള ശൈലി", price:30, premium:false, popular:true, veg:true, emoji:"☕", gradient:"#4e342e,#6d4c41" },
  { id:"coffee-003", cat:"Hot Coffee", name:"Filter Coffee", nameMl:"ഫിൽറ്റർ കാപ്പി", desc:"South Indian filter coffee with rich aroma", descMl:"സമ്പന്നമായ മണമുള്ള ദക്ഷിണേന്ത്യൻ ഫിൽറ്റർ കാപ്പി", price:45, premium:true, popular:true, veg:true, emoji:"🫗", gradient:"#5d4037,#8d6e63" },
  { id:"coffee-004", cat:"Hot Coffee", name:"Cappuccino", nameMl:"കാപ്പുച്ചിനോ", desc:"Espresso with steamed milk and silky foam", descMl:"സ്റ്റീം ചെയ്ത പാലും പട്ടുപോലുള്ള നുരയുമുള്ള എസ്പ്രെസ്സോ", price:129, premium:true, popular:true, veg:true, emoji:"☕", gradient:"#4e342e,#795548" },
  { id:"coffee-005", cat:"Hot Coffee", name:"Cafe Latte", nameMl:"കാഫെ ലാറ്റെ", desc:"Smooth espresso with creamy steamed milk", descMl:"മൃദുവായ എസ്പ്രെസ്സോ ക്രീമി സ്റ്റീം പാലുമായി", price:139, premium:true, popular:true, veg:true, emoji:"🥛", gradient:"#6d4c41,#a1887f" },
  { id:"coffee-006", cat:"Hot Coffee", name:"Cafe Mocha", nameMl:"കാഫെ മോക്ക", desc:"Espresso, chocolate and steamed milk", descMl:"എസ്പ്രെസ്സോ, ചോക്ലേറ്റ്, സ്റ്റീം പാൽ", price:149, premium:true, popular:true, veg:true, emoji:"🍫", gradient:"#3e2723,#5d4037" },
  { id:"coffee-007", cat:"Hot Coffee", name:"Spanish Latte", nameMl:"സ്പാനിഷ് ലാറ്റെ", desc:"Espresso, creamy milk and condensed milk", descMl:"എസ്പ്രെസ്സോ, ക്രീമി പാൽ, കൊണ്ടൻസ്ഡ് പാൽ", price:149, premium:true, popular:true, veg:true, emoji:"🇪🇸", gradient:"#bf360c,#e64a19" },
  { id:"coffee-008", cat:"Hot Coffee", name:"Caramel Latte", nameMl:"കാരമൽ ലാറ്റെ", desc:"Creamy latte with caramel", descMl:"കാരമലുമായി ക്രീമി ലാറ്റെ", price:149, premium:true, popular:false, veg:true, emoji:"🍮", gradient:"#e65100,#ff8f00" },
  { id:"coffee-009", cat:"Hot Coffee", name:"Jaggery Filter Coffee", nameMl:"ശർക്കര ഫിൽറ്റർ കാപ്പി", desc:"Traditional filter coffee sweetened with Kerala jaggery", descMl:"കേരള ശർക്കര ഉപയോഗിച്ച് മധുരിച്ച പാരമ്പര്യ ഫിൽറ്റർ കാപ്പി", price:59, premium:true, popular:true, veg:true, emoji:"🍯", gradient:"#4e342e,#795548" },

  // ── 🫖 TEA ──
  { id:"tea-001", cat:"Tea", name:"Kerala Chaya", nameMl:"കേരള ചായ", desc:"Classic strong milk tea", descMl:"ക്ലാസിക് ശക്തമായ പാൽ ചായ", price:20, premium:false, popular:true, veg:true, emoji:"🍵", gradient:"#fff3e0,#ffb74d" },
  { id:"tea-002", cat:"Tea", name:"Strong Chaya", nameMl:"സ്ട്രോങ് ചായ", desc:"Extra strong Kerala tea", descMl:"അധിക ശക്തമായ കേരള ചായ", price:25, premium:false, popular:true, veg:true, emoji:"🍵", gradient:"#e65100,#ff8f00" },
  { id:"tea-003", cat:"Tea", name:"Ginger Chaya", nameMl:"ഇഞ്ചി ചായ", desc:"Milk tea infused with fresh ginger", descMl:"പുതിയ ഇഞ്ചി ചേർത്ത പാൽ ചായ", price:30, premium:false, popular:true, veg:true, emoji:"🫚", gradient:"#fff8e1,#ffd54f" },
  { id:"tea-004", cat:"Tea", name:"Cardamom Chaya", nameMl:"ഏലക്ക ചായ", desc:"Aromatic tea with cardamom", descMl:"ഏലക്ക ചേർത്ത സുഗന്ധ ചായ", price:30, premium:false, popular:true, veg:true, emoji:"🫖", gradient:"#fce4ec,#f48fb1" },
  { id:"tea-005", cat:"Tea", name:"Sulaimani", nameMl:"സുലൈമാനി", desc:"Kerala-style spiced black tea", descMl:"കേരള ശൈലി മസാല കറുത്ത ചായ", price:35, premium:true, popular:true, veg:true, emoji:"🫖", gradient:"#880e4f,#c2185b" },
  { id:"tea-006", cat:"Tea", name:"Mint Lemon Tea", nameMl:"പുദീന നാരങ്ങ ചായ", desc:"Refreshing mint and lemon tea", descMl:"പുദീനയും നാരങ്ങയുമുള്ള പുതുക്കുന്ന ചായ", price:40, premium:true, popular:false, veg:true, emoji:"🍋", gradient:"#e8f5e9,#81c784" },
  { id:"tea-007", cat:"Tea", name:"Signature Chaya", nameMl:"സിഗ്നേച്ചർ ചായ", desc:"CUPPILO house tea blend", descMl:"കപ്പിലോ ഹൗസ് ടീ ബ്ലെൻഡ്", price:49, premium:true, popular:true, veg:true, emoji:"⭐", gradient:"#ff6f00,#ffa000" },

  // ── 🥤 COLD COFFEE & SHAKES ──
  { id:"cold-001", cat:"Cold Drinks", name:"Cold Coffee", nameMl:"കോൾഡ് കാപ്പി", desc:"Chilled creamy coffee", descMl:"തണുത്ത ക്രീമി കാപ്പി", price:99, premium:true, popular:true, veg:true, emoji:"🧊", gradient:"#1a237e,#3949ab" },
  { id:"cold-002", cat:"Cold Drinks", name:"Iced Latte", nameMl:"ഐസ്ഡ് ലാറ്റെ", desc:"Chilled espresso with creamy milk", descMl:"തണുത്ത എസ്പ്രെസ്സോ ക്രീമി പാലുമായി", price:119, premium:true, popular:true, veg:true, emoji:"🧊", gradient:"#283593,#5c6bc0" },
  { id:"cold-003", cat:"Cold Drinks", name:"Mocha Frappe", nameMl:"മോക്ക ഫ്രാപ്പെ", desc:"Blended coffee and chocolate", descMl:"ബ്ലെൻഡ് ചെയ്ത കാപ്പിയും ചോക്ലേറ്റും", price:139, premium:true, popular:true, veg:true, emoji:"🍫", gradient:"#3e2723,#5d4037" },
  { id:"cold-004", cat:"Cold Drinks", name:"Chocolate Shake", nameMl:"ചോക്ലേറ്റ് ഷേയ്ക്ക്", desc:"Rich chocolate milkshake", descMl:"സമ്പന്നമായ ചോക്ലേറ്റ് മിൽക്ക്‌ഷേയ്ക്ക്", price:109, premium:true, popular:true, veg:true, emoji:"🍫", gradient:"#4e342e,#795548" },
  { id:"cold-005", cat:"Cold Drinks", name:"Oreo Shake", nameMl:"ഒറിയോ ഷേയ്ക്ക്", desc:"Creamy chocolate-cookie shake", descMl:"ക്രീമി ചോക്ലേറ്റ്-കുക്കി ഷേയ്ക്ക്", price:129, premium:true, popular:true, veg:true, emoji:"🍪", gradient:"#212121,#424242" },
  { id:"cold-006", cat:"Cold Drinks", name:"Banana Jaggery Shake", nameMl:"പഴം ശർക്കര ഷേയ്ക്ക്", desc:"Banana blended with milk and Kerala jaggery", descMl:"പഴവും പാലും കേരള ശർക്കരയും ബ്ലെൻഡ് ചെയ്തത്", price:109, premium:true, popular:true, veg:true, emoji:"🍌", gradient:"#f9a825,#fdd835" },
  { id:"cold-007", cat:"Cold Drinks", name:"Tender Coconut Shake", nameMl:"തേങ്ങ ഷേയ്ക്ക്", desc:"Fresh tender coconut blended with creamy milk", descMl:"പുതിയ തേങ്ങ ക്രീമി പാലുമായി ബ്ലെൻഡ് ചെയ്തത്", price:129, premium:true, popular:true, veg:true, emoji:"🥥", gradient:"#e8f5e9,#a5d6a7" },

  // ── 🌴 KERALA COOLERS ──
  { id:"cooler-001", cat:"Kerala Coolers", name:"Nannari Sarbath", nameMl:"നന്നാരി സർബത്ത്", desc:"Traditional Kerala summer cooler", descMl:"പാരമ്പര്യ കേരള വേന്ദകാല കൂളർ", price:49, premium:false, popular:true, veg:true, emoji:"🌴", gradient:"#00695c,#26a69a" },
  { id:"cooler-002", cat:"Kerala Coolers", name:"Lemon Mint Cooler", nameMl:"നാരങ്ങ പുദീന കൂളർ", desc:"Fresh lemon, mint and chilled soda", descMl:"പുതിയ നാരങ്ങ, പുദീന, തണുത്ത സോഡ", price:69, premium:true, popular:true, veg:true, emoji:"🍋", gradient:"#c8e6c9,#66bb6a" },
  { id:"cooler-003", cat:"Kerala Coolers", name:"Passion Fruit Cooler", nameMl:"പാഷൻ ഫ്രൂട്ട് കൂളർ", desc:"Tropical passion fruit refresher", descMl:"ട്രോപ്പിക്കൽ പാഷൻ ഫ്രൂട്ട് റീഫ്രഷർ", price:89, premium:true, popular:true, veg:true, emoji:"🍹", gradient:"#ff6f00,#ffca28" },
  { id:"cooler-004", cat:"Kerala Coolers", name:"Karikku Cooler", nameMl:"കരിക്ക് കൂളർ", desc:"Tender coconut with refreshing citrus", descMl:"പുതുക്കുന്ന സിട്രസുമായി തേങ്ങ", price:99, premium:true, popular:true, veg:true, emoji:"🥥", gradient:"#e0f2f1,#80cbc4" },

  // ── 🍌 KERALA SNACKS ──
  { id:"snack-001", cat:"Kerala Snacks", name:"Pazham Pori", nameMl:"പഴം പൊരി", desc:"Crispy Kerala banana fritter", descMl:"ക്രിസ്പി കേരള പഴം പൊരി", price:20, premium:false, popular:true, veg:true, emoji:"🍌", gradient:"#f9a825,#fdd835" },
  { id:"snack-002", cat:"Kerala Snacks", name:"Uzhunnu Vada", nameMl:"ഉഴുന്ന് വട", desc:"Crispy urad dal fritter", descMl:"ക്രിസ്പി ഉഴുന്ന് വട", price:20, premium:false, popular:true, veg:true, emoji:"🫘", gradient:"#5d4037,#8d6e63" },
  { id:"snack-003", cat:"Kerala Snacks", name:"Parippu Vada", nameMl:"പരിപ്പ് വട", desc:"Crispy Kerala lentil fritter", descMl:"ക്രിസ്പി കേരള പരിപ്പ് വട", price:20, premium:false, popular:true, veg:true, emoji:"🫘", gradient:"#bf360c,#e64a19" },
  { id:"snack-004", cat:"Kerala Snacks", name:"Unniyappam", nameMl:"ഉണ്ണിയപ്പം", desc:"Soft jaggery and banana rice cake", descMl:"മൃദുവായ ശർക്കരയും പഴവുമുള്ള അരി കേക്ക്", price:30, premium:true, popular:true, veg:true, emoji:"🍘", gradient:"#e65100,#ff8f00" },
  { id:"snack-005", cat:"Kerala Snacks", name:"Kozhukatta", nameMl:"കൊഴുക്കട്ട", desc:"Steamed rice dumpling with coconut filling", descMl:"തേങ്ങ നിറച്ച ആവിയിൽ വേവിച്ച അരി ഡമ്പ്ലിംഗ്", price:35, premium:true, popular:false, veg:true, emoji:"🍡", gradient:"#f5f5f5,#e0e0e0" },
  { id:"snack-006", cat:"Kerala Snacks", name:"Egg Puffs", nameMl:"മുട്ട പഫ്", desc:"Flaky pastry filled with spiced egg", descMl:"മസാല മുട്ട നിറച്ച ഫ്ലേക്കി പേസ്ട്രി", price:40, premium:false, popular:true, veg:false, emoji:"🥚", gradient:"#fff8e1,#ffd54f" },
  { id:"snack-007", cat:"Kerala Snacks", name:"Chicken Puffs", nameMl:"ചിക്കൻ പഫ്", desc:"Flaky pastry with spiced chicken filling", descMl:"മസാല ചിക്കൻ നിറച്ച ഫ്ലേക്കി പേസ്ട്രി", price:55, premium:true, popular:true, veg:false, emoji:"🍗", gradient:"#d84315,#ff5722" },

  // ── 🍟 CAFE BITES ──
  { id:"bites-001", cat:"Cafe Bites", name:"Classic Fries", nameMl:"ക്ലാസിക് ഫ്രൈസ്", desc:"Crispy golden fries", descMl:"ക്രിസ്പി ഗോൾഡൻ ഫ്രൈസ്", price:79, premium:false, popular:true, veg:true, emoji:"🍟", gradient:"#f9a825,#fdd835" },
  { id:"bites-002", cat:"Cafe Bites", name:"Peri Peri Fries", nameMl:"പെരി പെരി ഫ്രൈസ്", desc:"Crispy fries with peri peri seasoning", descMl:"പെരി പെരി സീസനിംഗോടെ ക്രിസ്പി ഫ്രൈസ്", price:99, premium:true, popular:true, veg:true, emoji:"🌶️", gradient:"#bf360c,#e64a19" },
  { id:"bites-003", cat:"Cafe Bites", name:"Cheese Fries", nameMl:"ചീസ് ഫ്രൈസ്", desc:"Fries topped with creamy cheese", descMl:"ക്രീമി ചീസ് ചേർത്ത ഫ്രൈസ്", price:119, premium:true, popular:true, veg:true, emoji:"🧀", gradient:"#f9a825,#ffd54f" },
  { id:"bites-004", cat:"Cafe Bites", name:"Garlic Bread", nameMl:"ഗാർലിക് ബ്രെഡ്", desc:"Toasted bread with garlic butter", descMl:"ഗാർലിക് ബട്ടർ ചേർത്ത ടോസ്റ്റ് ചെയ്ത ബ്രെഡ്", price:89, premium:false, popular:true, veg:true, emoji:"🍞", gradient:"#5d4037,#8d6e63" },
  { id:"bites-005", cat:"Cafe Bites", name:"Cheese Garlic Bread", nameMl:"ചീസ് ഗാർലിക് ബ്രെഡ്", desc:"Garlic bread with melted cheese", descMl:"ഉരുകിയ ചീസുള്ള ഗാർലിക് ബ്രെഡ്", price:119, premium:true, popular:true, veg:true, emoji:"🧀", gradient:"#e65100,#ff8f00" },

  // ── 🥪 SANDWICHES ──
  { id:"sandwich-001", cat:"Sandwiches", name:"Veg Grilled Sandwich", nameMl:"വെജ് ഗ്രിൽഡ് സാൻഡ്‌വിച്ച്", desc:"Grilled vegetables and cheese", descMl:"ഗ്രിൽ ചെയ്ത പച്ചക്കറികളും ചീസും", price:89, premium:false, popular:true, veg:true, emoji:"🥪", gradient:"#e8f5e9,#66bb6a" },
  { id:"sandwich-002", cat:"Sandwiches", name:"Cheese Corn Sandwich", nameMl:"ചീസ് കോൺ സാൻഡ്‌വിച്ച്", desc:"Creamy cheese and sweet corn", descMl:"ക്രീമി ചീസും മധുര കോണും", price:109, premium:true, popular:true, veg:true, emoji:"🌽", gradient:"#f9a825,#fdd835" },
  { id:"sandwich-003", cat:"Sandwiches", name:"Chicken Grilled Sandwich", nameMl:"ചിക്കൻ ഗ്രിൽഡ് സാൻഡ്‌വിച്ച്", desc:"Grilled chicken, vegetables and cheese", descMl:"ഗ്രിൽ ചെയ്ത ചിക്കൻ, പച്ചക്കറികൾ, ചീസ്", price:129, premium:true, popular:true, veg:false, emoji:"🍗", gradient:"#d84315,#ff5722" },

  // ── 🍔 BURGERS ──
  { id:"burger-001", cat:"Burgers", name:"Veg Cheese Burger", nameMl:"വെജ് ചീസ് ബർഗർ", desc:"Crispy veg patty with cheese", descMl:"ചീസുള്ള ക്രിസ്പി വെജ് പാറ്റി", price:119, premium:true, popular:true, veg:true, emoji:"🍔", gradient:"#e65100,#ff8f00" },
  { id:"burger-002", cat:"Burgers", name:"Crispy Chicken Burger", nameMl:"ക്രിസ്പി ചിക്കൻ ബർഗർ", desc:"Crispy chicken fillet with fresh vegetables", descMl:"പുതിയ പച്ചക്കറികളുമായി ക്രിസ്പി ചിക്കൻ ഫില്ലറ്റ്", price:149, premium:true, popular:true, veg:false, emoji:"🍔", gradient:"#bf360c,#e64a19" },

  // ── 🍰 DESSERTS ──
  { id:"dessert-001", cat:"Desserts", name:"Brownie", nameMl:"ബ്രൗണി", desc:"Warm chocolate brownie", descMl:"ചൂടുള്ള ചോക്ലേറ്റ് ബ്രൗണി", price:69, premium:true, popular:true, veg:true, emoji:"🍫", gradient:"#3e2723,#5d4037" },
  { id:"dessert-002", cat:"Desserts", name:"Brownie & Ice Cream", nameMl:"ബ്രൗണി & ഐസ്ക്രീം", desc:"Warm brownie with vanilla ice cream", descMl:"വാനില ഐസ്ക്രീമുമായി ചൂടുള്ള ബ്രൗണി", price:109, premium:true, popular:true, veg:true, emoji:"🍨", gradient:"#4e342e,#795548" },
  { id:"dessert-003", cat:"Desserts", name:"Chocolate Cake", nameMl:"ചോക്ലേറ്റ് കേക്ക്", desc:"Rich chocolate cake slice", descMl:"സമ്പന്നമായ ചോക്ലേറ്റ് കേക്ക് സ്ലൈസ്", price:89, premium:true, popular:true, veg:true, emoji:"🎂", gradient:"#6d4c41,#a1887f" },

  // ── ⭐ CUPPILO SIGNATURES ──
  { id:"signature-001", cat:"CUPPILO Signatures", name:"CUPPILO Signature Coffee", nameMl:"കപ്പിലോ സിഗ്നേച്ചർ കാപ്പി", desc:"House coffee with Kerala-inspired flavours", descMl:"കേരള പ്രചോദിത രുചികളുള്ള ഹൗസ് കാപ്പി", price:129, premium:true, popular:true, signature:true, veg:true, emoji:"⭐", gradient:"#ff6f00,#ffa000" },
  { id:"signature-002", cat:"CUPPILO Signatures", name:"Copper Chaya", nameMl:"കോപ്പർ ചായ", desc:"Signature spiced milk tea served CUPPILO style", descMl:"കപ്പിലോ ശൈലിയിൽ വിളമ്പിയ സിഗ്നേച്ചർ മസാല പാൽ ചായ", price:69, premium:true, popular:true, signature:true, veg:true, emoji:"⭐", gradient:"#e65100,#ff8f00" },
  { id:"signature-003", cat:"CUPPILO Signatures", name:"Kerala Jaggery Latte", nameMl:"കേരള ശർക്കര ലാറ്റെ", desc:"Espresso, steamed milk and Kerala jaggery", descMl:"എസ്പ്രെസ്സോ, സ്റ്റീം പാൽ, കേരള ശർക്കര", price:139, premium:true, popular:true, signature:true, veg:true, emoji:"⭐", gradient:"#4e342e,#795548" },
  { id:"signature-004", cat:"CUPPILO Signatures", name:"Karikku Coffee", nameMl:"കരിക്ക് കാപ്പി", desc:"Coconut-inspired cold coffee creation", descMl:"തേങ്ങ പ്രചോദിത കോൾഡ് കാപ്പി സൃഷ്ടി", price:149, premium:true, popular:true, signature:true, veg:true, emoji:"⭐", gradient:"#00695c,#26a69a" }
];

// Category metadata
const CATEGORIES = [
  { id: "all", label: "All", labelMl: "എല്ലാം", emoji: "📋" },
  { id: "Hot Coffee", label: "Hot Coffee", labelMl: "ചൂട് കാപ്പി", emoji: "☕" },
  { id: "Tea", label: "Tea", labelMl: "ചായ", emoji: "🍵" },
  { id: "Cold Drinks", label: "Cold Drinks", labelMl: "കോൾഡ് ഡ്രിംക്സ്", emoji: "🥤" },
  { id: "Kerala Coolers", label: "Kerala Coolers", labelMl: "കേരള കൂളേഴ്സ്", emoji: "🌴" },
  { id: "Kerala Snacks", label: "Kerala Snacks", labelMl: "കേരള സ്നാക്കുകൾ", emoji: "🍌" },
  { id: "Cafe Bites", label: "Cafe Bites", labelMl: "കഫേ ബൈറ്റ്സ്", emoji: "🍟" },
  { id: "Sandwiches", label: "Sandwiches", labelMl: "സാൻഡ്‌വിച്ചുകൾ", emoji: "🥪" },
  { id: "Burgers", label: "Burgers", labelMl: "ബർഗറുകൾ", emoji: "🍔" },
  { id: "Desserts", label: "Desserts", labelMl: "ഡെസേർട്ട്സ്", emoji: "🍰" },
  { id: "CUPPILO Signatures", label: "Signatures", labelMl: "സിഗ്നേച്ചേഴ്സ്", emoji: "⭐" }
];

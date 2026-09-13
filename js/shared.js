// CUPPILO Shared — Language, Theme, Navbar, Footer

// ── LANGUAGE TOGGLE ──
const ML_TEXT = {
  hero_badge: '0 കോ-ക്രിയേറ്റർമാർ ചേർന്നു',
  hero_tag: 'കപ്പിലോ?',
  hero_title: 'ഞങ്ങൾ തുറക്കുന്നതിന് മുമ്പ്: നിങ്ങളുടെ സ്വപ്ന കഫേ നിർമ്മിക്കാൻ ഞങ്ങളെ സഹായിക്കൂ',
  hero_sub: 'ബോർഡ്‌റൂം ഊഹാപോഹങ്ങൾ ഉപേക്ഷിക്കുന്നു. പാലക്കാട്ട് യഥാർത്ഥത്തിൽ എന്താണ് വേണ്ടതെന്ന് ഞങ്ങളെ അറിയിക്കൂ.',
  cta: 'സഹ-നിർമ്മാണം ആരംഭിക്കുക',
  cta_time: '2 മിനിറ്റ് മതി',
  free_badge: '100% സൗജന്യം • വോട്ട് ചെയ്യാൻ ലോഗിൻ ആവശ്യമില്ല',
  pillar1_title: 'മെനു ക്രമീകരിക്കുക',
  pillar1_desc: '12 ഇനങ്ങൾ ബാലറ്റിൽ',
  pillar2_title: 'വൈബ് തിരഞ്ഞെടുക്കുക',
  pillar2_desc: '4 എസ്തറ്റിക് റൂട്ടുകൾ',
  pillar3_title: 'വില & പാസ്',
  pillar3_desc: '10% ലോഞ്ച് വൗച്ചർ',
  progress1: 'ഘട്ടം 1 of 4',
  progress1_sub: 'ഓപ്പണിംഗ് മെനു ക്രമീകരണം',
  menu_title: 'ഓപ്പണിംഗ് മെനു ക്രമീകരിക്കുക',
  menu_desc: 'ലോഞ്ച് ദിവസം നിങ്ങൾക്ക് വേണ്ടിയുള്ള ഇനങ്ങൾ ഹൃദയം ❤️ ടാപ്പ് ചെയ്യുക. ഓരോ ഇനത്തിനും ന്യായമായ വില സ്ലൈഡർ ഉപയോഗിച്ച് സജ്ജമാക്കുക.',
  filter_all: 'എല്ലാ ഇനങ്ങളും',
  filter_coffee: 'കാപ്പി',
  filter_tea: 'ചായ',
  filter_cold: 'കോൾഡ്',
  filter_food: 'ഭക്ഷണം',
  filter_bakery: 'ബേക്കറി',
  vote_count: 'വോട്ട് ഉപയോഗിച്ചു',
  vote_pick: '5 ഇനം വരെ തിരഞ്ഞെടുക്കുക',
  next_vibe: 'അടുത്തത്: വൈബ് തിരഞ്ഞെടുക്കുക',
  barometer: 'ഈ ആഴ്ച 0 ബാലറ്റുകൾ സമർപ്പിച്ചു',
  barometer_sub: '80%+ സമ്മതം നേടുന്ന ഇനങ്ങൾ CUPPILO-യുടെ ദിവസം 1 അടുക്കളയിൽ ലോക്ക് ചെയ്യുന്നു',
  tallying: 'ലൈവ് കണക്കാക്കുന്നു',
  suggest_title: 'ഒരു മെനു ഇനം നിർദ്ദേശിക്കുക',
  suggest_desc: 'CUPPILO എന്താണ് വിളമ്പേണ്ടത്? നിങ്ങളുടെ ആശയം സമർപ്പിക്കുക.',
  suggest_name: 'ഇനത്തിന്റെ പേര്',
  suggest_desc_label: 'ചെറിയ വിവരണം',
  suggest_cat: 'വിഭാഗം',
  suggest_submit: 'സമർപ്പിക്കുക',
  price_fair: 'നിങ്ങളുടെ ന്യായമായ വില',
  progress2: 'ഘട്ടം 2 of 4',
  progress2_sub: 'വാസ്തുവിദ്യ ദർശനം',
  ambiance_title: 'സ്ഥലവും വാസ്തുവിദ്യയും രൂപപ്പെടുത്തുക',
  ambiance_sub: 'ഏത് അന്തരീക്ഷമാണ് നിങ്ങളെ ആകർഷിക്കുന്നത്? ചുവടെ വോട്ട് ചെയ്യുക.',
  progress4: 'ഘട്ടം 4 of 5',
  progress4_sub: 'സഹ-നിർമ്മാണ സമൂഹം',
  pricing_title: 'ന്യായമായ വില & സ്വപ്ന വിഷ്ലിസ്റ്റ്',
  pricing_sub: 'കേരളത്തിൽ കഫേകളെക്കുറിച്ച് ഒരു കാര്യം ശരിയാക്കാൻ നിങ്ങൾക്ക് കഴിയുമായിരുന്നെങ്കിൽ അത് എന്തായിരിക്കും?',
  wall_title: 'CUPPILO-യുടെ സ്ഥാപക മതിൽ',
  wall_subtitle: 'പാലക്കാട്ടെ ആദ്യ കാപ്പി പയനീയർമാരെ ആദരിക്കുന്നു',
  wall_patrons: 'സ്ഥാപക പാട്രൺമാർ',
  wall_fund: 'സൂക്ഷ്മ റോസ്റ്ററി ഫണ്ട്',
  wall_kochi: 'പാലക്കാട്',
  wall_kozhikode: 'തൃശ്ശൂർ',
  wall_thrissur: 'കോഴിക്കോട്',
  wall_countdown: 'ദിവസങ്ങൾ ശേഷം',
  wall_inscription: 'ലേറ്ററൈറ്റ് ഇഷ്ടിക & ടീക് മരത്തിൽ എഴുതിയിരിക്കുന്നു',
  wall_search: 'പാട്രൺ പേര്, ബാഡ്ജ് #, അല്ലെങ്കിൽ ജില്ല തിരയുക...',
  wall_all: 'എല്ലാ പാട്രൺമാരും',
  wall_first: 'ഫസ്റ്റ്-ബ്രൂ പാസ്',
  wall_pioneer: 'സ്ഥാപക പയനിയർ',
  wall_community: 'കമ്മ്യൂണിറ്റി',
  wall_empty: 'ഇപ്പോൾ ഒരു പാട്രൺ രജിസ്റ്റർ ചെയ്തിട്ടില്ല',
  wall_empty_sub: 'ആദ്യത്തെ പാട്രൺ ആകൂ! മെനു ബാലറ്റിൽ വോട്ട് ചെയ്യുക.',
  wall_claim: 'നിങ്ങളുടെ ഇഷ്ടിക ക്ലെയിം ചെയ്യുക',
  wall_form_name: 'നിങ്ങളുടെ പൂർണ്ണ നാമം',
  wall_form_city: 'നഗരം / ജില്ല',
  wall_form_phone: 'മൊബൈൽ (പാസ് OTP യ്ക്ക്)',
  wall_form_quote: 'മതിലിനായുള്ള നിങ്ങളുടെ ഉദ്ധരണി (ഓപ്ഷണൽ)',
  wall_form_consent: 'DPDP Act 2023 പ്രകാരം എന്റെ തിരഞ്ഞെടുത്ത വിശദാംശങ്ങൾ പ്രദർശിപ്പിക്കാൻ ഞാൻ സമ്മതിക്കുന്നു.',
  wall_form_submit: 'പാസ് ജനറേറ്റ് ചെയ്യുക & ഇഷ്ടിക എഴുതുക',
  footer_tagline: '"പാലക്കാട്ടെ കലാത്മക റോസ്റ്റുകൾ, നിഴലിൽ വളർന്ന പശ്ചിമ ഘാട്ട് പൈതൃക കാപ്പി വിത്തുകൾ, ചൂടുള്ള വരാന്ത സംഭാഷണങ്ങൾ നമ്മുടെ നഗരങ്ങളിലേക്ക് മടക്കികൊണ്ടുവരുന്നു."'
};

function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('cuppilo_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-ml]').forEach(el => {
    if (lang === 'ml') {
      el.textContent = el.getAttribute('data-ml');
    } else if (el.hasAttribute('data-en')) {
      el.textContent = el.getAttribute('data-en');
    }
  });
}

function initLang() {
  const saved = localStorage.getItem('cuppilo_lang') || 'en';
  setLang(saved);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

// ── THEME TOGGLE ──
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cuppilo_theme', theme);
  document.querySelectorAll('.theme-toggle .material-symbols-outlined').forEach(icon => {
    icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  });
}

function initTheme() {
  const saved = localStorage.getItem('cuppilo_theme') || 'light';
  setTheme(saved);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
}

// ── NAVBAR ──
function renderNavbar(activePage) {
  return `
    <div class="container nav-inner">
      <a href="index.html" class="nav-brand">
        <img src="img/logo-en-light.png" alt="CUPPILO" class="nav-logo nav-logo-en-light">
        <img src="img/logo-en-dark.png" alt="CUPPILO" class="nav-logo nav-logo-en-dark">
        <img src="img/logo-ml-light.png" alt="കപ്പിലോ" class="nav-logo nav-logo-ml-light">
        <img src="img/logo-ml-dark.png" alt="കപ്പിലോ" class="nav-logo nav-logo-ml-dark">
      </a>
      <div class="nav-right">
        <div class="lang-toggle">
          <button class="lang-btn" data-lang="en">EN</button>
          <button class="lang-btn" data-lang="ml">ML</button>
        </div>
        <button class="theme-toggle" aria-label="Toggle theme">
          <span class="material-symbols-outlined" style="font-size:20px">dark_mode</span>
        </button>
        <div class="nav-links">
          <a href="index.html" class="nav-link ${activePage==='index'?'active':''}" data-en="Home" data-ml="ഹോം">Home</a>
          <a href="menu-ballot.html" class="nav-link ${activePage==='menu'?'active':''}" data-en="Menu" data-ml="മെനു">Menu</a>
          <a href="ambiance.html" class="nav-link ${activePage==='ambiance'?'active':''}" data-en="Vibe" data-ml="വൈബ്">Vibe</a>
          <a href="pricing.html" class="nav-link ${activePage==='pricing'?'active':''}" data-en="Pricing" data-ml="വില">Pricing</a>
          <a href="founding-wall.html" class="nav-link ${activePage==='wall'?'active':''}" data-en="Wall" data-ml="മതിൽ">Wall</a>
        </div>
      </div>
    </div>
  `;
}

// ── FOOTER ──
function renderFooter() {
  return `
    <div class="container">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;align-items:start">
        <div>
          <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem">
            <img src="img/logo-en-light.png" alt="CUPPILO" class="nav-logo" style="height:24px">
          </div>
          <p class="font-editorial" style="font-size:.875rem;color:var(--on-sv);max-width:280px" data-en="Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations back to Palakkad." data-ml="പാലക്കാട്ടേക്ക് കലാത്മക റോസ്റ്റുകൾ, നിഴലിൽ വളർന്ന പശ്ചിമ ഘാട്ട് പൈതൃക കാപ്പി വിത്തുകൾ, ചൂടുള്ള വരാന്ത സംഭാഷണങ്ങൾ മടക്കികൊണ്ടുവരുന്നു.">
            Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations back to Palakkad.
          </p>
        </div>
        <div>
          <h4 style="font-size:.875rem;font-weight:600;margin-bottom:.75rem" data-en="Co-Creation Chapters" data-ml="സഹ-നിർമ്മാണ അധ്യായങ്ങൾ">Co-Creation Chapters</h4>
          <nav style="display:flex;flex-direction:column;gap:.5rem">
            <a href="index.html" data-en="Veranda Orientation" data-ml="വരാന്ത ഓറിയന്റേഷൻ">Veranda Orientation</a>
            <a href="menu-ballot.html" data-en="Artisanal Menu Ballot" data-ml="കലാത്മക മെനു ബാലറ്റ്">Artisanal Menu Ballot</a>
            <a href="ambiance.html" data-en="Nadumuttam Architecture" data-ml="നടുമുറ്റം വാസ്തുവിദ്യ">Nadumuttam Architecture</a>
            <a href="pricing.html" data-en="Fair Cup Pricing" data-ml="ന്യായമായ വില">Fair Cup Pricing</a>
            <a href="founding-wall.html" data-en="Founding Patron Wall" data-ml="സ്ഥാപക പാട്രൺ മതിൽ">Founding Patron Wall</a>
          </nav>
        </div>
        <div>
          <h4 style="font-size:.875rem;font-weight:600;margin-bottom:.75rem" data-en="Legal & Trust" data-ml="നിയമവും വിശ്വാസവും">Legal & Trust</h4>
          <nav style="display:flex;flex-direction:column;gap:.5rem">
            <a href="#" data-en="Privacy Policy (DPDP 2023)" data-ml="സ്വകാര്യത നയം">Privacy Policy (DPDP 2023)</a>
            <a href="#" data-en="Terms of Co-Creation" data-ml="സഹ-നിർമ്മാണ നിബന്ധനകൾ">Terms of Co-Creation</a>
            <a href="#" data-en="Contact the Founders" data-ml="സ്ഥാപകരെ ബന്ധപ്പെടുക">Contact the Founders</a>
          </nav>
        </div>
      </div>
      <div style="border-top:1px solid var(--muted);margin-top:2rem;padding-top:1.5rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem">
        <span style="font-size:.75rem;color:var(--on-sv)">&copy; 2026 CUPPILO. All rights reserved. Co-designed with Palakkad.</span>
        <div style="display:flex;align-items:center;gap:.5rem;font-size:.75rem;color:var(--on-sv)">
          <span class="material-symbols-outlined" style="font-size:14px;color:var(--success)">eco</span>
          <span data-en="Single-estate Wayanad & Nelliyampathy Arabica sourcing" data-ml="വയനാട് & നെല്ലിയമ്പതി അറേബിക്ക സോർസിംഗ്">Single-estate Wayanad & Nelliyampathy Arabica sourcing</span>
        </div>
      </div>
    </div>
  `;
}

// ── TOAST ──
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px">${type === 'success' ? 'check_circle' : 'error'}</span> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ── INIT PAGE ──
function initPage(activePage) {
  const nav = document.getElementById('navbar');
  if (nav) nav.innerHTML = renderNavbar(activePage);
  const footer = document.getElementById('footer');
  if (footer) footer.innerHTML = renderFooter();
  initLang();
  initTheme();
  const lang = localStorage.getItem('cuppilo_lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    if (lang === 'ml' && el.hasAttribute('data-ml')) {
      el.textContent = el.getAttribute('data-ml');
    }
  });
}

// ── SAVE / LOAD BALLOT ──
function saveBallotLocal(data) {
  const existing = getBallotLocal();
  localStorage.setItem('cuppilo_ballot', JSON.stringify({ ...existing, ...data }));
}
function getBallotLocal() {
  const d = localStorage.getItem('cuppilo_ballot');
  return d ? JSON.parse(d) : {};
}
function clearBallotLocal() {
  localStorage.removeItem('cuppilo_ballot');
}

// ── SUPABASE HELPERS ──
const SUPABASE_URL = 'https://wnkejaidmbdcmbksefaf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indua2VqYWlkbWJkY21ia3NlZmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyOTAwNDYsImV4cCI6MjEwNDg2NjA0Nn0.9LYxHA7RYeLcYaXUq5AEYSflCfIqGHD5uY6LdvE5raY';

async function sbInsert(table, data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (e) { console.error('Supabase insert error:', e); return null; }
}

async function sbSelect(table, columns = '*') {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${columns}`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return await res.json();
  } catch (e) { console.error('Supabase select error:', e); return []; }
}

async function sbUpdate(table, data, column, value) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${column}=eq.${value}`, {
      method: 'PATCH',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (e) { console.error('Supabase update error:', e); return null; }
}

async function getClientIP() {
  try { const r = await fetch('https://api.ipify.org?format=json'); const d = await r.json(); return d.ip; }
  catch { return 'unknown'; }
}

async function hashIP(ip) {
  const data = new TextEncoder().encode(ip);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateRefCode() {
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let r = 'CP';
  for (let i = 0; i < 4; i++) r += c[Math.floor(Math.random() * c.length)];
  return r;
}

function generateVoucherCode() {
  return 'CUPPILO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Submit ballot to Supabase
async function submitBallot(ballotData) {
  const ip = await getClientIP();
  const ipHash = await hashIP(ip);
  const refCode = generateRefCode();
  const ballot = {
    ip_hash: ipHash,
    ref_code: refCode,
    referred_by: ballotData.referredBy || null,
    menu_votes: ballotData.menuVotes || [],
    vibe_vote: ballotData.vibeVote || '',
    price_coffee: ballotData.priceCoffee || 60,
    price_chaya: ballotData.priceChaya || 20,
    wishlist_text: ballotData.wishlist || '',
    suggested_items: ballotData.suggestedItems || []
  };
  const result = await sbInsert('ballots', ballot);
  return { ...result, refCode };
}

// Register participant
async function registerParticipant(ballotId, participantData) {
  const participant = {
    id: ballotId,
    phone_number: participantData.phone || null,
    display_name: participantData.name || null,
    dpdp_consent: participantData.consent || false,
    consent_ts: participantData.consent ? new Date().toISOString() : null,
    voucher_code: generateVoucherCode(),
    tier: participantData.tier || 'free',
    payment_id: null
  };
  return await sbInsert('participants', participant);
}

// Fetch live counts
async function fetchBallotCount() {
  const data = await sbSelect('ballots', 'id=count');
  return Array.isArray(data) ? data.length : 0;
}

async function fetchPatronCount() {
  const data = await sbSelect('participants', 'id=count');
  return Array.isArray(data) ? data.length : 0;
}

console.log('CUPPILO shared.js loaded');

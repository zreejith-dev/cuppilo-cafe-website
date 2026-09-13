// CUPPILO Shared — Language, Theme, Navbar, Footer

// ── LANGUAGE TOGGLE ──
const ML_TEXT = {
  nav_home: 'ഹോം',
  nav_menu: 'മെനു',
  nav_vibe: 'വൈബ്',
  nav_pricing: 'വില',
  nav_wall: 'മതിൽ',
  hero_badge: '1,480+ കോ-ക്രിയേറ്റർമാർ കൂടി',
  hero_tag: 'കപ്പിലോ?',
  hero_tagline: 'കപ്പിലോ? കപ്പിലല്ലേ?',
  hero_title: 'ഞങ്ങൾ തുറക്കുന്നതിന് മുമ്പ്: നിങ്ങളുടെ സ്വപ്ന കഫേ നിർമ്മിക്കാൻ ഞങ്ങളെ സഹായിക്കൂ',
  hero_sub: 'ബോർഡ്‌റൂം ഊഹാപോഹങ്ങൾ ഉപേക്ഷിക്കുന്നു. കേരളത്തിൽ യഥാർത്ഥത്തിൽ എന്താണ് വേണ്ടതെന്ന് ഞങ്ങളെ അറിയിക്കൂ.',
  cta: 'സഹ-നിർമ്മാണം ആരംഭിക്കുക',
  cta_time: '2 മിനിറ്റ് മതി',
  free_badge: '100% സൗജന്യം • വോട്ട് ചെയ്യാൻ ലോഗിൻ ആവശ്യമില്ല',
  pillar1_title: 'മെനു ക്രമീകരിക്കുക',
  pillar1_desc: '12 ഇനങ്ങൾ ബാലറ്റിൽ',
  pillar2_title: 'വൈബ് തിരഞ്ഞെടുക്കുക',
  pillar2_desc: '4 എസ്തറ്റിക് റൂട്ടുകൾ',
  pillar3_title: 'വില & പാസ്',
  pillar3_desc: '10% ലോഞ്ച് വൗച്ചർ',
  menu_progress: 'ഘട്ടം 1 of 4',
  menu_subtitle: 'ഓപ്പണിംഗ് മെനു ക്രമീകരണം',
  menu_title: 'ഓപ്പണിംഗ് മെനു ക്രമീകരിക്കുക',
  menu_desc: 'ലോഞ്ച് ദിവസം നിങ്ങൾക്ക് വേണ്ടിയുള്ള 5 ഇനങ്ങൾ ഹൃദയം ❤️ ടാപ്പ് ചെയ്യുക.',
  filter_all: 'എല്ലാ ഇനങ്ങളും',
  filter_coffee: 'കാപ്പി',
  filter_tea: 'ചായ',
  filter_cold: 'കോൾഡ്',
  filter_food: 'ഭക്ഷണം',
  filter_bakery: 'ബേക്കറി',
  vote_count: 'വോട്ട് ഉപയോഗിച്ചു',
  vote_pick: '5 ഇനം വരെ തിരഞ്ഞെടുക്കുക',
  next_vibe: 'അടുത്തത്: വൈബ് തിരഞ്ഞെടുക്കുക',
  barometer: 'ഈ ആഴ്ച 1,420 ബാലറ്റുകൾ സമർപ്പിച്ചു',
  barometer_sub: '80%+ സമ്മതം നേടുന്ന ഇനങ്ങൾ CUPPILO-യുടെ ദിവസം 1 അടുക്കളയിൽ ലോക്ക് ചെയ്യുന്നു',
  tallying: 'ലൈവ് കണക്കാക്കുന്നു',
  suggest_title: 'ഒരു മെനു ഇനം നിർദ്ദേശിക്കുക',
  suggest_desc: 'CUPPILO എന്താണ് വിളമ്പേണ്ടത്? നിങ്ങളുടെ ആശയം സമർപ്പിക്കുക.',
  suggest_name: 'ഇനത്തിന്റെ പേര്',
  suggest_desc_label: 'ചെറിയ വിവരണം',
  suggest_cat: 'വിഭാഗം',
  suggest_submit: 'സമർപ്പിക്കുക',
  price_fair: 'നിങ്ങളുടെ ന്യായമായ വില',
  ambiance_title: 'സ്ഥലവും വാസ്തുവിദ്യയും രൂപപ്പെടുത്തുക',
  ambiance_progress: 'ഘട്ടം 2 of 4',
  ambiance_sub: 'വാസ്തുവിദ്യ ദർശനം',
  pricing_title: 'ന്യായമായ വില & സ്വപ്ന വിഷ്ലിസ്റ്റ്',
  pricing_progress: 'ഘട്ടം 4 of 5',
  wall_title: 'CUPPILO-യുടെ സ്ഥാപക മതിൽ',
  wall_subtitle: 'കേരളത്തിന്റെ കാപ്പി പയനീയർമാരെ ആദരിക്കുന്നു',
  footer_tagline: '"കലാത്മക റോസ്റ്റുകൾ, നിഴലിൽ വളർന്ന പശ്ചിമ ഘാട്ട് പൈതൃക കാപ്പി വിത്തുകൾ, ചൂടുള്ള വരാന്ത സംഭാഷണങ്ങൾ നമ്മുടെ നഗരങ്ങളിലേക്ക് മടക്കികൊണ്ടുവരുന്നു."'
};

function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('cuppilo_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  // Update text content for elements with data-ml attribute
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
  const icon = document.querySelector('.theme-toggle .material-symbols-outlined');
  if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
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
    <div class="container" style="display:flex;align-items:center;justify-content:space-between;height:56px">
      <a href="index.html" style="display:flex;align-items:center;gap:.5rem;text-decoration:none">
        <img src="img/logo-en-light.png" alt="CUPPILO" class="nav-logo nav-logo-en-light">
        <img src="img/logo-en-dark.png" alt="CUPPILO" class="nav-logo nav-logo-en-dark">
        <img src="img/logo-ml-light.png" alt="കപ്പിലോ" class="nav-logo nav-logo-ml-light">
        <img src="img/logo-ml-dark.png" alt="കപ്പിലോ" class="nav-logo nav-logo-ml-dark">
      </a>
      <div style="display:flex;align-items:center;gap:.5rem">
        <div class="lang-toggle">
          <button class="lang-btn" data-lang="en">EN</button>
          <button class="lang-btn" data-lang="ml">ML</button>
        </div>
        <button class="theme-toggle">
          <span class="material-symbols-outlined" style="font-size:20px">dark_mode</span>
        </button>
        <div style="display:flex;align-items:center;gap:.25rem;margin-left:.25rem">
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
          <p class="font-editorial" style="font-size:.875rem;color:var(--on-sv);max-width:280px" data-en="Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations back to our towns." data-ml="കലാത്മക റോസ്റ്റുകൾ, നിഴലിൽ വളർന്ന പശ്ചിമ ഘാട്ട് പൈതൃക കാപ്പി വിത്തുകൾ, ചൂടുള്ള വരാന്ത സംഭാഷണങ്ങൾ നമ്മുടെ നഗരങ്ങളിലേക്ക് മടക്കികൊണ്ടുവരുന്നു.">
            Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations back to our towns.
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
        <span style="font-size:.75rem;color:var(--on-sv)">&copy; 2026 CUPPILO. All rights reserved.</span>
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
  // Apply saved language to nav links
  document.querySelectorAll('[data-en]').forEach(el => {
    const lang = localStorage.getItem('cuppilo_lang') || 'en';
    if (lang === 'ml' && el.hasAttribute('data-ml')) {
      el.textContent = el.getAttribute('data-ml');
    }
  });
}

// ── SAVE BALLOT ──
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

console.log('CUPPILO shared.js loaded');

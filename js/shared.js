// CUPPILO Shared — Splash, Name Card, Language, Theme, Navbar, Footer

// ── SPLASH SCREEN ──
function initSplash() {
  const splash = document.getElementById('splash-screen');
  const nameOverlay = document.getElementById('name-card-overlay');
  const seen = localStorage.getItem('cuppilo_splash_seen');

  if (seen) {
    // Already seen — remove splash and name overlay from DOM immediately
    if (splash) splash.remove();
    if (nameOverlay) nameOverlay.remove();
    return;
  }

  if (!splash) return;
  // First visit — show splash, then remove
  setTimeout(() => {
    splash.classList.add('hidden');
    localStorage.setItem('cuppilo_splash_seen', '1');
    setTimeout(() => {
      splash.remove();
      initNameCard();
    }, 600);
  }, 2200);
}

// ── NAME ENTRY CARD ──
function initNameCard() {
  const saved = localStorage.getItem('cuppilo_profile');
  const overlay = document.getElementById('name-card-overlay');
  if (saved) {
    // Profile exists — remove overlay from DOM
    if (overlay) overlay.remove();
    updateNavbarProfile(JSON.parse(saved));
    return;
  }
  if (!overlay) return;
  overlay.classList.add('active');
}

async function submitName() {
  const input = document.getElementById('name-card-input');
  const name = input ? input.value.trim() : '';
  if (!name || name.length < 2) {
    showToast('Please enter your name', 'error');
    return;
  }
  // Rate limit check
  const ip = await getClientIP();
  const ipHash = await hashIP(ip);
  const today = new Date().toISOString().split('T')[0];
  try {
    const existing = await sbSelect('rate_limits', '*');
    const todayLimits = Array.isArray(existing) ? existing.filter(r =>
      r.ip_hash === ipHash && r.action_type === 'name_entry' && r.window_start && r.window_start.startsWith(today)
    ) : [];
    if (todayLimits.length >= 3) {
      showToast('Rate limit reached. Try again tomorrow.', 'error');
      return;
    }
  } catch(e) { console.log('Rate limit check skipped', e); }

  const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2,6);
  const profile = { display_name: name, session_id: sessionId };

  try {
    const result = await sbInsert('user_profiles', { display_name: name, session_id: sessionId });
    if (result && result.length > 0) profile.id = result[0].id;
    await sbInsert('rate_limits', { ip_hash: ipHash, action_type: 'name_entry', count: 1, window_start: new Date().toISOString() });
  } catch(e) { console.log('Profile save skipped', e); }

  localStorage.setItem('cuppilo_profile', JSON.stringify(profile));
  const overlay = document.getElementById('name-card-overlay');
  if (overlay) overlay.classList.remove('active');
  updateNavbarProfile(profile);
  showToast('Welcome, ' + name + '!', 'success');
}

function updateNavbarProfile(profile) {
  const el = document.getElementById('nav-profile');
  if (!el || !profile) return;
  const initials = (profile.display_name || '?').split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase();
  el.innerHTML = '<span class="avatar">' + initials + '</span><span>' + profile.display_name + '</span>';
  el.style.display = 'flex';
}

function getProfile() {
  const d = localStorage.getItem('cuppilo_profile');
  return d ? JSON.parse(d) : null;
}

// ── LANGUAGE TOGGLE ──
function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('cuppilo_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-en]').forEach(el => {
    if (lang === 'ml' && el.hasAttribute('data-ml')) {
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
  document.querySelectorAll('.theme-toggle .material-symbols-outlined').forEach(i => {
    i.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  });
}

function initTheme() {
  const saved = localStorage.getItem('cuppilo_theme') || 'light';
  setTheme(saved);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  });
}

// ── MOBILE MENU ──
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) nav.classList.remove('open');
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
      <div class="nav-right-group" style="display:flex;align-items:center;gap:.5rem">
        <button class="mobile-menu-btn" aria-label="Menu">
          <span class="material-symbols-outlined" style="font-size:20px">menu</span>
        </button>
        <div class="lang-toggle">
          <button class="lang-btn" data-lang="en">EN</button>
          <button class="lang-btn" data-lang="ml">ML</button>
        </div>
        <button class="theme-toggle">
          <span class="material-symbols-outlined" style="font-size:20px">dark_mode</span>
        </button>
        <div id="nav-profile" class="nav-profile" style="display:none"></div>
        <div class="nav-desktop-links" style="display:flex;align-items:center;gap:.25rem;margin-left:.25rem">
          <a href="index.html" class="nav-link ${activePage==='index'?'active':''}" data-en="Home" data-ml="ഹോം">Home</a>
          <a href="menu-ballot.html" class="nav-link ${activePage==='menu'?'active':''}" data-en="Menu" data-ml="മെനു">Menu</a>
          <a href="ambiance.html" class="nav-link ${activePage==='ambiance'?'active':''}" data-en="Vibe" data-ml="വൈബ്">Vibe</a>
          <a href="pricing.html" class="nav-link ${activePage==='pricing'?'active':''}" data-en="Pricing" data-ml="വില">Pricing</a>
          <a href="founding-wall.html" class="nav-link ${activePage==='wall'?'active':''}" data-en="Wall" data-ml="മതിൽ">Wall</a>
          <a href="community-results.html" class="nav-link ${activePage==='results'?'active':''}" data-en="Results" data-ml="ഫലങ്ങൾ">Results</a>
        </div>
      </div>
    </div>
    <div class="mobile-nav">
      <a href="index.html" class="${activePage==='index'?'active':''}" data-en="Home" data-ml="ഹോം">Home</a>
      <a href="menu-ballot.html" class="${activePage==='menu'?'active':''}" data-en="Menu" data-ml="മെനു">Menu</a>
      <a href="ambiance.html" class="${activePage==='ambiance'?'active':''}" data-en="Vibe" data-ml="വൈബ്">Vibe</a>
      <a href="pricing.html" class="${activePage==='pricing'?'active':''}" data-en="Pricing" data-ml="വില">Pricing</a>
      <a href="founding-wall.html" class="${activePage==='wall'?'active':''}" data-en="Wall" data-ml="മതിൽ">Wall</a>
      <a href="community-results.html" class="${activePage==='results'?'active':''}" data-en="Results" data-ml="ഫലങ്ങൾ">Results</a>
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
          <p class="font-editorial" style="font-size:.875rem;color:var(--on-sv);max-width:280px" data-en="Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations to Palakkad." data-ml="പാലക്കാട്ടിലേക്ക് കലാത്മക റോസ്റ്റുകൾ, നിഴലിൽ വളർന്ന പശ്ചിമ ഘാട്ട് പൈതൃക കാപ്പി വിത്തുകൾ, ചൂടുള്ള വരാന്ത സംഭാഷണങ്ങൾ കൊണ്ടുവരുന്നു.">
            Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations to Palakkad.
          </p>
        </div>
        <div>
          <h4 style="font-size:.875rem;font-weight:600;margin-bottom:.75rem" data-en="Co-Creation" data-ml="സഹ-നിർമ്മാണം">Co-Creation</h4>
          <nav style="display:flex;flex-direction:column;gap:.5rem">
            <a href="index.html" data-en="Home" data-ml="ഹോം">Home</a>
            <a href="menu-ballot.html" data-en="Menu Ballot" data-ml="മെനു ബാലറ്റ്">Menu Ballot</a>
            <a href="ambiance.html" data-en="Ambiance" data-ml="അന്തരീക്ഷം">Ambiance</a>
            <a href="pricing.html" data-en="Pricing" data-ml="വില">Pricing</a>
            <a href="founding-wall.html" data-en="Founding Wall" data-ml="സ്ഥാപക മതിൽ">Founding Wall</a>
            <a href="community-results.html" data-en="Community Results" data-ml="കമ്മ്യൂണിറ്റി ഫലങ്ങൾ">Community Results</a>
          </nav>
        </div>
        <div>
          <h4 style="font-size:.875rem;font-weight:600;margin-bottom:.75rem" data-en="Legal" data-ml="നിയമം">Legal</h4>
          <nav style="display:flex;flex-direction:column;gap:.5rem">
            <a href="#" data-en="Privacy Policy" data-ml="സ്വകാര്യത നയം">Privacy Policy</a>
            <a href="#" data-en="Terms" data-ml="നിബന്ധനകൾ">Terms</a>
            <a href="admin.html" data-en="Admin" data-ml="അഡ്മിൻ">Admin</a>
          </nav>
        </div>
      </div>
      <div style="border-top:1px solid var(--muted);margin-top:2rem;padding-top:1.5rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem">
        <span style="font-size:.75rem;color:var(--on-sv)">&copy; 2026 CUPPILO. All rights reserved.</span>
        <div style="display:flex;align-items:center;gap:.5rem;font-size:.75rem;color:var(--on-sv)">
          <span class="material-symbols-outlined" style="font-size:14px;color:var(--success)">eco</span>
          <span data-en="Wayanad & Nelliyampathy Arabica sourcing" data-ml="വയനാട് & നെല്ലിയമ്പതി അറേബിക്ക സോർസിംഗ്">Wayanad & Nelliyampathy Arabica sourcing</span>
        </div>
      </div>
    </div>
  `;
}

// ── TOAST ──
function showToast(message, type) {
  type = type || 'success';
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px">' + (type === 'success' ? 'check_circle' : 'error') + '</span> ' + message;
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
  initMobileMenu();
  initSplash();
  // Restore profile
  const profile = getProfile();
  if (profile) updateNavbarProfile(profile);
}

// ── HELPERS ──
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

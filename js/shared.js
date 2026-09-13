// CUPPILO Shared — Splash, Profile, Language, Theme, Navbar, Footer, Helpers

function debounce(func, wait) {
  var timeout;
  return function () {
    var ctx = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () { func.apply(ctx, args); }, wait);
  };
}

function handleError(error, context) {
  console.error('[CUPPILO] ' + context + ':', error);
  showToast(context + ': ' + ((error && error.message) || 'Something went wrong'), 'error');
}

function showToast(message, type) {
  type = type || 'success';
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  var icon = type === 'success' ? 'check_circle' : 'error';
  toast.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px">' + icon + '</span> ' + message;
  document.body.appendChild(toast);
  setTimeout(function () { toast.style.opacity = '0'; toast.style.transition = 'opacity .3s'; setTimeout(function () { toast.remove(); }, 300); }, 3000);
}

function showSkeleton(containerId, count) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';
  for (var i = 0; i < count; i++) {
    var card = document.createElement('div');
    card.className = 'skeleton-card';
    card.style.cssText = 'background:var(--card-bg,#eee);border-radius:12px;padding:1rem;min-height:180px;';
    card.innerHTML =
      '<div class="skeleton-line" style="width:60%;height:14px;background:var(--muted,#ccc);border-radius:6px;margin-bottom:.75rem"></div>' +
      '<div class="skeleton-line" style="width:80%;height:10px;background:var(--muted,#ccc);border-radius:6px;margin-bottom:.5rem"></div>' +
      '<div class="skeleton-line" style="width:45%;height:10px;background:var(--muted,#ccc);border-radius:6px"></div>';
    el.appendChild(card);
  }
}

function hideSkeleton(containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.querySelectorAll('.skeleton-card').forEach(function (c) { c.remove(); });
}

// ── SPLASH (sessionStorage — once per session) ──
function initSplash() {
  var splash = document.getElementById('splash-screen');
  var nameOverlay = document.getElementById('name-card-overlay');
  if (sessionStorage.getItem('cuppilo_splash_seen')) {
    if (splash) splash.remove();
    if (nameOverlay) nameOverlay.remove();
    return;
  }
  if (!splash) return;
  setTimeout(function () {
    splash.classList.add('hidden');
    sessionStorage.setItem('cuppilo_splash_seen', '1');
    setTimeout(function () { splash.remove(); initNameCard(); }, 600);
  }, 2200);
}

// ── NAME ENTRY CARD ──
function initNameCard() {
  var saved = localStorage.getItem('cuppilo_profile');
  var overlay = document.getElementById('name-card-overlay');
  if (saved) { if (overlay) overlay.remove(); updateNavbarProfile(JSON.parse(saved)); return; }
  if (!overlay) return;
  overlay.classList.add('active');
}

function getProfile() {
  var d = localStorage.getItem('cuppilo_profile');
  return d ? JSON.parse(d) : null;
}

function updateNavbarProfile(profile) {
  var el = document.getElementById('nav-profile');
  if (!el || !profile) return;
  var name = profile.display_name || '?';
  var initials = name.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
  el.innerHTML = '<span class="avatar">' + initials + '</span><span>' + name + '</span>';
  el.style.display = 'flex';
}

var _debouncedProfileSave = debounce(function (profile) {
  if (typeof window.sbInsert !== 'function') return;
  sbInsert('user_profiles', { display_name: profile.display_name, session_id: profile.session_id })
    .catch(function (e) { handleError(e, 'Profile save'); });
}, 500);

async function submitName() {
  var input = document.getElementById('name-card-input');
  var name = input ? input.value.trim() : '';
  if (!name || name.length < 2) { showToast('Please enter your name', 'error'); return; }

  var ipHash = null;
  try {
    if (typeof getClientIP === 'function' && typeof hashIP === 'function' && typeof sbSelect === 'function') {
      var ip = await getClientIP();
      ipHash = await hashIP(ip);
      var today = new Date().toISOString().split('T')[0];
      var existing = await sbSelect('rate_limits', '*');
      var todayLimits = Array.isArray(existing) ? existing.filter(function (r) {
        return r.ip_hash === ipHash && r.action_type === 'name_entry' && r.window_start && r.window_start.startsWith(today);
      }) : [];
      if (todayLimits.length >= 3) { showToast('Rate limit reached. Try again tomorrow.', 'error'); return; }
    }
  } catch (e) { console.log('Rate limit check skipped', e); }

  var sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  var profile = { display_name: name, session_id: sessionId };

  try {
    if (typeof sbInsert === 'function') {
      var result = await sbInsert('user_profiles', { display_name: name, session_id: sessionId });
      if (result && result.length > 0) profile.id = result[0].id;
      if (ipHash) await sbInsert('rate_limits', { ip_hash: ipHash, action_type: 'name_entry', count: 1, window_start: new Date().toISOString() });
    }
  } catch (e) { handleError(e, 'Profile save'); }

  localStorage.setItem('cuppilo_profile', JSON.stringify(profile));
  var overlay = document.getElementById('name-card-overlay');
  if (overlay) overlay.classList.remove('active');
  updateNavbarProfile(profile);
  showToast('Welcome, ' + name + '!', 'success');
}

// ── LANGUAGE TOGGLE ──
function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('cuppilo_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });
  document.querySelectorAll('[data-en]').forEach(function (el) {
    if (lang === 'ml' && el.hasAttribute('data-ml')) el.textContent = el.getAttribute('data-ml');
    else if (el.hasAttribute('data-en')) el.textContent = el.getAttribute('data-en');
  });
}

function initLang() {
  var saved = localStorage.getItem('cuppilo_lang') || 'en';
  setLang(saved);
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
  });
}

// ── THEME TOGGLE ──
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cuppilo_theme', theme);
  document.querySelectorAll('.theme-toggle .material-symbols-outlined').forEach(function (i) {
    i.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  });
}

function initTheme() {
  var saved = localStorage.getItem('cuppilo_theme') || 'light';
  setTheme(saved);
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  });
}

// ── MOBILE MENU ──
function initMobileMenu() {
  var btn = document.querySelector('.mobile-menu-btn');
  var nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () { nav.classList.toggle('open'); });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !btn.contains(e.target)) nav.classList.remove('open');
  });
}

// ── NAVBAR ──
function renderNavbar(activePage) {
  var links = [
    { id: 'index', href: 'index.html', en: 'Home', ml: '\u0d39\u0d4b\u0d2e\u0d4d' },
    { id: 'fullmenu', href: 'menu.html', en: 'Menu', ml: '\u0d2e\u0d46\u0d28\u0d41' },
    { id: 'menu', href: 'menu-ballot.html', en: 'Vote', ml: '\u0d35\u0d4b\u0d1f\u0d4d' },
    { id: 'ambiance', href: 'ambiance.html', en: 'Vibe', ml: '\u0d35\u0d48\u0d2c\u0d4d' },
    { id: 'pricing', href: 'pricing.html', en: 'Pricing', ml: '\u0d35\u0d3f\u0d32' },
    { id: 'wall', href: 'founding-wall.html', en: 'Wall', ml: '\u0d2e\u0d24\u0d3f\u0d32\u0d4d' },
  ];
  var dLinks = links.map(function (l) {
    return '<a href="' + l.href + '" class="nav-link ' + (activePage === l.id ? 'active' : '') + '" data-en="' + l.en + '" data-ml="' + l.ml + '">' + l.en + '</a>';
  }).join('');
  var mLinks = links.map(function (l) {
    return '<a href="' + l.href + '" class="' + (activePage === l.id ? 'active' : '') + '" data-en="' + l.en + '" data-ml="' + l.ml + '">' + l.en + '</a>';
  }).join('');

  return '<div class="container" style="display:flex;align-items:center;justify-content:space-between;height:56px">' +
    '<a href="index.html" style="display:flex;align-items:center;gap:.5rem;text-decoration:none">' +
      '<img src="img/logo-en-light.png" alt="CUPPILO" class="nav-logo nav-logo-en-light">' +
      '<img src="img/logo-en-dark.png" alt="CUPPILO" class="nav-logo nav-logo-en-dark">' +
      '<img src="img/logo-ml-light.png" alt="കപ്പിലോ" class="nav-logo nav-logo-ml-light">' +
      '<img src="img/logo-ml-dark.png" alt="കപ്പിലോ" class="nav-logo nav-logo-ml-dark">' +
    '</a>' +
    '<div class="nav-right-group" style="display:flex;align-items:center;gap:.5rem">' +
      '<button class="mobile-menu-btn" aria-label="Menu"><span class="material-symbols-outlined" style="font-size:20px">menu</span></button>' +
      '<div class="lang-toggle"><button class="lang-btn" data-lang="en">EN</button><button class="lang-btn" data-lang="ml">ML</button></div>' +
      '<button class="theme-toggle"><span class="material-symbols-outlined" style="font-size:20px">dark_mode</span></button>' +
      '<div id="nav-profile" class="nav-profile" style="display:none"></div>' +
    '</div>' +
  '</div>' +
  '<div class="nav-desktop-links" style="display:flex;align-items:center;gap:.25rem;margin-left:.25rem">' + dLinks + '</div>' +
  '<div class="mobile-nav">' + mLinks + '</div>';
}

// ── FOOTER ──
function renderFooter() {
  return '<div class="container">' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;align-items:start">' +
      '<div>' +
        '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem"><img src="img/logo-en-light.png" alt="CUPPILO" class="nav-logo" style="height:24px"></div>' +
        '<p class="font-editorial" style="font-size:.875rem;color:var(--on-sv);max-width:280px" ' +
          'data-en="Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations to Kerala." ' +
          'data-ml="\u0d15\u0d47\u0db1\u0d35\u0d2f\u0d3e\u0d2f\u0d46 \u0d15\u0db5\u0d3f\u0d2f\u0d4d \u0d30\u0d4b\u0d38\u0d4d\u0d1f\u0d41\u0d15\u0d3e\u0d33\u0d4d, \u0d28\u0d3f\u0d34\u0d32\u0d3f\u0d32\u0d4d \u0d35\u0d33\u0d30\u0d4d\u0d28\u0d4d \u0d2a\u0d36\u0d4d\u0d1a\u0d3f\u0d2e\u0d02 \u0d18\u0d3e\u0d1f\u0d4d\u0d1f\u0d4d \u0d2a\u0d48\u0d24\u0d43\u0d15 \u0d15\u0d3e\u0d2a\u0d4d\u0d2a\u0d3f \u0d35\u0d3f\u0d24\u0d4d\u0d24\u0d41\u0d15\u0d3e\u0d33\u0d4d, \u0d1a\u0d42\u0d1f\u0d41\u0d33\u0d4d\u0d33 \u0d35\u0d30\u0d3e\u0d28\u0d4d\u0d24 \u0d38\u0d02\u0d2d\u0d3e\u0d37\u0d23\u0d19\u0d4d\u0d33 \u0d15\u0d4b\u0d23\u0d4d\u0d1f\u0d41 \u0d35\u0d30\u0d41\u0d28\u0d4d\u0d28\u0d41 \u0d28\u0d3f\u0d37\u0d2f\u0d2e\u0d3e\u0d23\u0d3f.">' +
          'Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations to Kerala.</p>' +
      '</div>' +
      '<div>' +
        '<h4 style="font-size:.875rem;font-weight:600;margin-bottom:.75rem" data-en="Co-Creation" data-ml="\u0d38\u0d39-\u0d28\u0d3f\u0d30\u0d4d\u0d2e\u0d3e\u0d23\u0d02">Co-Creation</h4>' +
        '<nav style="display:flex;flex-direction:column;gap:.5rem">' +
          '<a href="index.html" data-en="Home" data-ml="\u0d39\u0d4b\u0d2e\u0d4d">Home</a>' +
          '<a href="menu-ballot.html" data-en="Menu Ballot" data-ml="\u0d2e\u0d46\u0d28\u0d41 \u0d2c\u0d3e\u0da9\u0d32\u0d32\u0d4d">Menu Ballot</a>' +
          '<a href="ambiance.html" data-en="Ambiance" data-ml="\u0d05\u0d28\u0d4d\u0d24\u0d30\u0d40\u0d15\u0d4d\u0d37\u0d02">Ambiance</a>' +
          '<a href="pricing.html" data-en="Pricing" data-ml="\u0d35\u0d3f\u0d32">Pricing</a>' +
          '<a href="founding-wall.html" data-en="Founding Wall" data-ml="\u0d38\u0d4d\u0d25\u0d3e\u0d2a\u0d15 \u0d2e\u0d24\u0d3f\u0d32\u0d4d">Founding Wall</a>' +
          '<a href="community-results.html" data-en="Community Results" data-ml="\u0d15\u0d2e\u0d4d\u0d2e\u0d4d\u0d2f\u0d42\u0d23\u0d3f\u0d1f\u0d3f \u0d2b\u0da4\u0d02">Community Results</a>' +
        '</nav>' +
      '</div>' +
      '<div>' +
        '<h4 style="font-size:.875rem;font-weight:600;margin-bottom:.75rem" data-en="Legal" data-ml="\u0d28\u0d3f\u0d2f\u0d2e\u0d02">Legal</h4>' +
        '<nav style="display:flex;flex-direction:column;gap:.5rem">' +
          '<a href="#" data-en="Privacy Policy" data-ml="\u0d38\u0d4d\u0d35\u0d15\u0d3e\u0d30\u0d4d\u0d2f \u0d28\u0d2f\u0d02">Privacy Policy</a>' +
          '<a href="#" data-en="Terms" data-ml="\u0d28\u0d3f\u0d2c\u0d28\u0d4d\u0d27\u0d28\u0d15\u0d3e\u0d33\u0d4d">Terms</a>' +
        '</nav>' +
      '</div>' +
    '</div>' +
    '<div style="border-top:1px solid var(--muted);margin-top:2rem;padding-top:1.5rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem">' +
      '<span style="font-size:.75rem;color:var(--on-sv)">&copy; 2026 CUPPILO. All rights reserved.</span>' +
      '<div style="display:flex;align-items:center;gap:.5rem;font-size:.75rem;color:var(--on-sv)">' +
        '<span class="material-symbols-outlined" style="font-size:14px;color:var(--success)">eco</span>' +
        '<span data-en="Wayanad & Nelliyampathy Arabica sourcing" data-ml="\u0d35\u0d2f\u0d28\u0d3e\u0d1f\u0d4d & \u0d28\u0d46\u0d32\u0d4d\u0d32\u0d3f\u0d2f\u0d2e\u0d4d\u0d2a\u0d24\u0d3f \u0d05\u0d31\u0d47\u0d2c\u0d3f\u0d15\u0d4d\u0d15 \u0d38\u0d4b\u0d30\u0d4d\u0d38\u0d3f\u0d02\u0d17\u0d4d">Wayanad & Nelliyampathy Arabica sourcing</span>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// ── HELPERS ──
function saveBallotLocal(data) {
  var existing = getBallotLocal();
  localStorage.setItem('cuppilo_ballot', JSON.stringify(Object.assign({}, existing, data)));
}
function getBallotLocal() {
  var d = localStorage.getItem('cuppilo_ballot');
  return d ? JSON.parse(d) : {};
}
function clearBallotLocal() {
  localStorage.removeItem('cuppilo_ballot');
}

// ── INIT PAGE ──
function initPage(activePage) {
  var nav = document.getElementById('navbar');
  if (nav) nav.innerHTML = renderNavbar(activePage);
  var footer = document.getElementById('footer');
  if (footer) footer.innerHTML = renderFooter();
  initLang();
  initTheme();
  initMobileMenu();
  initSplash();
  var profile = getProfile();
  if (profile) updateNavbarProfile(profile);
}

console.log('CUPPILO shared.js loaded');

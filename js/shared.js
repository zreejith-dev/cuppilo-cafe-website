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
    setTimeout(function () { splash.remove(); initNameCard(); }, 500);
  }, 2400);
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

  var sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  var profile = { display_name: name, session_id: sessionId };

  try {
    if (typeof sbInsert === 'function') {
      var result = await sbInsert('user_profiles', { display_name: name, session_id: sessionId });
      if (result && result.length > 0) profile.id = result[0].id;
    }
  } catch (e) { handleError(e, 'Profile save'); }

  localStorage.setItem('cuppilo_profile', JSON.stringify(profile));
  updateNavbarProfile(profile);

  var overlay = document.getElementById('name-card-overlay');
  if (overlay) overlay.classList.remove('active');
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

// ── NAVBAR (Support hidden — only accessible via footer BMC button) ──
function renderNavbar(activePage) {
  var links = [
    { id: 'index', href: 'index.html', en: 'Home', ml: '\u0D39\u0D4B\u0D2E\u0D4D' },
    { id: 'about', href: 'about.html', en: 'About', ml: '\u0D15\u0D41\u0D31\u0D3F\u0D1A\u0D4D' },
    { id: 'wall', href: 'founding-wall.html', en: 'Wall', ml: '\u0D2E\u0D24\u0D3F\u0D32\u0D4D' },
  ];
  var dLinks = links.map(function (l) {
    return '<a href="' + l.href + '" class="nav-link ' + (activePage === l.id ? 'active' : '') + '" data-en="' + l.en + '" data-ml="' + l.ml + '">' + l.en + '</a>';
  }).join('');
  var mLinks = links.map(function (l) {
    return '<a href="' + l.href + '" class="' + (activePage === l.id ? 'active' : '') + '" data-en="' + l.en + '" data-ml="' + l.ml + '">' + l.en + '</a>';
  }).join('');

  return '<div class="container" style="display:flex;align-items:center;justify-content:space-between;height:56px">' +
    '<a href="index.html" class="nav-logo-text">CUPPILO</a>' +
    '<div class="nav-right-group">' +
      '<button class="mobile-menu-btn" aria-label="Menu"><span class="material-symbols-outlined" style="font-size:22px">menu</span></button>' +
      '<div class="lang-toggle"><button class="lang-btn" data-lang="en">EN</button><button class="lang-btn" data-lang="ml">ML</button></div>' +
      '<button class="theme-toggle"><span class="material-symbols-outlined" style="font-size:20px">dark_mode</span></button>' +
      '<div id="nav-profile" class="nav-profile" style="display:none"></div>' +
    '</div>' +
  '</div>' +
  '<div class="nav-desktop-links" style="display:flex;align-items:center;gap:.25rem;padding:0 2rem">' + dLinks + '</div>' +
  '<div class="mobile-nav">' + mLinks + '</div>';
}

// ── FOOTER ──
function renderFooter() {
  return '<div class="container">' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;align-items:start">' +
      '<div>' +
        '<div style="margin-bottom:1rem"><span style="font-size:1.125rem;font-weight:800;letter-spacing:.04em;color:var(--cream)">CUPPILO</span></div>' +
        '<p style="font-size:.875rem;color:rgba(247,241,235,.6);max-width:280px;line-height:1.6">' +
          'Kerala\'s first community-born café. Your voice shapes what we become.</p>' +
        '<div style="display:flex;gap:.75rem;margin-top:1.25rem">' +
          '<a href="https://instagram.com/cuppilocafe" target="_blank" rel="noopener" style="width:40px;height:40px;border-radius:50%;background:rgba(247,241,235,.1);display:flex;align-items:center;justify-content:center;color:rgba(247,241,235,.7);text-decoration:none;transition:all .2s" onmouseover="this.style.background=\'var(--primary)\';this.style.color=\'#fff\'" onmouseout="this.style.background=\'rgba(247,241,235,.1)\';this.style.color=\'rgba(247,241,235,.7)\'"><span class="material-symbols-outlined" style="font-size:18px">photo_camera</span></a>' +
        '</div>' +
      '</div>' +
      '<div>' +
        '<h4>Explore</h4>' +
        '<nav style="display:flex;flex-direction:column;gap:.5rem">' +
          '<a href="index.html">Home</a>' +
          '<a href="about.html">About</a>' +
          '<a href="founding-wall.html">Founding Wall</a>' +
        '</nav>' +
      '</div>' +
      '<div>' +
        '<h4>Get Updates</h4>' +
        '<p style="font-size:.8125rem;color:rgba(247,241,235,.5);margin-bottom:.75rem">Enter your number to get notified when Cuppilo opens.</p>' +
        '<form id="footer-phone-form" onsubmit="submitFooterPhone(event)" style="display:flex;gap:.5rem">' +
          '<input type="tel" id="footer-phone" placeholder="+91 XXXXX XXXXX" required style="flex:1;min-width:0;padding:.5rem .75rem;border-radius:9999px;border:1px solid rgba(247,241,235,.2);background:rgba(247,241,235,.1);color:var(--cream);font-size:.8125rem;font-family:inherit">' +
          '<button type="submit" style="padding:.5rem 1rem;border-radius:9999px;background:var(--primary);color:#fff;border:none;cursor:pointer;font-size:.8125rem;font-weight:600;font-family:inherit;white-space:nowrap">Notify</button>' +
        '</form>' +
        '<p id="footer-phone-msg" style="font-size:.75rem;color:var(--success);margin-top:.375rem;display:none">Thanks! We\'ll notify you.</p>' +
      '</div>' +
    '</div>' +
    '<div style="border-top:1px solid rgba(247,241,235,.1);margin-top:2rem;padding-top:1.5rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem">' +
        '<span style="font-size:.75rem;color:rgba(247,241,235,.4)">&copy; 2026 CUPPILO. All rights reserved.</span>' +
        '<a href="support.html" style="display:inline-flex;align-items:center;gap:.375rem;padding:.5rem 1rem;border-radius:9999px;background:#FFDD00;color:#000;font-size:.75rem;font-weight:700;text-decoration:none;transition:all .2s" onmouseover="this.style.transform=\'translateY(-1px)\'" onmouseout="this.style.transform=\'none\'"><span class="material-symbols-outlined" style="font-size:14px">local_cafe</span> Buy me a coffee</a>' +
    '</div>' +
  '</div>';
}

async function submitFooterPhone(e) {
  e.preventDefault();
  var input = document.getElementById('footer-phone');
  var msg = document.getElementById('footer-phone-msg');
  var phone = input.value.trim();
  if (!phone) return;
  try {
    await sbInsert('phone_subscribers', { phone: phone, created_at: new Date().toISOString() });
    input.value = '';
    msg.style.display = 'block';
    setTimeout(function() { msg.style.display = 'none'; }, 4000);
  } catch (err) {
    console.log('Phone signup error:', err);
    showToast('Something went wrong', 'error');
  }
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

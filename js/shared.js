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
  updateNavbarProfile(profile);

  // Show Founding Guest reward moment
  var formEl = document.getElementById('name-card-form');
  var successEl = document.getElementById('name-card-success');
  if (formEl && successEl) {
    formEl.style.display = 'none';
    successEl.style.display = '';
    // Get guest number from profile count
    try {
      var countData = await sbSelect('profile_count', '*');
      var count = Array.isArray(countData) && countData.length > 0 ? (countData[0].count || countData[0].total || 1) : 1;
      var guestNum = document.getElementById('founding-guest-number');
      if (guestNum) guestNum.textContent = '#' + String(count).padStart(5, '0');
    } catch (e) {
      var guestNum = document.getElementById('founding-guest-number');
      if (guestNum) guestNum.textContent = '#00001';
    }
  } else {
    // Fallback for non-index pages
    var overlay = document.getElementById('name-card-overlay');
    if (overlay) overlay.classList.remove('active');
    showToast('Welcome, ' + name + '!', 'success');
  }
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
    { id: 'index', href: 'index.html', en: 'Home', ml: 'ഹോം' },
    { id: 'about', href: 'about.html', en: 'About', ml: 'കുറിച്ച്' },
    { id: 'support', href: 'support.html', en: 'Support', ml: 'പിന്തുണ' },
    { id: 'wall', href: 'founding-wall.html', en: 'Wall', ml: 'മതിൽ' },
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
        '<p style="font-size:.875rem;color:var(--on-sv);max-width:280px" ' +
          'data-en="Building Kerala\'s first community-born café. Your voice shapes what we become." ' +
          'data-ml="കേരളത്തിലെ ആദ്യ കമ്മ്യൂണിറ്റി-ജനിച്ച കഫേ നിർമ്മിക്കുന്നു. നിങ്ങളുടെ ശബ്ദം നമ്മൾ എന്താകണമെന്ന് നിർണ്ണയിക്കുന്നു.">' +
          'Building Kerala\'s first community-born café. Your voice shapes what we become.</p>' +
        '<div style="display:flex;gap:.75rem;margin-top:1rem">' +
          '<a href="https://instagram.com/cuppilocafe" target="_blank" rel="noopener" style="width:36px;height:36px;border-radius:50%;background:var(--surface-h);display:flex;align-items:center;justify-content:center;color:var(--on-sv);text-decoration:none;transition:all .2s" onmouseover="this.style.background=\'var(--primary)\';this.style.color=\'#fff\'" onmouseout="this.style.background=\'var(--surface-h)\';this.style.color=\'var(--on-sv)\'"><span class="material-symbols-outlined" style="font-size:18px">photo_camera</span></a>' +
          '<a href="support.html" style="height:36px;padding:0 .75rem;border-radius:9999px;background:#FFDD00;color:#000;display:inline-flex;align-items:center;gap:.375rem;font-size:.75rem;font-weight:700;text-decoration:none;transition:all .2s" onmouseover="this.style.transform=\'translateY(-1px)\'" onmouseout="this.style.transform=\'none\'"><span class="material-symbols-outlined" style="font-size:16px">local_cafe</span> Buy me a coffee</a>' +
        '</div>' +
      '</div>' +
      '<div>' +
        '<h4 style="font-size:.875rem;font-weight:600;margin-bottom:.75rem" data-en="Explore" data-ml="Exploring">Explore</h4>' +
        '<nav style="display:flex;flex-direction:column;gap:.5rem">' +
          '<a href="index.html" data-en="Home" data-ml="ഹോം">Home</a>' +
          '<a href="about.html" data-en="About" data-ml="കുറിച്ച്">About</a>' +
          '<a href="support.html" data-en="Support" data-ml="പിന്തുണ">Support</a>' +
          '<a href="founding-wall.html" data-en="Founding Wall" data-ml="സ്ഥാപക മതിൽ">Founding Wall</a>' +
        '</nav>' +
      '</div>' +
      '<div>' +
        '<h4 style="font-size:.875rem;font-weight:600;margin-bottom:.75rem" data-en="Get Updates" data-ml="അപ്ഡേറ്റുകൾ നേടുക">Get Updates</h4>' +
        '<p style="font-size:.8125rem;color:var(--on-sv);margin-bottom:.75rem" data-en="Enter your number to get notified when Cuppilo opens." data-ml="CUPPILO തുറക്കുമ്പോൾ അറിയിപ്പ് നേടാൻ നിങ്ങളുടെ നമ്പർ നൽകുക.">Enter your number to get notified when Cuppilo opens.</p>' +
        '<form id="footer-phone-form" onsubmit="submitFooterPhone(event)" style="display:flex;gap:.5rem">' +
          '<input type="tel" id="footer-phone" placeholder="+91 XXXXX XXXXX" required style="flex:1;min-width:0;padding:.5rem .75rem;border-radius:.5rem;border:1px solid var(--muted);background:var(--input-bg);color:var(--on-s);font-size:.8125rem;font-family:inherit">' +
          '<button type="submit" style="padding:.5rem .75rem;border-radius:.5rem;background:var(--primary);color:#fff;border:none;cursor:pointer;font-size:.8125rem;font-weight:600;font-family:inherit;white-space:nowrap" data-en="Notify Me" data-ml="എന്നെ അറിയിക്കുക">Notify Me</button>' +
        '</form>' +
        '<p id="footer-phone-msg" style="font-size:.75rem;color:var(--success);margin-top:.375rem;display:none" data-en="Thanks! We\'ll notify you." data-ml="നന്ദി! ഞങ്ങൾ അറിയിക്കാം.">Thanks! We\'ll notify you.</p>' +
      '</div>' +
    '</div>' +
    '<div style="border-top:1px solid var(--muted);margin-top:2rem;padding-top:1.5rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem">' +
        '<span style="font-size:.75rem;color:var(--on-sv)">&copy; 2026 CUPPILO. All rights reserved.</span>' +
      '</div>' +
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
    await sbInsert('phone_signups', { phone: phone, created_at: new Date().toISOString() });
    input.value = '';
    msg.style.display = 'block';
    setTimeout(function() { msg.style.display = 'none'; }, 4000);
  } catch (err) {
    console.log('Phone signup error:', err);
    showToast('Something went wrong', 'error');
  }
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

// ── REFERRAL SYSTEM ──
function captureReferralFromURL() {
  var params = new URLSearchParams(window.location.search);
  var ref = params.get('ref');
  if (ref && ref.startsWith('CP')) {
    localStorage.setItem('cuppilo_ref', ref);
    // Clean URL without reload
    var url = new URL(window.location);
    url.searchParams.delete('ref');
    window.history.replaceState({}, '', url);
  }
}

function getReferralCode() {
  return localStorage.getItem('cuppilo_ref') || null;
}

function clearReferralCode() {
  localStorage.removeItem('cuppilo_ref');
}

async function trackProgress(step) {
  var profile = getProfile();
  if (!profile || !profile.session_id) return;
  try {
    if (typeof sbInsert === 'function') {
      await sbInsert('user_progress', {
        session_id: profile.session_id,
        step: step,
        completed_at: new Date().toISOString()
      });
    }
  } catch (e) { console.log('Progress tracking skipped:', e); }
}

async function getMyProgress() {
  var profile = getProfile();
  if (!profile || !profile.session_id) return [];
  try {
    if (typeof sbSelect === 'function') {
      var data = await sbSelect('user_progress', 'step,completed_at');
      if (Array.isArray(data)) {
        return data.filter(function (r) { return r.session_id === profile.session_id; });
      }
    }
  } catch (e) { console.log('Progress fetch skipped:', e); }
  return [];
}

async function getMyReferrals() {
  var profile = getProfile();
  if (!profile) return [];
  try {
    if (typeof sbSelect === 'function') {
      var data = await sbSelect('referrals', '*');
      if (Array.isArray(data)) {
        return data.filter(function (r) {
          return r.referee_session_id === profile.session_id || r.referee_name === profile.display_name;
        });
      }
    }
  } catch (e) { console.log('Referrals fetch skipped:', e); }
  return [];
}

async function getMyCoupon() {
  var profile = getProfile();
  if (!profile) return null;
  try {
    if (typeof sbSelect === 'function') {
      var data = await sbSelect('supporter_coupons', '*');
      if (Array.isArray(data)) {
        return data.find(function (c) {
          return c.supporter_name === profile.display_name;
        }) || null;
      }
    }
  } catch (e) { console.log('Coupon fetch skipped:', e); }
  return null;
}

async function getReferrerByCode(code) {
  try {
    if (typeof sbSelect === 'function') {
      var data = await sbSelect('supporter_coupons', '*');
      if (Array.isArray(data)) {
        return data.find(function (c) { return c.coupon_code === code; }) || null;
      }
    }
  } catch (e) { console.log('Referrer fetch skipped:', e); }
  return null;
}

function generateCouponCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code = 'CP-';
  for (var i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

function generateDiscountCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code = 'CUPPILO10-';
  for (var i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

function generateRewardCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var seg = '';
  for (var s = 0; s < 3; s++) {
    if (s > 0) seg += '-';
    for (var i = 0; i < 4; i++) seg += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return seg;
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
  captureReferralFromURL();
  var profile = getProfile();
  if (profile) updateNavbarProfile(profile);
}

console.log('CUPPILO shared.js loaded');

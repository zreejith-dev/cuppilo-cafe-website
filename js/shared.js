// CUPPILO Shared Components & Utilities

// Generate unique ID
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Toast notification
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: ${type === 'success' ? '#2D6A4F' : type === 'error' ? '#ba1a1a' : '#231F20'};
    color: white; padding: 0.75rem 1.5rem; border-radius: 9999px;
    font-size: 0.875rem; font-weight: 600; z-index: 1000;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2); animation: fadeIn 0.3s ease;
    display: flex; align-items: center; gap: 0.5rem;
  `;
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:18px">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</span>
    ${message}
  `;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Stepper component
function renderStepper(currentStep, totalSteps) {
  const steps = ['Menu', 'Vibe', 'Pricing', 'Wall'];
  return `
    <div class="flex items-center justify-between" style="padding: 0.75rem 0">
      <div class="flex items-center" style="gap: 0.5rem">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:1.75rem;height:1.75rem;border-radius:9999px;background:var(--primary);color:var(--cream);font-size:0.75rem;font-weight:700">${currentStep}</span>
        <span style="font-size:0.75rem;font-weight:600;color:var(--primary-dark)">Step ${currentStep} of ${totalSteps}</span>
      </div>
      <div class="flex items-center" style="gap: 0.375rem">
        ${Array.from({length: totalSteps}, (_, i) => `
          <span style="width:${i+1 === currentStep ? '2rem' : '0.625rem'};height:0.375rem;border-radius:9999px;background:${i < currentStep ? 'var(--primary)' : 'var(--muted-latte)'};transition:all 0.3s"></span>
        `).join('')}
      </div>
    </div>
  `;
}

// Footer component
function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;align-items:start">
          <div>
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
              <span style="font-weight:800;font-size:1.25rem;color:var(--primary)">CUPPILO</span>
              <span style="font-size:0.875rem;color:var(--brass)">കപ്പിലോ</span>
            </div>
            <p class="font-editorial" style="font-size:0.9375rem;color:var(--on-surface-variant);max-width:280px">
              "Bringing artisanal specialty roasts, shade-grown Western Ghats heritage beans, and warm veranda conversations back to our towns."
            </p>
          </div>
          <div>
            <h4 style="font-size:0.875rem;font-weight:600;margin-bottom:0.75rem">Co-Creation Chapters</h4>
            <nav style="display:flex;flex-direction:column;gap:0.5rem">
              <a href="index.html">Veranda Orientation</a>
              <a href="menu-ballot.html">Artisanal Menu Ballot</a>
              <a href="ambiance.html">Nadumuttam Architecture</a>
              <a href="pricing.html">Fair Cup Pricing</a>
              <a href="founding-wall.html">Founding Patron Wall</a>
            </nav>
          </div>
          <div>
            <h4 style="font-size:0.875rem;font-weight:600;margin-bottom:0.75rem">Legal & Trust</h4>
            <nav style="display:flex;flex-direction:column;gap:0.5rem">
              <a href="#">Privacy Policy (DPDP 2023)</a>
              <a href="#">Terms of Co-Creation</a>
              <a href="#">Contact the Founders</a>
            </nav>
          </div>
        </div>
        <div style="border-top:1px solid var(--muted-latte);margin-top:2rem;padding-top:1.5rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem">
          <span style="font-size:0.75rem;color:var(--on-surface-variant)">&copy; 2026 CUPPILO. All rights reserved. Co-designed with Kerala.</span>
          <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.75rem;color:var(--on-surface-variant)">
            <span class="material-symbols-outlined" style="font-size:14px;color:var(--success)">eco</span>
            Single-estate Wayanad & Nelliyampathy Arabica sourcing
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Navbar component
function renderNavbar(activePage) {
  const pages = [
    { id: 'index', label: 'Home', path: 'index.html' },
    { id: 'menu-ballot', label: 'Menu', path: 'menu-ballot.html' },
    { id: 'ambiance', label: 'Vibe', path: 'ambiance.html' },
    { id: 'pricing', label: 'Pricing', path: 'pricing.html' },
    { id: 'founding-wall', label: 'Wall', path: 'founding-wall.html' }
  ];
  return `
    <nav style="position:sticky;top:0;z-index:40;background:rgba(247,244,235,0.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--muted-latte)">
      <div class="container" style="display:flex;align-items:center;justify-content:space-between;height:3.5rem">
        <a href="index.html" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none">
          <span style="font-weight:800;font-size:1.125rem;color:var(--primary)">CUPPILO</span>
          <span style="font-size:0.75rem;color:var(--brass)">കപ്പിലോ</span>
        </a>
        <div class="flex items-center" style="gap:0.25rem">
          ${pages.map(p => `
            <a href="${p.path}" style="padding:0.375rem 0.75rem;border-radius:9999px;font-size:0.8125rem;font-weight:600;text-decoration:none;
              background:${activePage === p.id ? 'var(--primary)' : 'transparent'};
              color:${activePage === p.id ? 'var(--cream)' : 'var(--on-surface-variant)'}">${p.label}</a>
          `).join('')}
        </div>
      </div>
    </nav>
  `;
}

// Init page
function initPage(activePage) {
  // Insert navbar
  const nav = document.getElementById('navbar');
  if (nav) nav.innerHTML = renderNavbar(activePage);

  // Insert footer
  const footer = document.getElementById('footer');
  if (footer) footer.innerHTML = renderFooter();
}

console.log('CUPPILO shared.js loaded');

import { buildWhatsAppUrl } from './utils.js';

export function renderHero(siteConfig) {
  const brandEl = document.getElementById('nav-brand');
  if (brandEl) {
    brandEl.innerHTML = `${siteConfig.brandName}<span class="accent">${siteConfig.brandAccent}</span>`;
  }

  const navWaBtn = document.getElementById('nav-wa-btn');
  if (navWaBtn) {
    navWaBtn.href = buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappGreeting);
  }

  const floatingWa = document.getElementById('floating-wa-btn');
  if (floatingWa) {
    floatingWa.href = buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappGreeting);
  }

  const heroContainer = document.getElementById('hero-root');
  if (!heroContainer) return;

  const statsHtml = siteConfig.stats
    .map(
      (s) => `
      <div class="stat-item">
        <h3>${s.value}</h3>
        <p>${s.label}</p>
      </div>
    `
    )
    .join('');

  heroContainer.innerHTML = `
    <div class="container">
      <div class="hero-eyebrow">${siteConfig.hero.eyebrow}</div>
      <h1 class="hero-title">
        ${siteConfig.hero.title} <br/>
        <span class="text-gradient">${siteConfig.hero.titleHighlight}</span>
      </h1>
      <p class="hero-subtitle">${siteConfig.hero.subtitle}</p>
      <div class="hero-actions">
        <a href="#calculator" class="btn btn-primary">${siteConfig.hero.primaryCta}</a>
        <a href="#pricing" class="btn btn-outline">${siteConfig.hero.secondaryCta}</a>
      </div>
      <div class="hero-paths">
        <a href="#pricing" class="hero-path-card" id="hero-path-creator" data-cat="creator">
          <div class="hero-path-badge">Pilihan Jalur A</div>
          <h3 class="hero-path-title">Saya Kreator Konten <span class="arrow">→</span></h3>
          <p class="hero-path-desc">Klip podcast, animasi 2D, video edukasi</p>
        </a>
        <a href="#pricing" class="hero-path-card" id="hero-path-arch" data-cat="arch">
          <div class="hero-path-badge">Pilihan Jalur B</div>
          <h3 class="hero-path-title">Saya Butuh Visual Arsitektur <span class="arrow">→</span></h3>
          <p class="hero-path-desc">Video tur 3D, render fasad, konfigurator 360°</p>
        </a>
      </div>
      <div class="stats-bar">
        ${statsHtml}
      </div>
    </div>
  `;

  const setupPathCard = (id, catId) => {
    const el = heroContainer.querySelector(`#${id}`);
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent('switch-pricing-tab', { detail: { category: catId } })
        );
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  };

  setupPathCard('hero-path-creator', 'creator');
  setupPathCard('hero-path-arch', 'arch');
}

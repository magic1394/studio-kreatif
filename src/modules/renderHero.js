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
      <h1 class="hero-title">
        ${siteConfig.hero.title} <br/>
        <span class="text-gradient">${siteConfig.hero.titleHighlight}</span>
      </h1>
      <p class="hero-subtitle">${siteConfig.hero.subtitle}</p>
      <div class="hero-actions">
        <a href="#calculator" class="btn btn-primary">${siteConfig.hero.primaryCta}</a>
        <a href="#pricing" class="btn btn-outline">${siteConfig.hero.secondaryCta}</a>
      </div>
      <div class="stats-bar">
        ${statsHtml}
      </div>
    </div>
  `;
}

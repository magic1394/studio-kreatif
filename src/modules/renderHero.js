import { buildWhatsAppUrl } from './utils.js';

export function renderHero(siteConfig) {
  const brandEl = document.getElementById('nav-brand');
  if (brandEl) {
    brandEl.textContent = 'Studio Kreatif';
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

  // Split title into letters for editorial flash reveal
  const fullTitle = `${siteConfig.hero.title} ${siteConfig.hero.titleHighlight}`;
  const splashColors = ['#FF9463', '#FFD862', '#27D271', '#00CCFA', '#92ADFE', '#FF83E4'];

  const lettersHtml = Array.from(fullTitle)
    .map((char, index) => {
      const delay = Math.floor(Math.random() * 70) + 5; // 5 - 75ms random delay
      const color = splashColors[index % splashColors.length];
      if (char === ' ') {
        return '<span aria-hidden="true"> </span>';
      }
      return `<span class="h-char" style="--char-delay:${delay}ms; --char-splash:${color};" aria-hidden="true">${char}</span>`;
    })
    .join('');

  // 6-8 Grid-snapped splashes for card visual backgrounds
  const splashesHtml = `
    <div class="grid-splash" style="left:45px; top:40px; background:var(--orange); animation-delay:0s;"></div>
    <div class="grid-splash" style="left:120px; top:60px; background:var(--yellow); animation-delay:0.5s;"></div>
    <div class="grid-splash" style="left:195px; top:20px; background:var(--green); animation-delay:1s;"></div>
    <div class="grid-splash" style="left:60px; top:120px; background:var(--blue); animation-delay:1.5s;"></div>
    <div class="grid-splash" style="left:150px; top:100px; background:var(--purple); animation-delay:2s;"></div>
    <div class="grid-splash" style="left:240px; top:140px; background:var(--pink); animation-delay:2.5s;"></div>
  `;

  // Big number stats rows
  const statsRowsHtml = siteConfig.stats
    .map(
      (s) => `
      <div class="stat-big-row">
        <span class="stat-big-label">${s.label}</span>
        <span class="stat-big-value" data-val="${s.value}">${s.value}</span>
      </div>
    `
    )
    .join('');

  heroContainer.innerHTML = `
    <div class="container hero-container">
      <div class="hero-announcement-wrap">
        <a href="#pricing" class="hero-announcement-pill">
          <span>Mulai Rp25rb, Paket Clipper 6 klip</span>
          <svg class="chevron-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>

      <h1 class="hero-title" aria-label="${fullTitle}">
        ${lettersHtml}
      </h1>

      <p class="hero-subtitle">${siteConfig.hero.subtitle}</p>

      <div class="hero-actions">
        <a href="#calculator" class="btn btn-pill-charcoal">${siteConfig.hero.primaryCta}</a>
        <a href="#pricing" class="btn btn-pill-clay">${siteConfig.hero.secondaryCta}</a>
      </div>

      <div class="hero-paths-grid">
        <article class="hero-editorial-card" id="hero-path-creator" data-cat="creator">
          <div class="card-top-info">
            <span class="card-mini-label">Jalur 01 / Kreator</span>
            <h2 class="card-serif-title">Saya Kreator Konten</h2>
            <p class="card-sub-copy">Klip podcast, animasi 2D, video edukasi</p>
            <div class="card-btn-wrap">
              <span class="btn btn-pill-clay card-pill-action">
                Pilih Jalur Kreator
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
          <div class="card-visual-frame paper-grid">
            ${splashesHtml}
            <div class="visual-poster-card">
              <img src="https://img.youtube.com/vi/7ItaTB-jV_g/hqdefault.jpg" alt="Preview Video Kreator" width="340" height="220" class="visual-poster-img" loading="lazy" />
              <div class="poster-badge">2D Storytelling</div>
            </div>
          </div>
        </article>

        <article class="hero-editorial-card" id="hero-path-arch" data-cat="arch">
          <div class="card-top-info">
            <span class="card-mini-label">Jalur 02 / Arsitektur</span>
            <h2 class="card-serif-title">Saya Butuh Visual Arsitektur</h2>
            <p class="card-sub-copy">Video tur 3D, render fasad, konfigurator 360°</p>
            <div class="card-btn-wrap">
              <span class="btn btn-pill-clay card-pill-action">
                Pilih Jalur 3D
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
          <div class="card-visual-frame paper-grid">
            ${splashesHtml}
            <div class="visual-poster-card visual-interactive-preview">
              <img src="https://img.youtube.com/vi/h-SZexXNI7g/hqdefault.jpg" alt="Preview 3D Arsitektur" width="340" height="220" class="visual-poster-img" loading="lazy" />
              <div class="poster-badge">3D & Motion</div>
            </div>
          </div>
        </article>
      </div>

      <div class="format-ribbon">
        <div class="format-ribbon-inner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect width="12" height="18" x="6" y="3" rx="2" />
            <circle cx="12" cy="18" r="0.5" fill="currentColor" />
          </svg>
          <span>Siap upload ke TikTok, Reels, Shorts, YouTube</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="12" x="3" y="6" rx="2" />
            <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div class="stats-big-container">
        ${statsRowsHtml}
      </div>
    </div>
  `;

  // Wire path card clicks to switch category tabs and scroll
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

  // Count up observer for pure numbers if not reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const statValues = heroContainer.querySelectorAll('.stat-big-value');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const originalVal = el.getAttribute('data-val');
            // If it starts with a clean integer like "6 Paket"
            const match = originalVal.match(/^(\d+)(.*)$/);
            if (match) {
              const targetNum = parseInt(match[1], 10);
              const suffix = match[2];
              let current = 0;
              const step = Math.ceil(targetNum / 16);
              const timer = setInterval(() => {
                current += step;
                if (current >= targetNum) {
                  current = targetNum;
                  clearInterval(timer);
                }
                el.textContent = `${current}${suffix}`;
              }, 40);
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    statValues.forEach((el) => observer.observe(el));
  }
}

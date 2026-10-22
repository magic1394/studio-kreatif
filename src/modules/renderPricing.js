import { formatRupiah, buildWhatsAppUrl } from './utils.js';

export function renderPricing(servicesData, siteConfig, onSelectPackageForCalculator) {
  const root = document.getElementById('pricing-root');
  if (!root) return;

  let activeCategory = 'all';

  function render() {
    const filteredPackages =
      activeCategory === 'all'
        ? servicesData.packages
        : servicesData.packages.filter((pkg) => pkg.category === activeCategory);

    const tabsHtml = servicesData.categories
      .map(
        (cat) => `
        <button class="filter-tab ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
          ${cat.label}
        </button>
      `
      )
      .join('');

    const cardsHtml = filteredPackages
      .map((pkg) => {
        const isCustom = pkg.isCustom || pkg.price === null;
        const isFeatured = pkg.id === 'clipper-plus'; // Hanya Clipper Plus yang featured

        const directWaText = isCustom
          ? `Halo ${siteConfig.brandName}, saya tertarik berkonsultasi mengenai paket *${pkg.name}*. Saya punya referensi gaya video untuk diadaptasi. Berikut gambaran kebutuhan saya:`
          : `Halo ${siteConfig.brandName}, saya tertarik memesan *${pkg.name}* (${formatRupiah(pkg.price)} / ${pkg.unit}). Berikut detail singkat proyek saya:`;
        const directWaLink = buildWhatsAppUrl(siteConfig.whatsappNumber, directWaText);

        const checkSvg = `
          <svg class="check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        `;

        const infoSvg = `
          <svg class="info-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        `;

        const featuresHtml = pkg.features
          .map((f) => `<li><span class="check-wrap">${checkSvg}</span> <span>${f}</span></li>`)
          .join('');

        const priceDisplay = isCustom
          ? `<span class="price-amount custom-price">Sesuai konsultasi</span>`
          : `<span class="price-amount">${formatRupiah(pkg.price)}</span> <span class="price-unit">/ ${pkg.unit}</span>`;

        const actionsHtml = isCustom
          ? `
            <div class="card-actions">
              <a href="${directWaLink}" target="_blank" rel="noopener" class="btn btn-pill-charcoal btn-full">
                Konsultasi via WA
              </a>
            </div>
          `
          : `
            <div class="card-actions">
              <button class="btn btn-pill-clay select-calc-btn" data-pkg-id="${pkg.id}">
                Hitung Biaya
              </button>
              <a href="${directWaLink}" target="_blank" rel="noopener" class="btn btn-pill-charcoal">
                Order via WA
              </a>
            </div>
          `;

        return `
          <article class="pricing-card ${isFeatured ? 'featured' : ''}" data-pkg-id="${pkg.id}">
            <div class="card-header-block">
              <div class="card-meta-top">
                <span class="card-cat-label">${pkg.categoryLabel}</span>
                ${pkg.badge ? `<span class="card-badge">${pkg.badge}</span>` : ''}
              </div>
              <h3 class="card-title">${pkg.name}</h3>
              <p class="card-desc">${pkg.shortDesc}</p>
              <div class="card-price-box">
                ${priceDisplay}
              </div>
            </div>
            <div class="card-body-block">
              <ul class="feature-list">
                ${featuresHtml}
              </ul>
            </div>
            <div class="card-footer-block">
              <div class="card-limit">${infoSvg} <span>${pkg.limitations}</span></div>
              ${actionsHtml}
            </div>
          </article>
        `;
      })
      .join('');

    root.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>${servicesData.sectionTitle}</h2>
          <p>${servicesData.sectionSubtitle}</p>
        </div>
        <div class="segmented-control-wrap" id="pricing-filter-sticky">
          <div class="filter-tabs segmented-tabs" id="pricing-tabs">
            ${tabsHtml}
          </div>
        </div>
        <div class="carousel-Outer">
          <div class="carousel-controls">
            <button class="carousel-btn" id="pricing-prev" aria-label="Geser Kiri">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button class="carousel-btn" id="pricing-next" aria-label="Geser Kanan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <div class="pricing-grid-track" id="pricing-track">
            ${cardsHtml}
          </div>
        </div>
      </div>
    `;

    root.querySelectorAll('#pricing-tabs .filter-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        render();
      });
    });

    root.querySelectorAll('.select-calc-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pkgId = btn.getAttribute('data-pkg-id');
        if (onSelectPackageForCalculator) {
          onSelectPackageForCalculator(pkgId);
        }
        const calcSection = document.getElementById('calculator');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    const track = root.querySelector('#pricing-track');
    const prevBtn = root.querySelector('#pricing-prev');
    const nextBtn = root.querySelector('#pricing-next');
    if (track && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => track.scrollBy({ left: -360, behavior: 'smooth' }));
      nextBtn.addEventListener('click', () => track.scrollBy({ left: 360, behavior: 'smooth' }));
    }
  }

  window.addEventListener('switch-pricing-tab', (e) => {
    if (e.detail && e.detail.category) {
      activeCategory = e.detail.category;
      render();
    }
  });

  render();
}

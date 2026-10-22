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
        const directWaText = isCustom
          ? `Halo ${siteConfig.brandName}, saya tertarik berkonsultasi mengenai paket *${pkg.name}*. Saya punya referensi gaya video untuk diadaptasi. Berikut gambaran kebutuhan saya:`
          : `Halo ${siteConfig.brandName}, saya tertarik memesan *${pkg.name}* (${formatRupiah(pkg.price)} / ${pkg.unit}). Berikut detail singkat proyek saya:`;
        const directWaLink = buildWhatsAppUrl(siteConfig.whatsappNumber, directWaText);

        const featuresHtml = pkg.features
          .map((f) => `<li><span class="check">✓</span> <span>${f}</span></li>`)
          .join('');

        const priceDisplay = isCustom
          ? `<span class="price-amount" style="font-size:1.45rem;">Sesuai konsultasi</span>`
          : `<span class="price-amount">${formatRupiah(pkg.price)}</span> <span class="price-unit">/ ${pkg.unit}</span>`;

        const actionsHtml = isCustom
          ? `
            <div class="card-actions">
              <a href="${directWaLink}" target="_blank" rel="noopener" class="btn btn-wa" style="width:100%;">
                Konsultasi via WA
              </a>
            </div>
          `
          : `
            <div class="card-actions">
              <button class="btn btn-outline select-calc-btn" data-pkg-id="${pkg.id}">
                Hitung Biaya
              </button>
              <a href="${directWaLink}" target="_blank" rel="noopener" class="btn btn-wa">
                Order via WA
              </a>
            </div>
          `;

        return `
          <article class="pricing-card ${pkg.badge ? 'featured' : ''}" data-pkg-id="${pkg.id}">
            ${pkg.badge ? `<span class="card-badge">${pkg.badge}</span>` : ''}
            <div>
              <div class="card-cat">${pkg.categoryLabel}</div>
              <h3 class="card-title">${pkg.name}</h3>
              <p class="card-desc">${pkg.shortDesc}</p>
              <div class="card-price-box">
                ${priceDisplay}
              </div>
              <ul class="feature-list">
                ${featuresHtml}
              </ul>
            </div>
            <div>
              <div class="card-limit">ℹ️ ${pkg.limitations}</div>
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
        <div class="filter-tabs" id="pricing-tabs">
          ${tabsHtml}
        </div>
        <div class="carousel-Outer">
          <div class="carousel-controls">
            <button class="carousel-btn" id="pricing-prev" aria-label="Geser Kiri">←</button>
            <button class="carousel-btn" id="pricing-next" aria-label="Geser Kanan">→</button>
          </div>
          <div class="carousel-track" id="pricing-track">
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

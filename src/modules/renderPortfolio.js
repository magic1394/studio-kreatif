import { initCarousel } from './utils.js';

export function renderPortfolio(portfolioData) {
  const root = document.getElementById('portfolio-root');
  if (!root) return;

  let activeCat = 'all';

  function render() {
    const filteredItems =
      activeCat === 'all'
        ? portfolioData.items
        : portfolioData.items.filter((item) => item.category === activeCat);

    const tabsHtml = portfolioData.categories
      .map(
        (c) => `
        <button class="filter-tab ${c.id === activeCat ? 'active' : ''}" data-cat="${c.id}">
          ${c.label}
        </button>
      `
      )
      .join('');

    const itemsHtml = filteredItems
      .map(
        (item) => `
        <article class="portfolio-card">
          <div class="portfolio-thumb" data-yt="${item.youtubeId}" data-title="${item.title}" data-url="${item.customUrl || ''}" data-img="${item.thumbnailUrl || ''}">
            <div class="portfolio-meta-top">
              <span class="tag-pill">${item.categoryLabel}</span>
              <span class="tag-pill">${item.aspectRatio} • ${item.duration}</span>
            </div>
            ${item.customUrl ? `<iframe src="${item.customUrl}" tabindex="-1" style="position:absolute; inset:0; width:100%; height:100%; border:none; pointer-events:none; z-index:1;"></iframe>` : item.thumbnailUrl ? `<img src="${item.thumbnailUrl}" alt="${item.title}" class="portfolio-img" loading="lazy" />` : item.youtubeId ? `<img src="https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg" alt="${item.title}" class="portfolio-img" loading="lazy" />` : ''}
            <div class="play-trigger" title="Putar Preview Video">▶</div>
          </div>
          <div class="portfolio-body">
            <div class="portfolio-stats">${item.stats}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `
      )
      .join('');

    root.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>${portfolioData.sectionTitle}</h2>
          <p>${portfolioData.sectionSubtitle}</p>
        </div>
        <div class="filter-tabs" id="portfolio-tabs">
          ${tabsHtml}
        </div>
        <div class="carousel-container">
          <div class="carousel-nav-row">
            <div class="carousel-hint">
              <span class="carousel-hint-icon">‹ ›</span> Geser horizontal atau sentuh panah untuk karya lainnya
            </div>
            <div class="carousel-nav-arrows">
              <button class="carousel-arrow-btn portfolio-prev" aria-label="Sebelumnya">‹</button>
              <button class="carousel-arrow-btn portfolio-next" aria-label="Berikutnya">›</button>
            </div>
          </div>
          <div class="carousel-wrapper">
            <button class="carousel-side-arrow prev portfolio-prev" aria-label="Sebelumnya">‹</button>
            <div class="carousel-track" id="portfolio-track">
              ${itemsHtml}
            </div>
            <button class="carousel-side-arrow next portfolio-next" aria-label="Berikutnya">›</button>
          </div>
        </div>
      </div>
    `;

    root.querySelectorAll('#portfolio-tabs .filter-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-cat');
        render();
      });
    });

    const carousel = initCarousel(root, 'portfolio-track', 'portfolio-prev', 'portfolio-next');

    root.querySelectorAll('.portfolio-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        if (carousel && carousel.hasDragged()) return;
        const ytId = thumb.getAttribute('data-yt');
        const title = thumb.getAttribute('data-title');
        const customUrl = thumb.getAttribute('data-url');
        const imgUrl = thumb.getAttribute('data-img');
        if ((ytId && ytId.trim() !== '') || (customUrl && customUrl.trim() !== '') || (imgUrl && imgUrl.trim() !== '')) {
          openVideoModal(ytId, title, customUrl, imgUrl);
        }
      });
    });
  }

  render();
}

function openVideoModal(youtubeId, title, customUrl, imgUrl) {
  const modal = document.getElementById('video-modal');
  const modalContent = modal ? modal.querySelector('.video-modal-content') : null;
  const titleEl = document.getElementById('modal-video-title');
  const frameWrap = document.getElementById('modal-video-frame');
  if (!modal || !frameWrap) return;

  if (modalContent) {
    if (customUrl && customUrl.toLowerCase().includes('rumah.html')) {
      modalContent.classList.add('modal-interactive');
    } else {
      modalContent.classList.remove('modal-interactive');
    }
  }

  titleEl.textContent = title;
  if (customUrl && customUrl.trim() !== '') {
    frameWrap.innerHTML = `
      <iframe
        src="${customUrl}"
        title="${title}"
        frameborder="0"
        style="width:100%; height:100%; border:none;"
        allowfullscreen
      ></iframe>
    `;
  } else if (youtubeId && youtubeId.trim() !== '') {
    frameWrap.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0"
        title="${title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
  } else if (imgUrl && imgUrl.trim() !== '') {
    frameWrap.innerHTML = `<img src="${imgUrl}" alt="${title}" style="width:100%; height:auto; display:block;" />`;
  }
  modal.classList.add('open');
}

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
          <div class="portfolio-thumb" data-yt="${item.youtubeId}" data-title="${item.title}">
            <div class="portfolio-meta-top">
              <span class="tag-pill">${item.categoryLabel}</span>
              <span class="tag-pill">${item.aspectRatio} • ${item.duration}</span>
            </div>
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
        <div class="grid-3">
          ${itemsHtml}
        </div>
      </div>
    `;

    root.querySelectorAll('#portfolio-tabs .filter-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-cat');
        render();
      });
    });

    root.querySelectorAll('.portfolio-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const ytId = thumb.getAttribute('data-yt');
        const title = thumb.getAttribute('data-title');
        openVideoModal(ytId, title);
      });
    });
  }

  render();
}

function openVideoModal(youtubeId, title) {
  const modal = document.getElementById('video-modal');
  const titleEl = document.getElementById('modal-video-title');
  const frameWrap = document.getElementById('modal-video-frame');
  if (!modal || !frameWrap) return;

  titleEl.textContent = title;
  frameWrap.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0"
      title="${title}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;
  modal.classList.add('open');
}

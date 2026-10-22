import { buildWhatsAppUrl } from './utils.js';

export function renderWorkflow(workflowData, siteConfig) {
  const root = document.getElementById('workflow-root');
  if (!root) return;

  const stepsListHtml = workflowData.steps
    .map(
      (s) => `
      <div class="step-editorial-row">
        <div class="step-mono-num">${s.stepNumber}</div>
        <div class="step-content">
          <h3 class="step-title">${s.title}</h3>
          <p class="step-desc">${s.description}</p>
        </div>
      </div>
    `
    )
    .join('');

  const termsHtml = workflowData.terms
    .map(
      (t) => `
      <div class="term-editorial-item">
        <h4 class="term-title">${t.title}</h4>
        <p class="term-detail">${t.detail}</p>
      </div>
    `
    )
    .join('');

  const plusSvg = `
    <svg class="faq-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  `;

  const faqsHtml = (workflowData.faqs || [])
    .map(
      (f) => `
      <details class="faq-editorial-item">
        <summary class="faq-editorial-question">
          <span>${f.question}</span>
          <span class="faq-icon-wrap">${plusSvg}</span>
        </summary>
        <div class="faq-editorial-answer">
          <p>${f.answer}</p>
        </div>
      </details>
    `
    )
    .join('');

  root.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>${workflowData.sectionTitle}</h2>
        <p>${workflowData.sectionSubtitle}</p>
      </div>

      <div class="steps-editorial-wrapper">
        <div class="steps-editorial-list">
          ${stepsListHtml}
        </div>
      </div>

      <div class="terms-editorial-wrapper">
        <h3 class="terms-section-title">Ketentuan Kerja & Hak Cipta</h3>
        <div class="terms-grid">
          ${termsHtml}
        </div>
      </div>

      <!-- TODO-OWNER: Estimasi waktu pengerjaan (turnaround time / SLA) dan ketentuan metode pembayaran/DP perlu ditentukan oleh pemilik sebelum ditampilkan di halaman situs. -->

      <div class="faq-editorial-section">
        <div class="faq-header">
          <h3>Pertanyaan yang Sering Diajukan (FAQ)</h3>
          <p>Penjelasan transparan seputar hitungan durasi, suara AI, revisi, dan keamanan bahan Anda.</p>
        </div>
        <div class="faq-editorial-list">
          ${faqsHtml}
        </div>
      </div>
    </div>
  `;

  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) {
    const waLink = buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappGreeting);
    footerRoot.innerHTML = `
      <div class="footer-editorial-wrap">
        <div class="container">
          <div class="footer-cta-row">
            <h2 class="footer-cta-title">Mulai Proyek Anda</h2>
            <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-pill-charcoal footer-cta-btn">
              Chat WhatsApp
            </a>
          </div>

          <div class="footer-bottom-grid">
            <div class="footer-brand-side">
              <div class="brand-logo">Studio Kreatif</div>
              <p class="footer-tagline">Produksi video & visual 3D untuk kreator dan properti. Remote, seluruh Indonesia.</p>
            </div>
            <div class="footer-nav-side">
              <span class="footer-nav-label">Tautan Cepat</span>
              <nav class="footer-links-inline">
                <a href="#pricing">Katalog & Harga</a>
                <a href="#transparency">Transparansi Produksi</a>
                <a href="#portfolio">Portofolio</a>
                <a href="#calculator">Kalkulator Biaya</a>
                <a href="${waLink}" target="_blank" rel="noopener">WhatsApp (0895-3663-85484)</a>
              </nav>
            </div>
            <div class="footer-copy-side">
              <p class="footer-copy">© ${new Date().getFullYear()} studiokreatif.biz.id. Seluruh hak cipta dilindungi.</p>
            </div>
          </div>
        </div>

        <div class="footer-grid-strip paper-grid" aria-hidden="true">
          <div class="grid-splash" style="left:5%; top:20px; background:var(--orange);"></div>
          <div class="grid-splash" style="left:20%; top:40px; background:var(--yellow); animation-delay:0.4s;"></div>
          <div class="grid-splash" style="left:38%; top:20px; background:var(--green); animation-delay:0.8s;"></div>
          <div class="grid-splash" style="left:55%; top:40px; background:var(--blue); animation-delay:1.2s;"></div>
          <div class="grid-splash" style="left:72%; top:20px; background:var(--purple); animation-delay:1.6s;"></div>
          <div class="grid-splash" style="left:89%; top:40px; background:var(--pink); animation-delay:2s;"></div>
        </div>
      </div>
    `;
  }
}

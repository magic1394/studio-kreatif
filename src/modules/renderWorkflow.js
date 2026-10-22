import { buildWhatsAppUrl } from './utils.js';

export function renderWorkflow(workflowData, siteConfig) {
  const root = document.getElementById('workflow-root');
  if (!root) return;

  const stepsHtml = workflowData.steps
    .map(
      (s) => `
      <div class="step-card">
        <div class="step-num">Langkah ${s.stepNumber}</div>
        <h3 style="margin-bottom:0.45rem;font-size:1.1rem;color:var(--text-primary);">${s.title}</h3>
        <p style="font-size:0.9rem;color:var(--text-secondary);">${s.description}</p>
      </div>
    `
    )
    .join('');

  const termsHtml = workflowData.terms
    .map(
      (t) => `
      <div class="term-box">
        <h4 style="margin-bottom:0.35rem;color:var(--text-primary);">${t.title}</h4>
        <p style="font-size:0.88rem;color:var(--text-secondary);">${t.detail}</p>
      </div>
    `
    )
    .join('');

  const faqsHtml = (workflowData.faqs || [])
    .map(
      (f) => `
      <details class="faq-item">
        <summary class="faq-question">
          <span>${f.question}</span>
          <span class="faq-icon">+</span>
        </summary>
        <div class="faq-answer">
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

      <div class="grid-4" style="margin-bottom:3.5rem;">
        ${stepsHtml}
      </div>

      <div class="terms-wrapper" style="margin-bottom:4rem;">
        <h3 style="font-size:1.35rem;margin-bottom:1.25rem;color:var(--text-primary);">Ketentuan Kerja & Hak Cipta</h3>
        <div class="grid-2">
          ${termsHtml}
        </div>
      </div>

      <!-- TODO-OWNER: Estimasi waktu pengerjaan (turnaround time / SLA) dan ketentuan metode pembayaran/DP perlu ditentukan oleh pemilik sebelum ditampilkan di halaman situs. -->

      <div class="faq-section">
        <div class="faq-header">
          <h3>Pertanyaan yang Sering Diajukan (FAQ)</h3>
          <p>Penjelasan transparan seputar hitungan durasi, suara AI, revisi, dan keamanan bahan Anda.</p>
        </div>
        <div class="faq-accordion">
          ${faqsHtml}
        </div>
      </div>
    </div>
  `;

  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) {
    const waLink = buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappGreeting);
    footerRoot.innerHTML = `
      <div class="container footer-inner">
        <div class="footer-brand-col">
          <div class="brand-logo">${siteConfig.brandName}<span class="accent">${siteConfig.brandAccent}</span></div>
          <p class="footer-tagline">Studio Kreatif — Produksi video & visual 3D untuk kreator dan properti. Remote, seluruh Indonesia.</p>
        </div>
        <div class="footer-links-col">
          <h4 class="footer-col-title">Tautan Cepat</h4>
          <nav class="footer-nav">
            <a href="#pricing">Katalog & Harga</a>
            <a href="#transparency">Transparansi Produksi</a>
            <a href="#portfolio">Portofolio</a>
            <a href="#calculator">Kalkulator Biaya</a>
            <a href="${waLink}" target="_blank" rel="noopener">WhatsApp (0895-3663-85484)</a>
          </nav>
        </div>
        <div class="footer-copy-col">
          <p class="footer-copy">© ${new Date().getFullYear()} ${siteConfig.brandName}${siteConfig.brandAccent}. Hak cipta dilindungi.</p>
        </div>
      </div>
    `;
  }
}

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

  root.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>${workflowData.sectionTitle}</h2>
        <p>${workflowData.sectionSubtitle}</p>
      </div>
      <div class="grid-4" style="margin-bottom:3.5rem;">
        ${stepsHtml}
      </div>
      <div class="grid-2">
        ${termsHtml}
      </div>
    </div>
  `;

  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) {
    footerRoot.innerHTML = `
      <div class="container footer-inner">
        <div>
          <div class="brand-logo">${siteConfig.brandName}<span class="accent">${siteConfig.brandAccent}</span></div>
          <p class="footer-copy">${siteConfig.location}</p>
        </div>
        <div class="footer-copy">
          © ${new Date().getFullYear()} ${siteConfig.brandName}${siteConfig.brandAccent}. All rights reserved.
        </div>
      </div>
    `;
  }
}

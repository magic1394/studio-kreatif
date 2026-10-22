export function renderTransparency() {
  const root = document.getElementById('transparency-root');
  if (!root) return;

  const sparkSvg = `
    <svg class="feat-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
    </svg>
  `;

  const checkSvg = `
    <svg class="feat-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `;

  const arrowSvg = `
    <svg class="feat-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  `;

  const splashesHtml = `
    <div class="grid-splash" style="left:30px; top:40px; background:var(--blue); animation-delay:0s;"></div>
    <div class="grid-splash" style="left:105px; top:80px; background:var(--yellow); animation-delay:0.6s;"></div>
    <div class="grid-splash" style="left:180px; top:30px; background:var(--green); animation-delay:1.2s;"></div>
    <div class="grid-splash" style="left:240px; top:100px; background:var(--purple); animation-delay:1.8s;"></div>
  `;

  root.innerHTML = `
    <div class="container">
      <div class="transparency-editorial-box">
        <div class="section-header">
          <h2>Apa yang Dikerjakan AI, Apa yang Dikerjakan Kami</h2>
          <p>Transparansi pembagian peran kerja agar hasil optimal, efisien, dan tepat sasaran.</p>
        </div>

        <div class="transparency-visual-banner paper-grid">
          ${splashesHtml}
          <div class="banner-glass-pill">
            <span class="pill-dot" style="background:var(--green);"></span>
            <span>Kolaborasi Cerdas: Kecerdasan Buatan + Ketajaman Editor</span>
          </div>
        </div>

        <div class="transparency-cols-grid">
          <div class="transparency-col-card">
            <div class="trans-col-badge">Teknologi</div>
            <h3 class="trans-col-title">AI Membantu</h3>
            <ul class="trans-col-list">
              <li>
                <span class="icon-wrap">${sparkSvg}</span>
                <div>
                  <strong>Voice over suara natural</strong>
                  <p>Narasi vokal jernih dengan nada ramah dan intonasi pas.</p>
                </div>
              </li>
              <li>
                <span class="icon-wrap">${sparkSvg}</span>
                <div>
                  <strong>Pembuatan visual 3D sinematik</strong>
                  <p>Eksplorasi ruang dan pencahayaan dinamis berbasis teknologi AI modern.</p>
                </div>
              </li>
              <li>
                <span class="icon-wrap">${sparkSvg}</span>
                <div>
                  <strong>Pembuatan visual per scene</strong>
                  <p>Aset visual pendukung untuk memperkuat ilustrasi tiap adegan cerita.</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="transparency-col-card card-featured">
            <div class="trans-col-badge badge-dark">Sentuhan Manusia</div>
            <h3 class="trans-col-title">Kami Kerjakan</h3>
            <ul class="trans-col-list">
              <li>
                <span class="icon-wrap">${checkSvg}</span>
                <div>
                  <strong>Memilih momen terbaik</strong>
                  <p>Kurasi hook penahan perhatian dari rekaman panjang (Clipper Plus).</p>
                </div>
              </li>
              <li>
                <span class="icon-wrap">${checkSvg}</span>
                <div>
                  <strong>Penyuntingan & ritme</strong>
                  <p>Memotong jeda hening, mengatur pacing, dan dinamika transisi.</p>
                </div>
              </li>
              <li>
                <span class="icon-wrap">${checkSvg}</span>
                <div>
                  <strong>Penyusunan scene & alur</strong>
                  <p>Menata urutan visual agar pesan cerita mudah dipahami penonton.</p>
                </div>
              </li>
              <li>
                <span class="icon-wrap">${checkSvg}</span>
                <div>
                  <strong>Subtitle & tipografi</strong>
                  <p>Penataan teks bergerak, penekanan warna, dan koreksi salah ketik.</p>
                </div>
              </li>
              <li>
                <span class="icon-wrap">${checkSvg}</span>
                <div>
                  <strong>Sound design & revisi</strong>
                  <p>Tata musik scoring, efek suara foley/SFX, dan pengerjaan revisi.</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="transparency-col-card">
            <div class="trans-col-badge">Kesiapan Proyek</div>
            <h3 class="trans-col-title">Dari Anda</h3>
            <ul class="trans-col-list">
              <li>
                <span class="icon-wrap">${arrowSvg}</span>
                <div>
                  <strong>Bahan mentah atau naskah</strong>
                  <p>File video rekaman, podcast, audio wawancara, atau naskah cerita.</p>
                </div>
              </li>
              <li>
                <span class="icon-wrap">${arrowSvg}</span>
                <div>
                  <strong>Sketsa, denah, atau foto acuan</strong>
                  <p>Khusus paket visual arsitektur/3D sebagai panduan massa bangunan.</p>
                </div>
              </li>
              <li>
                <span class="icon-wrap">${arrowSvg}</span>
                <div>
                  <strong>Video referensi gaya</strong>
                  <p>Contoh video acuan untuk warna, ritme, atau tipografi yang disukai.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="transparency-closing-pill">
          <span>Dengan begini Anda tahu persis apa yang Anda beli dan apa yang perlu Anda siapkan.</span>
        </div>
      </div>
    </div>
  `;
}

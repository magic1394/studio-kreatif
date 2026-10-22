export function renderTransparency() {
  const root = document.getElementById('transparency-root');
  if (!root) return;

  root.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>Apa yang Dikerjakan AI, Apa yang Dikerjakan Kami</h2>
        <p>Transparansi pembagian peran kerja agar hasil optimal, efisien, dan tepat sasaran.</p>
      </div>

      <div class="transparency-grid">
        <div class="transparency-col">
          <div class="transparency-header">
            <span class="col-pill">Teknologi</span>
            <h3>AI Membantu</h3>
          </div>
          <ul class="transparency-list">
            <li>
              <span class="icon">✦</span>
              <div>
                <strong>Voice Over Suara Natural</strong>
                <p>Narasi vokal jernih dengan nada ramah dan intonasi pas.</p>
              </div>
            </li>
            <li>
              <span class="icon">✦</span>
              <div>
                <strong>Pembuatan Visual 3D Sinematik</strong>
                <p>Eksplorasi ruang dan pencahayaan dinamis berbasis teknologi AI modern.</p>
              </div>
            </li>
            <li>
              <span class="icon">✦</span>
              <div>
                <strong>Pembuatan Visual Per Scene</strong>
                <p>Aset visual pendukung untuk memperkuat ilustrasi tiap adegan cerita.</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="transparency-col featured">
          <div class="transparency-header">
            <span class="col-pill dark">Sentuhan Manusia</span>
            <h3>Kami Kerjakan</h3>
          </div>
          <ul class="transparency-list">
            <li>
              <span class="icon">✓</span>
              <div>
                <strong>Memilih Momen Terbaik</strong>
                <p>Kurasi hook penahan perhatian dari rekaman panjang (Clipper Plus).</p>
              </div>
            </li>
            <li>
              <span class="icon">✓</span>
              <div>
                <strong>Penyuntingan & Ritme</strong>
                <p>Memotong jeda hening, mengatur pacing, dan dinamika transisi.</p>
              </div>
            </li>
            <li>
              <span class="icon">✓</span>
              <div>
                <strong>Penyusunan Scene & Alur</strong>
                <p>Menata urutan visual agar pesan cerita mudah dipahami penonton.</p>
              </div>
            </li>
            <li>
              <span class="icon">✓</span>
              <div>
                <strong>Subtitle & Tipografi</strong>
                <p>Penataan teks bergerak, penekanan warna, dan koreksi salah ketik.</p>
              </div>
            </li>
            <li>
              <span class="icon">✓</span>
              <div>
                <strong>Sound Design & Revisi</strong>
                <p>Tata musik scoring, efek suara foley/SFX, dan pengerjaan revisi.</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="transparency-col">
          <div class="transparency-header">
            <span class="col-pill">Kesiapan Proyek</span>
            <h3>Dari Anda</h3>
          </div>
          <ul class="transparency-list">
            <li>
              <span class="icon">➜</span>
              <div>
                <strong>Bahan Mentah atau Naskah</strong>
                <p>File video rekaman, podcast, audio wawancara, atau naskah cerita.</p>
              </div>
            </li>
            <li>
              <span class="icon">➜</span>
              <div>
                <strong>Sketsa, Denah, atau Foto Acuan</strong>
                <p>Khusus paket visual arsitektur/3D sebagai panduan massa bangunan.</p>
              </div>
            </li>
            <li>
              <span class="icon">➜</span>
              <div>
                <strong>Video Referensi Gaya</strong>
                <p>Contoh video acuan untuk warna, ritme, atau tipografi yang disukai.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="transparency-closing">
        <p>Dengan begini Anda tahu persis apa yang Anda beli dan apa yang perlu Anda siapkan.</p>
      </div>
    </div>
  `;
}

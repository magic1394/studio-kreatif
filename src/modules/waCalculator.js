import { formatRupiah, buildWhatsAppUrl } from './utils.js';

export function initWaCalculator(servicesData, siteConfig) {
  const root = document.getElementById('calculator-root');
  if (!root) return null;

  const packages = servicesData.packages;
  const addons = servicesData.addons || [];

  const optionsHtml = packages
    .map(
      (pkg) =>
        `<option value="${pkg.id}">${pkg.name} — ${formatRupiah(pkg.price)} / ${pkg.unit}</option>`
    )
    .join('');

  const addonsHtml = addons
    .map(
      (ad) => `
      <label class="addon-item">
        <div>
          <strong>${ad.name}</strong>
          <div style="font-size:0.8rem;color:var(--text-secondary);">${ad.desc}</div>
        </div>
        <div style="display:flex;align-items:center;gap:0.65rem;">
          <span style="font-family:var(--font-mono);font-size:0.88rem;color:var(--accent-primary);font-weight:700;">+${formatRupiah(ad.price)}</span>
          <input type="checkbox" class="calc-addon-check" value="${ad.id}" data-price="${ad.price}" data-name="${ad.name}" />
        </div>
      </label>
    `
    )
    .join('');

  root.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>Kalkulator Estimasi Biaya & WhatsApp Gateway</h2>
        <p>Pilih paket layanan dan jumlah durasi/klip. Sistem akan menghitung estimasi investasi dan menyiapkan format pemesanan WhatsApp otomatis.</p>
      </div>

      <div class="calc-wrapper">
        <div class="calc-form">
          <div class="form-group">
            <label for="calc-pkg">1. Pilih Paket Layanan</label>
            <select id="calc-pkg" class="form-control">
              ${optionsHtml}
            </select>
          </div>

          <div class="form-group">
            <label for="calc-qty" id="calc-qty-label">2. Jumlah Durasi (Menit) / Paket Klip</label>
            <input type="number" id="calc-qty" class="form-control" min="1" max="120" value="1" />
          </div>

          <div class="form-group">
            <label>3. Tambahan Layanan Opsional (Add-Ons)</label>
            <div class="addons-grid">
              ${addonsHtml}
            </div>
          </div>

          <div class="form-group">
            <label for="calc-client-name">4. Nama Anda / Brand (Opsional)</label>
            <input type="text" id="calc-client-name" class="form-control" placeholder="Contoh: Bagus — Kanal YouTube Edukasi" />
          </div>

          <div class="form-group">
            <label for="calc-notes">5. Link Bahan Mentah / Link Video Referensi Gaya</label>
            <textarea id="calc-notes" rows="3" class="form-control" placeholder="Tempel link Google Drive bahan mentah atau link video referensi gaya yang diinginkan..."></textarea>
          </div>
        </div>

        <div class="calc-summary">
          <div>
            <h3 style="margin-bottom:1rem;font-size:1.2rem;color:var(--text-primary);">Ringkasan Pesanan</h3>
            <div class="summary-row">
              <span>Paket Terpilih:</span>
              <strong id="sum-pkg-name">-</strong>
            </div>
            <div class="summary-row">
              <span>Harga Satuan:</span>
              <span id="sum-unit-price">-</span>
            </div>
            <div class="summary-row">
              <span>Kuantitas / Durasi:</span>
              <span id="sum-qty">-</span>
            </div>
            <div class="summary-row">
              <span>Tambahan (Add-Ons):</span>
              <span id="sum-addons">-</span>
            </div>
          </div>

          <div>
            <div class="summary-total">
              <span class="label">Estimasi Total Biaya</span>
              <strong id="sum-total-price">Rp 0</strong>
            </div>
            <a id="calc-wa-submit" href="#" target="_blank" rel="noopener" class="btn btn-wa" style="width:100%;padding:1rem;">
              Kirim Pesanan ke WhatsApp Sekarang
            </a>
            <p style="font-size:0.78rem;color:var(--text-muted);text-align:center;margin-top:0.65rem;">
              Belum ada pembayaran di tahap ini. Anda akan terhubung langsung ke WhatsApp Admin Studio Kreatif untuk diskusi & konfirmasi bahan.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const pkgSelect = document.getElementById('calc-pkg');
  const qtyInput = document.getElementById('calc-qty');
  const qtyLabel = document.getElementById('calc-qty-label');
  const addonChecks = root.querySelectorAll('.calc-addon-check');
  const clientNameInput = document.getElementById('calc-client-name');
  const notesInput = document.getElementById('calc-notes');

  const sumPkgName = document.getElementById('sum-pkg-name');
  const sumUnitPrice = document.getElementById('sum-unit-price');
  const sumQty = document.getElementById('sum-qty');
  const sumAddons = document.getElementById('sum-addons');
  const sumTotalPrice = document.getElementById('sum-total-price');
  const waSubmitBtn = document.getElementById('calc-wa-submit');

  function recalculate() {
    const selectedPkg = packages.find((p) => p.id === pkgSelect.value) || packages[0];
    const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);

    qtyLabel.textContent = `2. Jumlah (${selectedPkg.unit} Hasil Akhir)`;

    let addonsTotal = 0;
    const selectedAddonNames = [];
    addonChecks.forEach((chk) => {
      if (chk.checked) {
        addonsTotal += parseInt(chk.getAttribute('data-price'), 10) || 0;
        selectedAddonNames.push(chk.getAttribute('data-name'));
      }
    });

    const baseSubtotal = selectedPkg.price * qty;
    const grandTotal = baseSubtotal + addonsTotal;

    sumPkgName.textContent = selectedPkg.name;
    sumUnitPrice.textContent = `${formatRupiah(selectedPkg.price)} / ${selectedPkg.unit}`;
    sumQty.textContent = `${qty} x (${selectedPkg.unit})`;
    sumAddons.textContent = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'Tidak ada';
    sumTotalPrice.textContent = formatRupiah(grandTotal);

    const clientName = clientNameInput.value.trim() || 'Klien Website';
    const notes = notesInput.value.trim() || '(Menyusul di chat)';

    const messageLines = [
      `Halo *${siteConfig.brandName}*, saya ingin memesan layanan video dari website:`,
      ``,
      `• *Nama/Brand:* ${clientName}`,
      `• *Paket:* ${selectedPkg.name}`,
      `• *Kuantitas/Durasi:* ${qty} (${selectedPkg.unit})`,
      `• *Add-Ons:* ${selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : '-'}`,
      `• *Estimasi Total:* *${formatRupiah(grandTotal)}*`,
      ``,
      `*Catatan / Link Bahan / Referensi:*`,
      `${notes}`
    ];

    waSubmitBtn.href = buildWhatsAppUrl(siteConfig.whatsappNumber, messageLines.join('\n'));
  }

  pkgSelect.addEventListener('change', recalculate);
  qtyInput.addEventListener('input', recalculate);
  addonChecks.forEach((chk) => chk.addEventListener('change', recalculate));
  clientNameInput.addEventListener('input', recalculate);
  notesInput.addEventListener('input', recalculate);

  recalculate();

  return function selectPackageById(pkgId) {
    if (pkgSelect) {
      pkgSelect.value = pkgId;
      recalculate();
    }
  };
}

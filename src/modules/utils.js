/**
 * Format angka integer menjadi mata uang Rupiah (contoh: Rp 175.000)
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Membuat URL Direct WhatsApp Click-to-Chat
 */
export function buildWhatsAppUrl(phoneNumber, messageText) {
  const cleanPhone = String(phoneNumber).replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

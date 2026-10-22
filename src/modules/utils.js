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

/**
 * Inisialisasi Carousel Horizontal dengan tombol panah (‹ ›), swipe touch, dan mouse drag
 */
export function initCarousel(root, trackId, prevClass, nextClass) {
  const track = root.querySelector(`#${trackId}`);
  if (!track) return null;

  const prevBtns = root.querySelectorAll(`.${prevClass}`);
  const nextBtns = root.querySelectorAll(`.${nextClass}`);

  function getStep() {
    const card = track.querySelector('.pricing-card, .portfolio-card');
    if (card) {
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap) || 24;
      return card.offsetWidth + gap;
    }
    return 360;
  }

  function scroll(direction) {
    const step = getStep();
    track.scrollBy({
      left: direction * step,
      behavior: 'smooth'
    });
  }

  prevBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      scroll(-1);
    });
  });

  nextBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      scroll(1);
    });
  });

  function updateButtonStates() {
    const isAtStart = track.scrollLeft <= 4;
    const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 6;

    prevBtns.forEach((btn) => {
      btn.disabled = isAtStart;
      btn.classList.toggle('disabled', isAtStart);
    });
    nextBtns.forEach((btn) => {
      btn.disabled = isAtEnd;
      btn.classList.toggle('disabled', isAtEnd);
    });
  }

  track.addEventListener('scroll', updateButtonStates, { passive: true });
  // Pastikan tombol ter-update setelah render
  requestAnimationFrame(updateButtonStates);

  // Mouse Drag-to-Scroll untuk kemudahan navigasi desktop
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let hasDragged = false;

  track.addEventListener('mousedown', (e) => {
    if (e.target.closest('button, a, input, select')) return;
    isDown = true;
    hasDragged = false;
    startX = e.pageX - track.offsetLeft;
    scrollStart = track.scrollLeft;
    track.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - track.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) {
      hasDragged = true;
      track.scrollLeft = scrollStart - walk;
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      track.classList.remove('is-dragging');
      setTimeout(() => {
        hasDragged = false;
      }, 60);
    }
  });

  return {
    hasDragged: () => hasDragged,
    update: updateButtonStates
  };
}

// Manual IduScore carousel controls and modal zoom
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.iduscore-carousel');
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const leftBtn = carousel.querySelector('.carousel-arrow.left');
  const rightBtn = carousel.querySelector('.carousel-arrow.right');
  const modal = carousel.querySelector('.carousel-modal');
  const modalImg = carousel.querySelector('.carousel-modal-img');
  const closeBtn = carousel.querySelector('.carousel-close');
  const modalLeftBtn = carousel.querySelector('.modal-arrow.left');
  const modalRightBtn = carousel.querySelector('.modal-arrow.right');
  let current = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === idx);
    });
    current = idx;
  }

  leftBtn.addEventListener('click', function() {
    showSlide((current - 1 + slides.length) % slides.length);
  });
  rightBtn.addEventListener('click', function() {
    showSlide((current + 1) % slides.length);
  });


  let modalIndex = 0;
  slides.forEach((slide, i) => {
    const img = slide.querySelector('img');
    img.addEventListener('click', function() {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalIndex = i;
    });
  });

  function showModalImage(idx) {
    const img = slides[idx].querySelector('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalIndex = idx;
  }

  modalLeftBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showModalImage((modalIndex - 1 + slides.length) % slides.length);
  });
  modalRightBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showModalImage((modalIndex + 1) % slides.length);
  });


  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    modal.style.display = 'none';
    modalImg.src = '';
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });
});
// Update footer year when element is present
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-list a');

if (navToggle && header) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    header.classList.toggle('nav-open', !isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      header.classList.remove('nav-open');
    });
  });
}

const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  if (!slides.length) {
    return;
  }

  let activeIndex = 0;
  const setActive = nextIndex => {
    slides[activeIndex].classList.remove('is-active');
    slides[nextIndex].classList.add('is-active');
    activeIndex = nextIndex;
  };

  slides[0].classList.add('is-active');

  if (slides.length < 2) {
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    return;
  }

  const interval = Number(carousel.dataset.interval) || 4500;
  let timerId = null;

  const start = () => {
    if (timerId || prefersReduced.matches) {
      return;
    }
    timerId = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      setActive(nextIndex);
    }, interval);
  };

  const stop = () => {
    if (!timerId) {
      return;
    }
    window.clearInterval(timerId);
    timerId = null;
  };

  start();

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  prefersReduced.addEventListener('change', event => {
    if (event.matches) {
      stop();
    } else {
      start();
    }
  });
});

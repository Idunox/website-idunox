// IduScore carousel/zoom removed — static image shown instead
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

// Auto-carousel logic removed (static image used)

const toTopBtn = document.querySelector('.to-top');

function updateToTopBtn() {
  toTopBtn.hidden = window.scrollY <= 600;
}

window.addEventListener('scroll', updateToTopBtn, { passive: true });
updateToTopBtn();

toTopBtn.addEventListener('click', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* ===== Scroll spy: подсветка активного пункта меню ===== */
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  const sections = main.querySelectorAll('section[id]');

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, {
    // Учитываем липкую шапку (~5.5rem) и scroll-padding-top: 5.5rem.
    // Активный пункт меняется, когда заголовок секции оказывается
    // примерно в верхней трети экрана.
    rootMargin: '-10% 0px -60% 0px'
  });

  sections.forEach((section) => observer.observe(section));
});

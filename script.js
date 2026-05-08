// ═══════════════════════════════════════════
// АВТОСЛУЖБА — JAVASCRIPT
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
  initContactForm();
  initScrollAnimations();
});

// ─────────────────────────────────────────
// МОБІЛЬНЕ МЕНЮ
// ─────────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-menu');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    nav.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('header')) {
      btn.classList.remove('active');
      nav.classList.remove('active');
    }
  });
}

// ─────────────────────────────────────────
// ХЕДЕР — ПОВЕДІНКА ПРИ СКРОЛІ
// ─────────────────────────────────────────
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;
  let last = 0;

  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    if (cur > last && cur > 120) {
      header.style.transform = 'translateY(-100%)';
      header.style.transition = 'transform 0.3s ease';
    } else {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
    }
    last = cur < 0 ? 0 : cur;
  });
}

// ─────────────────────────────────────────
// ПЛАВНИЙ СКРОЛ
// ─────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = document.querySelector('header')?.offsetHeight || 68;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });
}

// ─────────────────────────────────────────
// ФОРМА ЗВОРОТНЬОГО ЗВ'ЯЗКУ
// ─────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('input[type="text"]')?.value.trim();
    const message = form.querySelector('textarea')?.value.trim();

    if (!name || !message) {
      showToast("Будь ласка, заповніть обов'язкові поля", 'error');
      return;
    }

    showToast('✓ Заявку отримано! Зв\'яжемось із вами найближчим часом.', 'success');
    form.reset();
  });
}

// ─────────────────────────────────────────
// TOAST СПОВІЩЕННЯ
// ─────────────────────────────────────────
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '32px',
    right: '24px',
    padding: '14px 24px',
    fontFamily: "'Barlow', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    zIndex: '9999',
    maxWidth: '380px',
    background: type === 'success' ? '#FF6B00' : type === 'error' ? '#e53e3e' : '#2d3748',
    color: type === 'success' ? '#000' : '#fff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    transform: 'translateY(80px)',
    opacity: '0',
    transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease',
    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }));

  setTimeout(() => {
    toast.style.transform = 'translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// ─────────────────────────────────────────
// АНІМАЦІЇ ПРИ СКРОЛІ
// ─────────────────────────────────────────
function initScrollAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    .anim-hidden { opacity: 0; transform: translateY(28px); }
    .anim-visible { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease; }
  `;
  document.head.appendChild(style);

  const elements = document.querySelectorAll(
    '.service-card, .team-card, .event-card, .feature-item, .side-stat, .contact-row'
  );

  elements.forEach(el => el.classList.add('anim-hidden'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.replace('anim-hidden', 'anim-visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

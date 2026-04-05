// =============================
//  script.js — Portfolio
// =============================

// 1) Dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 2) Theme toggle (dark by default, optional light via .light)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light') root.classList.add('light');

function toggleTheme() {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
}
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

// 3) Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.hasAttribute('hidden') === false;
    mobileMenu.toggleAttribute('hidden');
    hamburger.setAttribute('aria-expanded', String(!isOpen));
  });
}

// Allow closing menu from links (called inline in index.html)
function closeMenu() {
  if (window.innerWidth < 960 && mobileMenu) mobileMenu.setAttribute('hidden', '');
}
window.closeMenu = closeMenu; // expose globally for inline onclick

// 4) Contact form via mailto: (simple client-side fallback)
function sendMail(e) {
  e.preventDefault();
  const name = document.getElementById('name')?.value.trim() || '';
  const email = document.getElementById('email')?.value.trim() || '';
  const message = document.getElementById('message')?.value.trim() || '';
  const subject = encodeURIComponent('Portfolio Inquiry from ' + (name || 'Website Visitor'));
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:sanamkhansona123@gmail.com?subject=${subject}&body=${body}`;
}
window.sendMail = sendMail; // expose globally for inline onsubmit

// 5) Subtle reveal animations on scroll
const animateObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  },
  { threshold: 0.12 }
);

[...document.querySelectorAll('.card, .project')].forEach(el => {
  el.style.opacity = 0.001;
  el.style.transform = 'translateY(12px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  animateObserver.observe(el);
});

// style for .in state
const style = document.createElement('style');
style.textContent = `.in{opacity:1 !important; transform:translateY(0) !important;}`;
document.head.appendChild(style);

// 6) (Optional) Replace placeholder alerts/links if any project uses them
const placeholderLinks = document.querySelectorAll('[data-placeholder-link]');
placeholderLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    alert('Replace with your deployed link or repository URL');
  });
});

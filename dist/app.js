'use strict';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let motionEnabled = !reduceMotion.matches;
let storedMotion = null;
try { storedMotion = localStorage.getItem('abinash-motion'); } catch { /* Storage may be unavailable in private mode. */ }
if (storedMotion === 'off') motionEnabled = false;
function updateMotion() {
  document.documentElement.classList.toggle('motion-off', !motionEnabled);
  motionButton.setAttribute('aria-pressed', String(motionEnabled));
  motionButton.setAttribute('aria-label', motionEnabled ? 'Turn off decorative motion' : 'Turn on decorative motion');
  motionButton.querySelector('span').textContent = motionEnabled ? 'Motion on' : 'Motion off';
  motionButton.querySelector('use').setAttribute('href', motionEnabled ? '#pause' : '#play');
}
updateMotion();
motionButton.addEventListener('click', () => {
  motionEnabled = !motionEnabled;
  updateMotion();
  try { localStorage.setItem('abinash-motion', motionEnabled ? 'on' : 'off'); } catch { /* Preference still applies to this visit. */ }
});
reduceMotion.addEventListener('change', (event) => { motionEnabled = !event.matches; updateMotion(); });

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => observer.observe(element));
  document.documentElement.classList.add('js-ready');
}

const heroArt = document.querySelector('.hero-art');
heroArt.addEventListener('pointermove', (event) => {
  if (!motionEnabled || reduceMotion.matches || event.pointerType !== 'mouse') return;
  const bounds = heroArt.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  heroArt.style.setProperty('--portrait-x', `${x * 10}px`);
  heroArt.style.setProperty('--portrait-y', `${y * 6}px`);
  heroArt.style.setProperty('--portrait-rotate', `${x * 4}deg`);
});
heroArt.addEventListener('pointerleave', () => { ['--portrait-x', '--portrait-y', '--portrait-rotate'].forEach((prop) => heroArt.style.removeProperty(prop)); });

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu() { mobileNav.hidden = true; menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open menu'); }
menuToggle.addEventListener('click', () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuToggle.focus(); } });
document.addEventListener('click', (event) => { if (!mobileNav.hidden && !event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 641px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });

const cards = [...document.querySelectorAll('.project-card')];
document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    let count = 0;
    cards.forEach((card) => { const visible = filter === 'all' || card.dataset.categories.split(' ').includes(filter); card.hidden = !visible; if (visible) { count++; card.classList.add('is-visible'); } });
    document.querySelector('.project-count').textContent = `${String(count).padStart(2, '0')} SELECTED PROJECT${count === 1 ? '' : 'S'}`;
  });
});

let toastTimeout;
function notify(message) { const toast = document.querySelector('.toast'); toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => toast.classList.remove('visible'), 4000); }
document.querySelector('.copy-email').addEventListener('click', async () => {
  const email = 'abinashrajasegaran@gmail.com';
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    notify('Email copied. Let’s build something good.');
  } catch {
    const emailLink = document.querySelector('.email-text');
    const range = document.createRange(); range.selectNodeContents(emailLink);
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
    notify('Email selected — press Ctrl+C or long-press to copy.');
    emailLink.focus({ preventScroll: true });
  }
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = document.querySelectorAll('.desktop-nav a');
let scrollQueued = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector('.scroll-progress').style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top < window.innerHeight * 0.42);
  navLinks.forEach((link) => { const active = current && link.hash === `#${current.id}`; link.classList.toggle('is-active', Boolean(active)); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, { passive: true });
updateScroll();
document.querySelector('#year').textContent = new Date().getFullYear();

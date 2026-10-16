'use strict';

const projects = {
  feedback: { title: 'FeedBack — Food Rescue & Distribution', category: 'FULL-STACK WEB APPLICATION / 2026', summary: 'A multi-role platform connecting food vendors, recipients, NGOs, and delivery riders to help reduce food waste and make surplus food accessible.', features: ['Discounted food listings, donation requests, and vendor offers.', 'NGO verification and delivery management across distinct user roles.', 'QR and OTP verification for food pickups, with JWT authentication.'], tags: ['React', 'JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'JWT'], url: 'https://github.com/axxnash/FeedBack--.git', status: 'Preview artwork is an interface concept. Explore the repository for the implementation.' },
  hazard: { title: 'AI-Powered Hazard Detection', category: 'COMPUTER VISION + MOBILE / 2026', summary: 'A mobile application that detects workplace and facility hazards in uploaded or captured images, helping users understand potential risks.', features: ['Multiple YOLOv8 models identify hazards in images.', 'Confidence scoring and severity classification provide context for each detection.', 'AI-generated safety recommendations support the next steps.'], tags: ['Flutter', 'Dart', 'Spring Boot', 'Java', 'Python', 'FastAPI', 'YOLOv8', 'Gemini API'], url: 'https://github.com/axxnash/yolomodel_hazard.git', status: 'Preview artwork is an interface concept. Explore the repository for the implementation.' },
  mushroom: { title: 'AI-Assisted Oyster Mushroom Yield Forecasting', category: 'FINAL YEAR PROJECT / IN DEVELOPMENT', summary: 'An ongoing research project combining IoT environmental monitoring, computer vision, and machine learning to forecast oyster mushroom yields.', features: ['ESP32 and environmental sensors capture growing conditions.', 'YOLO-based segmentation supports visual growth analysis.', 'Random Forest regression predicts yield, with data presented through a web dashboard.'], tags: ['Python', 'ESP32', 'IoT sensors', 'YOLO', 'Scikit-learn', 'Random Forest', 'Computer vision'], url: null, status: 'In development as my final year project.' },
  events: { title: 'AI Event Recommender for Students', category: 'PERSONALIZED RECOMMENDATIONS / 2026', summary: 'A campus activity discovery system that recommends events based on student preferences, making it easier to find relevant activities.', features: ['Embeddings represent student interests and event information.', 'Semantic similarity supports personalized event ranking.', 'A React interface connects to a Python recommendation service and PostgreSQL data layer.'], tags: ['React', 'Vite', 'Python', 'FastAPI', 'PostgreSQL', 'Scikit-learn', 'Pandas', 'NumPy'], url: 'https://github.com/axxnash/ai-project.git', status: 'Preview artwork is an interface concept. Explore the repository for the implementation.' }
};

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

const dialog = document.querySelector('.project-dialog');
let dialogTrigger = null;
document.querySelectorAll('[data-open-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.openProject;
    const project = projects[key];
    dialogTrigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-summary').textContent = project.summary;
    document.querySelector('#dialog-art').setAttribute('href', `assets/project-visuals.svg#${key}`);
    const features = document.querySelector('#dialog-features');
    features.replaceChildren(...project.features.map((feature) => { const item = document.createElement('li'); item.textContent = feature; return item; }));
    document.querySelector('#dialog-tags').replaceChildren(...project.tags.map((tag) => { const item = document.createElement('span'); item.textContent = tag; return item; }));
    document.querySelector('#dialog-status').textContent = project.status;
    const link = document.querySelector('#dialog-link');
    link.hidden = !project.url;
    link.style.display = project.url ? '' : 'none';
    if (project.url) link.href = project.url; else link.removeAttribute('href');
    document.body.classList.add('modal-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    document.querySelector('.dialog-close').focus({ preventScroll: true });
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); dialogTrigger?.focus({ preventScroll: true }); });

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

/* ================================================
   CONVERGENCE SUMMIT — script.js
================================================ */

// ── Modal ──────────────────────────────────────
const learnMoreBtn = document.getElementById('learnMoreBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalBox     = document.getElementById('modalBox');
const modalClose   = document.getElementById('modalClose');

function openModal() {
  modalOverlay.classList.add('active');
  document.body.classList.add('locked');
}
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.classList.remove('locked');
}

learnMoreBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (!modalBox.contains(e.target)) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeModal(); closePanel(); }
});

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.submit-btn');
  btn.textContent = 'Thank you!';
  setTimeout(() => {
    closeModal();
    btn.textContent = 'Submit';
    e.target.reset();
  }, 1800);
}

// ── Chair Cards — independent expand/collapse ──
const chairCards = document.querySelectorAll('.chair-card');

chairCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});

function closePanel() {}

// ── Agenda: day nav sidebar ────────────────────
const dayNavBtns = document.querySelectorAll('.day-nav-btn');

dayNavBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.getAttribute('data-target'));
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 80 - 16;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

const agendaCards = document.querySelectorAll('.agenda-card[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      dayNavBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-target') === id);
      });
    }
  });
}, { rootMargin: '-15% 0px -75% 0px', threshold: 0 });

agendaCards.forEach(card => observer.observe(card));

// ── Hamburger menu ─────────────────────────────
const navHamburger = document.getElementById('navHamburger');
const navLinks     = document.getElementById('navLinks');

if (navHamburger) {
  navHamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navHamburger.classList.toggle('open', isOpen);
    document.body.classList.toggle('locked', isOpen);
  });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navHamburger.classList.remove('open');
    document.body.classList.remove('locked');
  });
});

// ── Smooth scroll with nav offset ─────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

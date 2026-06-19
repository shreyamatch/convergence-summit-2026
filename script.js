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

// ── Chair Panel (opens RIGHT) ──────────────────
const chairCards   = document.querySelectorAll('.chair-card');
const chairPanel   = document.getElementById('chairPanel');
const panelOverlay = document.getElementById('panelOverlay');
const panelClose   = document.getElementById('panelClose');

const chairData = {
  '1': {
    institution: 'UCLA Health',
    name:        'Aditya Bardia',
    credentials: 'MD, MPH',
    image:       'assets/large-OBR24-0004A6_Bardia-3000x2000.jpg',
    role:        'Professor of Medicine & Director of Translational Research Integration at UCLA Health',
    bio:         'Dr. Aditya Bardia is a distinguished oncologist and physician-scientist at UCLA Health whose research spans breast cancer, antibody-drug conjugates, and precision oncology. He has led landmark clinical trials evaluating novel ADC regimens in solid tumors and is internationally recognized for his work on translational research integration — bridging laboratory discovery and clinical implementation. Dr. Bardia\'s contributions have shaped guidelines for HER2-targeted therapies and TROP2-directed ADCs, and his leadership in multi-center collaborative networks has accelerated the development of next-generation antibody-based therapies.'
  },
  '2': {
    institution: 'Stanford Cancer Institute',
    name:        'Mark Pegram',
    credentials: 'MD',
    image:       'assets/Mark_Pegram_3_2_ratio.jpg',
    role:        'Suzy Yuan-Huey Hung Endowed Professor of Medical Oncology & Associate Director of Clinical Research at the Stanford Cancer Institute',
    bio:         'Dr. Mark Pegram is an internationally recognized oncologist and researcher at the Stanford Cancer Institute, known for his seminal contributions to the development and clinical application of HER2-targeted therapies and bi-specific antibody medicines. As Associate Director of Clinical Research, he oversees a portfolio of investigator-initiated and multi-institutional trials, and has been instrumental in establishing Stanford as a leading site for novel antibody-based trial design. His work continues to define best practices for patient selection, response monitoring, and safety management across both hematologic malignancies and solid tumors.'
  }
};

function openPanel(chairId) {
  const d = chairData[chairId];
  if (!d) return;
  const img = document.getElementById('panelImage');
  img.src = d.image;
  img.alt = d.name;
  document.getElementById('panelInstitution').textContent = d.institution;
  document.getElementById('panelName').textContent        = d.name;
  document.getElementById('panelCredentials').textContent = d.credentials;
  document.getElementById('panelRole').textContent        = d.role;
  document.getElementById('panelDescription').textContent = d.bio;

  chairPanel.classList.add('open');
  panelOverlay.classList.add('active');
  document.body.classList.add('locked');
}

function closePanel() {
  chairPanel.classList.remove('open');
  panelOverlay.classList.remove('active');
  document.body.classList.remove('locked');
}

chairCards.forEach(card => {
  card.addEventListener('click', () => openPanel(card.getAttribute('data-chair')));
});
panelClose.addEventListener('click', closePanel);
panelOverlay.addEventListener('click', closePanel);

// ── Agenda: sticky date updates on scroll ──────
const agendaDays = document.querySelectorAll('.agenda-day');
const dateMonth  = document.getElementById('dateMonth');
const dateNumber = document.getElementById('dateNumber');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const m = entry.target.getAttribute('data-day-month');
      const n = entry.target.getAttribute('data-day-num');
      if (m && n) {
        dateMonth.textContent  = m;
        dateNumber.textContent = n;
      }
    }
  });
}, { rootMargin: '-15% 0px -75% 0px', threshold: 0 });

agendaDays.forEach(day => observer.observe(day));

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

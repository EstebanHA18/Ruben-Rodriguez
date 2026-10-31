/**
 * Rubén Rodríguez - Official Creator Platform
 * Interactive UX, Dynamic Animations & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initMobileMenu();
  initStatCounters();
  initCardSpotlight();
  initNavbarScrollSpy();
  initContactForm();
  initPhotoDetector();
});

/* 1. Cursor Glow Follower */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  // Only run on desktop devices with hover support
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  } else {
    glow.style.display = 'none';
  }
}

/* 2. Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navPanel = document.getElementById('mobileNavPanel');

  if (!toggleBtn || !navPanel) return;

  toggleBtn.addEventListener('click', () => {
    navPanel.classList.toggle('open');
    const isOpen = navPanel.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });

  // Close panel on link click
  navPanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navPanel.classList.remove('open');
      toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });
  });
}

/* 3. Number Counter Animation with IntersectionObserver */
function initStatCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.getAttribute('data-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic function
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * targetNum);

          el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.textContent = `${prefix}${targetNum.toLocaleString()}${suffix}`;
          }
        }

        requestAnimationFrame(updateNumber);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

/* 4. Interactive Card Spotlight (Mouse-tracking glow on cards) */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.pillar-card, .platform-big-card, .portrait-wrapper');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* 5. Navbar ScrollSpy and Active Links */
function initNavbarScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 6. Form Submission Handling with feedback */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;

    // Simulated reliable dispatch / webhook
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.innerHTML = `
          <div style="background: #141414; border: 1px solid rgba(255, 255, 255, 0.2); color: #FFFFFF; padding: 1rem 1.25rem; border-radius: 12px; font-size: 0.9rem; margin-top: 1rem;">
            ✓ <strong>¡Mensaje recibido con éxito!</strong> El equipo de Rubén Rodríguez se pondrá en contacto a la brevedad.
          </div>
        `;
        setTimeout(() => {
          alertBox.style.display = 'none';
        }, 6000);
      }
    }, 900);
  });
}

/* 7. Automatic Real Photo Detection */
function initPhotoDetector() {
  const imgEl = document.getElementById('rubenPhoto');
  if (!imgEl) return;

  // Try loading real image if placed at assets/images/ruben.jpg or ruben.png
  const testImg = new Image();
  testImg.src = 'assets/images/ruben.jpg';
  testImg.onload = () => {
    imgEl.src = 'assets/images/ruben.jpg';
  };
}

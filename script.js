/* ============================================================
   Portfolio JS — Himanshu Garg
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Year ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Interactive Cursor ── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const glow = document.getElementById('cursorGlow');

  if (dot && ring && glow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left  = mouseX + 'px';
      dot.style.top   = mouseY + 'px';
      glow.style.left = mouseX + 'px';
      glow.style.top  = mouseY + 'px';
    });

    // Smooth ring follow with lag
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state on interactive elements
    const hoverTargets = 'a, button, .btn, .skill-card, .project-card, .cert-card, .highlight-card, .contact-btn, .nav-cta, input, textarea';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      });
    });

    // Click state
    document.addEventListener('mousedown', () => ring.classList.add('clicking'));
    document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  /* ── Scroll progress ── */
  const progressBar = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const scrollTop  = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── Navbar scrolled state ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ── Active nav link highlight ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Typing animation ── */
  const roles = [
    'Full-Stack Web Developer',
    'BE CSE (AI/ML) Student',
    'Azure AI-900 Certified',
    'Vibe Coder ✨',
    'Python • Java • C Enthusiast'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typedEl = document.getElementById('typed-role');
  const TYPING_SPEED  = 70;
  const DELETING_SPEED = 40;
  const PAUSE_END     = 1800;
  const PAUSE_START   = 400;

  function typeRole() {
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeRole, PAUSE_END);
        return;
      }
      setTimeout(typeRole, TYPING_SPEED);
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeRole, PAUSE_START);
        return;
      }
      setTimeout(typeRole, DELETING_SPEED);
    }
  }
  setTimeout(typeRole, 600);

  /* ── Scroll reveal (Intersection Observer) ── */
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObs.observe(el));

  /* ── Counter animation ── */
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let count = 0;
      const step = () => {
        count++;
        el.textContent = count;
        if (count < target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));

  /* ── Particles ── */
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 30;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay    = (Math.random() * 10) + 's';
    const hue = Math.random() > 0.5 ? '262' : '190';
    p.style.background = `hsl(${hue}, 83%, 62%)`;
    particlesContainer.appendChild(p);
  }

  /* ── Project thumbnail placeholders (gradient fallback) ── */
  const gradients = [
    'linear-gradient(135deg, hsl(262,60%,28%), hsl(190,60%,22%))',
    'linear-gradient(135deg, hsl(210,50%,25%), hsl(262,55%,30%))',
    'linear-gradient(135deg, hsl(190,55%,24%), hsl(262,50%,32%))',
    'linear-gradient(135deg, hsl(280,45%,26%), hsl(190,60%,26%))'
  ];
  document.querySelectorAll('.project-preview img[id^="proj-img-"]').forEach((img, i) => {
    // Only apply gradient fallback if src is empty or image fails
    if (!img.src || img.src.endsWith('/')) {
      img.style.display = 'none';
      img.parentElement.style.background = gradients[i % gradients.length];
      // Add project initials overlay
      const initials = img.alt.split(' ').map(w => w[0]).join('').slice(0, 3);
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
        font-size:2.5rem; font-weight:800; color:hsla(0,0%,100%,.15); letter-spacing:.1em;
        pointer-events:none; z-index:0;
      `;
      overlay.textContent = initials;
      img.parentElement.insertBefore(overlay, img.parentElement.firstChild);
    }
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.parentElement.style.background = gradients[i % gradients.length];
    });
  });

});

/* ═══════════════════════════════════════════════════════════════════
   VIGNESHWARAN S – PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ── PAGE LOADER ────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('loaded');
    initAllAnimations();
  }, 1800);
});

function initAllAnimations() {
  initParticles();
  initTypewriter();
  initTerminal();
  initScrollReveal();
  initSkillBars();
}

/* ── CUSTOM CURSOR ──────────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

/* ── SCROLL PROGRESS BAR ────────────────────────────────────────── */
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop  = document.documentElement.scrollTop;
  const docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = pct + '%';
});

/* ── NAVBAR ─────────────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');

// Create mobile menu
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <ul>
    <li><a href="#hero">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>`;
document.body.insertBefore(mobileMenu, document.body.firstChild.nextSibling);

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  mobileMenu.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)',
       spans[1].style.opacity   = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
    : (spans[0].style.transform = '',
       spans[1].style.opacity   = '',
       spans[2].style.transform = '');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNavLink();
});

function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

/* ── DARK / LIGHT THEME TOGGLE ──────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
let currentTheme  = localStorage.getItem('theme') || 'dark';

applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem('theme', currentTheme);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ── TYPEWRITER EFFECT ──────────────────────────────────────────── */
function initTypewriter() {
  const roles = ['Software Developer', 'Robotics Developer'];
  const el    = document.getElementById('typewriter');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];

    if (deleting) {
      el.textContent = current.substring(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    } else {
      el.textContent = current.substring(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
    }

    setTimeout(type, deleting ? 60 : 110);
  }

  type();
}

/* ── PARTICLES ──────────────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  const count = window.innerWidth < 768 ? 25 : 60;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    const x    = Math.random() * 100;
    const dur  = Math.random() * 15 + 10;
    const del  = Math.random() * 15;

    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${x}%;
      animation-duration: ${dur}s;
      animation-delay: ${del}s;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;

    // Random colors
    const colors = ['#00d4ff', '#7b5ea7', '#00ff88', '#fff'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(p);
  }
}

/* ── TERMINAL ANIMATION ─────────────────────────────────────────── */
function initTerminal() {
  const cmdEl    = document.getElementById('termCmd');
  const outputEl = document.getElementById('termOutput');
  if (!cmdEl || !outputEl) return;

  const sequences = [
    { cmd: 'whoami', out: '> Vigneshwaran S – Full Stack & Robotics Dev' },
    { cmd: 'ls skills/', out: '> Web  IoT  Robotics  UI/UX' },
    { cmd: 'cat passion.txt', out: '> "Building things that matter."' },
    { cmd: 'ping future.dev', out: '> Reply: Bright & Loaded ✓' },
  ];

  let seqIdx = 0;

  function runSequence() {
    const { cmd, out } = sequences[seqIdx % sequences.length];
    typeCmd(cmdEl, cmd, 0, () => {
      outputEl.textContent = out;
      setTimeout(() => {
        outputEl.textContent = '';
        cmdEl.textContent = '';
        seqIdx++;
        setTimeout(runSequence, 400);
      }, 2000);
    });
  }

  function typeCmd(el, text, i, cb) {
    if (i < text.length) {
      el.textContent += text[i];
      setTimeout(() => typeCmd(el, text, i + 1, cb), 80);
    } else { cb(); }
  }

  runSequence();
}

/* ── SKILLS TABS ────────────────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    // Trigger skill bars fill for active panel
    setTimeout(animateSkillBars, 100);
  });
});

/* ── SKILL BARS ─────────────────────────────────────────────────── */
function initSkillBars() {
  animateSkillBars();
}

function animateSkillBars() {
  document.querySelectorAll('.skills-panel.active .skill-fill').forEach(fill => {
    const w = fill.dataset.width;
    setTimeout(() => { fill.style.width = w + '%'; }, 100);
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger skill bars when skills section enters view
        if (entry.target.closest('.skills')) animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el, i) => {
    const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay') || '0');
    el.style.transitionDelay = delay + 's';
    observer.observe(el);
  });
}

/* ── BUTTON RIPPLE EFFECT ───────────────────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.setAttribute('style', (btn.getAttribute('style') || '') + ' position: relative; overflow: hidden;');
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left - 5) + 'px';
    ripple.style.top  = (e.clientY - rect.top - 5) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ── CONTACT FORM (Formspree → vigneshwaran2782006@gmail.com) ────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type="submit"]');
    const origHTML = btn.innerHTML;

    btn.innerHTML = '<span>Sending…</span> <i class="fas fa-circle-notch fa-spin"></i>';
    btn.disabled  = true;

    try {
      const data = new FormData(contactForm);

      const res = await fetch(contactForm.action, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.innerHTML = '<span>Message Sent! ✓</span> <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #00b360)';
        contactForm.reset();
        // Reset floating labels
        contactForm.querySelectorAll('input, textarea').forEach(el => el.blur());
      } else {
        const json = await res.json();
        throw new Error(json.error || 'Form submission failed');
      }
    } catch (err) {
      btn.innerHTML = '<span>Failed – Try Again</span> <i class="fas fa-exclamation-triangle"></i>';
      btn.style.background = 'linear-gradient(135deg, #ff4444, #aa0000)';
      console.error('Form error:', err);
    }

    btn.disabled = false;
    setTimeout(() => {
      btn.innerHTML  = origHTML;
      btn.style.background = '';
    }, 4000);
  });
}

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── PARALLAX HERO BG ───────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const scrolled = window.scrollY;
  hero.style.backgroundPositionY = scrolled * 0.4 + 'px';
  const particles = document.getElementById('particles');
  if (particles) particles.style.transform = `translateY(${scrolled * 0.2}px)`;
});

/* ── PROJECT CARD TILT ──────────────────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── SECTION HEADER COUNTER ANIMATION ──────────────────────────── */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const endVal = parseInt(el.textContent);
        const suffix = el.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const step = endVal / 40;
        const timer = setInterval(() => {
          current = Math.min(current + step, endVal);
          el.textContent = Math.round(current) + suffix;
          if (current >= endVal) clearInterval(timer);
        }, 40);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statObserver.observe(el));

/* ── FEATURED PROJECT SHINE ─────────────────────────────────────── */
const fp = document.querySelector('.featured-project');
if (fp) {
  fp.addEventListener('mousemove', (e) => {
    const rect = fp.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    fp.style.setProperty('--shine-x', x + '%');
    fp.style.setProperty('--shine-y', y + '%');
  });
}

/* ── TIMELINE DRAW ON SCROLL ────────────────────────────────────── */
const timelineObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.opacity    = '0';
  item.style.transform  = 'translateY(30px)';
  item.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
  timelineObs.observe(item);
});

/* ── SERVICE CARD MOUSE GLOW ────────────────────────────────────── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,212,255,0.06), var(--bg-card) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ── SKILL CARD MAGNETIC ─────────────────────────────────────────── */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease';
  });
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width / 2) / rect.width * 10;
    const dy   = (e.clientY - rect.top - rect.height / 2) / rect.height * 10;
    this.style.transform = `translateY(-3px) rotateX(${-dy}deg) rotateY(${dx}deg)`;
  });
  card.addEventListener('mouseleave', function () {
    this.style.transition = '';
    this.style.transform = '';
  });
});

console.log('%c ✦ Vigneshwaran S – Portfolio Loaded ✦ ', 'background: linear-gradient(135deg,#00d4ff,#7b5ea7); color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;');

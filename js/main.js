// ===========================================================
// Anna Turchyna site, shared behavior (vanilla JS, no dependencies)
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- header scroll state ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- side drawer menu ---------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const navBackdrop = document.querySelector('[data-nav-backdrop]');
  const closeBtn = document.querySelector('.mobile-nav .close-btn');
  const openNav = () => { mobileNav?.classList.add('open'); navBackdrop?.classList.add('open'); };
  const closeNav = () => { mobileNav?.classList.remove('open'); navBackdrop?.classList.remove('open'); };
  if (burger && mobileNav) {
    burger.addEventListener('click', openNav);
    closeBtn?.addEventListener('click', closeNav);
    navBackdrop?.addEventListener('click', closeNav);
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  }

  /* ---------- process accordion ---------- */
  const processAccordion = document.querySelector('.process-accordion');
  if (processAccordion) {
    const rows = processAccordion.querySelectorAll('.process-row');
    rows.forEach(row => {
      const head = row.querySelector('.process-row-head');
      head?.addEventListener('click', () => {
        const isOpen = row.classList.contains('is-open');
        rows.forEach(r => r.classList.remove('is-open'));
        if (!isOpen) row.classList.add('is-open');
      });
    });
  }

  /* ---------- marquee prev/next arrows (mobile swipeable rows) ---------- */
  document.querySelectorAll('.marquee-arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      const track = document.getElementById(btn.getAttribute('data-marquee-target'));
      const marquee = track?.closest('.marquee');
      if (!marquee) return;
      const dir = btn.classList.contains('prev') ? -1 : 1;
      marquee.scrollBy({ left: dir * marquee.clientWidth * 0.88, behavior: 'smooth' });
    });
  });

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el, i) => {
      el.style.setProperty('--i', i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- count-up numbers ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = el.getAttribute('data-count');
    const match = target.match(/^([^\d]*)(\d+)([^\d]*)$/);
    if (!match) { el.textContent = target; return; }
    const [, prefix, num, suffix] = match;
    const end = parseInt(num, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => countIo.observe(el));
  }

  /* ---------- hero active mesh (each blob drifts on its own rhythm and
     is magnetically pulled toward the cursor at its own speed/strength,
     so the gradient reads as active/alive rather than a faint parallax
     backdrop) ---------- */
  const hero = document.querySelector('.hero');
  const activeMesh = hero?.querySelector('.mesh.active');
  const activeBlobs = activeMesh ? Array.from(activeMesh.querySelectorAll('.blob')) : [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (hero && activeBlobs.length && !prefersReducedMotion && hasFinePointer) {
    activeMesh.classList.add('js-driven');
    // Per-blob personality. Drift is the sum of TWO independent sine waves
    // per axis (different frequencies/phases), so each path looks like an
    // organic wobble instead of a clean circle/ellipse. The cursor pull is
    // rotated by its own angle per blob (pullAngle), so blobs don't all
    // beeline for the same point the moment the mouse moves - some react
    // at an angle, some barely react at all - which is what actually reads
    // as "chaotic" rather than "shapes chasing the pointer."
    const BLOB_CONFIG = [
      { fx1:0.28, fy1:0.19, fx2:0.53, fy2:0.41, p1:0.0, p2:1.3, ax1:30, ax2:18, ay1:22, ay2:14, pull:140, pullAngle:0,    ease:0.045, scaleAmp:0.06, scaleFreq:0.15 },
      { fx1:0.19, fy1:0.24, fx2:0.37, fy2:0.31, p1:2.1, p2:0.4, ax1:40, ax2:22, ay1:30, ay2:16, pull:95,  pullAngle:35,  ease:0.07,  scaleAmp:0.08, scaleFreq:0.12 },
      { fx1:0.33, fy1:0.15, fx2:0.61, fy2:0.44, p1:4.2, p2:2.6, ax1:24, ax2:16, ay1:34, ay2:20, pull:170, pullAngle:-25, ease:0.03,  scaleAmp:0.05, scaleFreq:0.2 },
      { fx1:0.44, fy1:0.36, fx2:0.71, fy2:0.52, p1:1.0, p2:3.4, ax1:20, ax2:26, ay1:18, ay2:24, pull:60,  pullAngle:110, ease:0.09,  scaleAmp:0.1,  scaleFreq:0.25 },
      { fx1:0.12, fy1:0.16, fx2:0.27, fy2:0.21, p1:3.0, p2:5.1, ax1:34, ax2:20, ay1:26, ay2:18, pull:40,  pullAngle:-70, ease:0.02,  scaleAmp:0.04, scaleFreq:0.1 },
    ];
    const state = activeBlobs.map(() => ({ curX: 0, curY: 0 }));
    let targetX = 0, targetY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      targetX = (px - 0.5) * 2;
      targetY = (py - 0.5) * 2;
    });
    hero.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });

    const tick = (t) => {
      const time = t / 1000;
      activeBlobs.forEach((blob, i) => {
        const cfg = BLOB_CONFIG[i % BLOB_CONFIG.length];
        const s = state[i];
        s.curX += (targetX - s.curX) * cfg.ease;
        s.curY += (targetY - s.curY) * cfg.ease;

        const driftX = Math.sin(time * cfg.fx1 + cfg.p1) * cfg.ax1 + Math.sin(time * cfg.fx2 + cfg.p2) * cfg.ax2;
        const driftY = Math.cos(time * cfg.fy1 + cfg.p1) * cfg.ay1 + Math.cos(time * cfg.fy2 + cfg.p2) * cfg.ay2;

        const angleRad = cfg.pullAngle * Math.PI / 180;
        const cosA = Math.cos(angleRad), sinA = Math.sin(angleRad);
        const rotX = s.curX * cosA - s.curY * sinA;
        const rotY = s.curX * sinA + s.curY * cosA;
        const pullX = rotX * cfg.pull;
        const pullY = rotY * cfg.pull;

        const scale = 1 + Math.sin(time * cfg.scaleFreq + cfg.p1) * cfg.scaleAmp;

        blob.style.transform = `translate(${(driftX + pullX).toFixed(1)}px, ${(driftY + pullY).toFixed(1)}px) scale(${scale.toFixed(3)})`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- hero rotating headline word ---------- */
  const rotateEl = document.querySelector('[data-rotate-words]');
  if (rotateEl) {
    let words = [];
    try { words = JSON.parse(rotateEl.getAttribute('data-rotate-words')); } catch (e) { words = []; }
    if (words.length > 1 && !prefersReducedMotion) {
      let wordIndex = 0;
      setInterval(() => {
        rotateEl.classList.add('is-swapping');
        setTimeout(() => {
          wordIndex = (wordIndex + 1) % words.length;
          rotateEl.textContent = words[wordIndex];
          rotateEl.classList.remove('is-swapping');
        }, 450);
      }, 2800);
    }
  }

});

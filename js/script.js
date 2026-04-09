// js/script.js

(function() {
  'use strict';

  // ---------- Navbar scroll effect ----------
  const navbar = document.querySelector('.js-navbar');
  const scrollClass = 'scrolled';

  function updateNavbarOnScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add(scrollClass);
    } else {
      navbar.classList.remove(scrollClass);
    }
  }
  window.addEventListener('scroll', updateNavbarOnScroll);
  updateNavbarOnScroll(); // initial check

  // ---------- Mobile menu toggle ----------
  const hamburger = document.querySelector('.js-hamburger');
  const navCollapse = document.querySelector('.js-nav-collapse');

  if (hamburger && navCollapse) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
      this.setAttribute('aria-expanded', expanded);
      navCollapse.classList.toggle('open');
    });

    // Close mobile menu on link click (optional)
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          hamburger.setAttribute('aria-expanded', 'false');
          navCollapse.classList.remove('open');
        }
      });
    });
  }

  // ---------- Smooth scroll for internal anchor links ----------
  const smoothLinks = document.querySelectorAll('a[href^="#"]:not(.js-smooth)'); // js-smooth is already used on hero arrow, but we handle all
  smoothLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Additional smooth for hero arrow (already has js-smooth class)
  const heroScroll = document.querySelector('.js-smooth');
  if (heroScroll) {
    heroScroll.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href'); // #features
      if (targetId) {
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ---------- Simple fade-in on scroll (Intersection Observer) ----------
  const fadeElements = document.querySelectorAll('.section, .feature-card, .tour-card, .why-albania__grid');
  
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });
  }

  // ---------- Close mobile menu on resize (if open and goes desktop) ----------
  window.addEventListener('resize', function() {
    if (window.innerWidth > 900 && navCollapse && navCollapse.classList.contains('open')) {
      navCollapse.classList.remove('open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  });

})();
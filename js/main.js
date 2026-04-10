/* ============================================================
   I PIERONCINI — main.js
   Funzionalità: hamburger menu, scroll animations, active nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------------
     1. HAMBURGER MENU (mobile)
     -------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navMobile  = document.querySelector('.nav-mobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* --------------------------------------------------------
     2. ACTIVE NAV LINK based on current page
     -------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------------
     3. SCROLL REVEAL ANIMATION
        Adds .visible to elements with .reveal class
        when they enter the viewport
     -------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* --------------------------------------------------------
     4. STICKY HEADER SHADOW on scroll
     -------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,.12)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,.06)';
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------
     5. SMOOTH SCROLL for anchor links (#section)
        (browsers without native smooth scroll support)
     -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------
     6. CONTACT FORM basic validation
     -------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = contactForm.querySelector('#name');
      const email   = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      let valid = true;

      [name, email, message].forEach(function (field) {
        if (!field) return;
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (valid) {
        // TODO: sostituire con integrazione reale (EmailJS, Netlify Forms, ecc.)
        contactForm.innerHTML =
          '<p style="text-align:center;font-size:1.1rem;padding:2rem 0;">' +
          '✅ Messaggio inviato! Vi contatteremo al più presto.</p>';
      }
    });
  }

});

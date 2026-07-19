// app.js - Client-side interactions for DuckWare

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSmoothScroll();
  initLogoWobble();
});

/**
 * Navbar scroll behavior: Add glassmorphism / darker backgrounds when scrolled
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

/**
 * Smooth scrolling for anchors
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}


/**
 * Fun pirate logo micro-interaction (wobble on click/hover)
 */
function initLogoWobble() {
  const logo = document.getElementById('nav-logo');
  if (!logo) return;

  logo.addEventListener('click', (e) => {
    const svg = logo.querySelector('.nav-logo-icon');
    if (!svg) return;

    svg.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    svg.style.transform = 'scale(1.2) rotate(15deg)';
    
    setTimeout(() => {
      svg.style.transform = 'scale(1.2) rotate(-12deg)';
      setTimeout(() => {
        svg.style.transform = 'scale(1) rotate(0deg)';
      }, 150);
    }, 150);
  });
}

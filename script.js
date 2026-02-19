/**
 * Combo Matemática para Concursos - Landing Page
 * JavaScript para animações e interatividade
 */

document.addEventListener('DOMContentLoaded', function() {
  // =========================
  // SCROLL ANIMATIONS
  // =========================
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        
        setTimeout(() => {
          entry.target.classList.add('animate-visible');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
  
  // =========================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // =========================
  // DYNAMIC YEAR IN FOOTER
  // =========================
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // =========================
  // BUTTON CLICK TRACKING
  // =========================
  const ctaButtons = document.querySelectorAll('.btn');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // =========================
  // PARALLAX EFFECT FOR HERO
  // =========================
  const heroImage = document.querySelector('.hero-image-desktop img');
  
  if (heroImage && window.innerWidth > 1024) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.05;
      heroImage.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
  }
  
  // =========================
  // NAVBAR BACKGROUND ON SCROLL
  // =========================
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.style.opacity = '1';
      }
    });
    
    lastScroll = currentScroll;
  }, { passive: true });
  
  // =========================
  // LAZY LOAD IMAGES
  // =========================
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  
  images.forEach(img => imageObserver.observe(img));
  
  // =========================
  // DEPOIMENTOS CARROSSEL
  // =========================
  const carousel = document.getElementById('depoimentosCarousel');
  const track = document.getElementById('depoimentosTrack');
  const dots = document.querySelectorAll('.dot');
  
  if (carousel && track && dots.length > 0) {
    let currentIndex = 0;
    const totalSlides = 3;
    let intervalId;
    let isPaused = false;
    
    function goToSlide(index) {
      currentIndex = index;
      const translateX = -(currentIndex * 33.333);
      track.style.transform = `translateX(${translateX}%)`;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    function nextSlide() {
      const nextIndex = (currentIndex + 1) % totalSlides;
      goToSlide(nextIndex);
    }
    
    function startAutoplay() {
      intervalId = setInterval(nextSlide, 4000);
    }
    
    function stopAutoplay() {
      clearInterval(intervalId);
    }
    
    carousel.addEventListener('mouseenter', () => {
      isPaused = true;
      stopAutoplay();
    });
    
    carousel.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoplay();
    });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        if (!isPaused) {
          stopAutoplay();
          startAutoplay();
        }
      });
    });
    
    goToSlide(0);
    startAutoplay();
  }
  
  // =========================
  // ANALYTICS TRACKING
  // =========================
  const ctaHero = document.getElementById('cta-hero');
  const ctaFinal = document.getElementById('cta-final');
  
  if (ctaHero) {
    ctaHero.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'CTA',
          event_label: 'Hero Button - Combo'
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
          value: 33.12,
          currency: 'BRL'
        });
      }
    });
  }
  
  if (ctaFinal) {
    ctaFinal.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'CTA',
          event_label: 'Final Button - Combo'
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Purchase', { 
          value: 33.12, 
          currency: 'BRL',
          content_ids: ['combo-matematica'],
          content_type: 'product'
        });
      }
    });
  }
  
  // =========================
  // PERFORMANCE OPTIMIZATION
  // =========================
  const preloadLinks = [
    'img/felippe-hero-desktop.png',
    'img/felippe-hero-mobile.png'
  ];
  
  preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    document.head.appendChild(link);
  });
  
  console.log('🚀 Combo Matemática para Concursos - Landing Page Carregada!');
});

// =========================
// CSS ANIMATION KEYFRAMES
// =========================
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
document.head.appendChild(style);
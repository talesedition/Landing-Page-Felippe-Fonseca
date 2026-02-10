/**
 * Matemática do Zero para Concursos - Landing Page
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
        
        // Unobserve after animation
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
      // Add ripple effect
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
    
    // Add shadow to sections when scrolling
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
  // FORM VALIDATION (if needed)
  // =========================
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  });
  
  // =========================
  // DEPOIMENTOS CARROSSEL
  // =========================
  const carousel = document.getElementById('depoimentosCarousel');
  const track = document.getElementById('depoimentosTrack');
  const dots = document.querySelectorAll('.dot');
  
  if (carousel && track) {
    let currentIndex = 0;
    const totalSlides = 6;
    let intervalId;
    let isPaused = false;
    
    // Função para ir para um slide específico
    function goToSlide(index) {
      currentIndex = index;
      const translateX = -(currentIndex * (100 / totalSlides));
      track.style.transform = `translateX(${translateX}%)`;
      
      // Atualiza os dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    // Função para próximo slide
    function nextSlide() {
      const nextIndex = (currentIndex + 1) % totalSlides;
      goToSlide(nextIndex);
    }
    
    // Inicia o carrossel automático
    function startAutoplay() {
      intervalId = setInterval(nextSlide, 4000); // Muda a cada 4 segundos
    }
    
    // Para o carrossel
    function stopAutoplay() {
      clearInterval(intervalId);
    }
    
    // Event listeners para pausar no hover
    carousel.addEventListener('mouseenter', () => {
      isPaused = true;
      stopAutoplay();
    });
    
    carousel.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoplay();
    });
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        // Reseta o intervalo quando clicado manualmente
        if (!isPaused) {
          stopAutoplay();
          startAutoplay();
        }
      });
    });
    
    // Inicia automaticamente
    startAutoplay();
  }
  
  // =========================
  // ANALYTICS TRACKING
  // =========================
  // Track CTA clicks
  const ctaHero = document.getElementById('cta-hero');
  const ctaFinal = document.getElementById('cta-final');
  
  if (ctaHero) {
    ctaHero.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'CTA',
          event_label: 'Hero Button'
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout');
      }
    });
  }
  
  if (ctaFinal) {
    ctaFinal.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'CTA',
          event_label: 'Final Button'
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Purchase', { value: 23.97, currency: 'BRL' });
      }
    });
  }
  
  // =========================
  // PERFORMANCE OPTIMIZATION
  // =========================
  // Preload critical resources
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
  
  console.log('🚀 Landing Page do Prof. Felippe Carregada com Sucesso!');
});

// =========================
// CSS ANIMATION KEYFRAMES (injected via JS)
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
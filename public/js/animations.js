// Animations au scroll avec Intersection Observer
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, this.observerOptions);

    // Observer tous les éléments avec animation
    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .bounce-in, .zoom-in'
    );
    
    animatedElements.forEach(el => {
      el.classList.add('hidden');
      observer.observe(el);
    });
  }
}

// Parallax effect
class ParallaxEffect {
  constructor() {
    this.parallaxElements = document.querySelectorAll('.parallax-section');
    this.init();
  }

  init() {
    if (this.parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      this.parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }
}

// Smooth scroll pour les liens d'ancrage
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  new ParallaxEffect();
  new SmoothScroll();
});

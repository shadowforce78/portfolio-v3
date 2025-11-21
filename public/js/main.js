// Script principal
document.addEventListener('DOMContentLoaded', () => {
  
  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  
  if (mobileMenuToggle && mobileMenuOverlay) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuOverlay.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu en cliquant sur un lien
    mobileMenuOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Language switcher toggle
  const langBtn = document.querySelector('.lang-btn');
  const langSwitcher = document.querySelector('.language-switcher');
  
  if (langBtn && langSwitcher) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSwitcher.classList.toggle('active');
    });
    
    // Fermer le dropdown si on clique ailleurs
    document.addEventListener('click', (e) => {
      if (!langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove('active');
      }
    });
  }

  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Lazy loading pour les images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Typing effect pour le hero (optionnel)
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 500);
  }

  // Analytics (si Google Analytics est configuré)
  if (typeof gtag !== 'undefined') {
    // Track page views
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
    
    // Track clicks sur les projets
    document.querySelectorAll('.project-card, .project-link').forEach(el => {
      el.addEventListener('click', () => {
        gtag('event', 'project_view', {
          event_category: 'engagement',
          event_label: el.dataset.projectId || 'unknown'
        });
      });
    });
    
    // Track téléchargement CV
    document.querySelectorAll('a[href*="download-cv"]').forEach(el => {
      el.addEventListener('click', () => {
        gtag('event', 'cv_download', {
          event_category: 'engagement',
          event_label: 'CV Download'
        });
      });
    });
  }

  // Détection du système de couleurs préféré
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.body.className = e.matches ? 'theme-dark' : 'theme-light';
    }
  });

  // Easter egg - Konami code
  let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 10000);
  }

  console.log('%c👋 Salut! Tu fouilles dans le code ? 🕵️', 'font-size: 20px; color: #8B5CF6; font-weight: bold;');
  console.log('%cSi tu as des questions ou des suggestions, n\'hésite pas à me contacter! 🚀', 'font-size: 14px; color: #3B82F6;');
});

// Animation rainbow pour l'easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Custom cursor
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.follower = document.querySelector('.custom-cursor-follower');
    
    if (!this.cursor || !this.follower) return;
    
    this.cursorPos = { x: 0, y: 0 };
    this.followerPos = { x: 0, y: 0 };
    
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.cursorPos.x = e.clientX;
      this.cursorPos.y = e.clientY;
      
      this.cursor.style.left = `${e.clientX}px`;
      this.cursor.style.top = `${e.clientY}px`;
    });

    // Smooth follow effect
    const animateFollower = () => {
      const distX = this.cursorPos.x - this.followerPos.x;
      const distY = this.cursorPos.y - this.followerPos.y;
      
      this.followerPos.x += distX * 0.1;
      this.followerPos.y += distY * 0.1;
      
      this.follower.style.left = `${this.followerPos.x}px`;
      this.follower.style.top = `${this.followerPos.y}px`;
      
      requestAnimationFrame(animateFollower);
    };
    
    animateFollower();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        this.follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
      this.follower.style.opacity = '1';
    });
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Seulement sur desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    new CustomCursor();
  }
});

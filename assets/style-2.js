// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Theme Toggle Functionality
  const toggleButton = document.getElementById('themeToggle');

  
  
  // Update toggle icon based on theme
  function updateToggleIcon(theme) {
    if (theme === 'dark') {
      toggleButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
    } else {
      toggleButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
        </svg>`;
    }
  }

  

  // Theme toggle event listener
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      let targetTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateToggleIcon(targetTheme);
    });

    // Load saved theme
    let savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);
  }

  // Mobile Menu Toggle
  window.toggleMenu = function() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      mobileMenu.classList.toggle("show");
    }
  };

  window.closeMenu = function() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      mobileMenu.classList.remove("show");
    }
  };

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu && 
        !hamburger.contains(event.target) && 
        !mobileMenu.contains(event.target)) {
      mobileMenu.classList.remove('show');
    }
  });

  // Smooth scroll function
  window.scrollToSection = function(event, sectionId) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Navigation scroll behavior
  function handleNavScroll() {
    const anim = document.getElementById('trade-animation');
    const threshold = anim ? anim.offsetHeight : 0;
    
    if (window.scrollY >= threshold) {
      document.body.classList.add('nav-pinned');
    } else {
      document.body.classList.remove('nav-pinned');
    }
  }

  // Add scroll event listeners
  window.addEventListener('scroll', handleNavScroll, {passive: true});
  window.addEventListener('resize', handleNavScroll);
  handleNavScroll(); // Initial call

  // Trade Animation Canvas
  const canvas = document.getElementById('tradeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = document.getElementById('trade-animation').offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const flows = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.5 + Math.random() * 1,
      length: 80 + Math.random() * 120,
      dotPos: Math.random()
    }));

    function drawFlows() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.5;

      flows.forEach(f => {
        const grad = ctx.createLinearGradient(f.x, f.y, f.x + f.length, f.y);
        grad.addColorStop(0, 'rgba(0,255,200,0.8)');
        grad.addColorStop(1, 'rgba(0,100,255,0)');
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x + f.length, f.y);
        ctx.stroke();

        const dotX = f.x + f.length * f.dotPos;
        const dotY = f.y;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.shadowColor = 'rgba(0,255,200,0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();

        f.x += f.speed;
        f.dotPos += 0.02;
        if (f.dotPos > 1) f.dotPos = 0;
        if (f.x > canvas.width) {
          f.x = -f.length;
          f.y = Math.random() * canvas.height;
          f.speed = 0.5 + Math.random() * 1;
        }
      });

      ctx.shadowBlur = 0;
      requestAnimationFrame(drawFlows);
    }

    drawFlows();
  }

  // Particle Canvas Background
  const particleCanvas = document.getElementById("particleCanvas");
  if (particleCanvas) {
    const pCtx = particleCanvas.getContext("2d");

    function resizeParticleCanvas() {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    }
    
    resizeParticleCanvas();
    window.addEventListener("resize", resizeParticleCanvas);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * particleCanvas.width,
      y: Math.random() * particleCanvas.height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3
    }));

    function drawParticles() {
      pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

      pCtx.fillStyle = "rgba(0, 212, 176, 0.6)";
      particles.forEach(p => {
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        pCtx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = particleCanvas.width;
        if (p.x > particleCanvas.width) p.x = 0;
        if (p.y < 0) p.y = particleCanvas.height;
        if (p.y > particleCanvas.height) p.y = 0;
      });

      requestAnimationFrame(drawParticles);
    }

    drawParticles();
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"], .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href');
      if (sectionId && sectionId !== '#') {
        const section = document.querySelector(sectionId);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Active Section Highlighting
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100; // Offset for better detection

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, {passive: true});
  updateActiveNavLink(); // Initial call

  // Module tooltip functionality (if needed)
  document.querySelectorAll('.module').forEach(module => {
    module.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      if (title) {
        // Could add custom tooltip logic here if needed
      }
    });
  });

  // Page load animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Keyboard accessibility for theme toggle
  if (toggleButton) {
    toggleButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleButton.click();
      }
    });
  }

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateToggleIcon(newTheme);
    }
  });

  // Initialize theme on load
  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (toggleButton) {
    updateToggleIcon(currentTheme);
  }
});

// Error handling for canvas operations
window.addEventListener('error', function(e) {
  console.warn('Canvas error caught:', e.message);
  // Gracefully handle canvas errors without breaking the site
});

// Intersection Observer for animations (optional enhancement)
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements that should animate in
  document.querySelectorAll('.glassmorphic-panel, .project-card, .award-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}



// Publication tabs functionality
// Publication tabs functionality
function showPublicationTab(event, tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.publication-tab-content');
  tabContents.forEach(content => content.classList.remove('active'));

  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll('.publication-tab-button');
  tabButtons.forEach(button => button.classList.remove('active'));

  // Show selected tab content
  document.getElementById(tabName).classList.add('active');

  // Highlight clicked button
  event.currentTarget.classList.add('active');
}







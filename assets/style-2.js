// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const desktopScrollMedia = window.matchMedia('(min-width: 769px)');
  const rightColumn = document.querySelector('.right-column');

  function usesSplitScrollLayout() {
    return desktopScrollMedia.matches && !!rightColumn;
  }

  function getScrollElement() {
    return usesSplitScrollLayout() ? rightColumn : window;
  }

  function getScrollTop() {
    return usesSplitScrollLayout() ? rightColumn.scrollTop : window.scrollY;
  }

  function getScrollMetrics() {
    if (usesSplitScrollLayout()) {
      return {
        top: rightColumn.scrollTop,
        viewport: rightColumn.clientHeight,
        total: rightColumn.scrollHeight
      };
    }

    return {
      top: window.scrollY,
      viewport: window.innerHeight,
      total: document.documentElement.scrollHeight
    };
  }

  function findScrollableAncestor(startNode) {
    let current = startNode instanceof Element ? startNode : startNode?.parentElement;

    while (current && current !== document.body) {
      if (current === rightColumn) {
        return null;
      }

      const style = window.getComputedStyle(current);
      const canScrollY = /(auto|scroll|overlay)/.test(style.overflowY);

      if (canScrollY && current.scrollHeight > current.clientHeight + 1) {
        return current;
      }

      current = current.parentElement;
    }

    return null;
  }

  function canScrollInDirection(element, deltaY) {
    if (!element) {
      return false;
    }

    if (deltaY < 0) {
      return element.scrollTop > 0;
    }

    if (deltaY > 0) {
      return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
    }

    return false;
  }

  function syncGlobalWheelScroll(event) {
    if (!usesSplitScrollLayout()) {
      return;
    }

    const nestedScrollable = findScrollableAncestor(event.target);
    if (nestedScrollable && canScrollInDirection(nestedScrollable, event.deltaY)) {
      return;
    }

    if (event.deltaY === 0) {
      return;
    }

    event.preventDefault();
    rightColumn.scrollBy({
      top: event.deltaY,
      left: event.deltaX,
      behavior: 'auto'
    });
  }

  window.addEventListener('wheel', syncGlobalWheelScroll, { passive: false });
  
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
    
    if (getScrollTop() >= threshold) {
      document.body.classList.add('nav-pinned');
    } else {
      document.body.classList.remove('nav-pinned');
    }
  }

  // Add scroll event listeners
  window.addEventListener('scroll', handleNavScroll, {passive: true});
  if (rightColumn) {
    rightColumn.addEventListener('scroll', handleNavScroll, {passive: true});
  }
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

  // Macro Research Background
  const particleCanvas = document.getElementById("particleCanvas");
  if (particleCanvas) {
    const pCtx = particleCanvas.getContext("2d");
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let pixelRatio = 1;
    let bands = [];
    let hubs = [];
    let routes = [];

    function resizeParticleCanvas() {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      particleCanvas.width = Math.floor(canvasWidth * pixelRatio);
      particleCanvas.height = Math.floor(canvasHeight * pixelRatio);
      pCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function getMacroPalette() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return isDark
        ? {
            wash: 'rgba(8, 18, 32, 0.18)',
            grid: 'rgba(148, 163, 184, 0.075)',
            bandColors: ['rgba(0, 212, 176, 0.24)', 'rgba(96, 165, 250, 0.2)', 'rgba(255, 255, 255, 0.15)'],
            routeLine: 'rgba(148, 163, 184, 0.16)',
            routePulse: 'rgba(255, 255, 255, 0.82)',
            nodeFill: 'rgba(15, 23, 42, 0.9)',
            nodeStroke: 'rgba(255, 255, 255, 0.2)',
            nodeGlow: 'rgba(0, 212, 176, 0.22)',
            policyRing: 'rgba(96, 165, 250, 0.18)'
          }
        : {
            wash: 'rgba(246, 242, 238, 0.12)',
            grid: 'rgba(23, 32, 51, 0.06)',
            bandColors: ['rgba(159, 29, 47, 0.18)', 'rgba(37, 99, 235, 0.15)', 'rgba(23, 32, 51, 0.11)'],
            routeLine: 'rgba(88, 98, 116, 0.16)',
            routePulse: 'rgba(23, 32, 51, 0.68)',
            nodeFill: 'rgba(255, 255, 255, 0.88)',
            nodeStroke: 'rgba(159, 29, 47, 0.18)',
            nodeGlow: 'rgba(159, 29, 47, 0.11)',
            policyRing: 'rgba(37, 99, 235, 0.1)'
          };
    }

    function quadPoint(start, control, end, t) {
      const oneMinusT = 1 - t;
      return {
        x: oneMinusT * oneMinusT * start.x + 2 * oneMinusT * t * control.x + t * t * end.x,
        y: oneMinusT * oneMinusT * start.y + 2 * oneMinusT * t * control.y + t * t * end.y
      };
    }

    function getControlPoint(start, end, curvature) {
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const length = Math.max(Math.hypot(dx, dy), 1);
      const normalX = -dy / length;
      const normalY = dx / length;
      const bend = Math.min(canvasWidth, canvasHeight) * curvature;

      return {
        x: midX + normalX * bend,
        y: midY + normalY * bend
      };
    }

    function bandYAt(x, band, time) {
      return band.baseY
        + Math.sin(x * band.frequency + time * band.speed + band.phase) * band.amplitude
        + Math.cos(x * band.frequency * 0.45 + time * band.speed * 0.75 + band.phase) * band.secondaryAmplitude;
    }

    function buildScene() {
      const isMobile = canvasWidth < 768;
      const baseHubs = isMobile
        ? [
            { x: 0.12, y: 0.24 },
            { x: 0.26, y: 0.72 },
            { x: 0.58, y: 0.42 },
            { x: 0.86, y: 0.24 },
            { x: 0.86, y: 0.76 }
          ]
        : [
            { x: 0.1, y: 0.22 },
            { x: 0.22, y: 0.74 },
            { x: 0.5, y: 0.46 },
            { x: 0.8, y: 0.2 },
            { x: 0.9, y: 0.68 }
          ];

      hubs = baseHubs.map((hub, index) => ({
        x: canvasWidth * hub.x,
        y: canvasHeight * hub.y,
        radius: index === 2 ? 8 : 6,
        ringOffset: Math.random() * Math.PI * 2
      }));

      const bandCount = isMobile ? 3 : 5;
      bands = Array.from({ length: bandCount }, (_, index) => ({
        baseY: canvasHeight * (0.18 + index * (isMobile ? 0.2 : 0.14)),
        amplitude: 12 + index * 2,
        secondaryAmplitude: 6 + index * 1.5,
        frequency: 0.006 + index * 0.00055,
        speed: 0.00024 + index * 0.000035,
        phase: Math.random() * Math.PI * 2,
        thickness: 1 + index * 0.15,
        colorIndex: index % 3,
        pulses: Array.from({ length: isMobile ? 1 : 2 }, () => Math.random())
      }));

      const routeMap = isMobile
        ? [
            [0, 2, 0.12],
            [1, 2, -0.16],
            [2, 3, 0.12],
            [2, 4, -0.14]
          ]
        : [
            [0, 2, 0.12],
            [0, 4, -0.18],
            [1, 2, -0.12],
            [1, 3, 0.18],
            [2, 4, -0.08],
            [3, 4, 0.12]
          ];

      routes = routeMap.map((route, index) => ({
        start: hubs[route[0]],
        end: hubs[route[1]],
        control: getControlPoint(hubs[route[0]], hubs[route[1]], route[2]),
        speed: 0.00004 + index * 0.000006,
        pulses: Array.from({ length: index % 2 === 0 ? 2 : 1 }, () => Math.random())
      }));
    }

    function drawGrid(palette) {
      pCtx.save();
      pCtx.strokeStyle = palette.grid;
      pCtx.lineWidth = 1;
      pCtx.setLineDash([2, 14]);

      const xStep = canvasWidth < 768 ? 110 : 140;
      const yStep = canvasWidth < 768 ? 90 : 110;

      for (let x = 0; x <= canvasWidth; x += xStep) {
        pCtx.beginPath();
        pCtx.moveTo(x, 0);
        pCtx.lineTo(x, canvasHeight);
        pCtx.stroke();
      }

      for (let y = 0; y <= canvasHeight; y += yStep) {
        pCtx.beginPath();
        pCtx.moveTo(0, y);
        pCtx.lineTo(canvasWidth, y);
        pCtx.stroke();
      }

      pCtx.restore();
    }

    function drawBand(band, time, palette) {
      const gradient = pCtx.createLinearGradient(0, band.baseY, canvasWidth, band.baseY);
      gradient.addColorStop(0, 'rgba(255,255,255,0)');
      gradient.addColorStop(0.18, palette.bandColors[band.colorIndex]);
      gradient.addColorStop(0.82, palette.bandColors[(band.colorIndex + 1) % palette.bandColors.length]);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      pCtx.save();
      pCtx.strokeStyle = gradient;
      pCtx.lineWidth = band.thickness;
      pCtx.beginPath();

      for (let x = 0; x <= canvasWidth; x += 22) {
        const y = bandYAt(x, band, time);
        if (x === 0) {
          pCtx.moveTo(x, y);
        } else {
          pCtx.lineTo(x, y);
        }
      }

      pCtx.stroke();
      pCtx.restore();

      band.pulses.forEach((pulseOffset, pulseIndex) => {
        const progress = (pulseOffset + time * band.speed * (pulseIndex % 2 === 0 ? 1 : -0.75) + 10) % 1;
        const x = progress * canvasWidth;
        const y = bandYAt(x, band, time);

        pCtx.save();
        pCtx.fillStyle = palette.routePulse;
        pCtx.globalAlpha = 0.5;
        pCtx.beginPath();
        pCtx.arc(x, y, 2.2, 0, Math.PI * 2);
        pCtx.fill();
        pCtx.restore();
      });
    }

    function drawRoute(route, time, palette) {
      pCtx.save();
      pCtx.strokeStyle = palette.routeLine;
      pCtx.lineWidth = 1.15;
      pCtx.setLineDash([7, 12]);
      pCtx.beginPath();
      pCtx.moveTo(route.start.x, route.start.y);
      pCtx.quadraticCurveTo(route.control.x, route.control.y, route.end.x, route.end.y);
      pCtx.stroke();
      pCtx.restore();

      route.pulses.forEach((pulseOffset, pulseIndex) => {
        const rawProgress = pulseOffset + time * route.speed * (pulseIndex % 2 === 0 ? 1 : -1);
        const progress = ((rawProgress % 1) + 1) % 1;
        const point = quadPoint(route.start, route.control, route.end, progress);

        pCtx.save();
        pCtx.fillStyle = palette.routePulse;
        pCtx.globalAlpha = 0.82;
        pCtx.beginPath();
        pCtx.arc(point.x, point.y, 2.6, 0, Math.PI * 2);
        pCtx.fill();
        pCtx.restore();
      });
    }

    function drawHub(hub, time, palette, isPrimary) {
      const ringGrowth = ((Math.sin(time * 0.0012 + hub.ringOffset) + 1) / 2) * 10;

      pCtx.save();
      pCtx.fillStyle = palette.nodeGlow;
      pCtx.beginPath();
      pCtx.arc(hub.x, hub.y, hub.radius + 12, 0, Math.PI * 2);
      pCtx.fill();

      pCtx.fillStyle = palette.nodeFill;
      pCtx.strokeStyle = palette.nodeStroke;
      pCtx.lineWidth = 1.1;
      pCtx.beginPath();
      pCtx.arc(hub.x, hub.y, hub.radius, 0, Math.PI * 2);
      pCtx.fill();
      pCtx.stroke();

      pCtx.strokeStyle = isPrimary ? palette.policyRing : palette.routeLine;
      pCtx.lineWidth = 1;
      pCtx.beginPath();
      pCtx.arc(hub.x, hub.y, hub.radius + 7 + ringGrowth * 0.35, 0, Math.PI * 2);
      pCtx.stroke();
      pCtx.restore();
    }

    function renderMacroScene(time = 0) {
      const palette = getMacroPalette();
      pCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      pCtx.fillStyle = palette.wash;
      pCtx.fillRect(0, 0, canvasWidth, canvasHeight);

      drawGrid(palette);
      bands.forEach(band => drawBand(band, time, palette));
      routes.forEach(route => drawRoute(route, time, palette));
      hubs.forEach((hub, index) => drawHub(hub, time, palette, index === 2));

      if (!reduceMotion) {
        requestAnimationFrame(renderMacroScene);
      }
    }

    resizeParticleCanvas();
    buildScene();
    window.addEventListener("resize", () => {
      resizeParticleCanvas();
      buildScene();
    });

    renderMacroScene();
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
    const scrollPosition = getScrollTop() + 100; // Offset for better detection

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
      const href = link.getAttribute('href');
      if (href && href.toLowerCase() === `#${current}`.toLowerCase()) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, {passive: true});
  if (rightColumn) {
    rightColumn.addEventListener('scroll', updateActiveNavLink, {passive: true});
  }
  window.addEventListener('resize', updateActiveNavLink);
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




// Scroll Progress Indicator
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  const rightColumn = document.querySelector('.right-column');
  const useSplitScroll = window.matchMedia('(min-width: 769px)').matches && !!rightColumn;
  const totalHeight = useSplitScroll
    ? rightColumn.scrollHeight - rightColumn.clientHeight
    : document.documentElement.scrollHeight - window.innerHeight;
  const currentScroll = useSplitScroll ? rightColumn.scrollTop : window.scrollY;
  
  // Calculate scroll percentage
  const scrollPercentage = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
  
  // Update the width of the red progress bar
  if (scrollProgress) {
    scrollProgress.style.width = Math.min(scrollPercentage, 100) + '%';
  }
}

// Listen for scroll events
window.addEventListener('scroll', updateScrollProgress);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const rightColumn = document.querySelector('.right-column');
  if (rightColumn) {
    rightColumn.addEventListener('scroll', updateScrollProgress, { passive: true });
  }
  window.addEventListener('resize', updateScrollProgress);
  updateScrollProgress();
});



//Mobile Pull-up Button
// Scroll to top function
function scrollToTop() {
    const rightColumn = document.querySelector('.right-column');
    const useSplitScroll = window.matchMedia('(min-width: 769px)').matches && !!rightColumn;

    if (useSplitScroll) {
        rightColumn.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return;
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide button based on scroll position
function updatePullupVisibility() {
    const pullupBtn = document.querySelector('.mobile-pullup-btn');
    const rightColumn = document.querySelector('.right-column');
    const useSplitScroll = window.matchMedia('(min-width: 769px)').matches && !!rightColumn;
    const currentScroll = useSplitScroll ? rightColumn.scrollTop : window.scrollY;

    if (!pullupBtn) {
        return;
    }

    if (currentScroll > 300) {
        pullupBtn.classList.add('visible');
    } else {
        pullupBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', updatePullupVisibility);

// Initialize button on page load
document.addEventListener('DOMContentLoaded', function() {
    const pullupBtn = document.querySelector('.mobile-pullup-btn');
    const rightColumn = document.querySelector('.right-column');
    if (pullupBtn) {
        // Button starts hidden
        pullupBtn.classList.remove('visible');
    }
    if (rightColumn) {
        rightColumn.addEventListener('scroll', updatePullupVisibility, { passive: true });
    }
    window.addEventListener('resize', updatePullupVisibility);
    updatePullupVisibility();
});



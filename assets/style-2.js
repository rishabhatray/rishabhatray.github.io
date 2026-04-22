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
  const particleCanvas = document.getElementById('particleCanvas');
  if (particleCanvas) {
    particleCanvas.style.display = 'none';
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


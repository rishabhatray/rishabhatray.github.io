// Theme Toggle
const toggleButton = document.getElementById('themeToggle');

function updateToggleIcon(theme) {
  if (theme === 'dark') {
    toggleButton.textContent = '☀️'; // Light mode icon
  } else {
    toggleButton.textContent = '🌙'; // Dark mode icon
  }
}

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

// Trade Animation
const canvas = document.getElementById('tradeCanvas');
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
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Live Wallpaper Background (Particles)
const particleCanvas = document.getElementById("particleCanvas");
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

  pCtx.fillStyle = "rgba(0, 212, 176, 0.6)"; // Teal glow
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

// Smooth Scrolling and Active Section Highlighting
document.querySelectorAll('a[href^="#"], .nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const sectionId = this.getAttribute('href');
    if (sectionId) {
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

const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});



/* Hamburger */ 

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <a href="#updates">Updates</a>
  <a href="#publications">Publications</a>
  <a href="#projects">Projects</a>
`;
document.body.appendChild(mobileMenu);

hamburger.addEventListener('click', () => {
  mobileMenu.style.display =
    mobileMenu.style.display === 'block' ? 'none' : 'block';
});










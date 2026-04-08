// Typing effect without layout shrink
const typingEl = document.getElementById("typing");
const phrases = [
  "Frontend Developer",
  "Tech Analyst",
  "UI Specialist"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let typingPaused = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      deleting = true;
      typingPaused = true;
      setTimeout(() => {
        typingPaused = false;
        typeLoop();
      }, 1200);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = deleting ? 70 : 120;
  setTimeout(typeLoop, typingPaused ? 0 : speed);
}

typeLoop();


// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Scroll progress bar
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = (scrollTop / height) * 100;
  progress.style.width = `${pct}%`;
});

// Cursor glow + animated cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const cursorGlow = document.querySelector(".cursor-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let glowX = mouseX;
let glowY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;

  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;
  cursorGlow.style.left = `${glowX}px`;
  cursorGlow.style.top = `${glowY}px`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor elements on touch devices
if (window.matchMedia("(pointer: coarse)").matches) {
  document.querySelector(".cursor-dot").style.display = "none";
  document.querySelector(".cursor-ring").style.display = "none";
  document.querySelector(".cursor-glow").style.display = "none";
}

// Parallax scroll for floating orbs and hero badge
const parallaxItems = document.querySelectorAll("[data-parallax]");

function updateParallax() {
  const scrollY = window.scrollY;

  parallaxItems.forEach((el) => {
    const depth = parseFloat(el.dataset.parallax || "0.1");
    el.style.transform = `translate3d(0, ${scrollY * depth}px, 0)`;
  });
}

window.addEventListener("scroll", updateParallax);
updateParallax();

// 3D tilt cards
const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach((card) => {
  const strength = 12;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * strength;
    const rotateX = -((y - centerY) / centerY) * strength;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

    // optional inner glow movement
    card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.28), ${rotateY * 2}px ${rotateX * 2}px 30px rgba(124,219,255,0.12)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

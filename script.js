// ── CUSTOM CURSOR ──────────────────────────────────────────

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// Update mouse position on every move
document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animation loop — runs ~60 times per second
function animateCursor() {
  // Dot snaps directly to mouse
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';

  // Ring smoothly chases the mouse (lerp = linear interpolation)
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();


// ── SCROLL REVEAL ───────────────────────────────────────────

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // stop watching once visible
    }
  });
}, {
  threshold: 0.12 // trigger when 12% of element is in view
});

revealElements.forEach(function(el) {
  observer.observe(el);
});

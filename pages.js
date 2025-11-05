// Select elements
document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.getElementById("aboutBtn");
  const servicesBtn = document.getElementById("servicesBtn");
  const aboutText = document.querySelector(".t1");
  const servicesText = document.querySelector(".t2");

// Default: show About Us section
  aboutBtn.classList.add("active");
  aboutText.classList.add("active");
  servicesText.classList.remove("active");

// About Us button click
aboutBtn.addEventListener("click", () => {
  aboutBtn.classList.add("active");
  servicesBtn.classList.remove("active");
  aboutText.classList.add("active");
  servicesText.classList.remove("active");
  });

// Services button click
servicesBtn.addEventListener("click", () => {
  servicesBtn.classList.add("active");
  aboutBtn.classList.remove("active");
  servicesText.classList.add("active");
  aboutText.classList.remove("active");
});
});




// WHAT 
const slides = document.querySelectorAll('.what-para');
const nextBtn = document.querySelector('.arrow.next');
const prevBtn = document.querySelector('.arrow.prev');

let current = 0;
let isAnimating = false;


// Initialize slides positions
slides.forEach((slide, i) => {
  slide.style.left = i === 0 ? '0' : '100%'; // first slide visible, others offscreen
  slide.style.opacity = i === 0 ? '1' : '0';
});

function showSlide(newIndex, direction) {
  if (isAnimating || newIndex === current) return;
  isAnimating = true;

  const currentSlide = slides[current];
  const nextSlide = slides[newIndex];

  // Prepare next slide offscreen
  nextSlide.style.left = direction === 'next' ? '100%' : '-100%';
  nextSlide.style.opacity = '1';

  // Force reflow
  void nextSlide.offsetWidth;

  // Animate slides
  currentSlide.style.left = direction === 'next' ? '-100%' : '100%';
  nextSlide.style.left = '0';

  // After transition completes
  setTimeout(() => {
  currentSlide.classList.remove('active');
    current = newIndex;
    isAnimating = false;
  }, 800); // matches CSS transition
}

// Next & Prev buttons
nextBtn.addEventListener('click', () => {
  const nextIndex = (current + 1) % slides.length;
  showSlide(nextIndex, 'next');
});

prevBtn.addEventListener('click', () => {
  const nextIndex = (current - 1 + slides.length) % slides.length;
  showSlide(nextIndex, 'prev');
});
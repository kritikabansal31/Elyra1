// Body pe js-loaded lagao taake scroll animations kaam karein
document.body.classList.add('js-loaded');

// ── 1. LOADER ──
var loader = document.getElementById('loader');
if (loader) {
  document.body.style.overflow = 'hidden';
  setTimeout(function () {
    loader.classList.add('done');
    document.body.style.overflow = '';
  }, 3000);
}

// ── 2. THEME TOGGLE ──
var themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
  });
}

// ── 3. HAMBURGER ──
var hamburger = document.getElementById('hamburger');
var navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ── 4. SCROLL — progress bar + back-to-top + navbar ──
window.addEventListener('scroll', function () {
  var scrolled    = window.scrollY;
  var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  var bar = document.getElementById('scrollProgress');
  if (bar) bar.style.width = ((scrolled / totalHeight) * 100) + '%';
  var btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', scrolled > 400);
  var nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('is-scrolled', scrolled > 8);
});

// ── 5. BACK TO TOP ──
var backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── 6. PROFILE NAME — localStorage se naam pado aur navbar mein dikhao ──
var savedName = localStorage.getItem('elyra_user_name');
var profileChip   = document.getElementById('navProfile');
var profileAvatar = document.getElementById('navProfileAvatar');
var profileName   = document.getElementById('navProfileName');
var signInBtn     = document.getElementById('navSignIn');

if (savedName && profileChip && profileAvatar && profileName) {
  profileChip.classList.add('visible');
  profileAvatar.textContent = savedName.charAt(0).toUpperCase();
  profileName.textContent   = savedName.split(' ')[0];
  if (signInBtn) signInBtn.style.display = 'none';
}

// ── 7. HERO SLIDER ──
var slides  = document.querySelectorAll('.slide');
var dots    = document.querySelectorAll('.slider-dot');
var current = 0;
var sliderTimer;

function goToSlide(n) {
  slides[current].classList.remove('active');
  if (dots[current]) dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  if (dots[current]) dots[current].classList.add('active');
}
function startTimer() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(function () { goToSlide(current + 1); }, 4500);
}
if (slides.length) {
  slides[0].classList.add('active');
  if (dots[0]) dots[0].classList.add('active');
  dots.forEach(function (d, i) { d.addEventListener('click', function () { goToSlide(i); startTimer(); }); });
  var prev = document.getElementById('sliderPrev');
  var next = document.getElementById('sliderNext');
  if (prev) prev.addEventListener('click', function () { goToSlide(current - 1); startTimer(); });
  if (next) next.addEventListener('click', function () { goToSlide(current + 1); startTimer(); });
  startTimer();
}

// ── 8. SCROLL ANIMATIONS ──
var animatedEls = document.querySelectorAll(
  '.scroll-animate, .new-card, .manifesto__item, .pillar-card, .shop-card'
);
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedEls.forEach(function (el) { observer.observe(el); });
} else {
  // Fallback: agar IntersectionObserver nahi to sab dikhao
  animatedEls.forEach(function (el) { el.classList.add('in-view'); });
}
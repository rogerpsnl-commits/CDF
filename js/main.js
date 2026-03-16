// ===== Header Scroll Effect =====
const header = document.getElementById('header');

function handleScroll() {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    }
});

// ===== Scroll-Triggered Fade-Up Animations =====
const fadeElements = document.querySelectorAll('.fade-up');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.textContent;

        // Show sending state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#2a9d8f';
            submitBtn.style.opacity = '1';
            contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Stat Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const text = el.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[0]);
    const suffix = text.replace(match[0], '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

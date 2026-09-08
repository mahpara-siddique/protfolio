// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Sticky Header & Active Nav Link Updates
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Typing Animation
const titles = [
    "3D Geometric Deep Learning",
    "Protein Language Models",
    "Targeted Drug Discovery",
    "Healthcare AI"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;
const typingElement = document.querySelector('.typing-text');

function type() {
    if (!typingElement) return;

    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // faster when deleting
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // normal speed when typing
    }

    // Determine state
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000); // Start typing animation after 1s
});

// Animated Number Counters using Intersection Observer
const counters = document.querySelectorAll('.counter');
const countSpeed = 200;

const startCounters = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetElement = entry.target;
            const targetValue = parseFloat(targetElement.getAttribute('data-target'));
            const isFloat = targetElement.getAttribute('data-float') === 'true';
            
            const updateCount = () => {
                const count = parseFloat(targetElement.innerText || 0);
                let increment = targetValue / countSpeed;
                
                // Adjust increment for small float values to ensure smooth animation
                if (isFloat && targetValue < 10) {
                    increment = targetValue / 50;
                }

                if (count < targetValue) {
                    if (isFloat) {
                        targetElement.innerText = (count + increment).toFixed(2);
                    } else {
                        targetElement.innerText = Math.ceil(count + increment);
                    }
                    setTimeout(updateCount, 20);
                } else {
                    targetElement.innerText = isFloat ? targetValue.toFixed(2) : targetValue;
                }
            };
            
            updateCount();
            observer.unobserve(targetElement); // Only animate once
        }
    });
};

const counterObserver = new IntersectionObserver(startCounters, { threshold: 0.5 });
counters.forEach(counter => {
    counterObserver.observe(counter);
});
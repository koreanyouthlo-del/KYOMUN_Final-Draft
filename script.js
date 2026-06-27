// ====================================
// IYMUN JavaScript
// ====================================

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Close dropdown when menu is toggled
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
    });
}

// Mobile Dropdown Toggle
const dropdowns = document.querySelectorAll('.nav-item.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    
    link.addEventListener('click', (e) => {
        // Only prevent default on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking on a dropdown link
const dropdownLinks = document.querySelectorAll('.dropdown-link');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        dropdowns.forEach(item => {
            item.classList.remove('active');
        });
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        dropdowns.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all required fields (marked with *)');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// CTA Button Scroll
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('.about-preview');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Register Button Navigation
const registerButtons = document.querySelectorAll('a[href="delegate-registration.html"]');
registerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Optional: Add tracking or additional functionality
        console.log('Navigating to registration page');
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.about-card, .committee-preview-card, .objective-card, .amenity-card, .program-card, .agenda-card, .contact-info-card, .department-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

const createRecruitingChairsPopout = () => {
    if (document.body.classList.contains('home-page')) {
        return;
    }

    const popout = document.createElement('div');
    popout.className = 'recruiting-popout';
    popout.innerHTML = `
        <h2>Recruting Chairs!</h2>
        <p>Please click on this <a href="https://forms.gle/ocSXyokJHexfCrEM9" target='_blank'>link</a> to learn more</p>
    `;

    document.body.appendChild(popout);

    const dismiss = () => {
        if (!popout.classList.contains('hide')) {
            popout.classList.add('hide');
            window.setTimeout(() => {
                if (popout.parentNode) {
                    popout.parentNode.removeChild(popout);
                }
            }, 300);
        }
    };

    window.setTimeout(dismiss, 9000);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createRecruitingChairsPopout);
} else {
    createRecruitingChairsPopout();
}

// Handle window resize for responsive menu
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            dropdowns.forEach(item => {
                item.classList.remove('active');
            });
        }
    }, 250);
});

// Initialize
console.log('IYMUN Website Loaded Successfully!');

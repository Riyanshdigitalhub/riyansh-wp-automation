// ========================================
// Mobile Menu Toggle
// ========================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Header Scroll Effect
// ========================================
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// Appointment Form Handler
// ========================================
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Validate mobile number (10 digits)
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(data.mobileNumber)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Create WhatsApp message
        const message = `*New Appointment Request*%0A%0A` +
            `*Name:* ${data.fullName}%0A` +
            `*Mobile:* ${data.mobileNumber}%0A` +
            `*City:* ${data.city}%0A` +
            `*Service:* ${data.service}%0A` +
            `*Preferred Date:* ${data.preferredDate || 'Not specified'}%0A` +
            `*Message:* ${data.message || 'No message'}`;
        
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/919924226063?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        alert('Thank you! Redirecting to WhatsApp to send your appointment request...');
        
        // Reset form
        this.reset();
    });
}

// ========================================
// Set Minimum Date for Appointment
// ========================================
const preferredDateInput = document.getElementById('preferredDate');

if (preferredDateInput) {
    const today = new Date().toISOString().split('T')[0];
    preferredDateInput.setAttribute('min', today);
}

// ========================================
// Scroll Animation for Elements
// ========================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature-card, .product-card, .testimonial-card, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ========================================
// Active Navigation Link Highlighter
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// Phone Number Click Tracking (Optional Analytics)
// ========================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call initiated');
        // Add analytics tracking here if needed
    });
});

// ========================================
// WhatsApp Link Click Tracking (Optional Analytics)
// ========================================
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('WhatsApp chat initiated');
        // Add analytics tracking here if needed
    });
});

// ========================================
// Form Input Validation Visual Feedback
// ========================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#E8E0D5';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#FF9933';
    });
});

// ========================================
// Lazy Loading for Images (When added)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ========================================
// Performance: Debounce Scroll Events
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll handler
const debouncedHighlight = debounce(highlightNavLink, 100);
window.removeEventListener('scroll', highlightNavLink);
window.addEventListener('scroll', debouncedHighlight);

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🕉️ Pandit Anil Kumar Dubey - Astrologer Website', 'color: #FF9933; font-size: 20px; font-weight: bold;');
console.log('%cExpert Jyotish Consultation & Puja Services', 'color: #800020; font-size: 14px;');
console.log('%c📞 Contact: +91 99242 26063', 'color: #25D366; font-size: 14px;');

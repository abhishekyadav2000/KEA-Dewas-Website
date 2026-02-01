/**
 * Kautilya Educational Academy, Dewas
 * Main JavaScript File
 */

// Page Loader - Smart loading based on session state
(function() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    // Check if this is the first visit in this session
    const hasSeenFullLoader = sessionStorage.getItem('kea_loader_shown');
    const isHomepage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('index.html') ||
                       window.location.pathname === '/index.html';
    
    if (!hasSeenFullLoader && isHomepage) {
        // First visit to homepage - show full premium loader
        sessionStorage.setItem('kea_loader_shown', 'true');
        
        window.addEventListener('load', function() {
            // Wait for the full animation to complete (3.5 seconds)
            setTimeout(function() {
                loader.classList.add('hidden');
                setTimeout(function() {
                    loader.remove();
                }, 800);
            }, 3500);
        });
    } else {
        // Internal navigation - show light loader
        loader.classList.add('light-loader');
        
        // Add light spinner dots
        const loaderContent = loader.querySelector('.loader-content');
        if (loaderContent) {
            const lightSpinner = document.createElement('div');
            lightSpinner.className = 'light-spinner';
            lightSpinner.innerHTML = '<span></span><span></span><span></span>';
            loaderContent.appendChild(lightSpinner);
        }
        
        window.addEventListener('load', function() {
            // Quick fade out (500ms display + 400ms fade)
            setTimeout(function() {
                loader.classList.add('hidden');
                setTimeout(function() {
                    loader.remove();
                }, 400);
            }, 500);
        });
    }
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initStickyHeader();
    initDropdownMenus();
    initAccordions();
    initGalleryLightbox();
    initSmoothScroll();
    initFormValidation();
    initAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class when scrolled down
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

/**
 * Dropdown Menus (for mobile)
 */
function initDropdownMenus() {
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
                
                // Close other dropdowns
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });
}

/**
 * Accordion Functionality
 */
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion-item');
        
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            if (header) {
                header.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // Close all items in this accordion
                    items.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Gallery Lightbox
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxContent = document.querySelector('.lightbox-content');
    
    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // In a real implementation, you would load the actual image
                // For now, we'll just show the lightbox
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                removeError(field);
                
                if (!field.value.trim()) {
                    showError(field, 'This field is required');
                    isValid = false;
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    showError(field, 'Please enter a valid email address');
                    isValid = false;
                } else if (field.type === 'tel' && !isValidPhone(field.value)) {
                    showError(field, 'Please enter a valid phone number');
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateField(field) {
    removeError(field);
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        showError(field, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function showError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #e53e3e; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
    
    field.parentNode.appendChild(errorElement);
}

function removeError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

/**
 * Scroll Animations
 */
function initAnimations() {
    // Add animation classes to elements automatically
    addAnimationClasses();
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in, .animate-stagger, .animate-text-reveal, .animate-counter');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add hover-lift to cards
    const cards = document.querySelectorAll('.facility-card, .info-card, .news-card, .highlight-card');
    cards.forEach(card => {
        card.classList.add('hover-lift', 'card-glow');
    });
    
    // Add pulse to primary CTA buttons in hero
    const heroCTA = document.querySelector('.hero .btn-primary');
    if (heroCTA) {
        heroCTA.classList.add('btn-pulse');
    }
}

/**
 * Add Animation Classes to Elements
 */
function addAnimationClasses() {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('animate-fade-in-up');
    });
    
    // Welcome section
    const welcomeImage = document.querySelector('.welcome-image');
    const welcomeContent = document.querySelector('.welcome-content');
    if (welcomeImage) welcomeImage.classList.add('animate-fade-in-left');
    if (welcomeContent) welcomeContent.classList.add('animate-fade-in-right');
    
    // Grids with stagger effect
    document.querySelectorAll('.facilities-grid, .highlights-grid, .info-cards, .stats-grid').forEach(el => {
        el.classList.add('animate-stagger');
    });
    
    // News grid items
    document.querySelectorAll('.news-grid').forEach(el => {
        el.classList.add('animate-stagger');
    });
    
    // Content grids
    document.querySelectorAll('.content-grid').forEach(el => {
        const children = el.children;
        if (children[0]) children[0].classList.add('animate-fade-in-left');
        if (children[1]) children[1].classList.add('animate-fade-in-right');
    });
    
    // Stat numbers
    document.querySelectorAll('.stat-item').forEach(el => {
        el.classList.add('animate-counter');
    });
    
    // Quick links
    const quickLinks = document.querySelector('.quick-links-grid');
    if (quickLinks) quickLinks.classList.add('animate-stagger');
    
    // CTA sections
    document.querySelectorAll('.cta-section').forEach(el => {
        el.classList.add('animate-scale-in');
    });
    
    // Tables
    document.querySelectorAll('.data-table').forEach(el => {
        el.classList.add('animate-fade-in-up');
    });
    
    // Forms
    document.querySelectorAll('.contact-form, .enquiry-form').forEach(el => {
        el.classList.add('animate-fade-in-up');
    });
    
    // Gallery items
    document.querySelectorAll('.gallery-item').forEach((el, index) => {
        el.classList.add('animate-scale-in');
        el.style.transitionDelay = (index * 0.05) + 's';
    });
    
    // Add image shine effect
    document.querySelectorAll('.welcome-img, .content-img, .facility-image').forEach(el => {
        el.classList.add('image-shine');
    });
}

/**
 * Gallery Filter (for gallery page)
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * News Category Filter (for news page)
 */
function filterNews(category) {
    const newsCards = document.querySelectorAll('.news-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
    
    newsCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Utility Functions
 */

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format date helper
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Counter Animation (for stats section)
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Initialize counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

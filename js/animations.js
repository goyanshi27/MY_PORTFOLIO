// ===== ANIMATIONS JAVASCRIPT =====

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollReveal();
    initializeSkillAnimations();
    initializeTimelineAnimations();
    initializeHoverEffects();
    initializeParallaxEffects();
});

// ===== SCROLL REVEAL ANIMATIONS =====
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered animation for multiple elements
                const parent = entry.target.parentElement;
                if (parent && parent.children.length > 1) {
                    Array.from(parent.children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('active');
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===== SKILL PROGRESS ANIMATIONS =====
function initializeSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress, .skill-progress-animated');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skill = skillBar.getAttribute('data-skill');
                
                if (skill) {
                    // Set CSS variable for animation
                    skillBar.style.setProperty('--skill-width', skill + '%');
                    
                    // Trigger animation
                    setTimeout(() => {
                        skillBar.style.width = skill + '%';
                    }, 200);
                }
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ===== TIMELINE ANIMATIONS =====
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach((item, index) => {
        // Initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.8s ease';
        
        timelineObserver.observe(item);
    });
}

// ===== HOVER EFFECTS =====
function initializeHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.project-card, .dashboard-card, .chart-card, .skill-category-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 212, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link, .social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== ADVANCED ANIMATION HELPERS =====

// Animate elements on scroll with custom options
function animateOnScroll(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        animationClass: 'animate-in'
    };
    
    const config = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(config.animationClass);
                
                if (config.once) {
                    observer.unobserve(entry.target);
                }
            } else if (!config.once) {
                entry.target.classList.remove(config.animationClass);
            }
        });
    }, config);
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Stagger animation for multiple elements
function staggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, index * delay);
    });
}

// Morphing animation
function morphAnimation(element, fromPath, toPath, duration = 1000) {
    if (!element) return;
    
    element.style.transition = `all ${duration}ms ease-in-out`;
    
    // Apply initial state
    element.setAttribute('d', fromPath);
    
    // Trigger animation
    setTimeout(() => {
        element.setAttribute('d', toPath);
    }, 50);
}

// Text animation with character by character reveal
function animateText(element, text, speed = 50) {
    if (!element) return;
    
    element.textContent = '';
    let index = 0;
    
    function typeCharacter() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(typeCharacter, speed);
        }
    }
    
    typeCharacter();
}

// Number counting animation
function animateNumber(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    function updateNumber() {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    }
    
    updateNumber();
}

// Progress circle animation
function animateProgressCircle(element, percentage, duration = 1500) {
    if (!element) return;
    
    const circle = element.querySelector('circle');
    if (!circle) return;
    
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    const offset = circumference - (percentage / 100) * circumference;
    
    setTimeout(() => {
        circle.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
        circle.style.strokeDashoffset = offset;
    }, 100);
}

// Wave animation for loading states
function createWaveAnimation(container, count = 3) {
    for (let i = 0; i < count; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave-dot';
        wave.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(wave);
    }
}

// Floating animation
function addFloatingAnimation(element, intensity = 1) {
    if (!element) return;
    
    element.style.animation = `float ${3 / intensity}s ease-in-out infinite`;
}

// Pulse animation for attention
function addPulseAnimation(element, duration = 2000) {
    if (!element) return;
    
    element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
}

// Shake animation for errors
function shakeElement(element) {
    if (!element) return;
    
    element.classList.add('shake');
    
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

// Bounce animation for success
function bounceElement(element) {
    if (!element) return;
    
    element.classList.add('bounce-in');
    
    setTimeout(() => {
        element.classList.remove('bounce-in');
    }, 1000);
}

// Glow animation for highlights
function addGlowAnimation(element, color = 'var(--neon-blue)') {
    if (!element) return;
    
    element.style.boxShadow = `0 0 20px ${color}`;
    element.style.animation = `neonGlow 2s ease-in-out infinite alternate`;
}

// Remove all animations from element
function removeAnimations(element) {
    if (!element) return;
    
    element.style.animation = 'none';
    element.style.transition = 'none';
    element.style.transform = 'none';
    element.style.boxShadow = 'none';
}

// Performance optimized scroll animations
function createScrollAnimation(callback, options = {}) {
    const defaultOptions = {
        throttle: 16, // ~60fps
        threshold: 0.1
    };
    
    const config = { ...defaultOptions, ...options };
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                callback();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', PortfolioApp.throttle(onScroll, config.throttle));
}

// Intersection Observer for advanced animations
function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const config = { ...defaultOptions, ...options };
    
    return new IntersectionObserver(callback, config);
}

// Export animation functions
window.AnimationUtils = {
    animateOnScroll,
    staggerAnimation,
    morphAnimation,
    animateText,
    animateNumber,
    animateProgressCircle,
    createWaveAnimation,
    addFloatingAnimation,
    addPulseAnimation,
    shakeElement,
    bounceElement,
    addGlowAnimation,
    removeAnimations,
    createScrollAnimation,
    createIntersectionObserver
};

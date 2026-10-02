// ===== RESUME PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    loadContactInfo();
    initializeDownloadFunctionality();
    initializeResumeAnimations();
    initializeTimelineAnimations();
    initializeCertificationAnimations();
});

// Load Contact Information
function loadContactInfo() {
    const contactContainer = document.getElementById('resumeContactInfo');
    if (!contactContainer) return;
    
    const contact = portfolioData.contact;
    contactContainer.innerHTML = `
        <div class="contact-item mb-3">
            <i class="fas fa-envelope me-2"></i>
            <span>${contact.email}</span>
        </div>
        <div class="contact-item mb-3">
            <i class="fas fa-phone me-2"></i>
            <span>${contact.phone}</span>
        </div>
        <div class="contact-item mb-3">
            <i class="fas fa-map-marker-alt me-2"></i>
            <span>${contact.location}</span>
        </div>
        <div class="social-links mt-3">
            <a href="${contact.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="${contact.social.github}" target="_blank"><i class="fab fa-github"></i></a>
            <a href="${contact.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
        </div>
    `;
}

// ===== DOWNLOAD FUNCTIONALITY =====
function initializeDownloadFunctionality() {
    const downloadBtn = document.getElementById('downloadResume');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function() {
        window.print();
    });
}

// ===== RESUME ANIMATIONS =====
function initializeResumeAnimations() {
    const resumeSections = document.querySelectorAll('.resume-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    resumeSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        sectionObserver.observe(section);
    });
}

// ===== TIMELINE ANIMATIONS =====
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.experience-item, .education-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// ===== CERTIFICATION ANIMATIONS =====
function initializeCertificationAnimations() {
    const certificationItems = document.querySelectorAll('.certification-item');
    
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    certificationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
        item.style.transition = 'all 0.6s ease';
        certObserver.observe(item);
    });
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

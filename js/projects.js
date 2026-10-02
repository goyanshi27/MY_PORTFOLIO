// Projects — filter, animations, View Details modal
// Links open directly in new tab — no confirm dialogs, no intercepts

document.addEventListener('DOMContentLoaded', function () {
    initializeFiltering();
    initializeProjectAnimations();
    initializeViewDetailsModal();
});

// ── View Details modal ───────────────────────────────────────────────────────
// Reads live & repo URLs straight from the card's own anchor tags,
// so there is exactly ONE place to update links (the HTML).
function initializeViewDetailsModal() {
    document.querySelectorAll('.view-details').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card     = this.closest('.project-card');
            var title    = card.querySelector('.project-content h4').textContent.trim();
            var desc     = card.querySelector('.project-content p').textContent.trim();
            var badges   = Array.from(card.querySelectorAll('.badge'))
                               .map(function (b) { return b.outerHTML; }).join(' ');

            // Pick URLs from the card buttons
            var liveHref = '';
            var repoHref = '';
            card.querySelectorAll('.project-links a').forEach(function (a) {
                if (a.classList.contains('btn-primary')) {
                    liveHref = a.getAttribute('href') || '';
                } else {
                    repoHref = a.getAttribute('href') || '';
                }
            });

            // A "live link" that is actually just the GitHub repo means no real demo exists
            var hasLive = liveHref && !liveHref.includes('github.com');

            // Build live-demo card HTML
            var liveDemoHTML = hasLive
                ? `<a href="${liveHref}" target="_blank" rel="noopener" class="modal-link-card modal-link-live">
                        <div class="modal-link-icon" style="background:linear-gradient(135deg,#0d6efd,#0dcaf0);">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                        <div class="modal-link-text">
                            <div class="modal-link-label">Live Demo</div>
                            <div class="modal-link-title">View Live Project &rarr;</div>
                        </div>
                   </a>`
                : `<div class="modal-link-card modal-link-disabled">
                        <div class="modal-link-icon" style="background:rgba(255,255,255,0.1);">
                            <i class="fas fa-ban"></i>
                        </div>
                        <div class="modal-link-text">
                            <div class="modal-link-label">Live Demo</div>
                            <div class="modal-link-title" style="color:rgba(255,255,255,0.4);">Not available for this project</div>
                        </div>
                   </div>`;

            // Build repo card HTML
            var repoHTML = repoHref
                ? `<a href="${repoHref}" target="_blank" rel="noopener" class="modal-link-card modal-link-repo">
                        <div class="modal-link-icon" style="background:linear-gradient(135deg,#6f42c1,#e83e8c);">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="modal-link-text">
                            <div class="modal-link-label">Source Code</div>
                            <div class="modal-link-title">Open GitHub Repository &rarr;</div>
                        </div>
                   </a>`
                : `<div class="modal-link-card modal-link-disabled">
                        <div class="modal-link-icon" style="background:rgba(255,255,255,0.1);">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="modal-link-text">
                            <div class="modal-link-label">Source Code</div>
                            <div class="modal-link-title" style="color:rgba(255,255,255,0.4);">Repository not available</div>
                        </div>
                   </div>`;

            document.getElementById('projectModalTitle').textContent = title;
            document.getElementById('projectModalBody').innerHTML =
                `<p class="modal-project-desc">${desc}</p>
                 <div class="modal-badges">${badges}</div>
                 <p class="modal-choose-hint">
                     <i class="fas fa-hand-pointer me-1"></i> Choose where to go
                 </p>
                 <div class="modal-links-grid">
                     ${liveDemoHTML}
                     ${repoHTML}
                 </div>`;

            new bootstrap.Modal(document.getElementById('projectModal')).show();
        });
    });
}

// ── Filter ────────────────────────────────────────────────────────────────────
function initializeFiltering() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    var projectItems  = document.querySelectorAll('.project-item');

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var filter = this.getAttribute('data-filter');
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');

            projectItems.forEach(function (item) {
                var category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(function () {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(function () { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// ── Entrance Animations ───────────────────────────────────────────────────────
function initializeProjectAnimations() {
    document.querySelectorAll('.project-card').forEach(function (card, index) {
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        setTimeout(function () {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
var themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    var html = document.documentElement;
    themeToggle.addEventListener('click', function () {
        var newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.querySelector('i').className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
    var savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    themeToggle.querySelector('i').className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

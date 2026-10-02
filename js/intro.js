/**
 * intro.js
 * Handles: video playback, progress bar, particles, skip button,
 * and the cinematic fade-to-black transition into index.html.
 */

(function () {
    'use strict';

    /* ── DOM refs ─────────────────────────────────────────────────── */
    const video       = document.getElementById('intro-video');
    const skipBtn     = document.getElementById('skip-btn');
    const progressBar = document.getElementById('intro-progress-bar');
    const overlay     = document.getElementById('transition-overlay');
    const canvas      = document.getElementById('particles-canvas');
    const ctx         = canvas ? canvas.getContext('2d') : null;

    /* ── Destination ──────────────────────────────────────────────── */
    const DEST = 'index.html';

    /* ─────────────────────────────────────────────────────────────── */
    /*  CINEMATIC TRANSITION → index.html                              */
    /* ─────────────────────────────────────────────────────────────── */
    function goToHomepage() {
        if (overlay) {
            overlay.classList.add('fade-in');
            // mark that intro has been seen so index.html won't redirect back
            try { sessionStorage.setItem('introSeen', '1'); } catch (_) {}
            setTimeout(function () {
                window.location.href = DEST;
            }, 950); // matches the 0.9 s CSS transition + a tiny buffer
        } else {
            try { sessionStorage.setItem('introSeen', '1'); } catch (_) {}
            window.location.href = DEST;
        }
    }

    /* ─────────────────────────────────────────────────────────────── */
    /*  VIDEO                                                           */
    /* ─────────────────────────────────────────────────────────────── */
    function initVideo() {
        if (!video) return;

        /* Show the video element once it can play */
        video.addEventListener('canplay', function () {
            video.classList.add('visible');
            // Tell CSS we have a real video → reposition text on wide screens
            document.body.classList.add('has-video');
        });

        /* Update thin progress bar */
        video.addEventListener('timeupdate', function () {
            if (video.duration && progressBar) {
                progressBar.style.width =
                    ((video.currentTime / video.duration) * 100) + '%';
            }
        });

        /* Auto-transition when video ends */
        video.addEventListener('ended', function () {
            goToHomepage();
        });

        /* If video errors or stalls ≥ 12 s, still transition */
        video.addEventListener('error', function () {
            scheduleAutoTransition(4000);
        });

        /* Start playback */
        var playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(function () {
                /* Autoplay blocked → show video as paused, auto-advance after delay */
                video.classList.add('visible');
                scheduleAutoTransition(6000);
            });
        }
    }

    /* ─────────────────────────────────────────────────────────────── */
    /*  FALLBACK AUTO-TRANSITION (no video / autoplay blocked)         */
    /* ─────────────────────────────────────────────────────────────── */
    var autoTimer = null;

    function scheduleAutoTransition(delayMs) {
        if (autoTimer) return; // don't double-schedule
        autoTimer = setTimeout(goToHomepage, delayMs || 5000);
    }

    /* If there is no video src at all, auto-advance after 5 s */
    function maybeScheduleFallback() {
        if (!video || !video.src || video.src === window.location.href) {
            scheduleAutoTransition(5000);
        }
    }

    /* ─────────────────────────────────────────────────────────────── */
    /*  SKIP BUTTON                                                     */
    /* ─────────────────────────────────────────────────────────────── */
    if (skipBtn) {
        skipBtn.addEventListener('click', function () {
            if (autoTimer) clearTimeout(autoTimer);
            goToHomepage();
        });
    }

    /* ─────────────────────────────────────────────────────────────── */
    /*  PARTICLES (ambient floating dots on the black background)       */
    /* ─────────────────────────────────────────────────────────────── */
    var particles = [];
    var raf;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        var count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 9000), 90);
        var colors = ['#00d4ff', '#a855f7', '#f472b6', '#facc15', '#34d399'];
        for (var i = 0; i < count; i++) {
            particles.push({
                x:     Math.random() * window.innerWidth,
                y:     Math.random() * window.innerHeight,
                r:     Math.random() * 1.8 + 0.4,
                alpha: Math.random() * 0.5 + 0.1,
                vx:    (Math.random() - 0.5) * 0.35,
                vy:    (Math.random() - 0.5) * 0.35,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    function animateParticles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            // wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(animateParticles);
    }

    function initParticles() {
        if (!canvas) return;
        resizeCanvas();
        createParticles();
        animateParticles();
        window.addEventListener('resize', function () {
            resizeCanvas();
            createParticles();
        });
    }

    /* ─────────────────────────────────────────────────────────────── */
    /*  BOOT                                                            */
    /* ─────────────────────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initParticles();
        initVideo();
        maybeScheduleFallback();
    });

})();

/* ============================================
   DASOM S&C - Main JavaScript
   ============================================ */

(function() {
    'use strict';

    // ---- DOM Elements ----
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMobile = document.getElementById('nav-mobile');
    const scrollTopBtn = document.getElementById('scroll-top');

    // ---- Header Scroll Effect ----
    let lastScrollY = 0;
    let ticking = false;

    function handleScroll() {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader();
                updateScrollTop();
                ticking = false;
            });
            ticking = true;
        }
    }

    function updateHeader() {
        if (lastScrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function updateScrollTop() {
        if (lastScrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize header state on page load
    handleScroll();

    // ---- Scroll to Top ----
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile Menu Toggle ----
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMobile.classList.toggle('open');
        document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navMobile.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Mobile sub-menu toggle
    document.querySelectorAll('.nav-mobile-link[data-toggle]').forEach(function(link) {
        link.addEventListener('click', function() {
            var targetId = this.getAttribute('data-toggle');
            var sub = document.getElementById(targetId);
            if (sub) {
                var isOpen = sub.style.maxHeight && sub.style.maxHeight !== '0px';
                // Close all subs first
                document.querySelectorAll('.nav-mobile-sub').forEach(function(s) {
                    s.style.maxHeight = '0px';
                    s.style.opacity = '0';
                    s.style.overflow = 'hidden';
                });
                if (!isOpen) {
                    sub.style.maxHeight = sub.scrollHeight + 'px';
                    sub.style.opacity = '1';
                }
            }
        });
    });

    // Init sub menus to collapsed
    document.querySelectorAll('.nav-mobile-sub').forEach(function(sub) {
        sub.style.maxHeight = '0px';
        sub.style.opacity = '0';
        sub.style.overflow = 'hidden';
        sub.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    });

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerHeight = header.offsetHeight;
                var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Close mobile menu if open
                menuToggle.classList.remove('active');
                navMobile.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // ---- Scroll Reveal Animations ----
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        var windowHeight = window.innerHeight;

        reveals.forEach(function(el) {
            var elementTop = el.getBoundingClientRect().top;
            var revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    // Initial check on load
    window.addEventListener('load', function() {
        revealOnScroll();
    });

    // ---- Counter Animation ----
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (!target || el.dataset.animated) return;
        el.dataset.animated = 'true';

        var count = 0;
        var increment = Math.ceil(target / 60);
        var duration = 1500;
        var step = duration / (target / increment);

        var timer = setInterval(function() {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }
            el.textContent = count + '+';
        }, step);
    }

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(function(el) {
        counterObserver.observe(el);
    });

    // ---- Prevent dropdown default on desktop nav ----
    document.querySelectorAll('.nav-item > .nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

})();

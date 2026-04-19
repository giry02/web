/* ============================================
   COMPANY PAGE - JavaScript
   ============================================ */

(function() {
    'use strict';

    // ---- Page Tabs: Highlight on scroll ----
    var tabs = document.querySelectorAll('.page-tab');
    var sections = [];

    tabs.forEach(function(tab) {
        var sectionId = tab.getAttribute('data-section');
        if (sectionId) {
            var el = document.getElementById(sectionId);
            if (el) sections.push({ id: sectionId, el: el, tab: tab });
        }
    });

    function updateActiveTab() {
        var scrollPos = window.scrollY + 200;
        var active = null;

        sections.forEach(function(section) {
            if (section.el.offsetTop <= scrollPos) {
                active = section;
            }
        });

        tabs.forEach(function(tab) { tab.classList.remove('active'); });
        if (active) {
            active.tab.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveTab, { passive: true });

    // ---- Smooth scroll on tab click ----
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var header = document.getElementById('header');
                    var headerH = header ? header.offsetHeight : 80;
                    var pos = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            }
        });
    });

    // ---- Hash scroll on page load ----
    window.addEventListener('load', function() {
        var hash = window.location.hash;
        if (hash) {
            var target = document.querySelector(hash);
            if (target) {
                setTimeout(function() {
                    var header = document.getElementById('header');
                    var headerH = header ? header.offsetHeight : 80;
                    var pos = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }, 300);
            }
        }
        updateActiveTab();
    });

})();

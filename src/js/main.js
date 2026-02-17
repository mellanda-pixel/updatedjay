// ========================================
// GET INKED BY J - Main JavaScript
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // PROMO POP-UP & STICKY BAR
    // ================================
    
    const stickyBar = document.getElementById('stickyBar');
    const promoPopup = document.getElementById('promoPopup');
    const COOKIE_NAME = 'promo_dismissed';
    const COOKIE_DAYS = 7;

    // Check if promo was dismissed
    function isPromoDismissed() {
        return document.cookie.includes(COOKIE_NAME + '=true');
    }

    // Set dismissal cookie
    function setPromoCookie() {
        const date = new Date();
        date.setTime(date.getTime() + (COOKIE_DAYS * 24 * 60 * 60 * 1000));
        document.cookie = COOKIE_NAME + '=true;expires=' + date.toUTCString() + ';path=/';
    }

    // Show popup
    window.showPromoPopup = function() {
        if (promoPopup) {
            promoPopup.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    // Hide popup
    window.hidePromoPopup = function(event) {
        if (promoPopup) {
            promoPopup.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    // Hide sticky bar
    window.hideSticky = function() {
        if (stickyBar) {
            stickyBar.style.display = 'none';
            document.body.classList.remove('has-sticky-bar');
            setPromoCookie();
        }
    };

    // Click outside popup to close
    if (promoPopup) {
        promoPopup.addEventListener('click', function(e) {
            if (e.target === promoPopup) {
                hidePromoPopup();
            }
        });
    }

    // Initialize on page load
    if (!isPromoDismissed()) {
        // Show sticky bar
        if (stickyBar) {
            document.body.classList.add('has-sticky-bar');
        }
        
        // Auto-show popup after 5 seconds (first visit only)
        setTimeout(function() {
            if (!isPromoDismissed() && promoPopup) {
                showPromoPopup();
            }
        }, 5000);
    } else {
        // Hide sticky bar if already dismissed
        if (stickyBar) {
            stickyBar.style.display = 'none';
        }
    }

});

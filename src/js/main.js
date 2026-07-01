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
    // Click outside popup to close
    if (promoPopup) {
        promoPopup.addEventListener('click', function(e) {
            if (e.target === promoPopup) {
                hidePromoPopup();
            }
        });
    }

    // Sticky bar always shows (Creative Freedom page is only reachable from it)
    if (stickyBar) {
        document.body.classList.add('has-sticky-bar');
    }

});

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. HERO ANIMATIONS
    // =========================================
    // Initial fade in for hero text
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();

        tl.to(".hero-title", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        })
            .to(".hero-subtitle", {
                opacity: 0.9,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6")
            .to(".btn-primary", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");
    }



    // =========================================
    // 2. NAVBAR SCROLL EFFECT
    // =========================================
    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar(); // Check on load

    // =========================================
    // 3. FADE UP ON SCROLL (INTERSECTION OBSERVER)
    // =========================================
    const fadeElements = document.querySelectorAll(".fade-up");

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // =========================================
    // 4. IMAGE SLIDER (Simple Fade)
    // =========================================
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        }

        // Auto slide every 4 seconds
        setInterval(nextSlide, 4000);
    }

    // =========================================
    // 5. MOBILE MENU
    // =========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburgerBtn && mobileMenuOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Stagger animation for links if we wanted, but CSS transition is fine
        });

        const closeMenu = () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) closeMenu();
        });
    }

    // =========================================
    // 6. SMOOTH SCROLL FOR ANCHORS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = 80; // Approximate
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // 7. STATS ANIMATION (Stars & Years)
    // =========================================
    const yearsCountEl = document.getElementById("years-count");
    const starFillLayer = document.getElementById("star-fill-layer");
    const ratingContainer = document.getElementById("rating-container-animated");

    if (yearsCountEl || (starFillLayer && ratingContainer)) {
        const triggerEl = ratingContainer || yearsCountEl;

        const durationYears = 3000;
        const durationStars = 2000;

        const endYears = 20;
        const endRating = 4.1; // 4.1 out of 5
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    let startTimestamp = null;

                    function step(timestamp) {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const elapsed = timestamp - startTimestamp;
                        const progressYears = Math.min(elapsed / durationYears, 1);
                        const progressStars = Math.min(elapsed / durationStars, 1);

                        // Animate Years (0 to 20)
                        if (yearsCountEl) {
                            const currentYear = Math.floor(progressYears * endYears);
                            yearsCountEl.textContent = currentYear;
                        }

                        // Animate Stars Width (0% to 82%)
                        if (starFillLayer) {
                            const targetWidthPercent = (endRating / 5) * 100;
                            const currentWidth = progressStars * targetWidthPercent;
                            starFillLayer.style.width = `${currentWidth}%`;
                        }

                        if (progressYears < 1 || progressStars < 1) {
                            requestAnimationFrame(step);
                        }
                    }
                    requestAnimationFrame(step);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (triggerEl) observer.observe(triggerEl);
    }

    // =========================================
    // 8. PROMOTIONS SLIDER (Mobile)
    // =========================================
    const promoNextBtn = document.getElementById('promo-next-btn');
    const promoTrack = document.querySelector('.promotions-track');

    if (promoNextBtn && promoTrack) {
        let currentPromoIndex = 0;
        const promos = promoTrack.children;
        const totalPromos = promos.length;

        promoNextBtn.addEventListener('click', () => {
            currentPromoIndex = (currentPromoIndex + 1) % totalPromos;
            const translateX = -(currentPromoIndex * 100);
            promoTrack.style.transform = `translateX(${translateX}%)`;
        });
    }
});

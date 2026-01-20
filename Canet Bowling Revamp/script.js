document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. GSAP HERO ANIMATION
    // =========================================
    // Animate hero text elements on load
    if (typeof gsap !== 'undefined') {
        gsap.from(".hero-text", {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });
    }

    // =========================================
    // 2. STAR RATING ANIMATION
    // =========================================
    // Animates the number count and star fill width when scrolled into view
    const reviewCountEl = document.querySelector(".review-count");
    const starFillLayer = document.querySelector("#star-fill-layer");
    const ratingContainer = document.querySelector(".rating-container");

    if (reviewCountEl && starFillLayer && ratingContainer) {
        const duration = 3000;
        const endValue = 998;
        const endRating = 4.1;
        let hasAnimated = false;

        const formatNumber = (num) => num.toLocaleString("es-ES");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    let startTimestamp = null;

                    function step(timestamp) {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                        // Animate Number
                        const currentCount = Math.floor(progress * endValue);
                        reviewCountEl.textContent = formatNumber(currentCount);

                        // Animate Stars Width
                        const targetWidthPercent = (endRating / 5) * 100;
                        const currentWidth = progress * targetWidthPercent;
                        starFillLayer.style.width = `${currentWidth}%`;

                        if (progress < 1) requestAnimationFrame(step);
                    }
                    requestAnimationFrame(step);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(ratingContainer);
    }

    // =========================================
    // 3. IMAGE SLIDER LOGIC
    // =========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('#btn-prev');
    const nextBtn = document.querySelector('#btn-next');

    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        // Function to update classes based on currentSlide index
        function updateSlider() {
            // Remove active classes
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Activate new slide
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Move slide by direction (-1 or 1)
        function moveSlide(direction) {
            currentSlide += direction;
            if (currentSlide >= totalSlides) currentSlide = 0;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            updateSlider();
        }

        // Set specific slide by index
        function setSlide(index) {
            currentSlide = index;
            updateSlider();
        }

        // Event Listeners for controls
        if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1));

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                setSlide(index);
            });
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            moveSlide(1);
        }, 5000);
    }

    // =========================================
    // 4. PROMOTIONS CAROUSEL (MOBILE)
    // =========================================
    const promoCards = document.querySelectorAll('.promotion-card');
    const promoNextBtn = document.getElementById('promo-next');

    if (promoCards.length > 0) {
        let currentPromoIndex = 0;

        // Initialize first card as active
        promoCards[0].classList.add('active');

        if (promoNextBtn) {
            promoNextBtn.addEventListener('click', () => {
                // Remove active class from current
                promoCards[currentPromoIndex].classList.remove('active');

                // Calculate next index
                currentPromoIndex = (currentPromoIndex + 1) % promoCards.length;

                // Add active class to next
                promoCards[currentPromoIndex].classList.add('active');
            });
        }
    }

    // =========================================
    // 5. MOBILE MENU (HAMBURGER)
    // =========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburgerBtn && mobileMenuOverlay) {
        // Open
        hamburgerBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scroll
        });

        // Close functions
        const closeMenu = () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Enable scroll
        };

        // Close button click
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMenu);
        }

        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on background click (but not if clicking the links container)
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
    }
});
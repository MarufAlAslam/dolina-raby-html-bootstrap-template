// Custom JavaScript goes here

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavWrapper = document.querySelector('.mobile-nav-wrapper');

    if (hamburgerMenu && mobileNavWrapper) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNavWrapper.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const menuLinks = mobileNavWrapper.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mobileNavWrapper.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

// Smooth background transition on scroll with stages
window.addEventListener('scroll', function() {
    const heroBg = document.getElementById('hero-bg');
    const heroSection = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const heroBottomLeft = document.querySelector('.hero-bottom-left');
    const heroBottomRight = document.querySelector('.hero-bottom-right');
    const infrastructureContent = document.querySelector('.infrastructure-content');
    const umbrellaContent = document.querySelector('.umbrella-content');

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculate stage progress
    const stage1End = windowHeight * 0.5;
    const stage2End = windowHeight * 1.0;
    const stage3End = windowHeight * 1.5;
    const stage4End = windowHeight * 2.0;
    const stage5End = windowHeight * 2.5;
    const scrollCompleteAt = windowHeight * 3.0;

    if (scrollPosition < stage1End) {
        // Stage 1: Scroll hero content up (0% to 50%)
        const stage1Progress = scrollPosition / stage1End;

        if (heroContent) {
            heroContent.style.transform = `translate(-50%, calc(-50% - ${stage1Progress * 100}vh))`;
            heroContent.style.opacity = 1 - stage1Progress;
        }

        if (heroBottomLeft) {
            heroBottomLeft.style.transform = `translateY(-${stage1Progress * 100}vh)`;
            heroBottomLeft.style.opacity = 1 - stage1Progress;
        }

        if (heroBottomRight) {
            heroBottomRight.style.transform = `translateY(-${stage1Progress * 100}vh)`;
            heroBottomRight.style.opacity = 1 - stage1Progress;
        }

        if (heroBg) heroBg.classList.remove('stage-2', 'stage-3', 'stage-4', 'stage-5', 'scroll-complete');
        if (heroSection) heroSection.classList.remove('scroll-complete');
        if (infrastructureContent) infrastructureContent.classList.remove('visible', 'scroll-complete');
        if (umbrellaContent) umbrellaContent.classList.remove('visible', 'scroll-complete');
    } else if (scrollPosition < stage2End) {
        if (heroContent) heroContent.style.opacity = 0;
        if (heroBottomLeft) heroBottomLeft.style.opacity = 0;
        if (heroBottomRight) heroBottomRight.style.opacity = 0;

        if (heroBg) {
            heroBg.classList.add('stage-2');
            heroBg.classList.remove('stage-3', 'stage-4', 'stage-5', 'scroll-complete');
        }
        if (heroSection) heroSection.classList.remove('scroll-complete');
        if (infrastructureContent) infrastructureContent.classList.remove('visible', 'scroll-complete');
        if (umbrellaContent) umbrellaContent.classList.remove('visible', 'scroll-complete');
    } else if (scrollPosition < stage3End) {
        if (heroContent) heroContent.style.opacity = 0;
        if (heroBottomLeft) heroBottomLeft.style.opacity = 0;
        if (heroBottomRight) heroBottomRight.style.opacity = 0;

        if (heroBg) {
            heroBg.classList.add('stage-3');
            heroBg.classList.remove('stage-4', 'stage-5', 'scroll-complete');
        }
        if (heroSection) heroSection.classList.remove('scroll-complete');
        if (infrastructureContent) {
            infrastructureContent.classList.add('visible');
            infrastructureContent.classList.remove('scroll-complete');
        }
        if (umbrellaContent) umbrellaContent.classList.remove('visible', 'scroll-complete');
    } else if (scrollPosition < stage4End) {
        if (heroBg) {
            heroBg.classList.add('stage-4');
            heroBg.classList.remove('stage-2', 'stage-3', 'stage-5', 'scroll-complete');
        }
        if (heroSection) heroSection.classList.remove('scroll-complete');
        if (infrastructureContent) infrastructureContent.classList.remove('visible', 'scroll-complete');
        if (umbrellaContent) umbrellaContent.classList.remove('visible', 'scroll-complete');
    } else if (scrollPosition < scrollCompleteAt) {
        if (heroContent) heroContent.style.opacity = 0;
        if (heroBottomLeft) heroBottomLeft.style.opacity = 0;
        if (heroBottomRight) heroBottomRight.style.opacity = 0;

        if (heroBg) {
            heroBg.classList.add('stage-5');
            heroBg.classList.remove('stage-2', 'stage-3', 'stage-4', 'scroll-complete');
        }
        if (heroSection) heroSection.classList.remove('scroll-complete');
        if (infrastructureContent) infrastructureContent.classList.remove('visible', 'scroll-complete');
        if (umbrellaContent) {
            umbrellaContent.classList.add('visible');
            umbrellaContent.classList.remove('scroll-complete');
        }
    } else {
        if (heroBg) heroBg.classList.add('scroll-complete');
        if (heroSection) heroSection.classList.add('scroll-complete');
        if (umbrellaContent) umbrellaContent.classList.add('scroll-complete');
        if (infrastructureContent) infrastructureContent.classList.add('scroll-complete');
    }
});

// Attraction items: open reusable modal and populate with item content
// document.addEventListener('DOMContentLoaded', function() {
//     const attractionItems = document.querySelectorAll('.attraction-item');
//     const attractionModalEl = document.getElementById('attractionModal');

//     if (!attractionModalEl || attractionItems.length === 0) return;

//     const attractionModal = new bootstrap.Modal(attractionModalEl);
//     const heroImg = document.getElementById('attractionModalImg');
//     const modalTitle = document.getElementById('attractionModalLabel');
//     const modalLead = document.getElementById('attractionModalLead');
//     const modalBody = document.getElementById('attractionModalBody');
//     const phoneContainer = document.getElementById('attractionModalPhone');
//     const phoneLink = document.getElementById('attractionModalPhoneLink');
//     const iconsContainer = document.getElementById('attractionModalIcons');

//     attractionItems.forEach(item => {
//             item.style.cursor = 'pointer';
//             // click handler is now in previous patch
//     });
//     });

// Nav: trigger hero Stage 3 when clicking 'O nas'
document.addEventListener('DOMContentLoaded', function() {
    const navOnas = document.getElementById('navOnas');
    if (navOnas) {
        navOnas.addEventListener('click', function(e) {
            e.preventDefault();
            const target = window.innerHeight * 1.1; // inside stage 3 (between 1.0 and 1.5 * windowHeight)
            window.scrollTo({ top: target, behavior: 'smooth' });
        });
    }

    // Hero green CTA should open hero Stage 3 as well
    const heroCta = document.querySelector('.hero-content .btn-discover');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            const target = window.innerHeight * 1.1;
            window.scrollTo({ top: target, behavior: 'smooth' });
        });
    }
});

// Initialize AOS if available
document.addEventListener('DOMContentLoaded', function() {
    if (window.AOS && typeof AOS.init === 'function') {
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-out-cubic',
            offset: 120
        });
    }
});

// Also initialize/refresh AOS on full window load to ensure assets are ready
window.addEventListener('load', function() {
    if (window.AOS && typeof AOS.init === 'function') {
        try {
            AOS.init({
                once: true,
                duration: 800,
                easing: 'ease-out-cubic',
                offset: 120
            });
            if (typeof AOS.refreshHard === 'function') AOS.refreshHard();
            else if (typeof AOS.refresh === 'function') AOS.refresh();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('AOS init failed:', err);
        }
    } else {
        // eslint-disable-next-line no-console
        console.info('AOS not found on window - check script include.');
    }
});

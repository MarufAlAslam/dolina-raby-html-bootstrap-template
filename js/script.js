// Custom JavaScript goes here

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavWrapper = document.querySelector('.mobile-nav-wrapper');
    let fb = document.getElementById('floatingBurger');
    
    // Create floating burger button (hidden by default) that toggles offscreen mobile menu
    if (!document.getElementById('floatingBurger')) {
        fb = document.createElement('button');
        fb.id = 'floatingBurger';
        fb.type = 'button';
        fb.setAttribute('aria-label', 'Open menu');
        fb.innerHTML = '<span></span><span></span><span></span>';
        document.body.appendChild(fb);
            fb.addEventListener('click', function() {
                // On mobile keep previous behaviour: scroll to top
                if (window.innerWidth <= 1020) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                const existing = document.querySelector('.offscreen-menu');
                if (existing) closeOffscreen();
                else openOffscreen();
            });

        // Close the offscreen menu if the viewport is resized to mobile
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 1020) {
                const existing = document.querySelector('.offscreen-menu');
                if (existing) closeOffscreen();
            }
        });
        }
    
        function closeOffscreen() {
            const existing = document.querySelector('.offscreen-menu');
            if (existing) existing.remove();
            fb.classList.remove('active');
            document.body.style.overflow = '';
            fb.setAttribute('aria-label', 'Open menu');
        }
    
        function openOffscreen() {
            // Build offscreen DOM only once per open
            const off = document.createElement('div');
            off.className = 'offscreen-menu';
        
            // overlay area (clicking outside left panel closes)
            const overlay = document.createElement('div');
            overlay.className = 'offscreen-overlay';
            off.appendChild(overlay);
        
            // left content panel
            const panel = document.createElement('div');
            panel.className = 'offscreen-panel';
        
            // close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'offscreen-close';
            closeBtn.setAttribute('aria-label', 'Close menu');
            closeBtn.innerHTML = '&times;';
            panel.appendChild(closeBtn);
        
            // nav links (custom — intentionally different from main nav)
            const ul = document.createElement('ul');
            ul.className = 'offscreen-links';
            const links = [
                ['O nas', '#about-section'],
                ['Dlaczego Dolina Raby?', '#about-section'],
                ['Atrakcje', '#attractions-section'],
                ['Wędkowanie Dolina', '#fishing-feature-section'],
                ['Pytania i odpowiedzi', '#faq-section'],
                ['Dojazd', '#maps-section']
            ];
            links.forEach(([text, href]) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = href;
                a.textContent = text;
                a.addEventListener('click', function(e) {
                    // close after navigating
                    closeOffscreen();
                });
                li.appendChild(a);
                ul.appendChild(li);
            });
            panel.appendChild(ul);
        
            // social + contact block
            const contact = document.createElement('div');
            contact.className = 'offscreen-contact';
            contact.innerHTML = `
                <hr class="offscreen-sep">
                <div class="offscreen-social">
                    <div class="social-icon">❤</div>
                    <div class="social-links">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>

                <hr class="offscreen-sep">

                <div class="offscreen-phones">
                    <div class="phone-row">
                        <img src="img/footer-phone.png" alt="Phone" class="off-icon">
                        <div class="phone-lines">
                            <a href="tel:+48789230680" class="phone-number">+48 789 230 680</a>
                            <a href="mailto:doraby@wodociagikklaj.pl" class="phone-email">doraby@wodociagikklaj.pl</a>
                        </div>
                    </div>
                </div>

                <hr class="offscreen-sep">

                <div class="offscreen-address">32-015 Klaj 1006</div>
                <div class="offscreen-map-link"><a href="https://maps.app.goo.gl/QRdBmG4m7VYcXW7z7" target="_blank" rel="noopener noreferrer">Nawiguj z Google Maps</a></div>
            `;
            panel.appendChild(contact);
        
            // small footer/logo
            const logoWrap = document.createElement('div');
            logoWrap.className = 'offscreen-logo';
            const logoImg = document.createElement('img');
            logoImg.src = 'img/logo.svg';
            logoImg.alt = 'Footer Logo';
            logoImg.className = 'offscreen-logo-img img-fluid';
            logoWrap.appendChild(logoImg);
            panel.appendChild(logoWrap);
        
            off.appendChild(panel);
        
            // attach handlers
            overlay.addEventListener('click', closeOffscreen);
            closeBtn.addEventListener('click', closeOffscreen);
        
            document.body.appendChild(off);
            fb.classList.add('active');
            fb.setAttribute('aria-label', 'Close menu');
            document.body.style.overflow = 'hidden';
        }

    if (hamburgerMenu && mobileNavWrapper) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNavWrapper.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';

            // Ensure offscreen menu is closed when main hamburger toggles the main mobile nav
            const existingOff = document.querySelector('.offscreen-menu');
            if (existingOff) {
                existingOff.remove();
                const fbBtn = document.getElementById('floatingBurger');
                if (fbBtn) {
                    fbBtn.classList.remove('active');
                    fbBtn.setAttribute('aria-label', 'Open menu');
                }
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const menuLinks = mobileNavWrapper.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mobileNavWrapper.classList.remove('active');
                document.body.style.overflow = '';

                const fbBtn = document.getElementById('floatingBurger');
                if (fbBtn) {
                    fbBtn.classList.remove('active');
                    fbBtn.setAttribute('aria-label', 'Open menu');
                }
            });
        });

        // Add a visible close button inside the mobile panel for users who want an explicit control
        if (!mobileNavWrapper.querySelector('.mobile-close')) {
            const mobileClose = document.createElement('button');
            mobileClose.className = 'mobile-close';
            mobileClose.setAttribute('aria-label', 'Close menu');
            mobileClose.innerHTML = '&times;';
            mobileNavWrapper.appendChild(mobileClose);
            mobileClose.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mobileNavWrapper.classList.remove('active');
                document.body.style.overflow = '';
                const fbBtn = document.getElementById('floatingBurger');
                if (fbBtn) {
                    fbBtn.classList.remove('active');
                    fbBtn.setAttribute('aria-label', 'Open menu');
                }
            });
        }

        // Close menus with Escape key (both mobile and offscreen)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                if (mobileNavWrapper.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                    mobileNavWrapper.classList.remove('active');
                    document.body.style.overflow = '';
                }
                const existingOff = document.querySelector('.offscreen-menu');
                if (existingOff) closeOffscreen();
            }
        });
    }
});

// Smooth background transition on scroll with stages (scroll-driven interpolation per stage)
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

    // Show floating burger when nav is out of view
    try {
        const navWrap = document.querySelector('.nav-wrapper');
        const fbBtn = document.getElementById('floatingBurger');
        if (navWrap && fbBtn) {
            const navRect = navWrap.getBoundingClientRect();
            // if nav bottom is above the viewport, show button
            if (navRect.bottom <= 0) fbBtn.style.display = 'flex';
            else {
                fbBtn.style.display = 'none';
                // If the nav became visible, ensure the offscreen menu is closed
                const existingOff = document.querySelector('.offscreen-menu');
                if (existingOff) {
                    existingOff.remove();
                    fbBtn.classList.remove('active');
                    fbBtn.setAttribute('aria-label', 'Open menu');
                    document.body.style.overflow = '';
                }
            }
        }
    } catch (e) {
        // ignore
    }

    // Stage boundaries (same as original)
    const stage1End = windowHeight * 0.5;   // hero move out
    const stage2End = windowHeight * 1.0;   // image zoom to right-top
    const stage3End = windowHeight * 1.5;   // infrastructure enters and stays
    const stage4End = windowHeight * 2.0;   // infra vanishes, image zooms to right-bottom
    const stage5End = windowHeight * 2.5;   // umbrella appears and stays
    const scrollCompleteAt = windowHeight * 3.0;

    // Clear transient inline styles when not needed
    function clearHeroBgTransforms() {
        if (heroBg) {
            heroBg.style.transform = '';
            heroBg.style.backgroundPosition = '';
        }
    }
    function clearVisibility(el) {
        if (!el) return;
        el.classList.remove('visible');
        el.style.opacity = '';
        el.style.transform = '';
    }

    // STAGE 1: hero content moves up and fades; image (heroBg) stays static
    if (scrollPosition < stage1End) {
        const t = scrollPosition / stage1End; // 0..1
        if (heroContent) {
            heroContent.style.transform = `translate(-50%, calc(-50% - ${t * 100}vh))`;
            heroContent.style.opacity = `${1 - t}`;
        }
        if (heroBottomLeft) {
            heroBottomLeft.style.transform = `translateY(-${t * 100}vh)`;
            heroBottomLeft.style.opacity = `${1 - t}`;
        }
        if (heroBottomRight) {
            heroBottomRight.style.transform = `translateY(-${t * 100}vh)`;
            heroBottomRight.style.opacity = `${1 - t}`;
        }

        // ensure bg is in its default state
        if (heroBg) {
            heroBg.classList.remove('stage-2', 'stage-3', 'stage-4', 'stage-5', 'scroll-complete');
            clearHeroBgTransforms();
        }
        if (infrastructureContent) clearVisibility(infrastructureContent);
        if (umbrellaContent) clearVisibility(umbrellaContent);
        if (heroSection) heroSection.classList.remove('scroll-complete');

        return;
    }

    // STAGE 2: image zooms towards right-top based on scroll amount between stage1End..stage2End
    if (scrollPosition >= stage1End && scrollPosition < stage2End) {
        // hide hero content completely
        if (heroContent) heroContent.style.opacity = 0;
        if (heroBottomLeft) heroBottomLeft.style.opacity = 0;
        if (heroBottomRight) heroBottomRight.style.opacity = 0;

        const t = (scrollPosition - stage1End) / (stage2End - stage1End); // 0..1
        // scale from 1 -> 1.35
        const scale = 1 + t * 0.35;
        // background position from center (50% 50%) -> left-top (0% 0%)
        const posX = 50 - (50 * t); // 50 -> 0
        const posY = 50 - (50 * t); // 50 -> 0

        if (heroBg) {
            heroBg.style.transform = `scale(${scale})`;
            heroBg.style.backgroundPosition = `${posX}% ${posY}%`;
            heroBg.classList.add('stage-2');
            heroBg.classList.remove('stage-3', 'stage-4', 'stage-5', 'scroll-complete');
        }

        if (infrastructureContent) clearVisibility(infrastructureContent);
        if (umbrellaContent) clearVisibility(umbrellaContent);
        if (heroSection) heroSection.classList.remove('scroll-complete');

        return;
    }

    // STAGE 3: infrastructure card enters and stays for the whole stage3
    if (scrollPosition >= stage2End && scrollPosition < stage3End) {
        // ensure hero content hidden
        if (heroContent) heroContent.style.opacity = 0;

        // keep heroBg in its stage-3 look (end of previous zoom)
        if (heroBg) {
            // set to the end-state of stage2 (right-top, scale ~1.35)
            heroBg.style.transform = `scale(1.35)`;
            heroBg.style.backgroundPosition = `0% 0%`;
            heroBg.classList.add('stage-3');
            heroBg.classList.remove('stage-2', 'stage-4', 'stage-5', 'scroll-complete');
        }

        if (infrastructureContent) {
            infrastructureContent.classList.add('visible');
            // ensure it stays fully visible throughout stage3
            infrastructureContent.style.opacity = '1';
            infrastructureContent.style.transform = 'translateY(0)';
        }

        if (umbrellaContent) clearVisibility(umbrellaContent);
        if (heroSection) heroSection.classList.remove('scroll-complete');

        return;
    }

    // STAGE 4: infra vanishes; image zooms to right-bottom based on scroll
    if (scrollPosition >= stage3End && scrollPosition < stage4End) {
        // hide infrastructure gradually based on progress
        const t = (scrollPosition - stage3End) / (stage4End - stage3End); // 0..1
        if (infrastructureContent) {
            infrastructureContent.style.opacity = `${1 - t}`;
            infrastructureContent.style.transform = `translateY(${t * -20}px)`;
            if (t >= 1) clearVisibility(infrastructureContent);
        }

        // heroBg transition from left-top -> right-bottom, scale from 1.35 -> 1.6
        const posX = t * 100; // 0 -> 100
        const posY = t * 100; // 0 -> 100
        const scale = 1.35 + t * 0.25; // 1.35 -> 1.6
        if (heroBg) {
            heroBg.style.transform = `scale(${scale})`;
            heroBg.style.backgroundPosition = `${posX}% ${posY}%`;
            heroBg.classList.add('stage-4');
            heroBg.classList.remove('stage-2', 'stage-3', 'stage-5', 'scroll-complete');
        }

        if (umbrellaContent) clearVisibility(umbrellaContent);
        if (heroSection) heroSection.classList.remove('scroll-complete');

        return;
    }

    // STAGE 5: umbrella card appears and stays till stage ends
    if (scrollPosition >= stage4End && scrollPosition < scrollCompleteAt) {
        // ensure infra hidden
        if (infrastructureContent) {
            infrastructureContent.classList.remove('visible');
            infrastructureContent.style.opacity = '';
            infrastructureContent.style.transform = '';
        }

        // keep heroBg in end-of-stage4 state (right-bottom, scaled)
        if (heroBg) {
            heroBg.style.transform = `scale(1.6)`;
            heroBg.style.backgroundPosition = `100% 100%`;
            heroBg.classList.add('stage-5');
            heroBg.classList.remove('stage-2', 'stage-3', 'stage-4', 'scroll-complete');
        }

        if (umbrellaContent) {
            umbrellaContent.classList.add('visible');
            umbrellaContent.style.opacity = '1';
            umbrellaContent.style.transform = 'translateY(0)';
        }

        if (scrollPosition >= scrollCompleteAt && heroSection) heroSection.classList.add('scroll-complete');

        return;
    }

    // beyond complete
    if (scrollPosition >= scrollCompleteAt) {
        if (heroBg) heroBg.classList.add('scroll-complete');
        if (heroSection) heroSection.classList.add('scroll-complete');
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

    // Also bind same behavior to any link with `.scroll-stage-3` (e.g., footer link)
    const stage3Links = document.querySelectorAll('.scroll-stage-3');
    if (stage3Links && stage3Links.length) {
        stage3Links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = window.innerHeight * 1.1;
                window.scrollTo({ top: target, behavior: 'smooth' });
            });
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

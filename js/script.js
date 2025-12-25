// Custom JavaScript goes here

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
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
        fb.addEventListener('click', function () {
            // On mobile keep previous behaviour: scroll to top
            if (window.innerWidth <= 1020) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const existing = document.querySelector('.offscreen-menu');
            if (existing) closeOffscreen();
            else openOffscreen();
        });

        // --- custom mobile menu close handling ---
        const customMenu = document.getElementById('custom-mobile-menu');
        if (customMenu) {
            // Close button inside custom menu (if present)
            const customClose = customMenu.querySelector('.mobile-close');
            if (customClose) {
                customClose.addEventListener('click', function (e) {
                    e.preventDefault();
                    // preserve current scroll position (in case unlockBodyScroll would restore wrong value)
                    const currY = window.scrollY || window.pageYOffset || 0;
                    if (typeof _scrollY !== 'undefined') _scrollY = currY;

                    // remove active state and cleanup
                    customMenu.classList.remove('active');
                    if (hamburgerMenu) hamburgerMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.classList.remove('mobile-nav-open');
                    unlockBodyScroll();

                    // ensure page stays at the preserved position
                    window.scrollTo(0, currY);

                    const fbBtn = document.getElementById('floatingBurger');
                    if (fbBtn) {
                        fbBtn.classList.remove('active');
                        fbBtn.setAttribute('aria-label', 'Open menu');
                    }
                });
            }

            // Close custom menu when any link inside it is clicked
            const customLinks = customMenu.querySelectorAll('a');
            if (customLinks.length) {
                customLinks.forEach(link => {
                    link.addEventListener('click', function (e) {
                        // prevent '#' links from jumping to top
                        if (this.getAttribute('href') === '#') e.preventDefault();
                        const currY = window.scrollY || window.pageYOffset || 0;
                        if (typeof _scrollY !== 'undefined') _scrollY = currY;

                        customMenu.classList.remove('active');
                        if (hamburgerMenu) hamburgerMenu.classList.remove('active');
                        document.body.style.overflow = '';
                        document.body.classList.remove('mobile-nav-open');
                        unlockBodyScroll();

                        window.scrollTo(0, currY);

                        const fbBtn = document.getElementById('floatingBurger');
                        if (fbBtn) {
                            fbBtn.classList.remove('active');
                            fbBtn.setAttribute('aria-label', 'Open menu');
                        }
                    });
                });
            }
        }

        // Close the offscreen menu if the viewport is resized to mobile
        window.addEventListener('resize', function () {
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
            a.addEventListener('click', function (e) {
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
                    <div class="social-icon" aria-hidden="true">❤</div>
                    <div class="social-links">
                        <a href="https://www.facebook.com/OsrodekDolinaRabyKlaj" target="_blank" rel="noopener noreferrer" aria-label="Dolina Raby on Facebook">Facebook</a>
                        <a href="#" aria-label="Dolina Raby on Instagram">Instagram</a>
                    </div>
                </div>

                <hr class="offscreen-sep">

                <div class="offscreen-phones">
                    <div class="phone-row">
                        <img src="img/offscreen-phone.png" alt="Phone" class="off-icon">
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

    // Scroll lock for mobile nav: save scroll position, fix body, and restore on close
    let _scrollY = 0;
    function lockBodyScroll() {
        _scrollY = window.scrollY || window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${_scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
    }
    function unlockBodyScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        window.scrollTo(0, _scrollY || 0);
        _scrollY = 0;
    }

    if (hamburgerMenu && mobileNavWrapper) {
        hamburgerMenu.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNavWrapper.classList.toggle('active');

            // Prevent body scroll when menu is open via robust scroll lock on mobile
            const isActive = this.classList.contains('active');
            if (window.innerWidth <= 1020) {
                document.body.classList.toggle('mobile-nav-open', isActive);
                if (isActive) lockBodyScroll();
                else unlockBodyScroll();
            } else {
                // Desktop behavior: just use overflow toggle
                document.body.style.overflow = isActive ? 'hidden' : '';
                document.body.classList.remove('mobile-nav-open');
                unlockBodyScroll();
            }

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
            link.addEventListener('click', function () {
                hamburgerMenu.classList.remove('active');
                mobileNavWrapper.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('mobile-nav-open');
                unlockBodyScroll();

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
            mobileClose.addEventListener('click', function () {
                hamburgerMenu.classList.remove('active');
                mobileNavWrapper.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('mobile-nav-open');
                unlockBodyScroll();
                const fbBtn = document.getElementById('floatingBurger');
                if (fbBtn) {
                    fbBtn.classList.remove('active');
                    fbBtn.setAttribute('aria-label', 'Open menu');
                }
            });
        }

        // Close menus with Escape key (both mobile and offscreen)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                if (mobileNavWrapper.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                    mobileNavWrapper.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.classList.remove('mobile-nav-open');
                    unlockBodyScroll();
                }
                const existingOff = document.querySelector('.offscreen-menu');
                if (existingOff) closeOffscreen();
            }
        });

        // Ensure we clean up scroll lock if viewport crosses breakpoint
        window.addEventListener('resize', function () {
            if (window.innerWidth > 1020) {
                document.body.classList.remove('mobile-nav-open');
                unlockBodyScroll();
            }
        });

        // Ensure feature icons open modals programmatically (robust fallback)
        // const featureButtons = document.querySelectorAll('.feature-btn');
        // if (featureButtons.length) {
        //     featureButtons.forEach(btn => {
        //         btn.addEventListener('click', function(e) {
        //             const target = this.getAttribute('data-bs-target');
        //             if (target) {
        //                 const modalEl = document.querySelector(target);
        //                 if (modalEl && typeof bootstrap !== 'undefined') {
        //                     const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        //                     bsModal.show();
        //                 }
        //             }
        //         });

        //         // keyboard: support Enter/Space for non-button elements (defensive)
        //         btn.addEventListener('keydown', function(e) {
        //             if (e.key === 'Enter' || e.key === ' ') {
        //                 e.preventDefault();
        //                 this.click();
        //             }
        //         });
        //     });
        // }

        // Attraction modal footer icons — switch between modals when clicked
        const attractionIcons = document.querySelectorAll('.attraction-modal-icon');
        if (attractionIcons.length) {
            attractionIcons.forEach(icon => {
                icon.addEventListener('click', function (e) {
                    const targetSelector = this.getAttribute('data-target');
                    const attractionId = this.getAttribute('data-attraction');
                    const currentModalEl = this.closest('.modal');
                    if (!targetSelector || !currentModalEl) return;

                    // If clicking icon for the modal already open, just update active state
                    if (currentModalEl.id === targetSelector.replace('#', '')) {
                        // Ensure active state inside current modal
                        const iconsInCurrent = currentModalEl.querySelectorAll('.attraction-modal-icon');
                        iconsInCurrent.forEach(ic => ic.classList.toggle('active', ic.getAttribute('data-attraction') === attractionId));
                        return;
                    }

                    const currentBs = bootstrap.Modal.getInstance(currentModalEl);
                    // Hide current modal, then show target when fully hidden
                    if (currentBs) {
                        function onHidden() {
                            currentModalEl.removeEventListener('hidden.bs.modal', onHidden);
                            const targetEl = document.querySelector(targetSelector);
                            if (targetEl) {
                                // Show the requested modal
                                const t = bootstrap.Modal.getOrCreateInstance(targetEl);
                                t.show();

                                // When target is shown, set active icon inside it
                                function onShown() {
                                    targetEl.removeEventListener('shown.bs.modal', onShown);
                                    const iconsInTarget = targetEl.querySelectorAll('.attraction-modal-icon');
                                    iconsInTarget.forEach(ic => {
                                        ic.classList.toggle('active', ic.getAttribute('data-attraction') === attractionId);
                                    });
                                }
                                targetEl.addEventListener('shown.bs.modal', onShown);
                            }
                        }
                        currentModalEl.addEventListener('hidden.bs.modal', onHidden);
                        currentBs.hide();
                    } else {
                        const targetEl = document.querySelector(targetSelector);
                        if (targetEl) bootstrap.Modal.getOrCreateInstance(targetEl).show();
                    }
                });

                // Support keyboard activation
                icon.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        }
    }
});

// Smooth background transition on scroll with stages (scroll-driven interpolation per stage)
window.addEventListener('scroll', function () {
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
        const customHeader = document.getElementById('custom-mobile-header');
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
            // Show custom mobile header when nav is out of view on small screens
            if (customHeader) {
                if (window.innerWidth <= 768) {
                    if (navRect.bottom <= 0) {
                        customHeader.classList.add('visible');
                    } else {
                        customHeader.classList.remove('visible');
                    }
                } else {
                    customHeader.classList.remove('visible');
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
    const scrollCompleteAt = windowHeight * 3.5; // extended so Stage 5 has more time (was 3.0)

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

        const tRaw = (scrollPosition - stage1End) / (stage2End - stage1End); // 0..1
        const t = easeOutCubic(tRaw);
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

    // Helpful easing function for smoother transitions
    function easeOutCubic(x) { return 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3); }

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
        const tRaw = (scrollPosition - stage3End) / (stage4End - stage3End); // 0..1
        const t = easeOutCubic(tRaw);
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
document.addEventListener('DOMContentLoaded', function () {
    const navOnas = document.getElementById('navOnas');
    if (navOnas) {
        navOnas.addEventListener('click', function (e) {
            e.preventDefault();
            const target = window.innerHeight * 1.1; // inside stage 3 (between 1.0 and 1.5 * windowHeight)
            window.scrollTo({ top: target, behavior: 'smooth' });
        });
    }

    // Also bind same behavior to any link with `.scroll-stage-3` (e.g., footer link)
    const stage3Links = document.querySelectorAll('.scroll-stage-3');
    if (stage3Links && stage3Links.length) {
        stage3Links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = window.innerHeight * 1.1;
                window.scrollTo({ top: target, behavior: 'smooth' });
            });
        });
    }

    // Hero green CTA should open hero Stage 3 as well
    const heroCta = document.querySelector('.hero-content .btn-discover');
    if (heroCta) {
        heroCta.addEventListener('click', function (e) {
            e.preventDefault();
            const target = window.innerHeight * 1.1;
            window.scrollTo({ top: target, behavior: 'smooth' });
        });
    }
});

// Initialize AOS if available
document.addEventListener('DOMContentLoaded', function () {
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
window.addEventListener('load', function () {
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


// mobile-menu-button to toggle custom-mobile-menu active class
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const customMobileMenu = document.getElementById('custom-mobile-menu');
    const customClose = document.getElementById('custom-menu-close');

    if (mobileMenuButton && customMobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            customMobileMenu.classList.toggle('active');

            // turn off page scrolling
            if (customMobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        if (customClose) {
            customClose.addEventListener('click', function (e) {
                e.preventDefault();
                customMobileMenu.classList.remove('active');
            });
        }
    }
});
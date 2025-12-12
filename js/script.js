// Custom JavaScript goes here

// Smooth background transition on scroll with stages
window.addEventListener('scroll', function() {
    const heroBg = document.getElementById('hero-bg');
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
    
    if (scrollPosition < stage1End) {
        // Stage 1: Scroll hero content up (0% to 50%)
        const stage1Progress = scrollPosition / stage1End;
        
        heroContent.style.transform = `translate(-50%, calc(-50% - ${stage1Progress * 100}vh))`;
        heroContent.style.opacity = 1 - stage1Progress;
        
        // Move bottom elements up as well
        heroBottomLeft.style.transform = `translateY(-${stage1Progress * 100}vh)`;
        heroBottomLeft.style.opacity = 1 - stage1Progress;
        
        heroBottomRight.style.transform = `translateY(-${stage1Progress * 100}vh)`;
        heroBottomRight.style.opacity = 1 - stage1Progress;
        
        heroBg.classList.remove('stage-2', 'stage-3', 'stage-4', 'stage-5');
        infrastructureContent.classList.remove('visible');
        umbrellaContent.classList.remove('visible');
    } else if (scrollPosition < stage2End) {
        // Stage 2: Background moves to top-left (no card)
        heroContent.style.opacity = 0;
        heroBottomLeft.style.opacity = 0;
        heroBottomRight.style.opacity = 0;
        
        heroBg.classList.add('stage-2');
        heroBg.classList.remove('stage-3', 'stage-4', 'stage-5');
        
        // No cards visible during transition
        infrastructureContent.classList.remove('visible');
        umbrellaContent.classList.remove('visible');
    } else if (scrollPosition < stage3End) {
        // Stage 3: Infrastructure card appears at top-left
        heroContent.style.opacity = 0;
        heroBottomLeft.style.opacity = 0;
        heroBottomRight.style.opacity = 0;
        
        heroBg.classList.add('stage-3');
        heroBg.classList.remove('stage-4', 'stage-5');
        infrastructureContent.classList.add('visible');
        umbrellaContent.classList.remove('visible');
    } else if (scrollPosition < stage4End) {
        // Stage 4: Background moves to bottom-right (no card)
        heroBg.classList.add('stage-4');
        heroBg.classList.remove('stage-2', 'stage-3', 'stage-5');
        
        // Remove infrastructure card during transition
        infrastructureContent.classList.remove('visible');
        umbrellaContent.classList.remove('visible');
    } else {
        // Stage 5: Umbrella card appears at bottom-right
        heroContent.style.opacity = 0;
        heroBottomLeft.style.opacity = 0;
        heroBottomRight.style.opacity = 0;
        
        heroBg.classList.add('stage-5');
        heroBg.classList.remove('stage-2', 'stage-3', 'stage-4');
        infrastructureContent.classList.remove('visible');
        umbrellaContent.classList.add('visible');
    }
});
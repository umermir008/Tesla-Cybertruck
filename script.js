// Immediate gallery reset on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Force reset all gallery items immediately
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
        item.style.translate = 'none';
        item.style.rotate = 'none';
        item.style.scale = 'none';
    });
    
    // Reset gallery images too
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.style.opacity = '1';
        img.style.transform = 'none';
        img.style.translate = 'none';
        img.style.rotate = 'none';
        img.style.scale = 'none';
    });
});

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('nav button');
const navLinks = document.querySelector('nav .hidden');

if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
        navLinks.classList.toggle('flex-col');
        navLinks.classList.toggle('absolute');
        navLinks.classList.toggle('top-full');
        navLinks.classList.toggle('left-0');
        navLinks.classList.toggle('w-full');
        navLinks.classList.toggle('bg-black');
        navLinks.classList.toggle('p-4');
    });
}

// Hero Section Animations
gsap.timeline()
    .from('.hero-title', {
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        duration: 1,
        x: -80,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-text', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.cta-button', {
        duration: 0.8,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=0.4');

// Parallax effect for hero background
gsap.to('.hero-bg', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: '#home',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// About section animations
gsap.timeline({
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    }
})
.from('.about-image img', {
    duration: 1,
    x: -100,
    opacity: 0,
    rotationY: -15,
    ease: 'power3.out'
})
.from('.about-content h2', {
    duration: 0.8,
    x: 100,
    opacity: 0,
    ease: 'power3.out'
}, '-=0.6')
.from('.about-point', {
    duration: 0.6,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
}, '-=0.4');

// Spec cards animation
gsap.from('.spec-card', {
    duration: 0.8,
    y: 100,
    opacity: 0,
    scale: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
        trigger: '#specs',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Reset and fix tech features completely
function resetTechFeatures() {
    // Clear all GSAP transforms and restore natural state
    gsap.set('.tech-feature', {
        clearProps: 'all',
        opacity: 1,
        transform: 'none'
    });
}

// Initialize tech features with proper cleanup
function initTechFeatures() {
    // Kill any existing ScrollTriggers for tech features
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === '#tech' || trigger.vars.trigger === '.tech-feature') {
            trigger.kill();
        }
    });
    
    // Reset everything first
    resetTechFeatures();
    
    // Create new animation with proper reset behavior
    gsap.fromTo('.tech-feature', 
        {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#tech',
                start: 'top 75%',
                end: 'bottom 25%',
                toggleActions: 'play none none reset',
                onRefresh: resetTechFeatures,
                onUpdate: (self) => {
                    // Ensure elements stay visible when in view
                    if (self.progress > 0.1) {
                        gsap.set('.tech-feature', { opacity: 1 });
                    }
                }
            }
        }
    );
}

// Remove the old problematic tech animation code
// Technology features animation - REPLACED WITH BETTER VERSION ABOVE

// Tech image 3D rotation effect
gsap.from('.tech-image img', {
    duration: 1.2,
    rotationY: 25,
    rotationX: 15,
    opacity: 0,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.tech-image',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Video section animation
gsap.from('.video-container', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#video',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Gallery items animation - Fixed version
function resetGalleryItems() {
    // Clear all GSAP transforms and restore natural state
    gsap.set('.gallery-item', {
        clearProps: 'all',
        opacity: 1,
        transform: 'none'
    });
}

// Initialize gallery with proper cleanup
function initGallery() {
    // Kill any existing ScrollTriggers for gallery
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === '#gallery' || trigger.vars.trigger === '.gallery-item') {
            trigger.kill();
        }
    });
    
    // Reset everything first
    resetGalleryItems();
    
    // Create new animation with proper reset behavior
    gsap.fromTo('.gallery-item', 
        {
            opacity: 0,
            x: 50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#gallery',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reset',
                onRefresh: resetGalleryItems,
                onUpdate: (self) => {
                    // Ensure elements stay visible when in view
                    if (self.progress > 0.1) {
                        gsap.set('.gallery-item', { opacity: 1 });
                    }
                }
            }
        }
    );
}

// Gallery items parallax - REPLACED WITH BETTER VERSION ABOVE
// gsap.from('.gallery-item', {
//     duration: 1,
//     x: 100,
//     opacity: 0,
//     stagger: 0.2,
//     ease: 'power3.out',
//     scrollTrigger: {
//         trigger: '#gallery',
//         start: 'top 80%',
//         toggleActions: 'play none none reverse'
//     }
// });

// Booking form animation
gsap.from('.booking-form', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Footer animation
gsap.from('footer > div', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
    }
});

// Navbar background on scroll
gsap.to('nav', {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(20px)',
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top -100',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
    }
});

// CTA Button ripple effect
document.querySelectorAll('.neon-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Enhanced Video play functionality with error handling
const playButton = document.querySelector('.play-button');
const videoIframe = document.querySelector('.video-iframe');
const videoThumbnail = document.querySelector('.video-thumbnail');
const videoOverlay = document.querySelector('.video-overlay');
const videoInfo = document.querySelector('.video-info');

if (playButton && videoIframe) {
    // Create fallback video element
    const createFallbackVideo = () => {
        const video = document.createElement('video');
        video.className = 'absolute inset-0 w-full h-full object-cover';
        video.controls = true;
        video.autoplay = true;
        video.muted = true; // Required for autoplay
        video.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'; // Fallback video
        return video;
    };
    
    playButton.addEventListener('click', function() {
        // Add click animation
        gsap.to(this, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });
        
        // Hide play button and thumbnail
        gsap.to(playButton, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        gsap.to([videoThumbnail, videoOverlay, videoInfo], {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        // Show video iframe with animation
        setTimeout(() => {
            videoIframe.classList.remove('hidden');
            videoIframe.src = videoIframe.dataset.src;
            
            // Error handling for iframe
            videoIframe.onerror = () => {
                console.log('YouTube iframe failed, using fallback video');
                const fallbackVideo = createFallbackVideo();
                videoIframe.parentNode.appendChild(fallbackVideo);
                videoIframe.style.display = 'none';
            };
            
            gsap.fromTo(videoIframe, 
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
            );
        }, 300);
    });
    
    // Add enhanced hover effects
    playButton.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.1,
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    playButton.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    // Alternative: Direct video link click
    const createVideoLink = () => {
        const link = document.createElement('a');
        link.href = 'https://www.youtube.com/watch?v=m7atGkba-Z8';
        link.target = '_blank';
        link.className = 'absolute top-2 right-2 text-blue-400 hover:text-blue-300 text-sm z-30';
        link.innerHTML = '🔗 Watch on YouTube';
        return link;
    };
    
    // Add video link
    videoIframe.parentNode.appendChild(createVideoLink());
}

// Form submission with animation
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Button loading animation
        submitButton.textContent = 'Booking...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Booked Successfully!';
            submitButton.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
                this.reset();
            }, 2000);
        }, 2000);
    });
}

// Focus glow effect for form inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        gsap.to(this, {
            duration: 0.3,
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
            scale: 1.02,
            ease: 'power2.out'
        });
    });
    
    input.addEventListener('blur', function() {
        gsap.to(this, {
            duration: 0.3,
            boxShadow: '0 0 0px rgba(59, 130, 246, 0)',
            scale: 1,
            ease: 'power2.out'
        });
    });
});

// Social icons hover animation
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            y: -5,
            scale: 1.2,
            rotationZ: 360,
            ease: 'back.out(1.7)'
        });
    });
    
    icon.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            y: 0,
            scale: 1,
            rotationZ: 0,
            ease: 'power2.out'
        });
    });
});

// Spec cards hover effects
document.querySelectorAll('.spec-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            y: -10,
            scale: 1.05,
            rotationX: 5,
            rotationY: 5,
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            boxShadow: '0 0 0px rgba(59, 130, 246, 0)',
            ease: 'power2.out'
        });
    });
});

// Gallery horizontal scroll with mouse wheel
const galleryScroll = document.querySelector('.gallery-scroll');
if (galleryScroll) {
    galleryScroll.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            this.scrollLeft += e.deltaY;
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.tech-feature, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Preloader functionality
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        gsap.to(preloader, {
            duration: 0.5,
            opacity: 0,
            onComplete: () => preloader.remove()
        });
    }
    
    // Initialize components after page load
    setTimeout(() => {
        initTechFeatures();
        initGallery();
    }, 500);
});

// Performance optimization - Reduce animations on slower devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    gsap.globalTimeline.timeScale(0.5);
}

// Responsive adjustments
function handleResize() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Reduce animation complexity on mobile
        gsap.set('.spec-card', { clearProps: 'transform' });
        gsap.set('.tech-feature', { clearProps: 'transform' });
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Initial call

console.log('🚀 Tesla Cybertruck Experience loaded successfully!');
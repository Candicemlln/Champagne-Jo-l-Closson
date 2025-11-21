// script.js - VERSION CORRIGÉE
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Randomize hero bubbles positions
    function randomizeHeroBubbles() {
        const heroBubbles = document.querySelectorAll('.hero-bubbles .bubble');
        heroBubbles.forEach((bubble, index) => {
            // Random horizontal position between 5% and 95%
            const randomLeft = Math.random() * 90 + 5;
            bubble.style.left = randomLeft + '%';
            bubble.style.right = 'auto';
            
            // Random animation duration between 6s and 10s
            const randomDuration = Math.random() * 4 + 6;
            bubble.style.animationDuration = randomDuration + 's';
            
            // Random delay to stagger the bubbles
            const randomDelay = Math.random() * 3;
            bubble.style.animationDelay = randomDelay + 's';
        });
        
        // Also handle tiny bubbles
        const tinyBubbles = document.querySelectorAll('.bubble-tiny, .bubble-tiny-2, .bubble-tiny-3, .bubble-tiny-4, .bubble-tiny-5, .bubble-tiny-6');
        tinyBubbles.forEach(bubble => {
            const randomLeft = Math.random() * 90 + 5;
            bubble.style.left = randomLeft + '%';
            bubble.style.right = 'auto';
            
            const randomDuration = Math.random() * 3 + 6;
            bubble.style.animationDuration = randomDuration + 's';
            
            const randomDelay = Math.random() * 3;
            bubble.style.animationDelay = randomDelay + 's';
        });
    }
    
    // Initialize random positions
    randomizeHeroBubbles();
    
    // Re-randomize positions when animation ends
    const allBubbles = document.querySelectorAll('.hero-bubbles .bubble, .bubble-tiny, .bubble-tiny-2, .bubble-tiny-3, .bubble-tiny-4, .bubble-tiny-5, .bubble-tiny-6');
    allBubbles.forEach(bubble => {
        bubble.addEventListener('animationiteration', function() {
            const randomLeft = Math.random() * 90 + 5;
            this.style.left = randomLeft + '%';
            this.style.right = 'auto';
        });
    });

    // Parallax effect for bubbles
    const bubbleLarge = document.querySelector('.bubble-large');
    const bubbleMedium = document.querySelector('.bubble-medium');
    const bubbleSmall = document.querySelector('.bubble-small');
    const bubbleSmall2 = document.querySelector('.bubble-small-2');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (bubbleLarge) {
            bubbleLarge.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        if (bubbleMedium) {
            bubbleMedium.style.transform = `translateY(${scrollY * 0.4}px) translateX(${scrollY * 0.05}px)`;
        }
        if (bubbleSmall) {
            bubbleSmall.style.transform = `translateY(${scrollY * 0.5}px) translateX(${scrollY * -0.1}px)`;
        }
        if (bubbleSmall2) {
            bubbleSmall2.style.transform = `translateY(${scrollY * 0.6}px) translateX(${scrollY * 0.15}px)`;
        }
    });

    // Scroll horizontal
    const container = document.getElementById('horizontal-scroll');
    
    if (container) {
        // Scroll à la molette sur desktop
        container.addEventListener('wheel', function(e) {
            // Convertir scroll vertical en horizontal
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        }, { passive: false });

        // Touch support pour mobile
        let startX = 0;
        let scrollStart = 0;

        container.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX;
            scrollStart = container.scrollLeft;
        });

        container.addEventListener('touchmove', function(e) {
            const x = e.touches[0].pageX;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollStart - walk;
        });
    }

    // Champagne creator functionality
    const chardonnaySlider = document.getElementById('chardonnay');
    const chardonnayValue = document.getElementById('chardonnay-value');
    const agingSlider = document.getElementById('aging');
    const agingValue = document.getElementById('aging-value');
    const dosageSlider = document.getElementById('dosage');
    const dosageValue = document.getElementById('dosage-value');
    const previewText = document.getElementById('preview-text');
    const liquid = document.getElementById('liquid');

    // Create bubbles for champagne bottle with continuous animation
    function createSingleBubble(container) {
        const bubble = document.createElement('div');
        bubble.className = 'mini-bubble';
        const size = Math.random() * 5 + 2;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.background = 'rgba(255, 255, 255, 0.8)';
        bubble.style.borderRadius = '50%';
        bubble.style.position = 'absolute';
        bubble.style.bottom = `${Math.random() * 10}%`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationName = 'bubble-rise';
        bubble.style.animationDuration = `${Math.random() * 3 + 2}s`;
        bubble.style.animationTimingFunction = 'ease-in';
        bubble.style.animationIterationCount = '1';
        
        container.appendChild(bubble);
        
        // Remove bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 5000);
    }
    
    function createBubbles() {
        const bubblesContainer = document.getElementById('bubbles-container');
        if (!bubblesContainer) return;
        
        // Continuously create new bubbles
        setInterval(() => {
            if (bubblesContainer.children.length < 40) {
                createSingleBubble(bubblesContainer);
        }
        }, 200);
    }

    // Update champagne preview
    function updatePreview() {
        if (!chardonnaySlider || !previewText) return;
        
        const chardonnay = parseInt(chardonnaySlider.value);
        const aging = parseInt(agingSlider.value);
        const dosage = parseInt(dosageSlider.value);
        
        let champagneType;
        if (chardonnay > 85) champagneType = "Très minéral";
        else if (chardonnay > 60) champagneType = "Équilibré";
        else champagneType = "Fruité";
        
        let agingDescription;
        if (aging > 48) agingDescription = "long vieillissement";
        else if (aging > 36) agingDescription = "vieillissement prolongé";
        else agingDescription = "élevage classique";
        
        let dosageType;
        if (dosage < 3) dosageType = "Brut Nature";
        else if (dosage < 6) dosageType = "Extra Brut";
        else if (dosage < 12) dosageType = "Brut";
        else dosageType = "Demi-Sec";
        
        previewText.innerHTML =
            `"${champagneType}" : Champagne dominé par le Chardonnay (${chardonnay}%), ` +
            `élevé ${aging} mois sur lies avec un dosage ${dosageType} (${dosage}g/L)`;
        
        // Update liquid level and bubbles container
        if (liquid) {
            const level = 20 + (chardonnay / 100) * 50;
            liquid.style.height = level + '%';
            
            // Update bubbles container to match liquid height
            const bubblesContainer = document.getElementById('bubbles-container');
            if (bubblesContainer) {
                bubblesContainer.style.height = level + '%';
            }
        }
    }

    // Initialize sliders
    if (chardonnaySlider && chardonnayValue) {
        chardonnaySlider.addEventListener('input', function() {
            chardonnayValue.textContent = this.value + '%';
            updatePreview();
        });
    }
    
    if (agingSlider && agingValue) {
        agingSlider.addEventListener('input', function() {
            agingValue.textContent = this.value + ' mois';
            updatePreview();
        });
    }
    
    if (dosageSlider && dosageValue) {
        dosageSlider.addEventListener('input', function() {
            dosageValue.textContent = this.value + 'g/L';
            updatePreview();
        });
    }

    // ✅ NAVIGATION FIXÉE - Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement && container) {
                // Scroll horizontal pour les sections
                if (targetElement.classList.contains('scroll-section')) {
                    // D'abord, scroll vertical jusqu'au conteneur horizontal
                    const containerTop = container.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: containerTop,
                        behavior: 'smooth'
                    });
                    
                    // Puis, après un délai, scroll horizontal
                    setTimeout(() => {
                        container.scrollTo({
                            left: targetElement.offsetLeft,
                            behavior: 'smooth'
                        });
                    }, 800);
                } else if (targetId === '#contact') {
                    // Scroll vertical pour footer
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // Scroll vertical pour hero
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize everything
    createBubbles();
    if (chardonnaySlider) {
        updatePreview();
        // Initialize bubbles container height
        const bubblesContainer = document.getElementById('bubbles-container');
        if (bubblesContainer && liquid) {
            const initialLevel = 20 + (70 / 100) * 50; // 70 is default value
            bubblesContainer.style.height = initialLevel + '%';
        }
    }
    
    // Add animation to product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(card);
    });
});
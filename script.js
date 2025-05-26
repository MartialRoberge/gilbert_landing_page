document.addEventListener('DOMContentLoaded', () => {
    // Animation pour redresser les images lorsque la souris passe dessus
    // Utiliser un code plus simple et plus direct
    const actionImages = document.querySelectorAll('.action-image');
    
    actionImages.forEach(image => {
        const img = image.querySelector('img');
        
        image.addEventListener('mouseenter', () => {
            console.log('Mouse enter on image');
            // Redresser l'image avec un effet d'élévation
            image.classList.add('hovered');
        });
        
        image.addEventListener('mouseleave', () => {
            console.log('Mouse leave from image');
            // Remettre l'image dans sa position initiale
            image.classList.remove('hovered');
        });
    });

    // Utilisation directe du DOM pour une réactivité maximale sans aucune transition
    document.querySelectorAll('.feature-card').forEach(card => {
        // Définir une référence pour le style transform
        let transformStyle = '';
        
        // Gestionnaire d'événement mousemove ultra réactif
        card.addEventListener('mousemove', e => {
            // Calcul de la position relative de la souris dans la carte
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // position x dans l'élément
            const y = e.clientY - rect.top;  // position y dans l'élément
            
            // Calcul de la rotation basée sur la position de la souris
            const width = rect.width;
            const height = rect.height;
            
            // Calculer l'angle de rotation avec une amplitude modérée
            const rotateX = -((y - height/2) / height * 2) * 8; // max 8 degrés
            const rotateY = ((x - width/2) / width * 2) * 8;    // max 8 degrés
            
            // Appliquer la transformation SANS DÉLAI, avec un effet d'échelle plus subtil
            transformStyle = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03) translateZ(10px)`;
            card.style.transform = transformStyle;
            
            // Ajouter un effet de lumière modéré qui suit la souris
            const percentX = (x / width) * 100;
            const percentY = (y / height) * 100;
            card.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.15) 0%, transparent 70%)`;
            
            // Ajout d'une ombre portée dynamique mais plus subtile
            const shadowX = (x - width/2) / 15;
            const shadowY = (y - height/2) / 15;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 25px rgba(80, 70, 229, 0.15), 0 8px 16px rgba(80, 70, 229, 0.12)`;
            
            // Déplacer les éléments intérieurs pour plus de profondeur
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                const moveX = -((x - width/2) / width * 2) * 8;
                const moveY = -((y - height/2) / height * 2) * 8;
                icon.style.transform = `translateX(${moveX}px) translateY(${moveY}px) translateZ(20px)`;
            }
            
            const callout = card.querySelector('.feature-callout');
            if (callout) {
                const moveX = -((x - width/2) / width * 2) * 5;
                const moveY = -((y - height/2) / height * 2) * 5;
                callout.style.transform = `translateX(${moveX}px) translateY(${moveY}px) translateZ(10px)`;
            }
        });
        
        // Réinitialiser la transformation quand la souris quitte la carte
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            card.style.background = '';
            
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
            }
            
            const callout = card.querySelector('.feature-callout');
            if (callout) {
                callout.style.transform = '';
            }
        });
    });

    
    // Add custom parallax effect for card contents
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const icon = card.querySelector('.feature-icon');
        const callout = card.querySelector('.feature-callout');
        
        // Make internal elements move for depth effect
        card.addEventListener('tiltChange', function(event) {
            const values = event.detail;
            
            // Move icon in opposite direction for parallax effect
            if (icon) {
                const moveX = (values.percentageX - 50) / 2;
                const moveY = (values.percentageY - 50) / 2;
                icon.style.transform = `translateX(${-moveX}px) translateY(${-moveY}px) translateZ(40px)`;
            }
            
            // Move callout slightly for depth
            if (callout) {
                const moveX = (values.percentageX - 50) / 4;
                const moveY = (values.percentageY - 50) / 4;
                callout.style.transform = `translateX(${-moveX}px) translateY(${-moveY}px) translateZ(20px)`;
            }
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            if (icon) icon.style.transform = 'translateZ(30px)';
            if (callout) callout.style.transform = 'translateZ(20px)';
        });
    });
    
    // Effet 3D ultra-réactif pour les images de la section Gilbert en action
    document.querySelectorAll('.action-image').forEach(imageContainer => {
        // Supprimer les transitions CSS pour une réactivité maximale
        imageContainer.style.transition = 'none';
        const img = imageContainer.querySelector('img');
        if (img) {
            img.style.transition = 'none';
        }
        
        // Variables pour le suivi de la position de la souris
        let rect = imageContainer.getBoundingClientRect();
        let mouseX = 0;
        let mouseY = 0;
        let centerX = rect.left + rect.width / 2;
        let centerY = rect.top + rect.height / 2;
        let isHovering = false;
        
        // Fonction de mise à jour de la position pour une animation fluide
        function updatePosition() {
            // Recalculer les dimensions au cas où elles changeraient
            rect = imageContainer.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
            
            // Gérer les transitions douces
            if (transitionIn) {
                transitionProgress++;
                if (transitionProgress >= transitionDuration) {
                    transitionIn = false;
                }
            } else if (transitionOut) {
                transitionProgress++;
                if (transitionProgress >= transitionDuration) {
                    transitionOut = false;
                    // Réinitialiser à la position initiale quand la transition de sortie est terminée
                    imageContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
                    imageContainer.style.background = '';
                    if (img) {
                        img.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
                    }
                    return;
                }
            }
            
            // Calculer le facteur de transition (0 à 1 pour entrée, 1 à 0 pour sortie)
            let transitionFactor = 1;
            if (transitionIn) {
                transitionFactor = transitionProgress / transitionDuration;
            } else if (transitionOut) {
                transitionFactor = 1 - (transitionProgress / transitionDuration);
            }
            
            // Calculer les angles de rotation basés sur la distance au centre
            const distX = mouseX - centerX;
            const distY = mouseY - centerY;
            
            // Normaliser pour obtenir des valeurs entre -1 et 1
            const normalizedX = distX / (rect.width / 2);
            const normalizedY = distY / (rect.height / 2);
            
            // Calculer les angles avec une amplitude optimale et appliquer le facteur de transition
            const rotateY = normalizedX * 10 * transitionFactor;
            const rotateX = -normalizedY * 10 * transitionFactor;
            const scale = 1 + (0.03 * transitionFactor);
            const translateZ = 20 * transitionFactor;
            
            // Appliquer la transformation avec le facteur de transition
            const transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
            imageContainer.style.transform = transform;
            
            // Effet de lumière qui suit la souris avec précision
            const percentX = ((mouseX - rect.left) / rect.width) * 100;
            const percentY = ((mouseY - rect.top) / rect.height) * 100;
            const gradientOpacity = 0.2 * transitionFactor;
            imageContainer.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,${gradientOpacity}) 0%, transparent 60%)`;
            
            // Ombre dynamique qui suit la souris
            if (img) {
                const shadowX = normalizedX * 15 * transitionFactor;
                const shadowY = normalizedY * 15 * transitionFactor;
                const shadowBlur = 30 * transitionFactor;
                const shadowSpread = 15 * transitionFactor;
                const shadowOpacity = 0.25 * transitionFactor;
                img.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(80, 70, 229, ${shadowOpacity}), 0 ${shadowSpread}px ${shadowBlur}px rgba(80, 70, 229, ${shadowOpacity * 0.8})`;
            }
            
            // Continuer l'animation si nécessaire
            if (isHovering || transitionOut) {
                requestAnimationFrame(updatePosition);
            } else {
                // Assurer que l'image est bien revenue à sa position initiale
                imageContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)';
                imageContainer.style.background = '';
                if (img) {
                    img.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
                }
            }
        }
        
        // Variables pour la transition en douceur
        let transitionProgress = 0;
        let transitionIn = false;
        let transitionOut = false;
        const transitionDuration = 10; // Nombre d'étapes pour la transition
        
        // Capturer le mouvement de la souris pour une réactivité maximale
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Vérifier si la souris est sur l'image
            if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
                if (!isHovering) {
                    isHovering = true;
                    transitionIn = true;
                    transitionOut = false;
                    transitionProgress = 0;
                    requestAnimationFrame(updatePosition);
                }
            } else {
                if (isHovering) {
                    isHovering = false;
                    transitionIn = false;
                    transitionOut = true;
                    transitionProgress = 0;
                    requestAnimationFrame(updatePosition);
                }
            }
        });
        
        // Assurer que l'effet est réinitialisé correctement
        window.addEventListener('scroll', () => {
            rect = imageContainer.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
        });
    });

    // Gestion du clic sur le bouton de lecture vidéo - Version simplifiée
    const playButton = document.getElementById('play-button');
    const videoPreview = document.getElementById('video-preview');
    const videoEmbed = document.getElementById('video-embed');
    
    if (playButton && videoPreview && videoEmbed) {
        playButton.addEventListener('click', function() {
            // 1. Cacher la prévisualisation
            videoPreview.style.display = 'none';
            
            // 2. Afficher le conteneur de la vidéo
            videoEmbed.style.display = 'block';
            
            // 3. Insérer l'iframe YouTube
            videoEmbed.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="border: none; outline: none;"
                ></iframe>
            `;
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Sticky header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    // Détecter si nous sommes sur la page ambassadeur
    const isAmbassadorPage = window.location.pathname.includes('ambassadeur');
    
    // Si nous sommes sur la page ambassadeur, appliquer directement le style bleu
    if (isAmbassadorPage) {
        header.style.background = 'linear-gradient(180deg, rgba(26, 60, 141, 0.9) 0%, rgba(26, 60, 141, 0.8) 100%)';
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            if (isAmbassadorPage) {
                // Sur la page ambassadeur, maintenir le fond bleu mais ajouter une ombre
                header.style.background = 'linear-gradient(180deg, rgba(26, 60, 141, 0.95) 0%, rgba(26, 60, 141, 0.9) 100%)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            } else {
                // Sur les autres pages, comportement normal
                header.classList.add('sticky');
            }
        } else {
            if (isAmbassadorPage) {
                // Sur la page ambassadeur, maintenir le fond bleu mais enlever l'ombre
                header.style.background = 'linear-gradient(180deg, rgba(26, 60, 141, 0.9) 0%, rgba(26, 60, 141, 0.8) 100%)';
                header.style.boxShadow = 'none';
            } else {
                // Sur les autres pages, comportement normal
                header.classList.remove('sticky');
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // Screenshots slider navigation (for mobile touch)
    const screenshotsSlider = document.querySelector('.screenshots-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (screenshotsSlider) {
        screenshotsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            screenshotsSlider.classList.add('active');
            startX = e.pageX - screenshotsSlider.offsetLeft;
            scrollLeft = screenshotsSlider.scrollLeft;
        });

        screenshotsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            screenshotsSlider.classList.remove('active');
        });

        screenshotsSlider.addEventListener('mouseup', () => {
            isDown = false;
            screenshotsSlider.classList.remove('active');
        });

        screenshotsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - screenshotsSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            screenshotsSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .screenshot, .testimonial-card, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Slider des témoignages
    const testimonialSlider = document.querySelector('.testimonials-slider-inner');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-nav-btn.prev');
    const nextBtn = document.querySelector('.testimonial-nav-btn.next');
    const testimonialGroups = document.querySelectorAll('.testimonials-group');
    
    let currentSlide = 0;
    const totalSlides = testimonialGroups.length;
    
    // Fonction pour mettre à jour l'affichage du slider
    function updateSlider() {
        // Déplacer le slider à la position actuelle
        testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Mettre à jour les points de navigation
        testimonialDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Gestionnaire pour le bouton précédent
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    // Gestionnaire pour le bouton suivant
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
    }
    
    // Gestionnaire pour les points de navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Initialiser le slider
    updateSlider();

    // Handle video modal if needed
    const demoButton = document.querySelector('a[href="#demo"]');
    const videoSection = document.querySelector('#demo');
    
    if (demoButton && videoSection) {
        demoButton.addEventListener('click', (e) => {
            e.preventDefault();
            videoSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Add CSS class for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    .feature-card, .screenshot, .testimonial-card, .pricing-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .feature-card.animated, .screenshot.animated, .testimonial-card.animated, .pricing-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        padding: 20px;
        z-index: 1000;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 7px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    header.sticky {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        padding: 5px 0;
    }
    
    .screenshots-slider.active {
        cursor: grabbing;
    }
</style>
`);

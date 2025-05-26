document.addEventListener('DOMContentLoaded', function() {
    // Approche simple et directe pour l'indicateur de section active
    
    // 1. Obtenir tous les éléments nécessaires
    const navLinks = document.querySelectorAll('.nav-links a');
    const featuresSection = document.getElementById('features');
    const demoSection = document.getElementById('demo');
    const testimonialsSection = document.getElementById('testimonials');
    const pricingSection = document.getElementById('pricing');
    
    // 2. Fonction pour déterminer quelle section est active
    function setActiveSection() {
        // Position actuelle du défilement (avec un petit décalage pour la détection)
        const scrollPos = window.scrollY + 100;
        
        // D'abord, retirer la classe 'active' de tous les liens
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Obtenir les positions des sections
        const featuresPos = featuresSection.offsetTop;
        const demoPos = demoSection.offsetTop;
        const testimonialsPos = testimonialsSection.offsetTop;
        const pricingPos = pricingSection.offsetTop;
        
        // Déterminer quelle section est actuellement visible
        let activeSection = null;
        
        // Vérifier pour la section Hero (aucun indicateur)
        if (scrollPos < featuresPos - 50) {
            activeSection = null;
        }
        // Vérifier pour la section Fonctionnalités
        else if (scrollPos < demoPos - 50) {
            activeSection = 'features';
        }
        // Vérifier pour la section Démonstration
        else if (scrollPos < testimonialsPos - 50) {
            activeSection = 'demo';
        }
        // Vérifier pour la section Témoignages
        else if (scrollPos < pricingPos - 50) {
            activeSection = 'testimonials';
        }
        // Sinon, c'est la section Tarifs
        else {
            activeSection = 'pricing';
        }
        
        // Activer le lien correspondant à la section active
        if (activeSection) {
            const activeLink = document.querySelector(`.nav-links a[href="#${activeSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // 3. Exécuter la fonction au chargement et lors du défilement
    setActiveSection(); // Exécution initiale
    window.addEventListener('scroll', setActiveSection);
    window.addEventListener('resize', setActiveSection);
});

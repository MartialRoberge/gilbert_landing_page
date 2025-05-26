// Solution simplifiée pour l'indicateur de section active
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments nécessaires
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Fonction pour déterminer la section active
    function highlightActiveSection() {
        // Position de défilement actuelle
        const scrollPos = window.scrollY + 150;
        
        // Retirer la classe active de tous les liens
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Obtenir toutes les sections
        const features = document.getElementById('features');
        const demo = document.getElementById('demo');
        const testimonials = document.getElementById('testimonials');
        const pricing = document.getElementById('pricing');
        
        // Définir quelle section est active
        if (features && scrollPos >= features.offsetTop - 50 && 
            demo && scrollPos < demo.offsetTop) {
            document.querySelector('.nav-links a[href="#features"]').classList.add('active');
        } 
        else if (demo && scrollPos >= demo.offsetTop && 
                testimonials && scrollPos < testimonials.offsetTop - 50) {
            document.querySelector('.nav-links a[href="#demo"]').classList.add('active');
        }
        else if (testimonials && scrollPos >= testimonials.offsetTop - 50 && 
                pricing && scrollPos < pricing.offsetTop - 50) {
            document.querySelector('.nav-links a[href="#testimonials"]').classList.add('active');
        }
        else if (pricing && scrollPos >= pricing.offsetTop - 50) {
            document.querySelector('.nav-links a[href="#pricing"]').classList.add('active');
        }
    }
    
    // Exécuter la fonction
    highlightActiveSection();
    window.addEventListener('scroll', highlightActiveSection);
    window.addEventListener('resize', highlightActiveSection);
});

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Sélectionner toutes les sections avec des IDs (cibles des liens de navigation)
    const sections = document.querySelectorAll('section[id], div.demo-wrapper');
    
    // Fonction pour déterminer quelle section est visible
    function highlightActiveSection() {
        // Position actuelle du défilement + une marge pour déclencher plus tôt
        const scrollPosition = window.scrollY + 300;
        
        // Parcourir toutes les sections pour trouver celle qui est actuellement visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Vérifier si la section est actuellement visible dans la fenêtre
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Retirer la classe active de tous les liens
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Ajouter la classe active au lien correspondant à la section visible
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
        
        // Gestion spéciale pour la section d'accueil (top de la page)
        if (scrollPosition < 300) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // Si vous avez un lien d'accueil, vous pouvez l'activer ici
            // const homeLink = document.querySelector('.nav-links a[href="#home"]');
            // if (homeLink) homeLink.classList.add('active');
        }
    }
    
    // Exécuter la fonction au chargement de la page
    highlightActiveSection();
    
    // Exécuter la fonction lors du défilement
    window.addEventListener('scroll', highlightActiveSection);
});

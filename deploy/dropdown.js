// Gestion des menus déroulants dans la section 'Gilbert en action'
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter des indices aux items de la liste pour l'animation en cascade
    document.querySelectorAll('.key-points').forEach(list => {
        list.querySelectorAll('li').forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
    });
    
    document.querySelectorAll('.expand-details').forEach(button => {
        button.addEventListener('click', function() {
            // Toggle la classe active sur le bouton
            this.classList.toggle('active');
            
            // Trouver le panneau de détails associé
            const detailsPanel = this.nextElementSibling;
            
            // Toggle la classe active sur le panneau
            detailsPanel.classList.toggle('active');
        });
    });
});

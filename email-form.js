// Initialiser EmailJS avec la clé publique fournie
(function() {
    // Clé publique fournie par l'utilisateur
    emailjs.init("Kzp7Om73h9_PZ6ElQ");
})();

function sendEmail(event) {
    event.preventDefault();
    
    // Vérifier que tous les champs sont remplis
    const form = document.getElementById('ambassador-signup-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    
    // Afficher un indicateur de chargement
    const submitButton = document.querySelector('.form-submit button');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;
    
    // Préparer les paramètres pour l'email
    const templateParams = {
        to_name: "Mathis",
        to_email: "mathis@lexiapro.fr", // Email principal
        cc_email: "contact@gilbert-ia.fr, martial@lexiapro.fr, hugo@lexiapro.fr", // Copies à ces adresses
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        phone: document.getElementById('phone').value,
        // Conserver la clé 'position' pour compatibilité template, avec la valeur du téléphone
        position: document.getElementById('phone').value,
        linkedin: document.getElementById('linkedin').value,
        motivation: document.getElementById('motivation').value,
        subject: "Nouvelle inscription liste d'attente Gilbert"
    };
    
    // Envoyer l'email via EmailJS
    // IMPORTANT: Vous devez créer un template dans votre compte EmailJS
    // Pour créer un template, allez sur https://dashboard.emailjs.com/admin/templates
    // Puis remplacez 'template_xxxxxxx' ci-dessous par votre ID de template réel
    
    // Afficher un message dans la console pour le débogage
    console.log('Envoi du formulaire avec les paramètres:', templateParams);
    
    // Utilisation du template avec l'ID correct
    emailjs.send("service_05nyg6s", "template_931hqxy", templateParams, "Kzp7Om73h9_PZ6ElQ")
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Rediriger vers la page de remerciement
            window.location.href = 'merci.html';
        }, function(error) {
            console.error('FAILED...', error);
            alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
    
    return false;
}

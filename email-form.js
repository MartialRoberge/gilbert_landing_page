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
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        position: document.getElementById('position').value,
        linkedin: document.getElementById('linkedin').value,
        motivation: document.getElementById('motivation').value,
        subject: "Nouvelle candidature d'ambassadeur Gilbert"
    };
    
    // Envoyer l'email via EmailJS
    // Note: Il reste à créer un template dans votre compte EmailJS
    // Pour créer un template, allez sur https://dashboard.emailjs.com/admin/templates
    emailjs.send("service_05nyg6s", "template_id", templateParams, "Kzp7Om73h9_PZ6ElQ")
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

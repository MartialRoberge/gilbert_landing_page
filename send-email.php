<?php
// Vérifier que la requête est bien une méthode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $company = $_POST['company'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $linkedin = $_POST['linkedin'] ?? '';
    $motivation = $_POST['motivation'] ?? '';
    
    // Vérifier que les champs obligatoires sont remplis
    if (empty($name) || empty($email) || empty($company) || empty($phone) || empty($motivation)) {
        echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires.']);
        exit;
    }
    
    // Adresse email de destination
    $to = "mathis@lexiapro.fr";
    
    // Sujet de l'email
    $subject = "Nouvelle inscription liste d'attente Gilbert";
    
    // Corps de l'email en HTML
    $message = "<html><body>";
    $message .= "<h2>Nouvelle inscription liste d'attente Gilbert</h2>";
    $message .= "<p><strong>Nom:</strong> $name</p>";
    $message .= "<p><strong>Email:</strong> $email</p>";
    $message .= "<p><strong>Entreprise:</strong> $company</p>";
    $message .= "<p><strong>Téléphone:</strong> $phone</p>";
    $message .= "<p><strong>LinkedIn:</strong> $linkedin</p>";
    $message .= "<p><strong>Motivation:</strong><br>" . nl2br($motivation) . "</p>";
    $message .= "</body></html>";
    
    // En-têtes pour l'email HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    
    // Envoi de l'email
    $mailSent = mail($to, $subject, $message, $headers);
    
    // Réponse en JSON
    if ($mailSent) {
        echo json_encode(['success' => true, 'message' => 'Votre candidature a été envoyée avec succès.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Une erreur est survenue lors de l\'envoi du formulaire.']);
    }
} else {
    // Si ce n'est pas une requête POST, renvoyer une erreur
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}

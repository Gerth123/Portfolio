<?php
// SendMail.php

// JSON-Daten abrufen und dekodieren
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$message = $data['message'];

// E-Mail-Einstellungen
$to = "robingerth21@gmail.com"; // Zieladresse
$subject = "Kontaktformular Nachricht von $name";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// E-Mail senden
$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    http_response_code(200);
    echo json_encode(['message' => 'E-Mail erfolgreich gesendet.']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Fehler beim Senden der E-Mail.']);
}

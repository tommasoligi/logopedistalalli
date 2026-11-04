<?php
// OPZIONALE: funziona solo su hosting con PHP (non su GitHub Pages).
// Per usarlo, nel form di index.html imposta action="contact.php" method="post"
// e rimuovi il gestore "submit" in script.js.
$destinatario = "info@esempio.it"; // <-- cambia con la tua email

if ($_SERVER["REQUEST_METHOD"] !== "POST") { http_response_code(405); exit("Metodo non consentito"); }

$nome  = trim(strip_tags($_POST["nome"]  ?? ""));
$email = trim($_POST["email"] ?? "");
$tema  = trim(strip_tags($_POST["tema"]  ?? ""));
$testo = trim(strip_tags($_POST["testo"] ?? ""));

if ($nome === "" || $testo === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400); exit("Dati non validi");
}

$oggetto = "Richiesta dal sito: " . $tema;
$corpo   = "Nome: $nome\nEmail: $email\nMotivo: $tema\n\n$testo";
$headers = "From: noreply@" . ($_SERVER["HTTP_HOST"] ?? "localhost") . "\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

echo mail($destinatario, $oggetto, $corpo, $headers) ? "Messaggio inviato, grazie!" : "Invio non riuscito, riprova.";

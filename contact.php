<?php
/* Formulaire de contact (remplace Netlify Forms) : envoie la demande par e-mail à Quarkley.
   Appelé en POST par sdis00.js ; répond 200 si l'e-mail est parti, une erreur sinon.
   Aucune donnée n'est enregistrée sur le serveur. */

const DESTINATAIRE = 'jmu@quarkley.com';
const EXPEDITEUR   = 'site@quarkley.com'; // adresse du domaine, exigée par OVH pour envoyer

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Allow: POST');
  exit('Méthode non autorisée');
}

// Pot de miel : champ caché que seuls les robots remplissent. On fait comme si tout allait bien.
if (!empty($_POST['bot-field'])) exit('OK');

function champ($nom, $max = 200) {
  $v = trim((string)($_POST[$nom] ?? ''));
  $v = str_replace(["\r", "\0"], '', $v);
  return mb_substr($v, 0, $max);
}
function ligne($v) { return str_replace("\n", ' ', $v); } // pas de retour à la ligne dans les en-têtes

$nom    = ligne(champ('nom'));
$email  = ligne(champ('email'));
$f      = ['Nom' => $nom,
           'Fonction' => ligne(champ('fonction')),
           'SDIS' => ligne(champ('sdis')),
           'E-mail' => $email,
           'Téléphone' => ligne(champ('telephone', 40)),
           'Prestations' => ligne(champ('prestations', 1000))];
$message = champ('message', 5000);

if ($nom === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit('Nom ou e-mail manquant');
}

$corps = "Nouvelle demande de démo depuis quarkley.com\n\n";
foreach ($f as $k => $v) $corps .= $k . ' : ' . ($v === '' ? '—' : $v) . "\n";
$corps .= "\nMessage :\n" . ($message === '' ? '—' : $message) . "\n";

$sujet  = '=?UTF-8?B?' . base64_encode('Demande de démo : ' . $nom . ($f['SDIS'] ? ' (' . $f['SDIS'] . ')' : '')) . '?=';
$entetes = implode("\r\n", [
  'From: Site quarkley.com <' . EXPEDITEUR . '>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=utf-8',
  'Content-Transfer-Encoding: 8bit',
]);

if (!mail(DESTINATAIRE, $sujet, $corps, $entetes, '-f' . EXPEDITEUR)) {
  http_response_code(500);
  exit("L'envoi a échoué");
}
echo 'OK';

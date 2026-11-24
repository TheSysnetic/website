<?php
/**
 * Contact form endpoint for the static site.
 * Receives multipart POSTs from components/sections/ContactForm.tsx and emails them.
 */

declare(strict_types=1);

const RECIPIENT = 'info@thesysnetic.com';
const FROM_ADDRESS = 'no-reply@thesysnetic.com'; // must be a mailbox on the sending domain (SPF/DKIM)
const ALLOWED_ORIGINS = ['https://thesysnetic.com', 'https://www.thesysnetic.com'];
const MAX_LEN = ['name' => 120, 'email' => 200, 'company' => 160, 'phone' => 40, 'budget' => 40, 'services' => 400, 'message' => 5000];

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Same-origin check (blocks cross-site form abuse)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) {
    respond(403, ['ok' => false, 'error' => 'Forbidden.']);
}

// Honeypot: bots fill hidden fields; pretend success
if (!empty($_POST['website'])) {
    respond(200, ['ok' => true]);
}

// Basic per-IP rate limit: 5 submissions / 10 minutes
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/sysnetic_rl_' . hash('sha256', $ip);
$now = time();
$hits = array_filter(
    is_file($bucket) ? (array) json_decode((string) file_get_contents($bucket), true) : [],
    fn($t) => is_int($t) && $t > $now - 600
);
if (count($hits) >= 5) {
    respond(429, ['ok' => false, 'error' => 'Too many messages. Please try again in a few minutes.']);
}
$hits[] = $now;
file_put_contents($bucket, json_encode(array_values($hits)), LOCK_EX);

// Collect and sanitise
$data = [];
foreach (MAX_LEN as $key => $max) {
    $value = trim((string) ($_POST[$key] ?? ''));
    $value = str_replace(["\r", "\0"], '', $value);
    if ($key !== 'message') {
        $value = str_replace("\n", ' ', $value); // single-line fields: no header injection
    }
    $data[$key] = mb_substr($value, 0, $max);
}

if ($data['name'] === '' || $data['message'] === '') {
    respond(422, ['ok' => false, 'error' => 'Please fill in your name and message.']);
}
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}

$subject = 'New enquiry from ' . $data['name'] . ($data['company'] !== '' ? ' (' . $data['company'] . ')' : '');
$body = "New message via thesysnetic.com\n\n"
    . "Name:     {$data['name']}\n"
    . "Email:    {$data['email']}\n"
    . "Company:  {$data['company']}\n"
    . "Phone:    {$data['phone']}\n"
    . "Budget:   {$data['budget']}\n"
    . "Services: {$data['services']}\n\n"
    . "Message:\n{$data['message']}\n";

$headers = [
    'From: Sysnetic Website <' . FROM_ADDRESS . '>',
    'Reply-To: ' . $data['email'],
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
if (!mail(RECIPIENT, $encodedSubject, $body, implode("\r\n", $headers))) {
    respond(500, ['ok' => false, 'error' => 'We could not send your message right now.']);
}

respond(200, ['ok' => true]);

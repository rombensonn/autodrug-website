<?php
declare(strict_types=1);

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function config_value(string $name, string $fallback): string
{
    $value = getenv($name);
    return is_string($value) && trim($value) !== '' ? trim($value) : $fallback;
}

function text_field(array $data, string $key, int $maxLength = 300): string
{
    if (!array_key_exists($key, $data) || is_array($data[$key]) || is_object($data[$key])) {
        return '';
    }

    $value = trim((string) $data[$key]);
    $value = str_replace(["\0"], '', $value);

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

function bool_field(array $data, string $key): bool
{
    $value = $data[$key] ?? false;
    return $value === true || $value === 1 || $value === '1' || $value === 'true';
}

function safe_email(string $email): string
{
    $email = trim(str_replace(["\r", "\n"], '', $email));
    return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
}

function mail_subject(string $subject): string
{
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function html_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function format_lead_text(array $fields, string $siteName): string
{
    $lines = [
        'Новая заявка с сайта ' . $siteName,
        '',
    ];

    foreach ($fields as $label => $value) {
        if ($value === '') {
            continue;
        }
        $lines[] = $label . ': ' . $value;
    }

    return implode("\n", $lines);
}

function format_lead_html(array $fields, string $siteName): string
{
    $phone = (string) ($fields['Телефон'] ?? '');
    $problem = (string) ($fields['Проблема'] ?? '');
    $createdAt = (string) ($fields['Дата'] ?? '');

    $rows = '';
    foreach ($fields as $label => $value) {
        if ($value === '' || $label === 'Телефон' || $label === 'Проблема') {
            continue;
        }

        $rows .= '<tr>'
            . '<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#64748b;width:38%;vertical-align:top;">'
            . html_escape((string) $label)
            . '</td>'
            . '<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;font-weight:600;vertical-align:top;">'
            . nl2br(html_escape((string) $value))
            . '</td>'
            . '</tr>';
    }

    return '<!doctype html>'
        . '<html lang="ru"><head><meta charset="UTF-8"><title>Новая заявка с сайта</title></head>'
        . '<body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">'
        . '<div style="max-width:680px;margin:0 auto;padding:28px 16px;">'
        . '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">'
        . '<div style="background:#f97316;color:#ffffff;padding:22px 24px;">'
        . '<div style="font-size:13px;line-height:18px;opacity:.9;">' . html_escape($siteName) . '</div>'
        . '<h1 style="margin:4px 0 0;font-size:24px;line-height:30px;">Новая заявка с сайта</h1>'
        . '</div>'
        . '<div style="padding:24px;">'
        . '<div style="margin-bottom:18px;padding:16px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;">'
        . '<div style="font-size:13px;color:#9a3412;margin-bottom:6px;">Телефон для связи</div>'
        . '<div style="font-size:28px;line-height:34px;font-weight:800;color:#0f172a;">'
        . html_escape($phone)
        . '</div>'
        . '</div>'
        . '<div style="margin-bottom:18px;">'
        . '<div style="font-size:13px;color:#64748b;margin-bottom:6px;">Проблема</div>'
        . '<div style="padding:14px 16px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:16px;line-height:24px;">'
        . nl2br(html_escape($problem))
        . '</div>'
        . '</div>'
        . '<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">'
        . $rows
        . '</table>'
        . '<p style="margin:18px 0 0;color:#64748b;font-size:13px;line-height:20px;">'
        . 'Заявка создана: ' . html_escape($createdAt)
        . '</p>'
        . '</div>'
        . '</div>'
        . '</div>'
        . '</body></html>';
}

function multipart_email_body(string $plainBody, string $htmlBody, string $boundary): string
{
    return implode("\r\n", [
        '--' . $boundary,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        '',
        $plainBody,
        '--' . $boundary,
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        '',
        $htmlBody,
        '--' . $boundary . '--',
        '',
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['success' => false, 'error' => 'Method not allowed.']);
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 20000) {
    json_response(400, ['success' => false, 'error' => 'Invalid request.']);
}

$data = json_decode($rawBody, true);
if (!is_array($data)) {
    json_response(400, ['success' => false, 'error' => 'Invalid JSON.']);
}

if (text_field($data, 'company', 100) !== '') {
    json_response(200, ['success' => true]);
}

$startedAt = isset($data['startedAt']) && is_numeric($data['startedAt']) ? (int) $data['startedAt'] : 0;
if ($startedAt > 0 && ((int) floor(microtime(true) * 1000) - $startedAt) < 2500) {
    json_response(400, ['success' => false, 'error' => 'Please try again.']);
}

$phone = text_field($data, 'phone', 30);
$digitsOnly = preg_replace('/\D+/', '', $phone) ?? '';
$problem = text_field($data, 'problem', 2000);
$consentAccepted = bool_field($data, 'consentAccepted');
$privacyAccepted = bool_field($data, 'privacyAccepted');

if (strlen($digitsOnly) < 10 || strlen(trim($problem)) < 5 || !$consentAccepted || !$privacyAccepted) {
    json_response(400, ['success' => false, 'error' => 'Please check the required fields.']);
}

$siteName = config_value('SITE_NAME', 'autodrug.online');
$mailTo = safe_email(config_value('LEADS_EMAIL_TO', 'g30107@gmail.com'));
$mailFrom = safe_email(config_value('LEADS_EMAIL_FROM', 'no-reply@autodrug.online'));
if ($mailTo === '' || $mailFrom === '') {
    json_response(500, ['success' => false, 'error' => 'Email recipient is not configured.']);
}

$fields = [
    'Дата' => date('d.m.Y H:i:s'),
    'Телефон' => $phone,
    'Имя' => text_field($data, 'name'),
    'Услуга' => text_field($data, 'service'),
    'Проблема' => $problem,
    'Марка автомобиля' => text_field($data, 'carBrand'),
    'Модель автомобиля' => text_field($data, 'carModel'),
    'Год выпуска' => text_field($data, 'carYear'),
    'Удобная дата' => text_field($data, 'preferredDate'),
    'Удобное время' => text_field($data, 'preferredTime'),
    'Способ связи' => text_field($data, 'contactMethod'),
    'Помощь с запчастями' => bool_field($data, 'needsPartsHelp') ? 'Да' : 'Нет',
    'Страница' => text_field($data, 'sourcePage'),
    'Версия согласия' => text_field($data, 'consentVersion'),
    'IP' => $_SERVER['REMOTE_ADDR'] ?? '',
];

$boundary = 'lead_' . md5((string) microtime(true) . $phone);
$plainBody = format_lead_text($fields, $siteName);
$htmlBody = format_lead_html($fields, $siteName);
$body = multipart_email_body($plainBody, $htmlBody, $boundary);
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'From: ' . $siteName . ' <' . $mailFrom . '>',
    'Reply-To: ' . $mailFrom,
    'X-Mailer: PHP/' . phpversion(),
]);

$sent = mail($mailTo, mail_subject('Новая заявка с сайта ' . $siteName), $body, $headers);
if (!$sent) {
    json_response(500, ['success' => false, 'error' => 'Could not send email.']);
}

json_response(200, ['success' => true]);

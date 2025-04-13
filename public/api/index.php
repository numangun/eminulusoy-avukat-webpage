<?php
// API isteklerini blog-api uygulamamıza yönlendiriyoruz
// Bu proxy, frontend ile aynı domain üzerinde API'yi kullanmamızı sağlar

// CORS başlıkları
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// OPTIONS isteklerine hemen yanıt ver (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// İstek yolu ve parametrelerini al
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/api', '', $path); // /api/ prefix'ini kaldır

// Yeni API URL'ini oluştur (blog-api klasörünün konumuna göre)
$api_url = "http://localhost:3001" . $path;

// HTTP metodu, headers ve body'yi al
$method = $_SERVER['REQUEST_METHOD'];
$headers = getallheaders();
$input = file_get_contents('php://input');

// cURL isteği oluştur
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

// İstek gövdesini ekle
if (!empty($input)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
}

// Headers ekle
$curlHeaders = [];
foreach ($headers as $key => $value) {
    if ($key != 'Host' && $key != 'Content-Length') {
        $curlHeaders[] = "$key: $value";
    }
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $curlHeaders);

// İsteği gönder ve yanıtı al
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

// HTTP durum kodunu ve içerik türünü ayarla
http_response_code($httpCode);
if ($contentType) {
    header("Content-Type: $contentType");
}

// Yanıtı gönder
echo $response;
?> 
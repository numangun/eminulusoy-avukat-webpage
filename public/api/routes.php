<?php
// API rotalarını yöneten dosya
// URL: /api/blogs gibi istekleri yönetir ve uygun JSON yanıtları döndürür

// CORS başlıkları
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// OPTIONS isteklerine hemen yanıt ver (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// İstek yolu ve parametrelerini al
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/api', '', $path); // /api/ prefix'ini kaldır
$method = $_SERVER['REQUEST_METHOD'];

// Statik blog verilerini yükle
function getBlogs() {
    $blogsJson = file_get_contents(__DIR__ . '/blogs.json');
    return json_decode($blogsJson, true);
}

// Rotaları yönet
switch (true) {
    // Tüm blogları getir (sadece aktif olanlar)
    case $path === '/blogs' && $method === 'GET':
        $blogs = getBlogs();
        // Sadece aktif olanları filtrele
        $activeBlogs = array_filter($blogs, function($blog) {
            return $blog['isActive'] === true;
        });
        echo json_encode(array_values($activeBlogs));
        break;

    // Admin için tüm blogları getir
    case $path === '/admin/blogs' && $method === 'GET':
        $blogs = getBlogs();
        echo json_encode($blogs);
        break;

    // ID'ye göre blog getir
    case preg_match('/^\/blogs\/([^\/]+)$/', $path, $matches) && $method === 'GET':
        $blogId = $matches[1];
        $blogs = getBlogs();
        $blog = null;
        foreach ($blogs as $b) {
            if ($b['_id'] === $blogId || $b['slug'] === $blogId) {
                $blog = $b;
                break;
            }
        }
        if ($blog) {
            echo json_encode($blog);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Blog bulunamadı']);
        }
        break;

    // Bilinmeyen rota
    default:
        http_response_code(404);
        echo json_encode(['error' => 'API endpoint bulunamadı']);
        break;
}
?> 
<?php

$APP_PATH = storage_path('app/public');
$APP_URL = env('APP_URL');

return [

    "ADMIN_PREFIX" => "admins/",

    "PATH" => [
        "UPLOAD_BRANDING_IMAGE"     => $APP_PATH . "/images/branding/",
    ],

    "URL" => [
        "BRANDING_IMAGE"       => $APP_URL . "/storage/images/branding/",
    ],

];

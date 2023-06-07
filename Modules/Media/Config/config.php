<?php

return [
    'name' => 'Media',
    'routePrefix' => 'admins', // no trailing slash required
    'authGuard' => 'admin',
    'defaultLayout' => 'admin.layouts.app', // no trailing fullstop required
    'media_folder_name' => 'media',
    'media_thumb_folder_name' => 'thumb',
];

<?php

return [
    'name' => 'RightsManagement',
    'routePrefix' => 'admins', // no trailing slash required
    'authGuard' => 'admin',
    'defaultLayout' => 'admin.layouts.app' // no trailing fullstop required
];

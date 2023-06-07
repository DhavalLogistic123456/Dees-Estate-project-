<?php

return [
    'name'                => 'ContactUs',
    'adminRoute'          => 'admin::contactus',
    'frontRoute'          => 'contactus-front::contactus',
    'routePrefix'         => 'admins', // no trailing slash required
    'authGuard'           => 'admin',
    'defaultLayout'       => 'admin.layouts.app', // no trailing fullstop required
    'front_defaultLayout' => 'front.layouts.app',
    'adminEmail'          => ['chintan@logisticinfotech.com'],
    'mail_view'           => 'system_admin.emails.email',
];

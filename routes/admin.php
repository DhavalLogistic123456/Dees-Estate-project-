<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$appRoutes = function () {
    Route::get('/', function () {
        return redirect('admins/dashboard');
    });

    Auth::routes([
        'register' => true, // Registration Routes...
        'reset' => true, // Password Reset Routes...
        'verify' => true, // Email Verification Routes...
    ]);

    // Email verification
    Route::get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
    Route::get('email/verify/{id}', 'Auth\VerificationController@verify')->name('verification.verify');
    Route::get('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');

    Route::middleware(['auth:admin'])->group(function () { // verified

        // Change password
        Route::get('password/change', 'Auth\ChangePasswordController@showChangePasswordForm')->name('password.change');
        Route::post('password/change/update', 'Auth\ChangePasswordController@changePassword')->name('password.change.update');

        Route::resource('dashboard', 'DashboardController');

        Route::get('users/datatable', 'UserController@getDatatable');
        Route::resource('users', 'UserController');
    });
};

Route::group(array('prefix' => "admins", "namespace" => "Admin", "as" => "admin::"), $appRoutes);
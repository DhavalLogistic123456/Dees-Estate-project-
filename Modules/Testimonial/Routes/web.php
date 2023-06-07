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

Route::group(['middleware' => ['web']], function () {
    Route::get('/testimonial', 'TestimonialController@index');
});

Route::group(array('middleware' => ['auth:' . config('testimonial.authGuard')], 'prefix' => config('testimonial.routePrefix'), "namespace" => "Admin", 'as' => 'testimonial::'), function () {
    Route::get('testimonial/datatable', 'TestimonialController@getDatatable');
    Route::resource('testimonial', 'TestimonialController');
});

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
    Route::get('/media', 'MediaController@index');
});

Route::group(array('middleware' => ['auth:' . config('media.authGuard')], 'prefix' => config('media.routePrefix'), "namespace" => "Admin", 'as' => 'media::'), function () {
    Route::post('media/load-more', 'MediaController@load_more')->name('load-more');
    Route::resource('media', 'MediaController');
});

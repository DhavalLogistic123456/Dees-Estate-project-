<?php

use Illuminate\Support\Facades\Route;
use Modules\ContactUs\Http\Controllers\Front\ContactUsController;

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
Route::group(['middleware' => ['web'], 'as' => 'contactus-front::'], function () {
    Route::get('/contactus', [ContactUsController::class, 'view'])->name('contactus');
    Route::post('/contactus', [ContactUsController::class, 'create'])->name('contactus.store');
});

// dd(config('contactus.authGuard'));
Route::group(['middleware' => ['auth:' . config('contactus.authGuard')], 'prefix' => config('contactus.routePrefix'), 'namespace' => 'Admin', 'as' => 'admin::contactus'], function () {
    Route::get('/contactus/datatable', 'ContactUsController@getDatatable')->name('.datatable');
    Route::get('/contactus/index', 'ContactUsController@index');
    Route::delete('/destory/{contactUs}', 'ContactUsController@destroy')->name('.destroy');
});

<?php
use  Modules\Blog\Http\Controllers\BlogController;
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

Route::group(['middleware' => ['web'], 'as' => 'blog-front::'], function () {
    Route::get('/blog',[BlogController::class,'index'])->name('blog.list');
    Route::get('/blog/{slug}', 'BlogController@show')->name('blog.details');
});
Route::group(array('middleware' => ['auth:' . config('blog.authGuard')], 'prefix' => config('blog.routePrefix'), "namespace" => "Admin", 'as' => 'blog::'), function () {
    Route::get('blog/datatable', 'BlogsController@getDatatable');
    Route::get('blog/{id}/edit/buildwithcontentbuilder', 'BlogsController@buildWithContentBuilder')->name('build.contentbuilder');
    Route::put('blog/{id}/save-description', 'BlogsController@setDescriptionByContentBuilder')->name('description.save');
    Route::resource('blog', 'BlogsController');

    Route::get('blog-category/datatable', 'CategoryController@getDatatable');
    Route::resource('blog-category', 'CategoryController');
});


Route::group(['middleware' => ['web'], 'as' => 'Cms-front::'], function () {
    Route::get('/cms', 'UserCmsController@index')->name('cms.list');
    Route::get('/cms/{slug}', 'UserCmsController@show')->name('cms.details');
});

Route::group(array('middleware' => ['auth:' . config('blog.authGuard')], 'prefix' => config('blog.routePrefix'), "namespace" => "Admin", 'as' => 'Cms::'), function () {
    Route::get('cms/datatable', 'CmsController@getDatatable')->name('cms.getDatatable');
    Route::resource('cms', 'CmsController');
    Route::get('cms/{id}/edit/buildwithcontentbuilder', 'CmsController@buildWithContentBuilder')->name('build.contentbuilder');
    Route::put('cms/{id}/save-content', 'CmsController@setDescriptionByContentBuilder')->name('content.save');
});

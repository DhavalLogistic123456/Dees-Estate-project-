<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware([])->get('/accounting', function (Request $request) {
    return $request->user();
});
Route::group(['namespace' => 'Api\v1', 'prefix' => 'v1'], function () {
    Route::get('accounts_all', 'AccountsController@getAllAccountsWithTreePath');
    Route::get('accounts/{accountId}/transactions', 'AccountsController@getAccountTransactions');
    Route::resource('accounts', 'AccountsController')->except(['create', 'edit']);
    Route::resource('transaction', 'TransactionsController')->except(['create', 'edit', 'update']);

    Route::get('reports', 'ReportsController@getReports');
});

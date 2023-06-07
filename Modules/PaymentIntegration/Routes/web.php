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

Route::prefix('paymentintegration')->group(function () {
    Route::get('/', 'PaymentIntegrationController@index');
    Route::get('CreatePaymentMethod', 'PaymentIntegrationController@CreatePaymentMethod');
    Route::get('CreatePayment', 'PaymentIntegrationController@CreatePayment');
    Route::get('getPayment', 'PaymentIntegrationController@getPayment');
    Route::get('getPayemtMethod', 'PaymentIntegrationController@getPayemtMethod');
    Route::get('updateDefaultMethod', 'PaymentIntegrationController@updateDefaultMethod');
    Route::get('createHoldStatusPayment', 'PaymentIntegrationController@createHoldStatusPayment');
    Route::get('createSuccessStatusPayment', 'PaymentIntegrationController@createSuccessStatusPayment');
    Route::get('createBankAccount', 'PaymentIntegrationController@createBankAccount');
    Route::get('addBankPayment', 'PaymentIntegrationController@addBankPayment');
    Route::get('connectBankAccount', 'PaymentIntegrationController@connectBankAccount');
    Route::get('changeDefaultExternalAccount', 'PaymentIntegrationController@changeDefaultExternalAccount');
    Route::get('deleteExternalAccount', 'PaymentIntegrationController@deleteExternalAccount');
    //Route::get('addBankPaymnet', 'PaymentIntegrationController@addBankPaymnet');
    //http://127.0.0.1:8000/paymentintegration/connectBankAccount

}); 
Route::post('/webhook', 'WebhookController@webhooks');



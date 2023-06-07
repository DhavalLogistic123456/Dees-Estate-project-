<?php

namespace Modules\PaymentIntegration\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;
use Stripe\StripeClient;
use Modules\PaymentIntegration\Entities\BankAccount as BankAccount;




class WebhookController extends Controller
{
    // public function __construct()
    // {
    //     $key =  env('STRIPE_SECRET');
    //     $this->stripe = new StripeClient($key);
    // }
    // /**
    //  * Display a listing of the resource.
    //  * @return Renderable
    //  */
    // public function index()
    // {
    //     return view('paymentintegration::index');
    // }

    public function webhooks(Request $event)
    {
        Log::info("ashdkjas");
        $key =  env('STRIPE_SECRET');
        if (!$key) {
            return response()->json(["message" => "Site is under construction. Please try again later."], 503);
        }
        \Stripe\Stripe::setApiKey($key);
        $endpoint_secret = "whsec_1QGEr74KozqzVXvi9yF5t7HqrhFZr9Fu";
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            http_response_code(400);
            exit();
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            http_response_code(400);
            exit();
        }
        switch ($event->type) {
            case 'account.updated':
                $account = $event->data->object;
            case 'account.application.authorized':
                $application = $event->data->object;
            case 'account.application.deauthorized':
                $application = $event->data->object;
            case 'account.external_account.created':
                $externalAccount = $event->data->object;
                Log::info('create account .......');
                Log::info($externalAccount);
                Log::info("hi1");
            case 'account.external_account.deleted':
                $externalAccount = $event->data->object;
            case 'account.external_account.updated':
                $externalAccount = $event->data->object;
                Log::info('update status.......');
                Log::info($externalAccount);
                if ($externalAccount->individual->verification->status == 'verified') {
                    BankAccount::where('accountId', $externalAccount->id)
                        ->update(['status' => $externalAccount->individual->verification->status]);
                    Log::info("Update successfully");
                }
            default:
                echo 'Received unknown event type ' . $event->type;
        }
        http_response_code(200);
    }
}

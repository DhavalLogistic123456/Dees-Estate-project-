<?php

namespace Modules\PaymentIntegration\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Exception;
use Stripe\StripeClient;
use Modules\PaymentIntegration\Entities\BankAccount as BankAccount;

class PaymentIntegrationController extends Controller
{
    public function __construct()
    {
        $key =  env('STRIPE_SECRET');
        $this->stripe = new StripeClient($key);
    }
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        return view('paymentintegration::index');
    }

    /**
     * Create customer or check customer exist or not
     */
    public function createCustomer($email, $name)
    {
        try {
            /*  $user = ModelsUser::where('email',$request->$email)->get();
                if ($user->customerId != '' && !empty($user->customerId)) {
                    $customer = $user;
                } else {
                    $customer = $stripe->customers->create([
                        'name'  => $name,
                        'email' =>  $email,
                    ]);
                }
            */
            $customerData =   $this->stripe->customers->all(['email' =>  $email]);
            if ($customerData->data != '' && !empty($customerData->data)) {
                $customer = $customerData->data[0];
            } else {
                $customer = $this->stripe->customers->create([
                    'name'  => $name,
                    'email' =>  $email,
                ]);
            }

            if (!$customer) {
                DB::rollback();
                return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
            }
            return $customer;
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /***
     * Transfer Fund strip to bank account
     */
    public function transferFund($accountId, $amount, $currency)
    {

        $account =   BankAccount::where(array('accountId' => $accountId))->first(); //BankAccount::first(['accountId',$accountId]); // BankAccount::where('accountId', $accountId);

        if ($account->status == 'verified') {
            $transferFund =    $this->stripe->transfers->create([
                'amount' => $amount,
                'currency' => $currency,
                'destination' => $accountId,
                'transfer_group' => 'ORDER_10',
            ]);
        }
        return response()->json(['message' => 'BankAccont is not verified....'], 403);
    }
    /**
     * Create only Payment Method
     */
    public function CreatePaymentMethod(Request $request)
    {

        try {
            $email = $request->email; //'harshaSureliya123@gmail.com';
            $name = $request->name; //"Harsha";

            //customer create
            $customer = $this->createCustomer($email, $name);

            //create paymentmethod
            $intents = $this->stripe->paymentMethods->create([
                'type' => 'card',
                'card' => [
                    'number' => '4242424242424242', //4000002500003155 //4242424242424242
                    'exp_month' => '05',
                    'exp_year' => '2025',
                    'cvc' => '123'
                ],
            ]);

            if (!$intents) {
                DB::rollback();
                return response()->json(['success' => false, 'message' => 'Invalid email and password'], 403);
            }
            $intentsId = $intents->id;
            // $intentsId =$request->intentsID; 

            // attach stripe method
            $paymentMethod = $this->stripe->paymentMethods->attach(
                $intentsId,
                ['customer' => $customer->id]
            );
            if (!$paymentMethod) {
                return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
            }
            $customer->invoice_settings = ['default_payment_method' => $paymentMethod->id];
            $customer->save();
            return response()->json(['success' => true, 'message' => 'Add payment method as a default.....', 'data' => $paymentMethod], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     * Add only payment on default payment method
     */
    public function CreatePayment(Request $request)
    {
        try {

            // $email = $request->email; //'harshaSureliya123@gmail.com';
            /* 
            $customerData =   $this->stripe->customers->all(['email' =>  $email]);
            if ($customerData->data == '' && empty($customerData->data)) {
                return response()->json(['message' => 'Customer Not Found.', 'error' => "CUSTOMER_NOT_FOUND", 'data'], 403);
            }
            $customerId = $customerData->data[0]->id;
            $paymentMethod = $customerData->data[0]->invoice_settings->default_payment_method; */

            $customerId = $request->customerId; //'cus_MlOLWqabNpdSnM'
            $accountId = $request->accountId; //'acct_1M1rD34dckoRpVGQ'
            $customerData = $this->stripe->customers->retrieve(
                $customerId,
                []
            );
            $paymentMethod = $customerData->invoice_settings->default_payment_method;
            $order = $this->stripe->paymentIntents->create([
                'amount' => 2000,
                'currency' => 'usd',
                'description' => 'My First Test Charge',
                'payment_method_types' => ['card'],
                'customer' => $customerId,
                'confirm'        => true,
                'payment_method' => $paymentMethod, 
            ]);
            if (!$order) {
                return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
            }
            if ($order->status == 'requires_action') {

                $payment = $this->stripe->paymentIntents->confirm(
                    $order->id,
                    ['payment_method' => 'pm_card_visa']
                );
                if (!$payment) {
                    return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
                }
                $this->transferFund($accountId, $payment->amount, $payment->currency);
                return response()->json(["message" => "Order created succcessfully...", "data" => $payment], 200);
            }

            $this->transferFund($accountId, $order->amount, $order->currency);
            return response()->json(["message" => "Order created succcessfully...", "data" => $order], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     *Add payment with customer & payment method
     */
    public function getPayment(Request $request)
    {
        try {
            $email = $request->email;  //'monikasavaliya1@gmail.com';
            $name = $request->name;  // "monika";
            $accountId = $request->accountId; //acct_1M1rD34dckoRpVGQ;

            //customer_create
            $customer = $this->createCustomer($email, $name);

            //create paymentmethod
            $intents = $this->stripe->paymentMethods->create([
                'type' => 'card',
                'card' => [
                    'number' => '4000002500003155', //'4000002500003155', //'4242424242424242',
                    'exp_month' => '05',
                    'exp_year' => '2025',
                    'cvc' => '123'
                ],
            ]);

            if (!$intents) {
                DB::rollback();
                return response()->json(['success' => false, 'message' => 'Invalid email and password'], 200);
            }
            $intentsId = $intents->id;
            //   $intentsId =$request->intentsID; 

            // attach stripe method
            $paymentMethod = $this->stripe->paymentMethods->attach(
                $intentsId,
                ['customer' => $customer->id]
            );
            if (!$paymentMethod) {
                return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
            }
            // if ($is_def == "1") {
            $customer->invoice_settings = ['default_payment_method' => $paymentMethod->id];
            $customer->save();
            // }

            //payment
            $order = $this->stripe->paymentIntents->create([
                'amount'         => 5 * 100,
                'currency'       => 'usd',
                'customer' => $customer->id,
                'payment_method' => $intentsId,
                'confirmation_method' => 'manual',
                'confirm' => true,
                'description'    => " 3d cardsucess payment"
            ]);

            if (!$order) {
                DB::rollback();
                return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
            }
            if ($order->status == 'requires_action') {

                $payment = $this->stripe->paymentIntents->confirm(
                    $order->id,
                    ['payment_method' => 'pm_card_visa']
                );
                if (!$payment) {
                    return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
                }
                $this->transferFund($accountId, $payment->amount, $payment->currency);
                return response()->json(["message" => "Order created succcessfully...", "data" => $payment], 200);
            }
            $this->transferFund($accountId, $order->amount, $order->currency);
            return response()->json(["message" => "Order created succcessfully...", "data" => $order], 200);
        } catch (Exception $e) {

            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     * Get payment method
     */
    public function getPayemtMethod(Request $request)
    {
        try {

            //get cust_id in db
            /*  $email = 'monika123456@gmail.com';
            $customer =   $this->stripe->customers->all(['email' =>  $email]);
            $customerId =   $customer->data[0]->id; */
            /*
               $user = User::where('email',$request->$email)->get();
               $customerId = $user->customerId;
            */

            $customerId = $request->customerId;
            //get paymentMethods
            $paymentMethods = $this->stripe->paymentMethods->all([
                'customer' =>   $customerId,
                'type'     => 'card'
            ]);

            if (!$paymentMethods) {
                return response()->json(["message" => "No payment methods founds..."], 404);
            }

            //set default payment method
            $cust_payment_methods = [];
            $customers = $this->stripe->customers->retrieve(
                $customerId,
                [
                    'expand' => [
                        'invoice_settings.default_payment_method',
                        'default_source',
                    ],
                ]
            );

            // check default payment method
            $default_method = "";
            if ($customers->invoice_settings->default_payment_method) {
                $default_method = $customers->invoice_settings->default_payment_method->id;
            };

            //card data 
            foreach ($paymentMethods as $paymentMethod) {
                $is_default = false;
                $key = $paymentMethod->id;
                if (!empty($default_method) && $default_method == $key) {
                    $is_default = true;
                }
                $cust_payment_methods[$key]['exp_month']  = $paymentMethod->card->exp_month;
                $cust_payment_methods[$key]['exp_year']   = $paymentMethod->card->exp_year;
                $cust_payment_methods[$key]['brand']      = $paymentMethod->card->brand;
                $cust_payment_methods[$key]['last4']      = $paymentMethod->card->last4;
                $cust_payment_methods[$key]['is_default'] = $is_default;
            }
            return response()->json(["message" => "payment methods founds...", "data" => $cust_payment_methods], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     * Update default payment method
     */
    public function updateDefaultMethod(Request $request)
    {
        try {

            //   $email = 'monika123456@gmail.com';
            //  $customer =   $this->stripe->customers->all(['email' =>  $email]);
            //   $customerId = $customer->data[0]->id;
            //  $methodId =  'pm_1LuFCtG3tyH7tK6R8GafS3qQ';

            $customerId = $request->customerId;
            $methodId = $request->methodId;

            $result = $this->stripe->customers->update(
                $customerId,
                ['invoice_settings' => ['default_payment_method' => $methodId]]
            );
            if (!$result) {
                return response()->json(["message" => "can't update default payment method...", "data" => $result], 500);
            }
            return response()->json(["message" => "update default payment method...", "data" => $result], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /***
     * add payment in hold status
     */
    public function createHoldStatusPayment()
    {
        try {
            $email = 'moniSavaliya@gmail.com';
            $name = "monika";
            //customer_create
            $customer = $this->createCustomer($email, $name);

            //create paymentmethod
            $intents = $this->stripe->paymentMethods->create([
                'type' => 'card',
                'card' => [
                    'number' => '4242424242424242', //'4000002500003155', //'4242424242424242',
                    'exp_month' => '05',
                    'exp_year' => '2025',
                    'cvc' => '123'
                ],
            ]);

            if (!$intents) {
                DB::rollback();
                return response()->json(['success' => false, 'message' => 'Invalid email and password'], 200);
            }
            $intentsId = $intents->id;
            //   $intentsId =$request->intentsID; 

            // attach stripe method
            $paymentMethod = $this->stripe->paymentMethods->attach(
                $intentsId,
                ['customer' => $customer->id]
            );
            if (!$paymentMethod) {
                return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
            }
            // if ($is_def == "1") {
            $customer->invoice_settings = ['default_payment_method' => $paymentMethod->id];
            $customer->save();
            // }

            //payment
            $order = $this->stripe->paymentIntents->create([
                'amount' => 109 * 100,
                'currency' => 'usd',
                'customer' => $customer->id,
                'payment_method' => $intentsId,
                'payment_method_types' => ['card'],
                'payment_method_options' => [
                    'card' => [
                        'capture_method' => 'manual',
                    ],
                ],
                'description' => 'My First Test Charge',
            ]);
            if (!$order) {
                DB::rollback();
                return response()->json(['message' => 'Error while payment process. Please try again or use another card. If issue still persist than contact administrator.'], 403);
            }
            return response()->json(["message" => "Order created succcessfully...", "data" => $order], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    /**
     * Change status hold to success
     */
    public function createSuccessStatusPayment(Request $request)
    {
        try {
            //$paymentId = 'pi_3LyvHvG3tyH7tK6R1xdaGSM8';

            $paymentId = $request->paymentId;
            $this->stripe->paymentIntents->confirm(
                $paymentId,
                ['payment_method' => 'pm_card_visa']
            );
            $result =   $this->stripe->paymentIntents->capture(
                $paymentId,
                []
            );
            if (!$result) {
                return response()->json(['message' => 'Error while payment process.'], 403);
            }
            return response()->json(["message" => "Order created succcessfully...", "data" => $result], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     * Add payment using bank account
     */
    public function createBankAccount(Request $request)
    {
        try {
            $email = $request->email; //'savaliyaMonika@gmail.com';
            $name = $request->name; //"Harsha";

            //customer create
            $customer = $this->createCustomer($email, $name);

            //create bank
            $routing_number = "110000000";
            $account_number = "000123456789";
            $account_type = "savings";
            $account_holder_name = "test";
            $email = "test@gmail.com";

            $intents = $this->stripe->setupIntents->create([
                'payment_method_types' => ['us_bank_account'],
                'customer' => $customer->id,
                'confirm' => true,
                'payment_method_data' => [
                    'type' => 'us_bank_account',
                    'us_bank_account' => [
                        'routing_number' => $routing_number,
                        'account_number' => $account_number,
                        'account_holder_type' => 'individual',
                        'account_type' => $account_type,
                    ],
                    'billing_details' => [
                        'name' => $account_holder_name,
                        'email' => $email,
                    ]
                ],
                'mandate_data' => [
                    'customer_acceptance' => [
                        'type' => 'offline'
                    ]
                ],
            ]);
            if (!$intents) {
                return false;
            }
            return response()->json(['success' => true, 'payment_method' => $intents->payment_method, 'data' => $intents], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     * Create bank payment
     */
    public function addBankPayment(Request $request)
    {
        try {
            $customerId = $request->customerId;  //'cus_MijhhlKZnteeXw'; //$customer->id;
            $paymentMethod = $request->paymentMethod;  //'pm_1LzaqTG3tyH7tK6RuzqbRjKa';
            $accountId = $request->accountId; //acct_1M1rD34dckoRpVGQ
            $charge = $this->stripe->paymentIntents->create(
                [
                    'amount' => 10 * 100,
                    'currency' => 'usd',
                    'customer' => $customerId,
                    'confirm' => true,
                    'payment_method' => $paymentMethod,
                    'payment_method_types' => ['us_bank_account'],
                    'payment_method_options' => [
                        'us_bank_account' => [
                            'financial_connections' => [
                                'permissions' => ['payment_method', 'balances'],
                            ],
                        ],
                    ],
                    'description'    => "Success"
                ]
            );
            if (!$charge) {
                return response()->json(['success' => false, 'message' => "Can't create bank payment"], 400);
            }
            $this->transferFund($accountId, $charge->amount, $charge->currency);
            return response()->json(['success' => true, 'data' => $charge], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     * Create User & Connect Bank Account
     */
    public function connectBankAccount(Request $request)
    {

        try {
            $accountId = $request->accountId; //'acct_1M28TdQDAIpkGruQ';
            $customerData = '';
            if ($accountId != '') {
                $customerData =   $this->stripe->accounts->retrieve(
                    $accountId,
                    []
                );
            }
            $token = $this->stripe->tokens->create([
                'bank_account' => [
                    'country' => 'US',
                    'currency' => 'usd',
                    'account_holder_name' => 'Soura Sankar',
                    'account_holder_type' => 'individual',
                    'routing_number' => '110000000',
                    'account_number' => '000123456789'
                ]
            ]);
            if (!$token) {
                return  response()->json(['success' => false, 'message' => 'something wrong for generate toekn '], 400);
            }

            if (empty($customerData) && $customerData == '') {
                $stripeAccount = $this->stripe->accounts->create([
                    "type" => "custom",
                    "country" => "US",
                    "email" => "monika@gmail.com",
                    "business_type" => "individual",
                    "individual" => [
                        'address' => [
                            'state' => 'New Jersey',
                            'city' => 'Littleton',
                            'line1' => '106 Main St',
                            'postal_code' => '03561',
                        ],
                        'dob' => [
                            "day" => '25',
                            "month" => '02',
                            "year" => '1994'
                        ],
                        "email" => 'monika@gmail.com',
                        "first_name" => 'Soura',
                        "last_name" => 'Ghosh',
                        "gender" => 'male',
                        "phone" => "7490918923",
                        'ssn_last_4' => '0000'
                    ],
                    'capabilities' => [
                        'card_payments' => ['requested' => true],
                        'transfers' => ['requested' => true],
                    ],
                    'tos_acceptance' => [
                        'date' => time(),
                        'ip' => $_SERVER['REMOTE_ADDR'] // Assumes you're not using a proxy
                    ],
                    'business_profile' => [
                        'url' => 'www.abc.com',
                        'mcc' => '5734'
                    ],
                ]);
                if (!$stripeAccount) {
                    return  response()->json(['success' => false, 'message' => 'something wrong for create bank account '], 400);
                }
                $accountId =  $stripeAccount->id;

                // insert data 
                $bank_account = new BankAccount();
                $bank_account->accountId = $stripeAccount->id;
                $bank_account->status = $stripeAccount->individual->verification->status;
                $bank_account->email = $stripeAccount->email;
                $bank_account->defaultAccount = 'false';
                $bank_account->save();
            }
            $bankAccount = $this->stripe->accounts->createExternalAccount(
                $accountId,
                ['external_account' => $token->id]
            );
            if (!$bankAccount) {
                return  response()->json(['success' => false, 'message' => 'something wrong for connect bank account '], 400);
            }
            return  response()->json(['success' => true, 'data' => $bankAccount,], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     * Change default bank account in connect
     */
    public function changeDefaultExternalAccount(Request $request)
    {
        try {
            $accountId = $request->accountId;
            $externalAccountId = $request->externalAccountId;
            $account  = $this->stripe->accounts->updateExternalAccount(
                $accountId,
                $externalAccountId,
                ['default_for_currency' => true]
            );
            if (!$account) {
                return  response()->json(['success' => false, 'message' => 'something wrong for update default bank account'], 400);
            }
            return  response()->json(['success' => true, 'message' => 'successfully update default external account', 'data' => $account], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
    /**
     * Delete external account
     */
    public function deleteExternalAccount(Request $request)
    {
        try {
            $accountId = $request->accountId;
            $externalAccountId = $request->externalAccountId;
            $deleteAccount = $this->stripe->accounts->deleteExternalAccount(
                $accountId,
                $externalAccountId,
                []
            );
            if (!$deleteAccount) {
                return  response()->json(['success' => false, 'message' => 'something wrong for connect bank account '], 400);
            }
            return  response()->json(['success' => true, 'message' => 'successfully delete external account', 'data' => $deleteAccount], 200);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }
}

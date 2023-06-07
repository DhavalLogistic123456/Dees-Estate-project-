<?php

namespace Modules\Accounting\Http\Controllers\Api\v1;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Modules\Accounting\Repositories\AccountsRepository;
use Modules\Accounting\Repositories\TransactionsRepository;

class AccountsController extends Controller
{
    public function __construct(
        AccountsRepository $accountsRepository,
        TransactionsRepository $transactionsRepository,
        TransactionsController $transactionsController
    ) {
        $this->module = "Account";
        $this->accountsRepository = $accountsRepository;
        $this->transactionsRepository = $transactionsRepository;
        $this->transactionsController = $transactionsController;
    }

    /**
     * @OA\Get(
     *     path="/api/v1/accounts",
     *     tags={"Accounting"},
     *     summary="Returns list of accounts",
     *     description="Returns a list of accounts",
     *     operationId="getAccounts",
     *     @OA\Response(
     *          response=200,
     *          description="successful operation",
     *     )
     * )
     */
    public function index()
    {
        $result = [
            'code' => 200
        ];

        try {
            $result['data'] = $this->accountsRepository->getAccountsTree();
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result, $result['code']);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/accounts/1",
     *     tags={"Accounting"},
     *     summary="Returns account details",
     *     description="Returns account details",
     *     operationId="findAccount",
     *     @OA\Response(
     *          response=200,
     *          description="successful operation",
     *     )
     * )
     */
    public function show($accountId)
    {
        $result = [
            'code' => 200
        ];

        try {
            $accountDetails = $this->accountsRepository->getById($accountId)->setAppends(['account_tree_path']);

            if ($accountDetails) {
                $result['message'] = trans('accounting::messages.resourse_show_success', [ 'module' => $this->module ]);
                $result['data'] = $accountDetails;
            } else {
                $result['message'] = trans('accounting::messages.not_found', [ 'module' => $this->module ]);
            }
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result, $result['code']);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/accounts",
     *     tags={"Accounting"},
     *     summary="Create account",
     *     description="Create account",
     *     operationId="addAccount",
     *     @OA\Parameter(
     *         name="parent_id",
     *         description="Parent account id",
     *         in="query",
     *         @OA\Schema(
     *              type="integer"
     *         ),
     *         style="form"
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\Schema(ref="#/components/schemas/ApiResponse")
     *     )
     * )
     */
    public function store(Request $request)
    {
        $result = [
            'code' => 200
        ];

        $validator = Validator::make($request->all(), [
            'account_name' => ['required', 'string'],
            'account_description' => ['required', 'string'],
            'account_type' => ['required', 'string'],
            'parent_id' => 'required',
        ]);

        if ($validator->fails()) {
            $result['code'] = 400;
            $result['message'] = implode(',', $validator->messages()->all());
            return response()->json($result, $result['code']);
        }

        try {
            $accountInput = $request->only('account_name', 'account_description', 'account_type', 'parent_id');
            $parentId = (int) $request->input('parent_id');
            $parentPath = '/0/';
            if ($parentId > 0) {
                $parentAccount = $this->accountsRepository->getById($parentId);
                $parentPath = $parentAccount->parent_path."$parentId/";
            }

            $accountInput['parent_path'] = $parentPath;
            $newAccount = $this->accountsRepository->store($accountInput);

            if ($request->has('opening_balance')) {
                $openingBalance = $request->input('opening_balance');

                $transactionDetails = new \Illuminate\Http\Request();
                $transactionDetails->replace([
                    "transaction_date" => $openingBalance['date'],
                    "reference" => "reference",
                    "description"=> "Opening Balance",
                    "trans_detail" => [
                        [
                            "account_id" => $newAccount->id,
                            "amount" => $openingBalance['amount']
                        ],
                        [
                            "account_id" => 9,
                            "amount" => invert_amount($openingBalance['amount'])
                        ],
                    ]
                ]);

                $this->transactionsController->store($transactionDetails);
            }
            if ($newAccount) {
                $result['message'] = trans('accounting::messages.resourse_store_success', [ 'module' => $this->module ]);
                $result['data'] = $newAccount;
            } else {
                $result['code'] = 400;
                $result['message'] = trans('accounting::messages.resourse_operation_fail');
            }
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result, $result['code']);
    }

    public function update(Request $request, $id)
    {
        $result = [
            'code' => 200
        ];

        $validator = Validator::make($request->all(), [
            'account_name' => ['required', 'string'],
            'account_description' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            $result['code'] = 400;
            $result['message'] = implode(',', $validator->messages()->all());
            return response()->json($result, $result['code']);
        }

        try {
            $account = $this->accountsRepository->getById($id);
            if ($account) {
                $accountInput = $request->only('account_name', 'account_description');
                $status = $account->update($accountInput);

                if ($status) {
                    $result['message'] = trans('accounting::messages.resourse_update_success', [ 'module' => $this->module ]);
                } else {
                    $result['code'] = 400;
                    $result['message'] = trans('accounting::messages.resourse_operation_fail');
                }
            } else {
                $result['message'] = trans('accounting::messages.not_found', [ 'module' => $this->module ]);
            }
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result, $result['code']);
    }

    public function destroy($id)
    {
        $result = [
            'code' => 200
        ];

        try {
            $account = $this->accountsRepository->getById($id);
            if ($account) {
                $status = $account->delete();
                if ($status) {
                    $result['message'] = trans('accounting::messages.resourse_delete_success', [ 'module' => $this->module ]);
                } else {
                    $result['code'] = 400;
                    $result['message'] = trans('accounting::messages.resourse_operation_fail');
                }
            } else {
                $result['message'] = trans('accounting::messages.not_found', [ 'module' => $this->module ]);
            }
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result, $result['code']);
    }

    public function getAccountTransactions(Request $request, $accountId)
    {
        $result = [
            'code' => 200
        ];

        try {
            $options = [
                'from_date' => $request->input('from_date'),
                'to_date' => $request->input('to_date'),
                'opening_balance' => true,
                'total_balance' => true,
            ];
            $result['data'] = $this->transactionsRepository->getTransactionsByAccount($accountId, $options);
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result, $result['code']);
    }

    public function getAllAccountsWithTreePath()
    {
        $result = [
            'code' => 200
        ];

        try {
            $parentAccounts = $this->accountsRepository->getModel()->where('parent_id', 0)->doesnthave('subAccounts')->get();
            $subAccounts = $this->accountsRepository->getModel()->where('parent_id', '!=', 0)->get();
            $accounts = $parentAccounts->merge($subAccounts);

            $accounts = $accounts->map(function ($acc) {
                $options = [
                    'id' => $acc->id,
                    'account_name' => $acc->account_name,
                    'account_tree_path' => $acc->account_tree_path
                ];
                return $options;
            })->sortBy('account_tree_path')->values();

            $result['data'] = $accounts;
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result, $result['code']);
    }
}

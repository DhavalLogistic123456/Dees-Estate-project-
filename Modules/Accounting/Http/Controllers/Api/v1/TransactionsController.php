<?php

namespace Modules\Accounting\Http\Controllers\Api\v1;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Modules\Accounting\Repositories\TransactionsRepository;

class TransactionsController extends Controller
{
    public function __construct(TransactionsRepository $transactionsRepository)
    {
        $this->module = "Transaction";
        $this->transactionsRepository = $transactionsRepository;
    }

    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        $result = [
            "code" => 200
        ];

        try {
            $transactions = $this->transactionsRepository->getTransactionList();
            $transactions = $transactions->map(function ($trans) {
                $trans->transaction_details = $trans->transaction_details->map(function ($transDetail) {
                    $transDetail->account->setAppends(['account_tree_path']);
                    return $transDetail;
                });

                return $trans;
            });
            $result['data'] = $transactions;
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result);
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        $result = [
            "code" => 200
        ];

        $validator = Validator::make($request->all(), [
            'transaction_date' => ['required'],
            'reference' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'trans_detail' => ['required', 'array'],
            'trans_detail.*.amount' => ['required'],
            'trans_detail.*.account_id' => ['required', 'integer']
        ]);

        if ($validator->fails()) {
            $result['code'] = 400;
            $result['message'] = implode(',', $validator->messages()->all());
            return response()->json($result, $result['code']);
        }

        try {
            $transDetails = collect($request->input('trans_detail'));
            $transInput = $request->only('transaction_date', 'reference', 'description');
            $transInput['total_amount'] = $transDetails->sum(function ($detail) use ($transDetails) {
                if ($detail['account_id'] == $transDetails[0]['account_id']) {
                    return $detail['amount'];
                }
                return 0;
            });

            $transaction = $this->transactionsRepository->updateOrCreate([ 'id' => $request->input('id') ], $transInput);

            $transaction->transaction_details()->sync($transDetails->toArray());
            $transaction->transaction_details;

            if (!$transaction->wasRecentlyCreated && $transaction->wasChanged()) {
                $result['message'] = trans('accounting::messages.resourse_update_success', [ 'module' => $this->module ]);
            } else {
                $result['message'] = trans('accounting::messages.resourse_store_success', [ 'module' => $this->module ]);
            }
            $result['data'] = $transaction;
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }

        return response()->json($result);
    }

    /**
     * Show the specified resource.
     * @param int $transId
     * @return Renderable
     */
    public function show($transId)
    {
        $result = [
            'code' => 200
        ];

        try {
            $transDetails = $this->transactionsRepository->getById($transId);
            $transDetails->transaction_details;

            if ($transDetails) {
                $result['message'] = trans('accounting::messages.resourse_show_success', [ 'module' => $this->module ]);
                $result['data'] = $transDetails;
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
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $transId
     * @return Renderable
     */
    public function destroy($transId)
    {
        $result = [
            'code' => 200
        ];

        try {
            $transaction = $this->transactionsRepository->getById($transId);
            if ($transaction) {
                $status = $transaction->delete();
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
}

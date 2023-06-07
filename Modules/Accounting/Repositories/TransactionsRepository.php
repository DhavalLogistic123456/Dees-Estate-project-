<?php

namespace Modules\Accounting\Repositories;

use Modules\Accounting\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Modules\Accounting\Entities\Transactions;
use Carbon\Carbon;

class TransactionsRepository extends BaseRepository
{
    /**
     * Create a new TransactionsRepository instance.
     *
     * @param  \Modules\Accounting\Entities\Transactions $transactions
     * @return void
     */
    public function __construct(Transactions $transactions)
    {
        $this->model = $transactions;
    }

    public function getTransactionList()
    {
        return $this->model::with(['transaction_details.account.parentAccount'])->get();
    }

    public function store(array $inputs)
    {
        return $this->model::create($inputs);
    }

    public function update(array $inputs, $id)
    {
        $category = $this->getById($id);
        return $category->update($inputs);
    }

    public function updateOrCreate($where, array $inputs)
    {
        return $this->model::updateOrCreate($where, $inputs);
    }

    public function getTransactionsByAccount($accountId, $options = [])
    {
        $result = [];

        if (!($options instanceof Illuminate\Support\Collection)) {
            $options = collect($options);
        }

        $transactionsMainQuery = $this->model::with(['transaction_details'])
                                    ->whereHas('transaction_details', function ($query) use ($accountId) {
                                        $query->where('account_id', $accountId);
                                    });

        $transactionsQry = (clone $transactionsMainQuery);

        if ($options->has('opening_balance') && $options->get('opening_balance') === true) {
            $result['opening_balance'] = 0;
        } elseif ($options->has('total_balance') && $options->get('total_balance') === true) {
            $result['total_balance'] = (clone $transactionsMainQuery)->sum('total_amount');
        }

        if ($options->has('from_date') && $options->get('from_date')) {
            $transactionsQry->whereDate('transaction_date', '>=', Carbon::parse($options->get('from_date')));

            if ($options->has('opening_balance') && $options->get('opening_balance') === true) {
                $transactionsForOpeningBalance = (clone $transactionsMainQuery)->whereDate('transaction_date', '<', Carbon::parse($options->get('from_date')))->get();
                $result['opening_balance'] = $this->calculateTotalAmountByAccountId($transactionsForOpeningBalance, $accountId);
            }
        }

        if ($options->has('to_date') && $options->get('to_date')) {
            $transactionsQry->whereDate('transaction_date', '<=', Carbon::parse($options->get('to_date')));
        }
        $transactions = $transactionsQry->orderBy('transaction_date')->get();

        $result['transactions'] = $transactions;

        return $result;
    }

    public function calculateTotalAmountByAccountId($transactions, $accountId)
    {
        $transactions->map(function ($trans) use ($accountId) {
            $trans->opening_balance = $trans->transaction_details->sum(function ($detail) use ($accountId) {
                if ($detail['account_id'] == $accountId) {
                    return $detail['amount'];
                }
                return 0;
            });
            return $trans;
        });

        return $transactions->sum('opening_balance');
    }
}

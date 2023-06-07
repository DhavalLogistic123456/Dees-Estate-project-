<?php

namespace Modules\Accounting\Http\Controllers\Api\V1;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Accounting\Repositories\AccountsRepository;
use Modules\Accounting\Repositories\TransactionsRepository;
use Carbon\Carbon;

class ReportsController extends Controller
{
    private $totalIncome;
    private $totalExpenses;
    public function __construct(
        AccountsRepository $accountsRepository,
        TransactionsRepository $transactionsRepository
    ) {
        $this->accountsRepository = $accountsRepository;
        $this->transactionsRepository = $transactionsRepository;
    }

    public function getReports()
    {
        $result = [
            'code' => 200
        ];

        try {
            $expensesId = 3;
            $incomeId = 4;
            $this->totalIncome = 0;
            $this->totalExpenses = 0;
            $incomeData = $this->accountsRepository->getAccountsTree($incomeId);
            $expensesData = $this->accountsRepository->getAccountsTree($expensesId);

            $incomeData = $incomeData->map(function ($account) {
                $accountData = $this->getSubAccountsWithTransaction($account);
                return $accountData;
            });

            $expensesData = $expensesData->map(function ($account) {
                $accountData = $this->getSubAccountsWithTransaction($account);
                return $accountData;
            });

            $result['data'] = [
                'total_income' => $this->totalIncome,
                'total_expenses' => $this->totalExpenses,
                'income' => $incomeData,
                'expenses' => $expensesData,
            ];
        } catch (\Throwable $th) {
            $result['code'] = 400;
            $result['message'] = $th->getMessage();
        }
        return response()->json($result);
    }

    public function getSubAccountsWithTransaction($account)
    {
        $abc = [];
        $accountData = [
            'id' => $account->id,
            'account_name' => $account->account_name
        ];

        $options = [
            'from_date' => Carbon::now()->startOfYear(),
            'to_date' => Carbon::now()->endOfYear()
        ];
        $accountTransactions = $this->transactionsRepository->getTransactionsByAccount($account->id, $options)['transactions'];
        $accountData['total_amount'] = $this->transactionsRepository->calculateTotalAmountByAccountId($accountTransactions, $account->id);

        if ($account->account_type == 'income') {
            $this->totalIncome += $accountData['total_amount'];
        } elseif ($account->account_type == 'expenses') {
            $this->totalExpenses += $accountData['total_amount'];
        }
        if (count($account->subAccounts)) {
            $accountData['sub_accounts'] = $account->subAccounts->map(function ($subAcc) {
                return $this->getSubAccountsWithTransaction($subAcc);
            });
        }

        return $accountData;
    }
}

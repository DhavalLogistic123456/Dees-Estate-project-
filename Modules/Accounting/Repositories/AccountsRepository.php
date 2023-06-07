<?php

namespace Modules\Accounting\Repositories;

use Modules\Accounting\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Modules\Accounting\Entities\Accounts;

class AccountsRepository extends BaseRepository
{
    /**
     * Create a new AccountsRepository instance.
     *
     * @param  \Modules\Accounting\Entities\Accounts $accounts
     * @return void
     */
    public function __construct(Accounts $accounts)
    {
        $this->model = $accounts;
    }

    public function getAccountsTree($parent_id = 0)
    {
        return $this->model->with('subAccounts')->where('parent_id', $parent_id)->get();
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

    public function getAccountsTreePath($acc)
    {
        $parentAccNames = collect($this->getParentAccountsName($acc))->reverse();
        return $parentAccNames->join(' / ');
    }

    public function getParentAccountsName($acc, $accNames = [])
    {
        $accNames[] = $acc->account_name;
        if (isset($acc->parentAccount)) {
            return $this->getParentAccountsName($acc->parentAccount, $accNames);
        }
        return $accNames;
    }
}

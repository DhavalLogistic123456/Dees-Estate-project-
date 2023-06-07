<?php

namespace Modules\Accounting\Repositories;

use Modules\Accounting\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Modules\Accounting\Entities\TransactionDetails;

class TransactionDetailsRepository extends BaseRepository
{
    /**
     * Create a new TransactionDetailsRepository instance.
     *
     * @param  \Modules\Accounting\Entities\TransactionDetails $transactionDetails
     * @return void
     */
    public function __construct(TransactionDetails $transactionDetails)
    {
        $this->model = $transactionDetails;
    }

    public function store(array $inputs)
    {
        // return $this->model::create($inputs);
    }

    public function update(array $inputs, $id)
    {
        // $category = $this->getById($id);
        // return $category->update($inputs);
    }
}

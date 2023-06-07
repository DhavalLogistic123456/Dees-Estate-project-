<?php

namespace Modules\Accounting\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Entities\Accounts;
use Modules\Accounting\Entities\Transactions;

class TransactionDetails extends Model
{
    use HasFactory;

    protected $table = 'ac_transaction_details';

    protected $fillable = ['trans_id', 'account_id', 'amount'];

    protected $hidden = ['created_at', 'updated_at'];

    public function account()
    {
        return $this->hasOne(Accounts::class, 'id', 'account_id');
    }

    public function transaction()
    {
        return $this->hasOne(Transactions::class, 'id', 'trans_id');
    }
}

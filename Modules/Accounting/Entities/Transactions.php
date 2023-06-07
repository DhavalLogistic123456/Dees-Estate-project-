<?php

namespace Modules\Accounting\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Entities\TransactionDetails;

class Transactions extends Model
{
    use HasFactory;

    protected $table = 'ac_transactions';

    protected $fillable = ['transaction_date', 'total_amount', 'reference', 'description'];

    public function transaction_details()
    {
        return $this->hasMany(TransactionDetails::class, 'trans_id');
    }
}

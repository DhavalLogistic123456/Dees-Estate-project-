<?php

namespace Modules\PaymentIntegration\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class bankAccount extends Model
{
    use HasFactory;
    protected $table = 'bankAccounts';


    protected $fillable = ['accountId','status','defaultAccount','email'];
    
 /*    protected static function newFactory()
    {
        return \Modules\PaymentIntegration\Database\factories\BankAccountFactory::new();
    } */
}

<?php

namespace Modules\Accounting\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Repositories\AccountsRepository;

class Accounts extends Model
{
    use HasFactory;

    protected $table = 'ac_accounts';

    protected $fillable = ['account_name', 'account_description', 'account_type', 'parent_id', 'parent_path'];

    public function subAccounts()
    {
        return $this->hasMany(Accounts::class, 'parent_id', 'id')->with('subAccounts');
    }

    public function parentAccount()
    {
        return $this->belongsTo(Accounts::class, 'parent_id')->with('parentAccount');
    }

    public function getAccountTreePathAttribute()
    {
        $account_tree_path = (new AccountsRepository($this))->getAccountsTreePath($this);
        return $account_tree_path;
    }
}

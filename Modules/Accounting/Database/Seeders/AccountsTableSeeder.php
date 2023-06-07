<?php

namespace Modules\Accounting\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use DB;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $accountsInput = [
            1 => [
                'account_name' => "Assets",
                'account_description' => "Assets",
                'account_type' => "assets",
                'parent_id' => 0,
                'parent_path' => "/0/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            2 => [
                'account_name' => "Equity",
                'account_description' => "Equity",
                'account_type' => "equity",
                'parent_id' => 0,
                'parent_path' => "/0/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            3 => [
                'account_name' => "Expenses",
                'account_description' => "Expenses",
                'account_type' => "expenses",
                'parent_id' => 0,
                'parent_path' => "/0/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            4 => [
                'account_name' => "Income",
                'account_description' => "Income",
                'account_type' => "income",
                'parent_id' => 0,
                'parent_path' => "/0/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            5 => [
                'account_name' => "Liabilities",
                'account_description' => "Liabilities",
                'account_type' => "liabilities",
                'parent_id' => 0,
                'parent_path' => "/0/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            6 => [
                'account_name' => "Imbalance",
                'account_description' => "Imbalance",
                'account_type' => "imbalance",
                'parent_id' => 0,
                'parent_path' => "/0/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            7 => [
                'account_name' => "Current Assets",
                'account_description' => "Current Assets",
                'account_type' => "assets",
                'parent_id' => 1,
                'parent_path' => "/0/1/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            8 => [
                'account_name' => "Cash",
                'account_description' => "Cash",
                'account_type' => "assets",
                'parent_id' => 7,
                'parent_path' => "/0/1/7/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            9 => [
                'account_name' => "Saving Account",
                'account_description' => "Saving Account",
                'account_type' => "assets",
                'parent_id' => 7,
                'parent_path' => "/0/1/7/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            10 => [
                'account_name' => "Opening Balance",
                'account_description' => "Opening Balance",
                'account_type' => "equity",
                'parent_id' => 2,
                'parent_path' => "/0/2/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            11 => [
                'account_name' => "Miscellaneous",
                'account_description' => "Miscellaneous",
                'account_type' => "expenses",
                'parent_id' => 3,
                'parent_path' => "/0/3/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            12 => [
                'account_name' => "Other Income",
                'account_description' => "Other Income",
                'account_type' => "income",
                'parent_id' => 4,
                'parent_path' => "/0/4/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            13 => [
                'account_name' => "TDS",
                'account_description' => "TDS",
                'account_type' => "liabilities",
                'parent_id' => 5,
                'parent_path' => "/0/5/",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ];

        DB::table('ac_accounts')->insert($accountsInput);
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ac_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_name');
            $table->text('account_description')->nullable()->default(null);
            $table->enum('account_type', ['assets', 'equity', 'expenses', 'income', 'liabilities', 'imbalance']);
            $table->bigInteger('parent_id')->nullable()->default(null);
            $table->string('parent_path')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ac_accounts');
    }
}

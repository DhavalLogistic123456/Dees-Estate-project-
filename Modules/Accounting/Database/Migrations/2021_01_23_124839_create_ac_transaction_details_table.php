<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAcTransactionDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ac_transaction_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trans_id')->constrained('ac_transactions');
            $table->foreignId('account_id')->constrained('ac_accounts');
            $table->decimal('amount', 10, 2);
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
        Schema::table('ac_transaction_details', function (Blueprint $table) {
            $table->dropForeign(['trans_id']);
            $table->dropForeign(['account_id']);
        });
        Schema::dropIfExists('ac_transaction_details');
    }
}

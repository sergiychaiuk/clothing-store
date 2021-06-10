<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->index('customer_id');
            $table->unsignedBigInteger('product_id')->index('product_id');
            $table->unsignedBigInteger('user_id')->index('user_id');
            $table->string('status');

            $table->foreign('customer_id')
                ->references('id')
                ->on('customers');

            $table->foreign('product_id')
                ->references('id')
                ->on('products');

            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}

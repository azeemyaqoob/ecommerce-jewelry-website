<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExchangeReturnsTable extends Migration
{
    public function up()
    {
        Schema::create('exchange_returns', function (Blueprint $table) {
            $table->id();
            $table->longText('title');
            $table->longText('description');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('exchange_returns');
    }
}

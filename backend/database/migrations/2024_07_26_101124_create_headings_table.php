<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHeadingsTable extends Migration
{
    public function up()
    {
        Schema::create('headings', function (Blueprint $table) {
            $table->id();
            $table->string('heading_jewellery');
            $table->string('heading_jewellery_2');
             $table->longText('para_jewellery');
             $table->string('heading_nadia');
             $table->longText('para_nadia');
             $table->string('heading_summer_Sale');
             $table->string('below_heading_summer_Sale');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('headings');
    }
}

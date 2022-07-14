<?php

use App\Models\KPIs;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emp_kpis', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date_kpi')->nullable();
            $table->integer('evaluation_kpi')->nullable();
            $table->integer('kpi_id')->unsigned();
            $table->foreign('kpi_id')->references('id')->on('kpis')->onDelete('cascade');
            $table->integer('employee_id')->unsigned();
            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
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
        Schema::dropIfExists('emp_kpis');
    }
};

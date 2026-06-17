<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('نام محصول');
            $table->text('description')->nullable()->comment('توضیحات');
            $table->string('price')->nullable()->comment('قیمت (تومان)');
            $table->string('discount', 3)->nullable()->comment('تخفیف (درصد)');
            $table->string('rate')->nullable()->comment('امتیاز');
            $table->string('img')->nullable()->comment('تصویر');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->engine = 'InnoDB';
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

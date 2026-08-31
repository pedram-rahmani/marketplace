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
            $table->string('slug')->unique()->comment('اسلاگ (شناسه یکتای متنی)');
            $table->text('description')->nullable()->comment('توضیحات');
            $table->unsignedInteger('price')->nullable()->comment('قیمت (تومان) - تغییر به unsignedInteger برای محاسبات');
            $table->unsignedTinyInteger('discount')->nullable()->comment('تخفیف (درصد)');
            $table->decimal('rate', 2, 1)->nullable()->comment('امتیاز (مثلا 4.5)');
            $table->string('img')->nullable()->comment('مسیر تصویر');
            $table->json('options')->nullable()->comment('ویژگی‌های انتخابی محصول (سایز، اندازه صفحه و...)');

            $table->foreignId('category_id')
                  ->constrained('categories')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

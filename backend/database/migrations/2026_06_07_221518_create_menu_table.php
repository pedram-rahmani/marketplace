<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('عنوان منو');
            $table->string('slug')->nullable();

            // ستون جدید که وصل می‌شود به دسته‌بندی‌ها
            $table->unsignedBigInteger('category_id')->nullable()->comment('آیدی دسته‌بندی مرتبط در جدول categories');

            $table->unsignedBigInteger('parent_id')->nullable()->comment('آیدی والد');
            $table->integer('level')->default(1)->comment('سطح منو');
            $table->string('path')->unique()->comment('(url)آدرس');
            $table->timestamps();

            // کلید خارجی (ارتباط با جدول categories)
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu');
    }
};

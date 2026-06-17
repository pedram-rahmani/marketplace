<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->comment('آیدی محصول')->constrained('products')->cascadeOnDelete();
            $table->foreignId('user_id')->comment('آیدی پرسش کننده')->constrained('users')->cascadeOnDelete();
            $table->string('name')->comment('نام پرسش کننده');
            $table->text('text')->comment('متن پرسش');
            $table->integer('rate')->comment('امتیاز');
            $table->unsignedInteger('likes')->default(0)->comment('تعداد لایک ها');
            $table->unsignedInteger('dislikes')->default(0)->comment('تعداد دیسلایک ها');
            $table->string('liked')->nullable()->comment('آیدی کاربرانی که لایک کرده اند');
            $table->string('disliked')->nullable()->comment('آیدی کاربرانی که دیسلایک کرده اند');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};

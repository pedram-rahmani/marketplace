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
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('questions')->cascadeOnDelete()->comment('آیدی سوال');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->comment('آیدی پاسخ دهنده');
            $table->string('name')->comment('نام پاسخ دهنده');
            $table->text('text')->comment('متن پاسخ');
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
        Schema::dropIfExists('answers');
    }
};

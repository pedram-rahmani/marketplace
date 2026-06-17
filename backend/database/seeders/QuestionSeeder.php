<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;

use App\Models\Content\Question;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Adding multiple questions
        Question::create([
            'product_id' => 1,
            'user_id' => 1,
            'name' => 'John Doe',
            'text' => 'Is this product water-resistant?', // دقت کن: در مدل، فیلد 'text' بود نه 'question'
            'rate' => 5,
            'likes' => 0,
            'dislikes' => 0,
            'liked' => '',
            'disliked' => ''
        ]);

        Question::create([
            'product_id' => 2,
            'user_id' => 2,
            'name' => 'Jane Smith',
            'text' => 'What is the warranty period for this product?',
            'rate' => 4,
            'likes' => 3,
            'dislikes' => 1,
            'liked' => '2,3',
            'disliked' => '4'
        ]);

        Question::create([
            'product_id' => 1,
            'user_id' => 3,
            'name' => 'Alice Johnson',
            'text' => 'Can this product be used for outdoor activities?',
            'rate' => 4,
            'likes' => 5,
            'dislikes' => 0,
            'liked' => '1,2,3',
            'disliked' => ''
        ]);

        Question::create([
            'product_id' => 3,
            'user_id' => 4,
            'name' => 'Bob Brown',
            'text' => 'Is there a size chart available for this product?',
            'rate' => 5,
            'likes' => 10,
            'dislikes' => 2,
            'liked' => '5,6,7',
            'disliked' => '8'
        ]);

        Question::create([
            'product_id' => 2,
            'user_id' => 5,
            'name' => 'Charlie Green',
            'text' => 'Does this product come in different colors?',
            'rate' => 3,
            'likes' => 2,
            'dislikes' => 1,
            'liked' => '2,4',
            'disliked' => '6'
        ]);
    }
}

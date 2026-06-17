<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Content\Comment;
use App\Models\Product\Product;
use App\Models\User\User;

class CommentSeeder extends Seeder
{
    public function run()
    {
        $product = Product::first();

        if (!$product) {
            $this->command->warn('⚠ No products found! Please seed products first.');
            return;
        }

        $users = User::take(3)->pluck('id');

        if ($users->count() < 3) {
            $this->command->warn('⚠ Not enough users found! Please seed users first.');
            return;
        }

        $comments = [
            [
                'name' => 'علی رحمانیان',
                'comment' => 'خوبه ، راضیم',
                'product_id' => $product->id,
                'user_id' => $users[0] ?? 1,
                'rate' => 5,
                'likes' => 8,
                'dislikes' => 1,
                'liked' => implode(',', [1, 2, 3]),
                'disliked' => implode(',', [1]),
            ],
            [
                'name' => 'مهدی علوی',
                'comment' => 'عالی بود!',
                'product_id' => $product->id,
                'user_id' => $users[1] ?? 2,
                'rate' => 4,
                'likes' => 12,
                'dislikes' => 0,
                'liked' => implode(',', [1, 2, 3]),
                'disliked' => implode(',', [1]),
            ],
            [
                'name' => 'سارا احمدی',
                'comment' => 'نیاز به بهبود داره.',
                'product_id' => $product->id,
                'user_id' => $users[2] ?? 3,
                'rate' => 2,
                'likes' => 2,
                'dislikes' => 6,
                'liked' => implode(',', [1, 2, 3]),
                'disliked' => implode(',', [1]),
            ],
        ];

        foreach ($comments as $commentData) {
            $product->comments()->create($commentData);
        }

        $this->command->info('✅ Comments seeded successfully!');
    }
}

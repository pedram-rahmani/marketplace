<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            MenuSeeder::class,
            ColorSeeder::class,
            //CommentSeeder::class,
            //QuestionSeeder::class,
            ProductIntroductionSeeder::class,
            WalletSeeder::class,
            OrderSeeder::class,
            TicketSeeder::class,
            SettingSeeder::class,
        ]);
    }
}

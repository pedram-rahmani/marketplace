<?php

namespace Database\Seeders;

// ایمپورت مدل Category از مسیر جدید:
use App\Models\Product\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => 'دیجیتال', 'slug' => 'electronics']);
        Category::create(['name' => 'پوشاک و مد', 'slug' => 'clothing']);
        Category::create(['name' => 'خانه و آشپزخانه', 'slug' => 'home-kitchen']);
        Category::create(['name' => 'لوازم خانگی', 'slug' => 'appliances']);
        Category::create(['name' => 'مبلمان', 'slug' => 'furniture']);
        Category::create(['name' => 'صوتی و تصویری', 'slug' => 'audio-visual']);
    }
}

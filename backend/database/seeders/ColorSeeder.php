<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product\Product;
use App\Models\Product\ProductColor;

class ColorSeeder extends Seeder
{
    public function run(): void
    {
        $product = Product::first();

        if (!$product) {
            $product = Product::create([
                'name' => 'Default Product',
                'description' => 'This is a default product for seeding colors',
                'price' => 100,
                'discount' => 0,
                'category_id' => 1,
            ]);
        }

        $colors = [
            ['name' => 'قرمز', 'hex' => '#EF4444'],
            ['name' => 'آبی', 'hex' => '#3B82F6'],
            ['name' => 'سبز', 'hex' => '#10B981'],
            ['name' => 'زرد', 'hex' => '#FFFF00'],
            ['name' => 'سفید', 'hex' => '#FFFFFF'],
            ['name' => 'مشکی', 'hex' => '#000000'],
            ['name' => 'طلایی', 'hex' => '#F6D30F'],
            ['name' => 'نقره ای', 'hex' => '#C0C0C0'],
        ];

        foreach ($colors as $color) {
            ProductColor::create([
                'product_id' => $product->id,
                'name' => $color['name'],
                'hex' => $color['hex'],
            ]);
        }
    }
}

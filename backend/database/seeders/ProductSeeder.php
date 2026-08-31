<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product\Category;
use App\Models\Product\Product;
use App\Models\Product\ProductFeature;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        \Illuminate\Support\Facades\Log::info('Categories in DB:', \App\Models\Product\Category::pluck('name')->toArray());
  
        Schema::disableForeignKeyConstraints();
        DB::table('product_specifications')->truncate();
        DB::table('product_colors')->truncate();
        Product::truncate();
        Schema::enableForeignKeyConstraints();

        // دریافت دسته‌بندی‌ها بر اساس نام دقیق
        $categories = Category::all()->keyBy('name');

        // تابع کمکی برای ایجاد محصول
        $createProduct = function($catName, $name, $desc, $price, $img) use ($categories) {
            $cat = $categories->get($catName);
            if (!$cat) return null;

            return Product::create([
                'name'        => $name,
                'slug'        => Str::slug($name, '-', 'fa') . '-' . uniqid(),
                'description' => $desc,
                'price'       => $price,
                'category_id' => $cat->id,
                'img'         => $img,
            ]);
        };

        // --- بخش الکترونیک (دیجیتال) ---
        if ($phone = $createProduct('دیجیتال', 'گوشی هوشمند TechGear Pro', 'پرچمدار جدید با صفحه نمایش فوق‌العاده و سخت‌افزار قدرتمند.', 64000000, '/images/products/2.png')) {
            $f1 = ProductFeature::firstOrCreate(['category_id' => $phone->category_id, 'title' => 'صفحه‌نمایش']);
            $f2 = ProductFeature::firstOrCreate(['category_id' => $phone->category_id, 'title' => 'حافظه رم']);
            $phone->colors()->createMany([['name' => 'مشکی', 'hex' => '#1A1A1A'], ['name' => 'نقره‌ای', 'hex' => '#E5E5E5']]);
            $phone->specifications()->createMany([['feature_id' => $f1->id, 'value' => '6.7" AMOLED'], ['feature_id' => $f2->id, 'value' => '12GB']]);
        }

        // --- بخش لوازم خانگی ---
        if ($espresso = $createProduct('خانه و آشپزخانه', 'اسپرسوساز کافه باریستا', 'تجربه نوشیدن یک قهوه اصیل در خانه.', 8900000, '/images/products/3.png')) {
            $f = ProductFeature::firstOrCreate(['category_id' => $espresso->category_id, 'title' => 'فشار بخار']);
            $espresso->specifications()->createMany([['feature_id' => $f->id, 'value' => '20 Bar']]);
        }

        // --- بخش پوشاک ---
        if ($shoes = $createProduct('پوشاک و مد', 'کفش ورزشی CloudWalkers', 'طراحی ارگونومیک مخصوص دویدن.', 2450000, '/images/products/4.png')) {
            $f = ProductFeature::firstOrCreate(['category_id' => $shoes->category_id, 'title' => 'نوع کاربری']);
            $shoes->specifications()->createMany([['feature_id' => $f->id, 'value' => 'Running']]);
        }

        // --- بخش مبلمان ---
        if ($chair = $createProduct('مبلمان', 'صندلی نوردیک بلوط', 'صندلی تمام چوب مینیمال و شیک.', 4200000, '/images/products/1.png')) {
            $f1 = ProductFeature::firstOrCreate(['category_id' => $chair->category_id, 'title' => 'سبک طراحی']);
            $f2 = ProductFeature::firstOrCreate(['category_id' => $chair->category_id, 'title' => 'جنس بدنه']);
            $chair->specifications()->createMany([['feature_id' => $f1->id, 'value' => 'Minimalist'], ['feature_id' => $f2->id, 'value' => 'Solid Oak Wood']]);
        }

        if ($table = $createProduct('مبلمان', 'میز ناهارخوری مدرن شش نفره', 'میز با صفحه ضد خش و طراحی ارگونومیک.', 12500000, '/images/products/5.png')) {
            $f1 = ProductFeature::firstOrCreate(['category_id' => $table->category_id, 'title' => 'سبک طراحی']);
            $f2 = ProductFeature::firstOrCreate(['category_id' => $table->category_id, 'title' => 'شکل میز']);
            $table->colors()->createMany([['name' => 'گردویی', 'hex' => '#4B3621']]);
            $table->specifications()->createMany([['feature_id' => $f1->id, 'value' => 'Modern'], ['feature_id' => $f2->id, 'value' => 'Rectangular']]);
        }

        // --- بخش صوتی و تصویری ---
        if ($tv = $createProduct('صوتی و تصویری', 'تلویزیون هوشمند 55 اینچ 4K', 'تجربه سینمایی در خانه با کیفیت تصویر فوق‌العاده.', 28500000, '/images/products/6.png')) {
            $f1 = ProductFeature::firstOrCreate(['category_id' => $tv->category_id, 'title' => 'رزولوشن']);
            $f2 = ProductFeature::firstOrCreate(['category_id' => $tv->category_id, 'title' => 'سایز صفحه']);
            $tv->specifications()->createMany([['feature_id' => $f1->id, 'value' => '4K Ultra HD'], ['feature_id' => $f2->id, 'value' => '55 Inch']]);
        }
    }
}

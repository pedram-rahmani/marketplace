<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Product\Category;
use App\Models\Product\Product;
use App\Models\Product\ProductFeature;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // 1. دریافت دسته‌بندی‌ها
        $electronics = Category::where('slug', 'electronics')->firstOrFail();
        $appliances  = Category::where('slug', 'appliances')->firstOrFail();
        $clothing    = Category::where('slug', 'clothing')->firstOrFail();
        $furniture   = Category::where('slug', 'furniture')->firstOrFail();
        $homeKitchen   = Category::where('slug', 'home-kitchen')->firstOrFail();
        $audioVisual   = Category::where('slug', 'audio-visual')->firstOrFail();

        // --- بخش الکترونیک ---
        $screenFeature = ProductFeature::firstOrCreate(['category_id' => $electronics->id, 'title' => 'صفحه‌نمایش']);
        $ramFeature    = ProductFeature::firstOrCreate(['category_id' => $electronics->id, 'title' => 'حافظه رم']);

        $phone = Product::create([
            'name' => 'گوشی هوشمند TechGear Pro',
            'description' => 'پرچمدار جدید با صفحه نمایش فوق‌العاده و سخت‌افزار قدرتمند.',
            'price' => 64000000,
            'category_id' => $electronics->id,
            'img' => '/images/products/2.png',
        ]);

        $phone->colors()->createMany([['name' => 'مشکی', 'hex' => '#1A1A1A'], ['name' => 'نقره‌ای', 'hex' => '#E5E5E5']]);
        $phone->specifications()->createMany([
            ['feature_id' => $screenFeature->id, 'value' => '6.7" AMOLED'],
            ['feature_id' => $ramFeature->id, 'value' => '12GB'],
        ]);


        // --- بخش لوازم خانگی ---
        $pressureFeature = ProductFeature::firstOrCreate(['category_id' => $homeKitchen->id, 'title' => 'فشار بخار']);
        $espresso = Product::create([
            'name' => 'اسپرسوساز کافه باریستا',
            'description' => 'تجربه نوشیدن یک قهوه اصیل در خانه.',
            'price' => 8900000,
            'category_id' => $homeKitchen->id,
            'img' => '/images/products/3.png',
        ]);
        $espresso->specifications()->createMany([['feature_id' => $pressureFeature->id, 'value' => '20 Bar']]);

        // --- بخش پوشاک ---
        $usageFeature = ProductFeature::firstOrCreate(['category_id' => $clothing->id, 'title' => 'نوع کاربری']);

        $shoes = Product::create([
            'name' => 'کفش ورزشی CloudWalkers',
            'description' => 'طراحی ارگونومیک مخصوص دویدن.',
            'price' => 2450000,
            'category_id' => $clothing->id,
            'img' => '/images/products/4.png',
        ]);
        $shoes->specifications()->createMany([['feature_id' => $usageFeature->id, 'value' => 'Running']]);

        // --- بخش مبلمان ---
        $styleFeature = ProductFeature::firstOrCreate(['category_id' => $furniture->id, 'title' => 'سبک طراحی']);
        $materialFeature = ProductFeature::firstOrCreate(['category_id' => $furniture->id, 'title' => 'جنس بدنه']);
        $shapeFeature = ProductFeature::firstOrCreate(['category_id' => $furniture->id, 'title' => 'شکل میز']);

        // محصول 1: صندلی
        $chair = Product::create([
            'name' => 'صندلی نوردیک بلوط',
            'description' => 'صندلی تمام چوب مینیمال و شیک.',
            'price' => 4200000,
            'category_id' => $furniture->id,
            'img' => '/images/products/1.png',
        ]);
        $chair->specifications()->createMany([
            ['feature_id' => $styleFeature->id, 'value' => 'Minimalist'],
            ['feature_id' => $materialFeature->id, 'value' => 'Solid Oak Wood'],
        ]);

        // محصول 2: میز
        $table = Product::create([
            'name' => 'میز ناهارخوری مدرن شش نفره',
            'description' => 'میز با صفحه ضد خش و طراحی ارگونومیک.',
            'price' => 12500000,
            'category_id' => $furniture->id,
            'img' => '/images/products/5.png',
        ]);
        $table->colors()->createMany([['name' => 'گردویی', 'hex' => '#4B3621']]);
        $table->specifications()->createMany([
            ['feature_id' => $styleFeature->id, 'value' => 'Modern'],
            ['feature_id' => $shapeFeature->id, 'value' => 'Rectangular'],
        ]);


        // صوتی و تصویری (Audio-Visual) - اضافه کردن محصول تلویزیون
        $resolutionFeature = ProductFeature::firstOrCreate(['category_id' => $audioVisual->id, 'title' => 'رزولوشن']);
        $screenSizeFeature = ProductFeature::firstOrCreate(['category_id' => $audioVisual->id, 'title' => 'سایز صفحه']);

        // ساخت محصول تلویزیون
        $tv = Product::create([
            'name' => 'تلویزیون هوشمند 55 اینچ 4K',
            'description' => 'تجربه سینمایی در خانه با کیفیت تصویر فوق‌العاده.',
            'price' => 28500000,
            'category_id' => $audioVisual->id,
            'img' => '/images/products/6.png',
        ]);

        // افزودن مشخصات فنی
        $tv->specifications()->createMany([
            ['feature_id' => $resolutionFeature->id, 'value' => '4K Ultra HD'],
            ['feature_id' => $screenSizeFeature->id, 'value' => '55 Inch'],
        ]);
    }
}

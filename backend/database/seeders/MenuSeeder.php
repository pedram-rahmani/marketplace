<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'دیجیتال',
                'children' => [
                    ['name' => 'گوشی موبایل'],
                    ['name' => 'لوازم جانبی موبایل'],
                    ['name' => 'تبلت و کتاب‌خوان'],
                    ['name' => 'دوربین و عکاسی'],
                ],
            ],
            [
                'name' => 'صوتی و تصویری',
                'children' => [
                    ['name' => 'تلویزیون'],
                    ['name' => 'اسپیکر'],
                    ['name' => 'پروژکتور'],
                    ['name' => 'هدفون و هدست'],
                ],
            ],
            [
                'name' => 'خانه و آشپزخانه',
                'children' => [
                    ['name' => 'لوازم آشپزخانه'],
                    ['name' => 'یخچال و فریزر'],
                    ['name' => 'ماشین لباسشویی'],
                    ['name' => 'ماشین ظرفشویی'],
                ],
            ],
            [
                'name' => 'پوشاک و مد',
                'children' => [
                    ['name' => 'لباس مردانه'],
                    ['name' => 'لباس زنانه'],
                    ['name' => 'کیف و کفش'],
                    ['name' => 'زیورآلات'],
                ],
            ],
            ['name' => 'زیبایی و سلامت', 'children' => []],
            ['name' => 'کالای پزشکی', 'children' => []],
            ['name' => 'لوازم تحریر', 'children' => []],
            ['name' => 'کتاب و مجله', 'children' => []],
            ['name' => 'تجهیزات اداری', 'children' => []],
            ['name' => 'لوازم سرگرمی', 'children' => []],
            ['name' => 'آلات موسیقی', 'children' => []],
            ['name' => 'ورزش و سفر', 'children' => []],
            ['name' => 'تجهیزات ایمنی', 'children' => []],
            ['name' => 'خودرو و موتورسیکلت', 'children' => []],
            ['name' => 'ابزار و ماشین آلات', 'children' => []],
            ['name' => 'الکترونیک و رباتیک', 'children' => []],
            ['name' => 'لوازم کشاورزی ٫ باغبانی و گلخانه', 'children' => []],
            ['name' => 'حیوانات خانگی', 'children' => []],
            ['name' => 'تعمیرات و قطعات', 'children' => []],
        ];

        foreach ($categories as $category) {
            $parentName = $category['name'];
            $parentSlug = $parentName; // Persian slug
            $parentPath = 'products/' . $parentSlug;

            $parentId = DB::table('menu')->insertGetId([
                'name' => $parentName,
                'slug' => $parentSlug,
                'path' => $parentPath,
                'parent_id' => null,
                'level' => 1,
            ]);

            foreach ($category['children'] as $child) {
                $childName = $child['name'];
                $childSlug = $childName; // Persian slug
                $childPath = 'product-info/' . $childSlug;

                DB::table('menu')->insert([
                    'name' => $childName,
                    'slug' => $childSlug,
                    'path' => $childPath,
                    'parent_id' => $parentId,
                    'level' => 2,
                ]);
            }
        }
    }
}

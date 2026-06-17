<?php

namespace Database\Seeders;

// ایمپورت از مسیرهای جدید:
use App\Models\User\User;
use App\Models\User\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $user = User::first();

        if ($user) {
            Order::create([
                'user_id' => $user->id,
                'total_price' => 120000,
                'status' => 'completed',
            ]);
        }
    }
}

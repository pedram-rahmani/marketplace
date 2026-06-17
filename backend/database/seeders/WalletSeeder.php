<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User\User;
use App\Models\User\Wallet;
use App\Models\User\Transaction;

class WalletSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            $wallet = Wallet::create([
                'user_id' => $user->id,
                'balance' => 500000,
                'status' => 'active'
            ]);

            Transaction::create([
                'wallet_id' => $wallet->id,
                'amount' => 500000,
                'type' => 'deposit',
                'description' => 'هدیه خوش‌آمدگویی',
                'reference_id' => 'INIT-' . uniqid()
            ]);
        }
    }
}

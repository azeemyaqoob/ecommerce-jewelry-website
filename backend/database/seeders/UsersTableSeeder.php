<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'first_name' => 'admin',
            'last_name' => 'jewellery',
            'email' => 'admin_azhajewellery@gmail.com',
            'password' => Hash::make('admin_azhajewellery12@'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

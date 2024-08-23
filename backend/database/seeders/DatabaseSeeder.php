<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            HeadingsTableSeeder::class,
            FAQSeeder::class,
            PrivacyPolicySeeder::class,
            ExchangeReturnsTableSeeder::class,
            TermsAndConditionsTableSeeder::class,
        ]);
    }
}

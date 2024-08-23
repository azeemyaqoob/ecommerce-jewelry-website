<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PrivacyPolicy;

class PrivacyPolicySeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        PrivacyPolicy::create([
            'title' => 'Privacy Policy Section 1',
            'content' => 'This is the content for Privacy Policy Section 1. It includes details about privacy practices and user data handling.'
        ]);

        PrivacyPolicy::create([
            'title' => 'Privacy Policy Section 2',
            'content' => 'This is the content for Privacy Policy Section 2. It includes additional information about data protection and user rights.'
        ]);

        PrivacyPolicy::create([
            'title' => 'Privacy Policy Section 2',
            'content' => 'This is the content for Privacy Policy Section 2. It includes additional information about data protection and user rights.'
        ]);


        PrivacyPolicy::create([
            'title' => 'Privacy Policy Section 2',
            'content' => 'This is the content for Privacy Policy Section 2. It includes additional information about data protection and user rights.'
        ]);
    }
}

<?php

// database/seeders/FAQSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FAQSeeder extends Seeder
{
    public function run()
    {
        DB::table('faqs')->insert([
            [
                'question' => 'What is Lorem Ipsum?',
                'answer' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            ],
            [
                'question' => 'Why do we use it?',
                'answer' => 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
            ],
            [
                'question' => 'Where does it come from?',
                'answer' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
            ],
            [
                'question' => 'Where can I get some?',
                'answer' => 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
            ],
        ]);
    }
}


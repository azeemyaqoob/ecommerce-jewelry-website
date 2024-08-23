<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TermsAndConditions;

class TermsAndConditionsTableSeeder extends Seeder
{
    public function run()
    {
        TermsAndConditions::create([
            'title' => 'The standard Lorem Ipsum passage',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus eget elit quis, vehicula rhoncus nulla. Phasellus convallis sem nec facilisis commodo. Fusce ut molestie turpis. Suspendisse aliquet sed massa in vulputate. Quisque gravida suscipit tincidunt.'
        ]);

        TermsAndConditions::create([
            'title' => 'The standard Lorem Ipsum passage',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus eget elit quis, vehicula rhoncus nulla. Phasellus convallis sem nec facilisis commodo. Fusce ut molestie turpis. Suspendisse aliquet sed massa in vulputate. Quisque gravida suscipit tincidunt.'
        ]);

        TermsAndConditions::create([
            'title' => 'The standard Lorem Ipsum passage',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus eget elit quis, vehicula rhoncus nulla. Phasellus convallis sem nec facilisis commodo. Fusce ut molestie turpis. Suspendisse aliquet sed massa in vulputate. Quisque gravida suscipit tincidunt.'
        ]);

        TermsAndConditions::create([
            'title' => 'The standard Lorem Ipsum passage',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus eget elit quis, vehicula rhoncus nulla. Phasellus convallis sem nec facilisis commodo. Fusce ut molestie turpis. Suspendisse aliquet sed massa in vulputate. Quisque gravida suscipit tincidunt.'
        ]);
    }
}

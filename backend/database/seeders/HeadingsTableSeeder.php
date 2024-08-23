<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Heading;

class HeadingsTableSeeder extends Seeder
{
    public function run()
    {
        Heading::create([
            'heading_jewellery' => 'GOLD & SILVER',
            'heading_jewellery_2' => 'JEWELLERY',
            'para_jewellery' =>  'Delicately draped antique 18k gold chain collarette with seven medallions of seed gold and pearl closure!',
            'heading_nadia' => 'Nadia Chottani',
            'para_nadia' => "Discover a world where exquisite jewellery of diverse metals redefines modern elegance. Guided by Nadia Chhotani, a 4th generation jeweller from a 75-year-old legacy, our brand brings a fusion of eastern and western traditions to life. Nadia's designs, inspired by a kaleidoscope of gemstones set in various precious metals, radiate quality, luxury, and a distinct style that suits every woman, every occasion. This is more than jewellery - it's an expression of your unique persona, masterfully blending timeless tradition with contemporary flair.",
            'heading_summer_Sale' => 'SUMMER SALE',
            'below_heading_summer_Sale' => 'Get upto 50% OFF',
        ]);
    }
}

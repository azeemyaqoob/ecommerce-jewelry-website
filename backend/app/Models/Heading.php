<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Heading extends Model
{
    use HasFactory;

    protected $fillable = ['heading_jewellery', 'heading_jewellery_2', 'para_jewellery', 'heading_nadia', 'para_nadia', 'heading_summer_Sale', 'below_heading_summer_Sale'];
}

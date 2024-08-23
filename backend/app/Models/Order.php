<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'email', 'first_name', 'last_name', 'country', 'address',
        'apartment', 'city', 'postal_code', 'phone', 'news_offers',
        'order_instructions', 'payment_method', 'cart_items'
    ];

    protected $casts = [
        'cart_items' => 'array',
        'news_offers' => 'boolean'
    ];
}

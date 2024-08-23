<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Ensure cart_items is an array
        $cartItems = $request->input('cart_items', []);
        
        if (!is_array($cartItems)) {
            return response()->json(['error' => 'Invalid cart_items format'], 400);
        }

        $lineItems = collect($cartItems)->map(function ($item) {
            // Check for required keys and provide default values if missing
            $name = $item['name'] ?? 'Unknown Product';
            $price = $item['price'] ?? 0;
            $count = $item['count'] ?? 1;

            // Ensure price and count are valid numbers
            if (!is_numeric($price) || !is_numeric($count)) {
                return null;
            }

            return [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $name,
                    ],
                    'unit_amount' => $price * 100, // Convert to cents
                ],
                'quantity' => $count,
            ];
        })->filter()->toArray(); // Remove null values from the collection

        $lineItems[] = [
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => 'Shipping Fee',
                ],
                'unit_amount' => 300, // Add your shipping fee here
            ],
            'quantity' => 1,
        ];

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => env('FRONTEND_URL') . '/success',
            'cancel_url' => env('FRONTEND_URL') . '/cancel',
        ]);

        return response()->json(['id' => $session->id]);
    }
}

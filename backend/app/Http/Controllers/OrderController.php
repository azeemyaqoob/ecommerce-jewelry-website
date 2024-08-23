<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'country' => 'required|string',
            'address' => 'required|string',
            'apartment' => 'nullable|string',
            'city' => 'required|string',
            'postal_code' => 'nullable|string',
            'phone' => 'required|string',
            'news_offers' => 'required|boolean',
            'order_instructions' => 'nullable|string',
            'payment_method' => 'required|string',
            'cart_items' => 'required|array',
            'cart_items.*.id' => 'required|exists:products,id',
            'cart_items.*.count' => 'required|integer|min:1',
            'cart_items.*.size' => 'required|string',
        ]);

        // Create the order
        $order = Order::create($validatedData);

        // Update product quantities
        foreach ($validatedData['cart_items'] as $item) {
            $product = Product::findOrFail($item['id']);
            $sizes = $product->sizes;

            foreach ($sizes as &$size) {
                if ($size['size'] == $item['size']) {
                    $size['quantity'] -= $item['count'];
                    if ($size['quantity'] < 0) {
                        $size['quantity'] = 0; // Ensure quantity does not go negative
                    }
                }
            }

            $product->sizes = $sizes;
            $product->save();
        }

        return response()->json($order, 201);
    }
}

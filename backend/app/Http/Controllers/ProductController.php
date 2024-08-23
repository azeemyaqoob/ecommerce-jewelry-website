<?php

// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('category')->get();
    }

    public function showByCategory($categoryId)
    {
        $productsPerPage = 8; // Specify the number of products per page
        return Product::with('category')
            ->where('category_id', $categoryId)
            ->paginate($productsPerPage);
    }
    
    

    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'type' => 'nullable|string',
            'vendor' => 'nullable|string',
            'sku' => 'nullable|string',
            'tags' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'sizes' => 'nullable|array',
            'sizes.*.size' => 'required|string',
            'sizes.*.quantity' => 'required|integer',
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',
        ]);

        $product = new Product($request->except('images'));

        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('products', 'public');
            }
            $product->images = $imagePaths;
        }

        $product->save();

        return response()->json(['message' => 'Product created successfully', 'product' => $product]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|max:255',
            'price' => 'numeric',
            'description' => 'string',
            'type' => 'string',
            'vendor' => 'string',
            'sku' => 'string',
            'tags' => 'string',
            'sizes' => 'array',
            'sizes.*.size' => 'string',
            'sizes.*.quantity' => 'integer|min:0',
        ]);

        $product = Product::findOrFail($id);
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        $product->type = $request->input('type');
        $product->vendor = $request->input('vendor');
        $product->sku = $request->input('sku');
        $product->tags = $request->input('tags');
        $product->sizes = $request->input('sizes');

        $product->save();

        return response()->json($product);
    }


    public function indexWithPagination(Request $request)
    {
        $products = Product::with('category')->paginate(12);

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found'], 404);
        }

        return response()->json($products);
    }
}

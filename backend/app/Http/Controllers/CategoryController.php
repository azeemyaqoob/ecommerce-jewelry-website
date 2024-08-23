<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        $category = new Category();
        $category->name = $request->name;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
            $category->image = $imagePath;
        }

        $category->save();

        return response()->json(['message' => 'Category created successfully', 'category' => $category]);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
    
        // Set category_id to null for all products associated with this category
        Product::where('category_id', $id)->update(['category_id' => null]);
    
        // Delete the category image from storage if it exists
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
    
        // Delete the category
        $category->delete();
    
        return response()->json(null, 204);
    }
    
    

    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|string', // Expect base64 encoded string
        ]);
    
        // Find the category or fail if not found
        $category = Category::findOrFail($id);
    
        // Update the category name if provided
        if ($request->has('name')) {
            $category->name = $request->name;
        }
    
        // Update the category image if provided
        if ($request->has('image')) {
            // Delete the old image if it exists
            if ($category->image && Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }
    
            // Decode base64 image data
            $imageData = $request->image;
            $imageData = str_replace('data:image/png;base64,', '', $imageData);
            $imageData = str_replace(' ', '+', $imageData);
    
            // Generate a unique name for the new image
            $imageName = 'category_' . time() . '.png';
            $imagePath = 'categories/' . $imageName;
    
            // Store the new image
            Storage::disk('public')->put($imagePath, base64_decode($imageData));
            $category->image = $imagePath;
        }
    
        // Save the category with updated fields
        $category->save();
    
        // Return a success response with the updated category
        return response()->json(['message' => 'Category updated successfully', 'category' => $category]);
    }
    
}
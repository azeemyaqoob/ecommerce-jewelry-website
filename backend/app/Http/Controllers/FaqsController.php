<?php

namespace App\Http\Controllers;

use App\Models\Faqs;
use Illuminate\Http\Request;

class FaqsController extends Controller
{
    public function index()
    {
        return Faqs::all();
    }

    public function update(Request $request, $id)
    {
        $faq = Faqs::find($id);
        if (!$faq) {
            return response()->json(['message' => 'FAQ not found'], 404);
        }
        $faq->update($request->only(['question', 'answer']));
        return response()->json(['message' => 'FAQ updated successfully']);
    }
}

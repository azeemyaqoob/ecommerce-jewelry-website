<?php

namespace App\Http\Controllers;

use App\Models\TermsAndConditions;
use Illuminate\Http\Request;

class TermsAndConditionsController extends Controller
{
    public function index()
    {
        return TermsAndConditions::all();
    }

    public function update(Request $request, $id)
    {
        $term = TermsAndConditions::findOrFail($id);
        $term->update($request->all());
        return response()->json(['message' => 'Terms and Conditions updated successfully.']);
    }
}

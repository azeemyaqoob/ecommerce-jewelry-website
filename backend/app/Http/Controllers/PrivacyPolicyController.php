<?php

namespace App\Http\Controllers;

use App\Models\PrivacyPolicy;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{
    public function index()
    {
        return response()->json(PrivacyPolicy::all());
    }

    public function update(Request $request, $id)
    {
        $privacyPolicy = PrivacyPolicy::find($id);

        if (!$privacyPolicy) {
            return response()->json(['message' => 'Privacy Policy not found'], 404);
        }

        $privacyPolicy->update($request->only(['title', 'content']));
        return response()->json(['message' => 'Privacy Policy updated successfully']);
    }
}

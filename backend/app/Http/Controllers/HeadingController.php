<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Heading;

class HeadingController extends Controller
{
    public function getHeadings()
    {
        $headings = Heading::first();
        return response()->json($headings);
    }

    public function updateHeadings(Request $request)
    {
        $request->validate([
            'heading_jewellery' => 'required|string',
            'heading_jewellery_2' => 'required|string',
            'para_jewellery' => 'required|string',
            'heading_nadia' => 'required|string',
            'para_nadia' => 'required|string',
            'heading_summer_Sale' => 'required|string',
            'below_heading_summer_Sale' => 'required|string',
        ]);

        $headings = Heading::first();
        $headings->update([
            'heading_jewellery' => $request->heading_jewellery,
            'heading_jewellery_2' => $request->heading_jewellery_2,
            'para_jewellery' => $request->para_jewellery,
            'heading_nadia' => $request->heading_nadia,
            'para_nadia' => $request->para_nadia,
            'heading_summer_Sale' => $request->heading_summer_Sale,
            'below_heading_summer_Sale' => $request->below_heading_summer_Sale,
        ]);

        return response()->json(['message' => 'Headings updated successfully']);
    }
}

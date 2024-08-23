<?php

namespace App\Http\Controllers;

use App\Models\ExchangeReturn;
use Illuminate\Http\Request;

class ExchangeReturnController extends Controller
{
    public function index()
    {
        return response()->json(ExchangeReturn::all());
    }

    public function update(Request $request, $id)
    {
        $exchangeReturn = ExchangeReturn::findOrFail($id);
        $exchangeReturn->update($request->all());

        return response()->json(['message' => 'Exchange and Return updated successfully.']);
    }
}

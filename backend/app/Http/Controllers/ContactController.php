<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactNotification;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string',
            'comment' => 'required|string|max:1000',
        ]);

        $contact = Contact::create($request->all());

        // Send email to user
        Mail::to($contact->email)->send(new ContactNotification($contact));

        // Send email to a fixed address
        Mail::to('yaqoobazem740@gmail.com')->send(new ContactNotification($contact));

        return response()->json(['message' => 'Contact saved successfully!', 'contact' => $contact], 201);
    }
}

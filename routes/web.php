<?php

use App\Events\ChatMessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

Route::post('/send-message', function (Request $request) {
    $request->validate([
        'username' => 'required|string|max:255',
        'message' => 'required|string|max:1000',
    ]);

    Log::info('📩 Message reçu par Laravel', [
        'username' => $request->username,
        'message' => $request->message
    ]);

    event(new ChatMessageSent($request->username, $request->message));

    return response()->json(['success' => true]);
});

Route::get('/', function () {
    return view('welcome');
});

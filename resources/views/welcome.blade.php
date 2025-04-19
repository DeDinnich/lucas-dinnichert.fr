<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Chat Temps Réel</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container">
        <h1>Chat en Temps Réel</h1>
        <div id="chat-box" style="border: 1px solid #ccc; height: 300px; overflow-y: auto; padding: 10px;"></div>

        <input type="text" id="username" placeholder="Votre pseudo" style="margin-top: 10px; width: 100%;">
        <input type="text" id="message" placeholder="Tapez votre message..." style="margin-top: 10px; width: 100%;">
        <button id="send-btn" style="margin-top: 10px; width: 100%;">Envoyer</button>
    </div>

    <script>
        window.Laravel = {
            reverbAppKey: "{{ env('REVERB_APP_KEY') }}",
            reverbHost: "{{ env('REVERB_HOST') }}",
            reverbPort: {{ env('REVERB_PORT') }},
            reverbScheme: "{{ env('REVERB_SCHEME') }}"
        };
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pusher/7.0.3/pusher.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/laravel-echo@1.11.2/dist/echo.iife.min.js"></script>

    <!-- Reverb doit être chargé avant chat.js -->
    <script src="{{ asset('js/reverbStatus.js') }}"></script>
    <script src="{{ asset('js/chat.js') }}"></script>
</body>
</html>

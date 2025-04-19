// Vérifier que Pusher est bien défini
if (typeof Pusher === "undefined") {
    console.error("❌ Pusher n'est pas chargé correctement !");
} else {
    console.log("✅ Pusher est chargé !");
}

// Attacher Pusher à la fenêtre globale (nécessaire pour Laravel Echo)
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',  // Utiliser "pusher" même pour Reverb
    key: window.Laravel.reverbAppKey,
    wsHost: window.Laravel.reverbHost,
    wsPort: window.Laravel.reverbPort,
    wssPort: window.Laravel.reverbPort,
    forceTLS: (window.Laravel.reverbScheme === "https"),
    disableStats: true,
    enabledTransports: ['ws', 'wss']
});

// Vérifier la connexion WebSocket
if (window.Echo.connector && window.Echo.connector.pusher) {
    window.Echo.connector.pusher.connection.bind('connected', function () {
        console.log('✅ Connexion WebSocket établie avec Reverb.');
        document.getElementById("status").innerText = "✅ Connecté à Reverb WebSocket.";
    });

    window.Echo.connector.pusher.connection.bind('disconnected', function () {
        console.log('❌ WebSocket déconnecté.');
        document.getElementById("status").innerText = "❌ WebSocket déconnecté.";
    });
} else {
    console.error("❌ Echo n'a pas pu initialiser Pusher !");
}

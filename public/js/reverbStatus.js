console.log("🔍 Reverb WebSocket Status Logger Chargé...");

document.addEventListener("DOMContentLoaded", function () {
    console.log("🟡 Vérification du chargement de Laravel Echo...");

    setTimeout(() => {
        // 🔎 Vérifier si Echo est déjà initialisé ailleurs
        if (typeof window.Echo !== "undefined" && typeof window.Echo.connector !== "undefined") {
            console.warn("⚠️ Laravel Echo est déjà initialisé. Ignoré pour éviter les conflits.");
            return;
        }

        if (typeof Pusher === "undefined") {
            console.error("❌ Pusher.js n'est pas chargé !");
            return;
        } else {
            console.log("✅ Pusher.js est chargé !");
        }

        // Attacher Pusher à la fenêtre globale
        window.Pusher = Pusher;

        try {
            // Initialiser Laravel Echo **seulement si ce n'est pas déjà fait**
            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: window.Laravel.reverbAppKey,
                wsHost: window.Laravel.reverbHost,
                wsPort: window.Laravel.reverbPort,
                wssPort: window.Laravel.reverbPort,
                forceTLS: window.Laravel.reverbScheme === "https",
                disableStats: true,
                enabledTransports: ['ws', 'wss']
            });

            console.log(`🌍 WebSocket Tentative de connexion : ws://${window.Laravel.reverbHost}:${window.Laravel.reverbPort}`);

            if (!window.Echo.connector || !window.Echo.connector.pusher) {
                throw new Error("Impossible d'initialiser Echo.");
            }

            // Écouter les événements WebSocket pour le suivi du statut
            window.Echo.connector.pusher.connection.bind('connecting', function () {
                console.log("⏳ WebSocket en cours de connexion...");
            });

            window.Echo.connector.pusher.connection.bind('connected', function () {
                console.log(`✅ WebSocket CONNECTÉ : ${window.Laravel.reverbHost}:${window.Laravel.reverbPort}`);
            });

            window.Echo.connector.pusher.connection.bind('disconnected', function () {
                console.log("❌ WebSocket DÉCONNECTÉ !");
            });

            window.Echo.connector.pusher.connection.bind('error', function (err) {
                console.error("⚠️ Erreur WebSocket :", err);
            });

        } catch (error) {
            console.error("❌ Erreur lors de l'initialisation de Echo :", error);
        }

    }, 500); // ⏳ Attendre 500ms pour garantir que Echo est bien chargé
});

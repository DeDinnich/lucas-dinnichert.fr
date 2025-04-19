document.addEventListener("DOMContentLoaded", function () {
    console.log("📩 Chat.js chargé et prêt à fonctionner.");

    // Attendre que Laravel Echo soit prêt
    const waitForEcho = setInterval(() => {
        if (typeof window.Echo !== "undefined" && typeof window.Echo.channel === "function") {
            console.log("✅ Laravel Echo est prêt. Activation du chat...");
            clearInterval(waitForEcho);
            initChat(); // Lancer le chat une fois Echo prêt
        } else {
            console.warn("⏳ Attente de l'initialisation de Laravel Echo...");
        }
    }, 500);
});

function initChat() {
    // Récupérer les éléments HTML
    const chatBox = document.getElementById("chat-box");
    const usernameInput = document.getElementById("username");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send-btn");

    // Vérifier si les éléments existent
    if (!chatBox || !usernameInput || !messageInput || !sendButton) {
        console.error("❌ Un ou plusieurs éléments HTML sont introuvables !");
        return;
    }

    console.log("✅ Éléments du DOM trouvés. Chat prêt à l'emploi.");

    // Écouteur d'événements pour l'envoi de message
    sendButton.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        const message = messageInput.value.trim();

        if (username === "" || message === "") {
            alert("Veuillez entrer un pseudo et un message !");
            return;
        }

        console.log(`📨 Envoi du message : ${username} - ${message}`);

        // Envoi du message via AJAX à Laravel
        fetch("/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
            },
            body: JSON.stringify({ username, message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("✅ Message envoyé avec succès !");
                messageInput.value = ""; // Effacer le champ après l'envoi
            } else {
                console.error("❌ Erreur lors de l'envoi du message :", data);
            }
        })
        .catch(error => console.error("❌ Erreur réseau :", error));
    });

    // Écouter les nouveaux messages en temps réel
    window.Echo.channel("chat")
        .listen(".message.sent", function (data) {
            console.log("📩 Nouveau message reçu :", data);

            const messageElement = document.createElement("p");
            messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        });

    console.log("👂 Écoute des messages sur le canal WebSocket 'chat' activée.");
}

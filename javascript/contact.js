// javascript/contact.js

document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const endpoint = form.action;
    const fullSubject = `${name} : ${subject}`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            _replyto: email,
            subject: fullSubject,
            message: message
        })
    });

    const status = document.getElementById("form-status");

    if (response.ok) {
        status.textContent = "✅ MESSAGE ENVOYE";
        status.className = "form-success";
        form.reset();

        // Effet de disparition après 3 secondes
        setTimeout(() => {
            status.textContent = "";
            status.className = "";
        }, 3000);
    } else {
        status.textContent = "❌ ERREUR D'ENVOI";
        status.className = "form-error";

        // Effet de disparition après 3 secondes
        setTimeout(() => {
            status.textContent = "";
            status.className = "";
        }, 3000);
    }
});



// ═══════════════════════════════════════════════════
//  CONTACT — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════

// ── EmailJS contact form ───────────────────────────────
function sendContactForm() {
  var name    = document.getElementById('contact-name').value.trim();
  var email   = document.getElementById('contact-email').value.trim();
  var subject = document.getElementById('contact-subject').value.trim();
  var message = document.getElementById('contact-message').value.trim();
  var btn     = document.getElementById('contact-btn');
  var status  = document.getElementById('contact-status');
  if (!name || !email || !subject || !message) {
    status.style.color = '#ff4444';
    status.textContent = '⚠ tous les champs sont requis.';
    return;
  }
  btn.disabled = true;
  btn.textContent = '⏳ transmission en cours...';
  status.style.color = '#00c9aa';
  status.textContent = '// envoi du signal...';
  emailjs.send('default_service', 'template_m19s8nx', {
    name: name, email: email, subject: subject, message: message, reply_to: email
  }).then(function() {
    btn.textContent = '✓ signal transmis !';
    status.style.color = '#39ff88';
    status.textContent = '// message reçu. Yohan vous répondra sous 24h. 🐟';
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-message').value = '';
    setTimeout(function() { btn.disabled = false; btn.textContent = '▹ émettre_signal()'; status.textContent = ''; }, 4000);
  }, function(error) {
    btn.disabled = false;
    btn.textContent = '▹ émettre_signal()';
    status.style.color = '#ff4444';
    status.textContent = '⚠ erreur de transmission. Réessayez ou contactez directement par email.';
  });
}

// Musique de fond sur toutes les pages sauf index.html
window.addEventListener('DOMContentLoaded', function() {
    // Vérifie qu'on n'est pas sur la page index
    if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        const audio = document.createElement('audio');
        audio.src = 'platform-shoes-8-bit-chiptune-instrumental-336417.mp3';
        audio.loop = true;
    audio.volume = 0.07;
        audio.autoplay = true;
        audio.style.display = 'none';
        document.body.appendChild(audio);
        // Pour certains navigateurs, il faut déclencher la lecture après une interaction utilisateur
        document.body.addEventListener('click', function playOnce() {
            audio.play();
            document.body.removeEventListener('click', playOnce);
        });
    }
});

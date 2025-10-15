// Gère la musique dans l'iframe persistante
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.createElement('audio');
  audio.src = '../sound/platform-shoes-8-bit-chiptune-instrumental-336417.mp3';
  audio.loop = true;
  audio.volume = 0.07;
  document.body.appendChild(audio);

  // État initial : ON si non désactivé
  if (localStorage.getItem('musicState') !== 'off') {
    audio.play().catch(() => {});
  }

  // Synchronise les changements d'état entre pages
  window.addEventListener('storage', (e) => {
    if (e.key === 'musicState') {
      if (e.newValue === 'off') {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
    }
  });
});

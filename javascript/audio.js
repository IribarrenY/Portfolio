// Gère la musique dans l'iframe persistante
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.createElement('audio');
  audio.src = '../sound/platform-shoes-8-bit-chiptune-instrumental-336417.mp3';
  audio.loop = true;
  audio.volume = 0.07;
  document.body.appendChild(audio);

  // Restore last known time if present (approximate continuity)
  const lastTime = parseFloat(localStorage.getItem('musicTime') || '0');
  if (!isNaN(lastTime) && lastTime > 0) {
    // set after metadata is loaded so duration exists
    audio.addEventListener('loadedmetadata', () => {
      if (lastTime < audio.duration) audio.currentTime = lastTime;
    });
  }

  // État initial : ON si non désactivé
  if (localStorage.getItem('musicState') !== 'off') {
    // try play; may be blocked until user interaction
    audio.play().catch(() => {});
  }

  // Sauvegarde périodique du temps courant et de l'état (pour reprise sur autres pages)
  const saveInterval = setInterval(() => {
    try {
      localStorage.setItem('musicTime', String(audio.currentTime || 0));
      localStorage.setItem('musicState', audio.paused ? 'off' : 'on');
    } catch (e) {
      // ignore quota/security errors
    }
  }, 1000);

  // Synchronise les changements d'état entre pages (toggle depuis le parent)
  window.addEventListener('storage', (e) => {
    if (e.key === 'musicState') {
      if (e.newValue === 'off') {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
    }
    if (e.key === 'musicTime') {
      // If another page updated time (rare), update our position
      const t = parseFloat(e.newValue || '0');
      if (!isNaN(t) && Math.abs((audio.currentTime || 0) - t) > 2) {
        // small threshold to avoid jitter
        audio.currentTime = t;
      }
    }
  });

  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    clearInterval(saveInterval);
    try { localStorage.setItem('musicTime', String(audio.currentTime || 0)); } catch (e) {}
  });
});

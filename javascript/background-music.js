// Bouton musique (ON/OFF) — relié à l'iframe audio
window.addEventListener('DOMContentLoaded', () => {
  // Ajoute l'iframe audio si elle n'existe pas déjà
  if (!document.getElementById('music-frame')) {
    const iframe = document.createElement('iframe');
    iframe.src = '../html/audio.html';
    iframe.id = 'music-frame';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  // Crée le bouton musique si nécessaire
  let musicToggle = document.getElementById('music-toggle');
  if (!musicToggle) {
    musicToggle = document.createElement('img');
    musicToggle.id = 'music-toggle';
    document.body.appendChild(musicToggle);
  }

  // Fonction de mise à jour du visuel du bouton
  const updateButton = (state) => {
    if (state === 'off') {
      musicToggle.src = '../img/music-off.png';
      musicToggle.classList.add('paused');
    } else {
      musicToggle.src = '../img/music-on.png';
      musicToggle.classList.remove('paused');
    }
  };

  // Charge l'état actuel
  const savedState = localStorage.getItem('musicState') || 'on';
  updateButton(savedState);

  // Gestion du clic utilisateur
  musicToggle.addEventListener('click', () => {
    const newState = (localStorage.getItem('musicState') === 'off') ? 'on' : 'off';
    localStorage.setItem('musicState', newState);
    updateButton(newState);
  });
});


// Animation fluide du curseur main sur le menu principal (vitesse et distance réduites + sélection clavier)
let menuLinks;
let animationFrames;
let offsets;
let directions;
let selectedIndex = 0;
let selectAudio;

function animateCursor(cursor, i) {
    offsets[i] += directions[i] * 0.18;
    if (offsets[i] > 4) directions[i] = -1;
    if (offsets[i] < -4) directions[i] = 1;
    cursor.style.left = (8 + offsets[i]) + 'px';
    animationFrames[i] = requestAnimationFrame(() => animateCursor(cursor, i));
}

function startCursorAnimation(link, i) {
    const cursor = link.querySelector('.menu-cursor');
    if (cursor) {
        offsets[i] = 0;
        directions[i] = 1;
        // Démarre l'animation uniquement si pas déjà en cours
        if (!animationFrames[i]) {
            animateCursor(cursor, i);
        }
    }
}
function stopCursorAnimation(link, i) {
    const cursor = link.querySelector('.menu-cursor');
    if (cursor) {
        cancelAnimationFrame(animationFrames[i]);
        animationFrames[i] = null;
        cursor.style.left = '8px';
    }
}


function updateSelection(index) {
    menuLinks.forEach((link, i) => {
        if (i === index) {
            link.classList.add('selected');
            link.focus();
            startCursorAnimation(link, i);
            // Joue le son à chaque sélection
            if (selectAudio) {
                try {
                    selectAudio.currentTime = 0;
                    selectAudio.play();
                } catch (e) {}
            }
        } else {
            link.classList.remove('selected');
            stopCursorAnimation(link, i);
        }
    });
}

// Sélectionne CV au chargement
window.addEventListener('DOMContentLoaded', () => {
    menuLinks = document.querySelectorAll('.menu-principal a');
    animationFrames = Array(menuLinks.length).fill(null);
    offsets = Array(menuLinks.length).fill(0);
    directions = Array(menuLinks.length).fill(1);
    selectAudio = new Audio('../sound/selection.mp3');
    selectAudio.volume = 0.5;
    updateSelection(0);
    document.body.style.cursor = 'none';
});

// Navigation clavier
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % menuLinks.length;
        updateSelection(selectedIndex);
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + menuLinks.length) % menuLinks.length;
        updateSelection(selectedIndex);
        e.preventDefault();
    }
});
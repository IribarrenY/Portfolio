// Menu burger pour la page CV
// Affiche/masque le menu principal sur mobile

document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger-menu');
    const nav = document.querySelector('header nav');
    burger.addEventListener('click', function() {
        nav.classList.toggle('open');
        burger.classList.toggle('active');
    });
});

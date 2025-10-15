// Smooth navigation - empêche le rechargement complet du site
window.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main') || document.body;

    // Fonction pour charger une page sans recharger tout le site
    const loadPage = (url) => {
        fetch(url)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newMain = doc.querySelector('main') || doc.body;

                // Remplace le contenu principal
                main.innerHTML = newMain.innerHTML;

                // Met à jour l'URL
                window.history.pushState({}, '', url);

                // Recharge les scripts internes si besoin
                const scripts = newMain.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    if (oldScript.src) newScript.src = oldScript.src;
                    else newScript.textContent = oldScript.textContent;
                    document.body.appendChild(newScript);
                });

                // Scroll vers le haut
                window.scrollTo(0, 0);
            })
            .catch(err => console.error('Erreur chargement page :', err));
    };

    // Intercepte les clics sur les liens internes
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;

        e.preventDefault();
        loadPage(href);
    });

    // Gère les retours / navigation via historique
    window.addEventListener('popstate', () => loadPage(location.pathname));
});

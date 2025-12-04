// Script pour l'accordéon des compétences

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.accordeon-title').forEach(function(title) {
        title.addEventListener('click', function() {
            var content = this.nextElementSibling;
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
});

// ═══════════════════════════════════════════════════
//  THEME — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════

// ── Theme init ─────────────────────────────────────────
(function() {
  var saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.remove('ocean-light');
    var icon = document.getElementById('theme-icon');
    var label = document.getElementById('theme-label');
    if (icon) icon.textContent = '☀️';
    if (label) label.textContent = 'lumineux';
  }
  // Nettoyer l'attribut temporaire du head
  document.documentElement.removeAttribute('data-theme');
})();

function toggleTheme() {
  var isLight = document.body.classList.toggle('ocean-light');
  var icon  = document.getElementById('theme-icon');
  var label = document.getElementById('theme-label');
  if (isLight) {
    icon.textContent  = '🌑';
    label.textContent = 'abyssal';
    localStorage.setItem('theme', 'light');
  } else {
    icon.textContent  = '☀️';
    label.textContent = 'lumineux';
    localStorage.setItem('theme', 'dark');
  }
}

// ═══════════════════════════════════════════════════
//  LOADER — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════

// ── Loader ─────────────────────────────────────────────
window.addEventListener('load', function() {
  setTimeout(function() {
    var loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1200);
});

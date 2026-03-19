// ═══════════════════════════════════════════════════
//  TRANSITIONS — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════

// ── Transitions de pages ───────────────────────────────
window.addEventListener('load', function() {
  var _sp = window.showPage;
  if (typeof _sp === 'function') {
    window.showPage = function(page) {
      var active = document.querySelector('.page.active');
      if (active) {
        active.classList.add('page-leaving');
        setTimeout(function() { active.classList.remove('page-leaving'); _sp(page); }, 180);
      } else { _sp(page); }
    };
  }
});

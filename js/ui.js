// ═══════════════════════════════════════════════════
//  UI — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════

// ── Back to top ────────────────────────────────────────
window.addEventListener('scroll', function() {
  var btn = document.getElementById('back-top');
  if (btn) btn.classList.toggle('visible', window.scrollY > 300);
});

// ── Copy email ─────────────────────────────────────────
function copyEmail(e) {
  e.preventDefault();
  navigator.clipboard.writeText('Iribarren.yohan@gmail.com').then(function() {
    var toast = document.getElementById('copy-toast');
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 2200);
  }).catch(function() { window.location.href = 'mailto:Iribarren.yohan@gmail.com'; });
}

// ── Visit counter ──────────────────────────────────────
(function() {
  var key = 'portfolio_visits';
  var count = parseInt(localStorage.getItem(key) || '0') + 1;
  localStorage.setItem(key, count);
  var el = document.getElementById('visit-count');
  if (!el) return;
  var target = count, current = Math.max(0, target - 8);
  var interval = setInterval(function() {
    current++;
    el.textContent = current + ' visite' + (current > 1 ? 's' : '');
    if (current >= target) clearInterval(interval);
  }, 60);
})();

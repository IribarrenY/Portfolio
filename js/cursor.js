// ═══════════════════════════════════════════════════
//  CURSOR — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════

// ── Curseur personnalisé ───────────────────────────────
(function() {
  var cur = document.getElementById('custom-cursor');
  if (!cur) return;
  var tx = 0, ty = 0;
  document.addEventListener('mousemove', function(e) { tx = e.clientX; ty = e.clientY; });
  (function animate() {
    cur.style.left = tx + 'px'; cur.style.top = ty + 'px';
    requestAnimationFrame(animate);
  })();
  document.addEventListener('mouseover', function(e) {
    var t = e.target.closest('a,button,[onclick],.card-clickable,.card,.bloupi-sug,.acc-item,.nav-tabs li');
    document.body.classList.toggle('cursor-pointer', !!t);
  });
  document.addEventListener('mouseout', function() { document.body.classList.remove('cursor-pointer'); });
  document.addEventListener('mousedown', function() {
    var d = document.getElementById('cursor-dot');
    if (d) d.style.transform = 'translate(-50%,-50%) scale(0.6)';
  });
  document.addEventListener('mouseup', function() {
    var d = document.getElementById('cursor-dot');
    if (d) d.style.transform = 'translate(-50%,-50%) scale(1)';
  });
})();

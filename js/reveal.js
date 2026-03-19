// ═══════════════════════════════════════════════════
//  REVEAL — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════

// ── Scroll Reveal ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  // Sur mobile : pas d'animation sur .cvi (trop nombreux, lag)
  var isMobile = window.innerWidth <= 600;
  var selector = isMobile ? '.card, .cvb, .acc-item, .clink' : '.card, .cvb, .cvi, .acc-item, .clink';
  document.querySelectorAll(selector).forEach(function(el, i) {
    el.classList.add('reveal');
    var d = i % 4; if (d > 0) el.classList.add('reveal-delay-' + d);
    observer.observe(el);
  });
});

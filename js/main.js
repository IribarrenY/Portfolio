// ─── ROUTING ──────────────────────────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page, #home').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tabs a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const nav = document.getElementById('nav-' + id);
  if (nav) nav.classList.add('active');
  document.getElementById('sb-page').textContent = '[ ' + id + ' ]';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── HORLOGE ──────────────────────────────────────────────────────────────────
function tick() {
  const n = new Date();
  document.getElementById('sb-time').textContent =
    String(n.getHours()).padStart(2, '0') + ':' +
    String(n.getMinutes()).padStart(2, '0') + ':' +
    String(n.getSeconds()).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

// ─── INIT ─────────────────────────────────────────────────────────────────────
showPage('home');

// ═══════════════════════════════════════════════════
//  DEMO — Portfolio Yohan IRIBARREN
// ═══════════════════════════════════════════════════

// ── Terminal demo auto ─────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem('terminal-demo-done')) return;
  sessionStorage.setItem('terminal-demo-done', '1');
  var demo = [
    { delay: 2200, cmd: 'whoami' },
    { delay: 4400, cmd: 'ls' },
    { delay: 6600, cmd: 'cat skills.txt' },
    { delay: 9800, cmd: 'neofetch' },
  ];
  function typeCmd(cmd) {
    var input = document.getElementById('term-input');
    if (!input) return;
    input.focus(); input.value = '';
    var i = 0;
    var interval = setInterval(function() {
      if (i < cmd.length) { input.value += cmd[i++]; } else {
        clearInterval(interval);
        setTimeout(function() {
          if (typeof runCommand === 'function') { var v = input.value; input.value = ''; runCommand(v); }
        }, 320);
      }
    }, 65);
  }
  demo.forEach(function(s) { setTimeout(function() { typeCmd(s.cmd); }, s.delay); });
});

// ─── INTERACTIVE TERMINAL ────────────────────────────────────────────────────
const termOutput = document.getElementById('term-output');
const termInput  = document.getElementById('term-input');
let cmdHistory = [], histIdx = -1;

const FILES = {
  'about.json':
    '<span class="ts">{</span>\n' +
    '  <span class="tk">"nom"</span>: <span class="ts">"Yohan Iribarren"</span>,\n' +
    '  <span class="tk">"formation"</span>: <span class="ts">"BTS SIO SLAM"</span>,\n' +
    '  <span class="tk">"annees"</span>: <span class="ts">"2023-2025"</span>,\n' +
    '  <span class="tk">"stack"</span>: [<span class="ts">"PHP"</span>,<span class="ts">"JS"</span>,<span class="ts">"SQL"</span>,<span class="ts">"Python"</span>],\n' +
    '  <span class="tk">"profondeur"</span>: <span class="ts">"404m"</span>,\n' +
    '  <span class="tk">"status"</span>: <span class="ts">"open_to_work"</span>\n' +
    '<span class="ts">}</span>',

  'skills.txt':
    'HTML/CSS   <span class="t-ok">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░</span> 90m\n' +
    'JavaScript <span class="t-ok">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░</span> 75m\n' +
    'PHP        <span class="t-ok">▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░</span> 70m\n' +
    'Python     <span class="t-ok">▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░</span> 65m\n' +
    'SQL/MySQL  <span class="t-ok">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░</span> 80m\n' +
    'Git        <span class="t-ok">▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░</span> 72m',

  'contact.txt':
    '<span class="ts">sonar  :</span> yohan.iribarren@email.com\n' +
    '<span class="ts">pieuvre:</span> github.com/iribarreny\n' +
    '<span class="ts">surface:</span> linkedin.com/in/yohan-iribarren',

  'fish.txt':
    '    <span class="t-info">><(((°></span>  poisson standard\n' +
    '  <span class="t-ok">><((((°></span>    gros poisson\n' +
    '<span class="ts">><(°> ><(°></span>   banc de poissons\n' +
    '   <span class="t-amber">🐡</span>         poisson-lune\n' +
    '   <span class="t-ok">🐠</span>         poisson clown\n' +
    '   <span class="ts">🐟</span>         poisson bleu\n' +
    '   <span class="t-err">🦈</span>         requin (boss final)',

  'readme.md':
    '<span class="t-info"># DEEPSEA Portfolio v2.0</span>\n' +
    '<span class="t-dim">Yohan Iribarren — BTS SIO SLAM 2023/2025</span>\n\n' +
    '<span class="ts">Navigation sonar disponible.</span>\n' +
    '<span class="t-dim">Tape help pour les commandes.</span>'
};

const CMDS = {
  help: () =>
    '<span class="t-info">╔════════════════════════════════════╗\n' +
    '║    SONAR_TERMINAL — AIDE RAPIDE    ║\n' +
    '╚════════════════════════════════════╝</span>\n' +
    '  <span class="ts">whoami</span>          identité du plongeur\n' +
    '  <span class="ts">ls</span>              scanner les fichiers\n' +
    '  <span class="ts">cat &lt;fichier&gt;</span>   lire un fichier\n' +
    '  <span class="ts">pwd</span>             position actuelle\n' +
    '  <span class="ts">date</span>            horloge du bord\n' +
    '  <span class="ts">depth</span>           sondage de profondeur\n' +
    '  <span class="ts">sonar</span>           pulse sonar\n' +
    '  <span class="ts">fish</span>            inventaire faune marine\n' +
    '  <span class="ts">echo &lt;msg&gt;</span>     émettre un signal\n' +
    '  <span class="ts">clear</span>           purger les logs\n' +
    '  <span class="ts">cd &lt;page&gt;</span>      naviguer (cv, stages...)\n' +
    '  <span class="ts">sudo</span>            accès restreint...\n' +
    '  <span class="ts">neofetch</span>        rapport système\n' +
    '  <span class="ts">morse &lt;texte&gt;</span>  encoder en morse',

  whoami: () =>
    '<span class="ts">Yohan Iribarren</span>\n' +
    '<span class="t-dim">Ancien aide-soignant reconverti en développeur — BTS SIO SLAM, Lycée Saint-John Perse, Pau.</span>\n' +
    '<span class="t-info">Profondeur actuelle: 404m | Status: open_to_work | Permis B ✓</span>',

  ls: () =>
    '<span class="t-info">total 5 objets repérés au sonar</span>\n' +
    '<span class="ts">about.json</span>  <span class="ts">skills.txt</span>  <span class="ts">contact.txt</span>  <span class="ts">fish.txt</span>  <span class="ts">readme.md</span>',

  pwd: () => '<span class="t-ok">/ocean/deep/portfolio/home</span>',

  date: () => {
    const d = new Date();
    return '<span class="t-ok">⚓ ' + d.toLocaleDateString('fr-FR',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) + ' — ' + d.toLocaleTimeString('fr-FR') + '</span>';
  },

  depth: () => {
    const depths = ['12m — zone littorale', '48m — zone nerétique', '120m — zone méso-pélagique', '404m — PROFONDEUR INTROUVABLE', '800m — zone bathypélagique', '3800m — zone abyssale'];
    return '<span class="t-info">SONDAGE EN COURS...</span>\n🌊 ' + depths[Math.floor(Math.random()*depths.length)];
  },

  sonar: () => {
    const frames = ['◎', '◉', '●', '◉', '◎'];
    return '<span class="t-info">PING... </span><span class="t-ok">ECHO REÇU ✓</span>\n<span class="t-dim">Aucun sous-marin ennemi détecté. Portfolio sécurisé.</span>';
  },

  fish: () =>
    '<span class="t-info">── INVENTAIRE FAUNE MARINE ──</span>\n' +
    '<span class="ts">><(((°></span>  Poissoncode (domestiqué)\n' +
    '<span class="t-ok">🐠</span>          Nemo.js (composant React)\n' +
    '<span class="t-amber">🐡</span>          Fugu SQL (dangereux si mal géré)\n' +
    '<span class="t-err">🦈</span>          Bug Requin (ennemi principal)\n' +
    '<span class="ts">🐙</span>          Git-pieuvre (8 branches)\n' +
    '<span class="t-info">🐋</span>          Docker-baleine (conteneur)',

  clear: () => { termOutput.innerHTML = ''; return null; },

  sudo: () =>
    '<span class="t-err">[sudo] mot de passe pour yohan:</span>\n' +
    '<span class="t-err">ACCÈS REFUSÉ — Zone classifiée.</span>\n' +
    '<span class="t-dim">Les fonds abyssaux ne révèlent pas leurs secrets.</span>',

  neofetch: () =>
    '\n<span class="ts">  ~~~  ~~  ~~~~</span>   <span class="t-ok">yohan</span><span class="t-dim">@</span><span class="t-ok">deepsea</span>\n' +
    '<span class="ts"> ~~ ><(((°> ~~~</span>   ──────────────────────\n' +
    '<span class="ts">  ~~~  ~~  ~~~~</span>   <span class="t-info">OS     :</span> DeepSeaOS 2.0\n' +
    '                  <span class="t-info">Host   :</span> BTS SIO SLAM — Saint-John Perse, Pau\n' +
    '                  <span class="t-info">Shell  :</span> sonar-bash 5.1\n' +
    '                  <span class="t-info">Depth  :</span> 404m\n' +
    '                  <span class="t-info">CPU    :</span> Cerveau x1 (ancien soignant, caféiné)\n' +
    '                  <span class="t-info">Stack  :</span> PHP · Python · SQL · HTML/CSS · Git\n' +
    '                  <span class="t-info">Stages :</span> Domolandes (2025) · 29Studio (2026)\n' +
    '                  <span class="t-info">Sonar  :</span> actif ◎\n' +
    '                  <span class="t-info">Faune  :</span> 🐟🐠🐡🦈🐙\n' +
    '                  <span class="t-info">Status :</span> <span class="t-ok">open_to_work ✓</span>',

  morse: (args) => {
    if(!args || !args.length) return '<span class="t-err">usage: morse &lt;texte&gt;</span>';
    const map = {A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.'};
    const text = args.join(' ').toUpperCase();
    const encoded = text.split('').map(c=>map[c]||c===' '?'/':'?').join(' ');
    return '<span class="t-info">TRANSMISSION MORSE:</span>\n<span class="ts">' + encoded + '</span>';
  }
};

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function addLine(html) {
  const d = document.createElement('div');
  d.className = 'tl to';
  html.split('\n').forEach((line, i) => {
    if(i>0) d.appendChild(document.createElement('br'));
    const sp = document.createElement('span');
    sp.innerHTML = line;
    d.appendChild(sp);
  });
  termOutput.appendChild(d);
  termOutput.scrollTop = termOutput.scrollHeight;
}

function addPromptLine(cmd) {
  const d = document.createElement('div'); d.className = 'tl';
  d.innerHTML = '<span class="tp">yohan@deepsea</span>:<span class="tc">~$</span> <span style="color:var(--cyan)">' + esc(cmd) + '</span>';
  termOutput.appendChild(d);
}

function runCommand(raw) {
  const t = raw.trim(); if(!t) return;
  addPromptLine(t);
  cmdHistory.unshift(t); if(cmdHistory.length>60) cmdHistory.pop(); histIdx=-1;
  const parts=t.split(/\s+/), cmd=parts[0].toLowerCase(), args=parts.slice(1);

  if(cmd==='cat') {
    const f=args[0];
    if(!f) { addLine('<span class="t-err">cat: fichier manquant</span>'); return; }
    if(FILES[f]) addLine(FILES[f]);
    else addLine('<span class="t-err">cat: ' + esc(f) + ': Aucun objet à cette profondeur</span>');
    return;
  }
  if(cmd==='echo') { addLine(esc(args.join(' '))||''); return; }
  if(cmd==='cd') {
    const map={cv:'cv',stages:'stages',ateliers:'ateliers',veille:'veille',skills:'competences',competences:'competences',contact:'contact',home:'home','~':'home'};
    const tg=args[0]||'~';
    if(map[tg]){ addLine('<span class="t-ok">▹ cap sur /'+tg+'</span>'); setTimeout(()=>showPage(map[tg]),350); }
    else addLine('<span class="t-err">navigation impossible: '+esc(tg)+'</span>\n<span class="t-dim">zones: cv stages ateliers veille skills contact home</span>');
    return;
  }
  if(CMDS[cmd]) { const r=CMDS[cmd](args); if(r!==null&&r!==undefined) addLine(r); return; }
  addLine('<span class="t-err">commande inconnue: '+esc(cmd)+'</span>\n<span class="t-dim">Le sonar ne capte pas ce signal. Tape <span class="ts">help</span>.</span>');
}

function focusTermInput() { termInput.focus(); }

termInput.addEventListener('keydown', e => {
  if(e.key==='Enter')      { const v=termInput.value; termInput.value=''; runCommand(v); }
  else if(e.key==='ArrowUp')   { e.preventDefault(); if(histIdx<cmdHistory.length-1){histIdx++;termInput.value=cmdHistory[histIdx];} }
  else if(e.key==='ArrowDown') { e.preventDefault(); if(histIdx>0){histIdx--;termInput.value=cmdHistory[histIdx];}else{histIdx=-1;termInput.value='';} }
  else if(e.key==='Tab')       { e.preventDefault(); const v=termInput.value.trim(); const all=[...Object.keys(CMDS),'cat','echo','cd',...Object.keys(FILES)]; const m=all.find(c=>c.startsWith(v)&&c!==v); if(m) termInput.value=m; }
  else if(e.ctrlKey&&e.key==='l') { e.preventDefault(); termOutput.innerHTML=''; }
});

// Boot
(function boot(){
  const seq=[
    {t:0,   h:'<span class="t-dim">DEEPSEA TERMINAL v2.0 — initialisation...</span>'},
    {t:300, h:'<span class="t-dim">[ <span class="t-ok"> OK </span> ] Sonar actif ◎</span>'},
    {t:550, h:'<span class="t-dim">[ <span class="t-ok"> OK </span> ] Détection faune marine...</span>'},
    {t:800, h:'<span class="t-dim">[ <span class="t-ok"> OK </span> ] Portfolio chargé 🐟</span>'},
    {t:1050,h:'<span class="t-dim">──────────────────────────────────────</span>'},
    {t:1250,h:'Signal établi. Tape <span class="t-ok">help</span> pour les commandes.'},
  ];
  seq.forEach(({t,h})=>setTimeout(()=>addLine(h),t));
  setTimeout(()=>termInput.focus(),1400);
})();


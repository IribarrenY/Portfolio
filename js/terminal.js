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
    '<span style="color:var(--cyan-dim);letter-spacing:.08em">// STACK DEPTH CHART ─────────────────</span>\n' +
    '<span style="color:#00c9aa">HTML/CSS</span>   <span style="color:#00e5ff">[</span><span style="color:#39ff88">██████████████████</span><span style="color:#0e4060">██</span><span style="color:#00e5ff">]</span> <span style="color:#39ff88;font-size:.82em">90m ●●●●●</span>' + '\n' +
    '<span style="color:#00c9aa">JavaScript</span> <span style="color:#00e5ff">[</span><span style="color:#39ff88">███████████████</span><span style="color:#0e4060">█████</span><span style="color:#00e5ff">]</span> <span style="color:#39ff88;font-size:.82em">75m ●●●●○</span>' + '\n' +
    '<span style="color:#00c9aa">PHP</span>        <span style="color:#00e5ff">[</span><span style="color:#39ff88">██████████████</span><span style="color:#0e4060">██████</span><span style="color:#00e5ff">]</span> <span style="color:#39ff88;font-size:.82em">70m ●●●●○</span>' + '\n' +
    '<span style="color:#00c9aa">Python</span>     <span style="color:#00e5ff">[</span><span style="color:#39ff88">█████████████</span><span style="color:#0e4060">███████</span><span style="color:#00e5ff">]</span> <span style="color:#39ff88;font-size:.82em">65m ●●●○○</span>' + '\n' +
    '<span style="color:#00c9aa">SQL/MySQL</span>  <span style="color:#00e5ff">[</span><span style="color:#39ff88">████████████████</span><span style="color:#0e4060">████</span><span style="color:#00e5ff">]</span> <span style="color:#39ff88;font-size:.82em">80m ●●●●○</span>' + '\n' +
    '<span style="color:#00c9aa">Git</span>        <span style="color:#00e5ff">[</span><span style="color:#39ff88">██████████████</span><span style="color:#0e4060">██████</span><span style="color:#00e5ff">]</span> <span style="color:#39ff88;font-size:.82em">72m ●●●●○</span>',

  'contact.txt':
    '<span class="ts">sonar  :</span> Iribarren.yohan@gmail.com\n' +
    '<span class="ts">pieuvre:</span> github.com/iribarreny\n' +
    '<span class="ts">surface:</span> linkedin.com/in/yohan-iribarren-99b6b5342',

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
    '<span class="t-dim">Yohan Iribarren — BTS SIO SLAM 2024/2026 → CESI ing. 2026/2029</span>\n\n' +
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
    '  <span class="ts">morse &lt;texte&gt;</span>  encoder en morse\n' +
    '  <span class="t-dim">── navigation ──────────────────────</span>\n' +
    '  <span class="ts">cv [download]</span>   voir CV / télécharger PDF\n' +
    '  <span class="ts">contact</span>         coordonnées + section contact\n' +
    '  <span class="ts">github</span>          ouvrir github.com/iribarreny\n' +
    '  <span class="ts">linkedin</span>        ouvrir le profil LinkedIn\n' +
    '  <span class="t-dim">── secrets ─────────────────────────</span>\n' +
    '  <span class="ts">bloupi</span>          invoquer l\'assistant 🐟\n' +
    '  <span class="ts">poisson</span>         inventaire faune marine',

  whoami: () =>
    '<span class="ts">Yohan Iribarren</span>\n' +
    '<span class="t-dim">Ancien aide-soignant reconverti en développeur — BTS SIO SLAM 2024/2026.</span>\n' +
    '<span class="t-dim">Job d\'été Python chez TotalEnergies · Stage 29Studio Paris · Stage Domolandes.</span>\n' +
    '<span class="t-dim">Admis CESI École d\'ingénieurs — recherche alternance 2026/2029.</span>\n' +
    '<span class="t-info">Status: alternance_CESI_2026 | Anglais B2 | Permis B ✓</span>\n' +
    '<span class="t-dim">Passions: Histoire&Légendes · Jeux-vidéos</span>',

  ls: () =>
    '<span class="t-info">total 6 objets repérés au sonar</span>\n' +
    '<span class="ts">about.json</span>  <span class="ts">skills.txt</span>  <span class="ts">contact.txt</span>  <span class="ts">fish.txt</span>  <span class="ts">readme.md</span>  <span class="t-amber">cv.pdf</span>',

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

  fish: () => FILES['fish.txt'],

  clear: () => { termOutput.innerHTML = ''; return null; },

  sudo: (args) => {
    if (args && args.join(' ').replace(/\s/g,'') === 'rm-rf/') {
      return '<span class="t-err">⚠ ATTENTION — DESTRUCTION TOTALE EN COURS...</span>\n' +
        '<span class="t-dim">Suppression des fichiers système</span>\n' +
        '<span class="t-dim">Effacement des commits GitHub...</span>\n' +
        '<span class="t-dim">Suppression des cafés non consommés...</span>\n' +
        '<span class="t-dim">Dissolution du portfolio...</span>\n' +
        '<span class="t-amber">... just kidding 🐟</span>\n' +
        '<span class="t-ok">Tout va bien. Bloupi veille sur les abysses.</span>';
    }
    return '<span class="t-err">[sudo] mot de passe pour yohan:</span>\n' +
      '<span class="t-err">ACCÈS REFUSÉ — Zone classifiée.</span>\n' +
      '<span class="t-dim">Les fonds abyssaux ne révèlent pas leurs secrets.</span>';
  },

  neofetch: () =>
    '\n<span class="ts">  ~~~  ~~  ~~~~</span>   <span class="t-ok">yohan</span><span class="t-dim">@</span><span class="t-ok">deepsea</span>\n' +
    '<span class="ts"> ~~ ><(((°> ~~~</span>   ──────────────────────\n' +
    '<span class="ts">  ~~~  ~~  ~~~~</span>   <span class="t-info">OS     :</span> DeepSeaOS 2.0\n' +
    '                  <span class="t-info">Host   :</span> BTS SIO SLAM \u2192 CESI \u00c9cole d\'ing\u00e9nieurs\n' +
    '                  <span class="t-info">Shell  :</span> sonar-bash 5.1\n' +
    '                  <span class="t-info">Promo  :</span> 2024/2026 → CESI 2026/2029\n' +
    '                  <span class="t-info">Depth  :</span> 404m\n' +
    '                  <span class="t-info">CPU    :</span> Cerveau x1 (ancien soignant, caféiné)\n' +
    '                  <span class="t-info">Stack  :</span> PHP · Python · SQL · HTML/CSS · Git\n' +
    '                  <span class="t-info">Stages :</span> Domolandes (2025) · 29Studio (2026)\n' +
    '                  <span class="t-info">Emploi :</span> TotalEnergies (2025) — Job d\'été Python\n' +
    '                  <span class="t-info">Certif :</span> SecNumAcadémie ANSSI 2025\n' +
    '                  <span class="t-info">Langues:</span> Anglais B2 · Espagnol A2\n' +
    '                  <span class="t-info">Sonar  :</span> actif ◎\n' +
    '                  <span class="t-info">Faune  :</span> 🐟🐠🐡🦈🐙\n' +
    '                  <span class="t-info">Status :</span> <span class="t-ok">alternance_CESI_2026 ✓</span>',


  bloupi: () =>
    '<span class="t-info">BLOUPI v1.0 — poisson assistant</span>\n' +
    '<span class="ts">  ><((((°>  </span> Bloup bloup ! Je suis Bloupi,\n' +
    '<span class="ts">            </span> le gardien des abysses du portfolio.\n' +
    '<span class="t-dim">  [ STATS ]</span>\n' +
    '<span class="ts">  Espèce  :</span> <span class="t-ok">Cyprinidé numérique</span>\n' +
    '<span class="ts">  Habitat :</span> <span class="t-ok">Portfolio de Yohan, -404m</span>\n' +
    '<span class="ts">  Régime  :</span> <span class="t-ok">Bugs, commits et café</span>\n' +
    '<span class="ts">  Pouvoir :</span> <span class="t-ok">Ouvrir les projets au clic</span>\n' +
    '<span class="t-amber">  "Bloup bloup — le code, c\'est de l\'eau !"</span>',

  poisson: () =>
    '<span class="t-info">INVENTAIRE — FAUNE DU PORTFOLIO</span>\n' +
    '<span class="ts">  Bloupi       </span> — assistant IA, niveau 99\n' +
    '<span class="ts">  Nemo.js      </span> — composant React perdu\n' +
    '<span class="ts">  Fugu.SQL     </span> — dangereux si mal géré\n' +
    '<span class="ts">  Bug-Requin   </span> — ennemi juré du dev\n' +
    '<span class="ts">  Git-Pieuvre  </span> — 8 branches en cours\n' +
    '<span class="t-info">  Docker-Baleine</span> — conteneur XXL\n' +
    '<span class="t-dim">  Tape <span class="ts">bloupi</span> pour invoquer l\'assistant !</span>',




  cv: (args) => {
    if (args && args[0] === 'dl' || args && args[0] === 'download') {
      setTimeout(() => {
        var a = document.createElement('a');
        a.href = 'pdf/CV_Iribarren.pdf';
        a.download = 'CV_Iribarren.pdf';
        a.click();
      }, 200);
      return '<span class="t-ok">Telechargement du CV en cours...</span>\n<span class="t-dim">CV_Iribarren.pdf</span>';
    }
    setTimeout(() => { if(typeof showPage === 'function') showPage('cv'); }, 400);
    return '<span class="t-ok">Navigation vers le CV...</span>\n<span class="t-dim">Astuce : tape <span class="ts">cv download</span> pour telecharger le PDF</span>';
  },

  contact: () => {
    setTimeout(() => { if(typeof showPage === 'function') showPage('contact'); }, 400);
    return '<span class="t-info">// COORDONNEES</span>\n' +
      '<span class="ts">sonar  :</span> Iribarren.yohan@gmail.com\n' +
      '<span class="ts">tel    :</span> 06 75 26 72 52\n' +
      '<span class="ts">github :</span> github.com/iribarreny\n' +
      '<span class="ts">linkedin:</span> linkedin.com/in/yohan-iribarren-99b6b5342\n' +
      '<span class="t-ok">Navigation vers Contact...</span>';
  },


  github: () => {
    setTimeout(() => window.open('https://github.com/iribarreny', '_blank'), 300);
    return '<span class="t-ok">Ouverture du GitHub...</span>\n<span class="t-dim">github.com/iribarreny</span>';
  },

  linkedin: () => {
    setTimeout(() => window.open('https://www.linkedin.com/in/yohan-iribarren-99b6b5342', '_blank'), 300);
    return '<span class="t-ok">Ouverture du profil LinkedIn...</span>\n<span class="t-dim">linkedin.com/in/yohan-iribarren-99b6b5342</span>';
  },

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
    if(f==='cv.pdf') {
      addLine('<span class="t-ok">Ouverture de cv.pdf...</span>\n<span class="t-dim">Téléchargement de CV_Iribarren.pdf</span>');
      setTimeout(()=>{ var a=document.createElement('a'); a.href='pdf/CV_Iribarren.pdf'; a.download='CV_Iribarren.pdf'; a.click(); }, 300);
      return;
    }
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
  else if(e.key==='Tab')       { e.preventDefault(); const v=termInput.value.trim(); const all=[...Object.keys(CMDS),'cat','echo','cd',...Object.keys(FILES),'bloupi','poisson','linkedin','contact','cv','github']; const m=all.find(c=>c.startsWith(v)&&c!==v); if(m) termInput.value=m; }
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


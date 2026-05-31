// ═══════════════════════════════════════════════════════
//  BLOUPI LE POISSON — Assistant portfolio de Yohan Iribarren
//  Moteur local intelligent — thème océan abyssal
// ═══════════════════════════════════════════════════════

(function () {

  // ── Helpers navigation & modals ──────────────────────
  function goPage(page) {
    if (typeof showPage === 'function') showPage(page);
  }
  function goModal(id) {
    // Naviguer vers la bonne section d'abord, puis ouvrir le modal
    if (id === 'studio29' || id === 'domolandes') goPage('stages');
    else goPage('ateliers');
    setTimeout(function() {
      if (typeof openModal === 'function') openModal(id);
    }, 300);
  }

  // ── Base de connaissances ────────────────────────────────
  const INTENTS = [
    {
      p: ['bonjour','bonsoir','salut','hello','coucou','hi','hey','bonne journée'],
      r: () => `Bloup ! 🐟 Bienvenue dans les abysses du portfolio de Yohan ! Je peux vous parler de ses projets, compétences, expériences ou vous guider dans les sections. Qu'est-ce qui vous intéresse ?`
    },
    {
      p: ['qui est','qui es','présente','présentation','profil','yohan','iribarren','parle de toi','parle de lui','c est qui','étudiant','reconver','aide-soignant','soignant','parcours'],
      r: () => `Yohan Iribarren est étudiant en **BTS SIO SLAM** au lycée Saint-John Perse de Pau (2024-2026). 🌊\n\nAncien aide-soignant pendant 4 ans, il s'est reconverti dans le développement web. Comme il le dit lui-même : *"j'ai juste changé de bloc opératoire"* 🐠\n\nIl est passionné par le code propre, l'architecture MVC et les stacks PHP / Python. [NAV:home]`
    },
    {
      p: ['cv','curriculum','vitae','formation','bts','slam','sio','lycée','bac','sapat','diplôme','diplome'],
      r: () => `Cap sur le CV ! [NAV:cv]\n\n**Formation :**\n- BTS SIO SLAM — Lycée Saint-John Perse, Pau (2024-2026)\n- Diplôme Aide-Soignant — IFSI Bayonne (2020)\n- Bac SAPAT — Lycée Frantsesenia, Saint-Jean-Pied-de-Port (2016)`
    },
    {
      p: ['compétence','competence','technologie','langage','stack','tech','outil','maîtrise','sait faire','php','python','javascript','sql','html','css','git','mysql','java'],
      r: () => `Plongée dans ses compétences ! [NAV:competences]\n\n**Programmation :** PHP, Python, JavaScript, Java (POO)\n**Web :** HTML, CSS, architecture MVC\n**Bases de données :** SQL, MySQL, Merise, UML, NoSQL\n**Gestion de projet :** Git, GitHub, Gantt, Kanban\n**Cybersécurité :** RGPD, injections SQL, gestion des accès
**Certification :** SecNumAcadémie ANSSI 2025 🏅
**Langues :** Anglais B2, Espagnol A2`
    },
    {
      p: ['expérience','experience','travail','emploi','poste','job','professionnel'],
      r: () => `Yohan a 4 expériences professionnelles ! 🌊\n\n**1. Stage — 29Studio** (Janv.-Fév. 2026, Paris)\n**2. Dev Python — TotalEnergies** (Juil. 2025, Pau)\n**3. Stage — Domolandes** (Juin 2025)\n**4. Aide-Soignant** (2020-2024)\n\nDites-moi lequel vous intéresse pour l'ouvrir directement ! [NAV:cv]`
    },
    // ── STAGE 29STUDIO ──
    {
      p: ['29studio','29 studio','studio 29','studio','paris','facture','tournée','tournee','phpunit','tnr','dao','sécuris','securis','agence photo','luxe'],
      r: () => { setTimeout(() => goModal('studio29'), 80); return `J'ouvre le stage **29Studio** ! 📸 [MODAL:studio29]\n\nJanvier–Février 2026 à Paris — site de gestion PHP MVC/DAO, sécurisation, TNR.`; }
    },
    // ── STAGE DOMOLANDES ──
    {
      p: ['domolandes','domo','maremne','audit','inpi','ecofloc','markdown'],
      r: () => { setTimeout(() => goModal('domolandes'), 80); return `J'ouvre le stage **Domolandes** ! 🏗️ [MODAL:domolandes]\n\nJuin 2025 à Saint-Geours-de-Maremne — audit, identité visuelle, documentation EcoFloc.`; }
    },
    // ── PROJET CANIS PRO ──
    {
      p: ['canis','canisp','canispro','chien','éducation canine','education canine','symfony','twig','doctrine','e6','épreuve','epreuve'],
      r: () => { setTimeout(() => goModal('canispro'), 80); return `J'ouvre le **Projet Canis Pro** ! 🐕 [MODAL:canispro]\n\nÉpreuve E6 BTS SIO SLAM 2ème année — application de gestion d'un centre d'éducation canine avec Symfony, MVC/DAO, gestion des rôles.`; }
    },
    // ── JOURNÉE D'INTÉGRATION ──
    {
      p: ['journée intégration','journee integration','journée d intégration','intégration','developpeur','developer','gestiondeveloppeurs','apropos','a propos','ticket'],
      r: () => { setTimeout(() => goModal('journeeintegration'), 80); return `J'ouvre la **Journée d'intégration** ! 🤝 [MODAL:journeeintegration]\n\nAtelier pro — prise en main d'un projet existant, MVC/DAO, GitHub et gestion de tickets.`; }
    },
    // ── PROJET FA ──
    {
      p: ['fâ','fa','archéologique','archeologique','barzan','billetterie','charente','parc','agile','scrum','étoile de mer'],
      r: () => { setTimeout(() => goModal('sitefa'), 80); return `J'ouvre le **Projet Site Fâ** ! 🎡 [MODAL:sitefa]\n\nBilletterie PHP MVC pour le parc archéologique du Fâ — méthode Agile, espace admin & client.`; }
    },
    // ── PROJET NETCAR ──
    {
      p: ['netcar','net car'],
      r: () => { setTimeout(() => goModal('netcar'), 80); return `J'ouvre le **Projet Netcar** ! 🚘 [MODAL:netcar]\n\nArchitecture MVC, SQL, Git — projet de 1ère année semestre 2.`; }
    },
    // ── PROJET PIC DU MIDI ──
    {
      p: ['pic du midi','picdumidi','pic midi','wordpress','cms','gantt','boutique'],
      r: () => { setTimeout(() => goModal('picdumidi'), 80); return `J'ouvre le **Site Boutique Pic du Midi** ! 🏔️ [MODAL:picdumidi]\n\nSite WordPress avec gestion de projet Gantt — 1ère année semestre 2.`; }
    },
    // ── PROJET LOCABOARD ──
    {
      p: ['locaboard','loca board','location','skateboard'],
      r: () => { setTimeout(() => goModal('locaboard'), 80); return `J'ouvre le **Projet Locaboard** ! 🚗 [MODAL:locaboard]\n\nSite dynamique de location — PHP, HTML, CSS — 1ère année semestre 1.`; }
    },
    // ── PROJET CV WEB ──
    {
      p: ['cv web','cv perso','site personnel','cv html','cv-perso'],
      r: () => { setTimeout(() => goModal('cv-perso'), 80); return `J'ouvre le **Site Web personnel (CV)** ! 🌐 [MODAL:cv-perso]\n\nPremier projet web — HTML, CSS, JavaScript — 1ère année semestre 1.`; }
    },
    // ── TOUS LES PROJETS ──
    {
      p: ['projet','atelier','réalisation','realisation','travaux','scolaire','ateliers'],
      r: () => `Voici ses projets scolaires ! [NAV:ateliers]\n\nCliquez sur l'un d'eux pour l'ouvrir :\n- 🐕 **Canis Pro** — Symfony, MVC/DAO, épreuve E6\n- 🤝 **Journée intégration** — MVC/DAO, GitHub, tickets
- 🎡 **Projet Fâ** — billetterie PHP MVC, Agile\n- 🚘 **Netcar** — MVC, SQL, Git\n- 🏔️ **Pic du Midi** — WordPress, Gantt\n- 🚗 **Locaboard** — location dynamique PHP\n- 🌐 **CV Web** — HTML, CSS, JS`
    },
    // ── TOUS LES STAGES ──
    {
      p: ['stage','stages','entreprise','mission'],
      r: () => `Yohan a effectué 2 stages ! [NAV:stages]\n\nLequel voulez-vous voir ?\n- 📸 **29Studio** — Paris, Jan–Fév 2026\n- 🏗️ **Domolandes** — Maremne, Juin 2025`
    },
    {
      p: ['totalenergies','total','energies','jean féger','jean feger','test unitaire','python'],
      r: () => `En **juillet 2025**, Yohan a travaillé chez **TotalEnergies** à Pau. [NAV:cv]\n\nAu Centre Scientifique Jean Féger — tests unitaires et scripts Python.`
    },
    {
      p: ['github','git hub','code source','depot','dépôt'],
      r: () => { setTimeout(() => window.open('https://github.com/iribarreny', '_blank'), 150); return `J'ouvre le GitHub de Yohan ! 🐙\n\n**github.com/iribarreny**`; }
    },
    {
      p: ['linkedin','linked in','réseau','network','profil'],
      r: () => { setTimeout(() => window.open('https://www.linkedin.com/in/yohan-iribarren-99b6b5342', '_blank'), 150); return `J'ouvre le profil LinkedIn de Yohan ! 🔱\n\n**linkedin.com/in/yohan-iribarren**`; }
    },
    {
      p: ['secnum','secnumacademie','anssi','certification','certif','cybersécurité','cyber','sécurité'],
      r: () => `Yohan a obtenu la certification **SecNumAcadémie** de l'ANSSI en 2025 ! 🏅 [NAV:cv]\n\nFormation nationale en cybersécurité couvrant :\n- Fondamentaux de la sécurité\n- Cryptographie\n- Sécurité des réseaux\n- Gestion des incidents\n\nDélivrée par l'**Agence Nationale de la Sécurité des Systèmes d'Information**.`
    },
    {
      p: ['langue','langues','anglais','espagnol','english','b2','a2','bilingue'],
      r: () => `Yohan parle plusieurs langues ! 🌐 [NAV:cv]\n\n- 🇬🇧 **Anglais** — niveau B2 (courant) : documentation technique, communication pro\n- 🇪🇸 **Espagnol** — niveau A2 (intermédiaire)\n- 🇫🇷 **Français** — langue maternelle`
    },
    {
      p: ['veille','technologique','hôpital','hopital','médical','medical','ia médicale','télémédecine','sante','santé','robotique'],
      r: () => `La veille de Yohan porte sur un sujet qui lui tient à cœur ! [NAV:veille]\n\n**"Comment les nouvelles technologies peuvent faciliter le travail des soignants dans les hôpitaux ?"**\n\nThèmes : IA médicale, télémédecine, robotique, dossier patient électronique.`
    },
    {
      p: ['contact','contacter','joindre','email','mail','téléphone','telephone','linkedin','github','disponible','recruter','recrutement','alternance','embauche'],
      r: () => `Yohan est disponible pour une alternance ou un projet ! [NAV:contact]\n\n**Email :** Iribarren.yohan@gmail.com\n**GitHub :** github.com/iribarreny\n**Tél :** 06 75 26 72 52\n**Localisation :** Pau, Nouvelle-Aquitaine 🌊`
    },
    {
      p: ['aide','help','que faire','comment','naviguer','explorer','guide','sections','menu','quoi'],
      r: () => `Je peux vous guider dans tout le portfolio ! 🐟\n\n**Sections :**\n- **Accueil** — présentation + terminal\n- **CV** — parcours complet\n- **Ateliers** — projets scolaires\n- **Stages** — expériences entreprise\n- **Veille** — sujet technologique\n- **Compétences** — tech stack\n- **Contact** — formulaire & coordonnées\n\nDemandez un projet ou stage pour l'ouvrir directement !`
    },
    {
      p: ['qualité','qualite','personnalité','personnalite','caractère','caractere','humain'],
      r: () => `Yohan est **autonome, curieux, investi et réactif**. 🌿\n\nSon parcours de soignant lui a apporté rigueur, empathie et sens du travail en équipe.`
    },
    {
      p: ['intérêt','interet','loisir','hobby','passion','histoire','légende','legende','jeux','jeu','jeux-video','jeux video','gaming'],
      r: () => `En dehors du code, Yohan a deux grandes passions ! 🎮\n\n🏰 **Histoire & Légendes** — membre actif de l'association, passionné par l'histoire médiévale et les récits mythologiques.\n\n🎮 **Jeux-vidéos** — jeux de rôle, stratégie et jeux narratifs. Une passion qui nourrit la créativité et la logique de développeur !`
    },
    {
      p: ['déploiement','deploiement','hébergement','hebergement','site en ligne','en ligne','netlify','github pages','vercel','url','lien du site','accéder','acceder'],
      r: () => 'Le portfolio est un site statique, facile à déployer gratuitement ! 🚀\n\n' +
               '**3 options :**\n\n' +
               '🟢 **Netlify** — le plus simple\n' +
               'Glisse le dossier sur netlify.com → URL instantanée\n\n' +
               '🐙 **GitHub Pages** — si tu as un repo GitHub\n' +
               'Repo nommé iribarreny.github.io → site automatique\n\n' +
               '⚡ **Vercel** — le plus rapide\n' +
               'Connecte ton GitHub sur vercel.com → deploy en 1 clic\n\n' +
               '💡 Tous sont **gratuits** et fournissent le HTTPS.'
    },
    {
      p: ['merci','super','parfait','génial','genial','top','cool','bravo','bye','au revoir','à bientôt','bonne journee'],
      r: () => `Bloup bloup ! 🐟 N'hésitez pas si vous avez d'autres questions. Bonne plongée dans le portfolio de Yohan !`
    },
  ];

  const FALLBACKS = [
    `Bloup ? 🐟 Je ne suis pas sûr de comprendre. Essayez : *"Montre-moi le projet Fâ"*, *"Stage 29Studio"* ou *"Ses compétences"*`,
    `Je suis spécialisé dans le portfolio de Yohan ! Parlez-moi d'un projet, stage, compétence ou parcours. 🌊`,
    `Bloup bloup... pas bien saisi. Essayez le nom d'un projet ou d'un stage pour l'ouvrir directement 🐠`,
  ];
  let fbIdx = 0;

  // ── Moteur de recherche ──────────────────────────────────
  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ');
  }

  function getReply(input) {
    const text = normalize(input);
    let best = null, bestScore = 0;
    for (const intent of INTENTS) {
      let score = 0;
      for (const pat of intent.p) {
        if (normalize(pat).split(' ').every(w => text.includes(w))) score += 2;
        else if (text.includes(normalize(pat))) score += 1;
      }
      if (score > bestScore) { bestScore = score; best = intent; }
    }
    if (best) return best.r();
    return FALLBACKS[(fbIdx++) % FALLBACKS.length];
  }

  // ── Suggestions ──────────────────────────────────────────
  const SUGGS = [
    { l: '🐠 Qui est Yohan ?',     t: 'Qui est Yohan ?' },
    { l: '🐕 Projet Canis Pro',    t: 'Projet Canis Pro' },
    { l: '📸 Stage 29Studio',       t: 'Stage 29Studio' },
    { l: '🎡 Site Fâ — E6',            t: 'Projet Fâ' },
    { l: '📊 Ses compétences',      t: 'Ses compétences techniques' },
    { l: '📡 Le contacter',         t: 'Comment contacter Yohan ?' },
  ];

  let isOpen = false;

  // ── SVG Bloupi ───────────────────────────────────────────
  function bloupiSVG(size = 38) {
    return `<svg viewBox="0 0 60 40" width="${size}" height="${Math.round(size*40/60)}" xmlns="http://www.w3.org/2000/svg">
  <polygon points="6,20 14,10 14,30" fill="#00c9aa" opacity="0.9"/>
  <ellipse cx="34" cy="20" rx="20" ry="13" fill="#00c9aa"/>
  <ellipse cx="36" cy="22" rx="13" ry="8" fill="#b0e8e2" opacity="0.55"/>
  <path d="M22,14 Q28,12 34,14" stroke="#007a99" stroke-width="0.8" fill="none" opacity="0.5"/>
  <path d="M20,19 Q28,17 36,19" stroke="#007a99" stroke-width="0.8" fill="none" opacity="0.5"/>
  <path d="M22,24 Q28,26 34,24" stroke="#007a99" stroke-width="0.8" fill="none" opacity="0.4"/>
  <path d="M28,7 Q32,4 40,7 Q36,9 28,9 Z" fill="#00e5ff" opacity="0.85"/>
  <ellipse cx="30" cy="24" rx="6" ry="3" fill="#00e5ff" opacity="0.6" transform="rotate(-15 30 24)"/>
  <circle cx="48" cy="17" r="4.5" fill="white"/>
  <circle cx="49" cy="17" r="2.8" fill="#020d14"/>
  <circle cx="50" cy="15.5" r="1" fill="white" opacity="0.9"/>
  <path d="M54,21 Q56,23 54,24" stroke="#007a99" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <circle cx="57" cy="14" r="1.5" fill="none" stroke="#00e5ff" stroke-width="0.8" opacity="0.7"/>
  <circle cx="59" cy="10" r="1"   fill="none" stroke="#00e5ff" stroke-width="0.7" opacity="0.5"/>
</svg>`;
  }

  // ── CSS injecté ──────────────────────────────────────────
  const CSS = `
  #bloupi-btn {
    position: fixed; bottom: 28px; right: 28px; z-index: 9999;
    width: 62px; height: 62px; border-radius: 50%;
    background: linear-gradient(135deg, #04182a 60%, #062840);
    border: 2px solid #00c9aa;
    box-shadow: 0 0 18px rgba(0,201,170,0.35), 0 0 40px rgba(0,229,255,0.1);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease;
    overflow: visible;
  }
  #bloupi-btn:hover { transform: scale(1.12) rotate(-8deg); box-shadow: 0 0 28px rgba(0,201,170,0.6), 0 0 60px rgba(0,229,255,0.2); }
  #bloupi-btn.active { border-color: #00e5ff; box-shadow: 0 0 30px rgba(0,229,255,0.5), 0 0 70px rgba(0,201,170,0.2); }
  #bloupi-btn::before, #bloupi-btn::after { content:''; position:absolute; border-radius:50%; border:1px solid rgba(0,229,255,0.4); animation:bloupi-bubble-ring 2.4s ease-out infinite; }
  #bloupi-btn::before { width:80%; height:80%; animation-delay:0s; }
  #bloupi-btn::after  { width:100%; height:100%; animation-delay:1.2s; }
  @keyframes bloupi-bubble-ring { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.8);opacity:0} }

  #bloupi-win {
    position: fixed; bottom: 102px; right: 28px; z-index: 9998;
    width: 360px; max-width: calc(100vw - 32px);
    background: linear-gradient(160deg, #04182a 0%, #062840 60%, #071e30 100%);
    border: 1px solid #0e4060; border-radius: 18px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.08), inset 0 1px 0 rgba(0,229,255,0.07);
    display: flex; flex-direction: column; overflow: hidden;
    transform: scale(0.88) translateY(20px); opacity: 0; pointer-events: none;
    transform-origin: bottom right;
    transition: transform .3s cubic-bezier(.34,1.4,.64,1), opacity .25s ease;
    font-family: 'Share Tech Mono', 'Courier New', monospace;
  }
  #bloupi-win.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

  .bloupi-header { display:flex; align-items:center; justify-content:space-between; padding:14px 16px 12px; background:linear-gradient(90deg,#04182a,#062840); border-bottom:1px solid #0e4060; position:relative; overflow:hidden; }
  .bloupi-header::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#00c9aa,#00e5ff,#00c9aa,transparent); opacity:0.6; }
  .bloupi-header-info { display:flex; align-items:center; gap:10px; }
  .bloupi-avatar { width:44px; height:44px; background:radial-gradient(circle at 40% 40%,#062840,#020d14); border:1px solid #00c9aa; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px rgba(0,201,170,0.25); animation:bloupi-float 3s ease-in-out infinite; flex-shrink:0; }
  @keyframes bloupi-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-4px) rotate(3deg)} }
  .bloupi-name { font-size:14px; font-weight:700; color:#00e5ff; letter-spacing:.05em; text-shadow:0 0 8px rgba(0,229,255,0.5); }
  .bloupi-status { font-size:10px; color:#00c9aa; opacity:0.75; letter-spacing:.04em; }
  .bloupi-close { background:none; border:1px solid #0e4060; color:#5a9090; cursor:pointer; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; transition:color .2s,border-color .2s,background .2s; line-height:1; }
  .bloupi-close:hover { color:#00e5ff; border-color:#00e5ff; background:rgba(0,229,255,0.07); }

  .bloupi-messages { flex:1; overflow-y:auto; padding:14px 12px; display:flex; flex-direction:column; gap:10px; max-height:320px; min-height:180px; scrollbar-width:thin; scrollbar-color:#0e4060 transparent; }
  .bloupi-messages::-webkit-scrollbar { width:3px; }
  .bloupi-messages::-webkit-scrollbar-thumb { background:#0e4060; border-radius:3px; }
  .bloupi-msg { display:flex; }
  .bloupi-msg-user { justify-content:flex-end; }
  .bloupi-msg-bot  { justify-content:flex-start; }
  .bloupi-bubble { max-width:82%; padding:9px 13px; border-radius:14px; font-size:12.5px; line-height:1.55; animation:bloupi-fadeup .25s ease both; }
  @keyframes bloupi-fadeup { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .bloupi-msg-user .bloupi-bubble { background:linear-gradient(135deg,#062840,#083550); border:1px solid #0e4060; color:#b0e8e2; border-bottom-right-radius:4px; }
  .bloupi-msg-bot  .bloupi-bubble { background:linear-gradient(135deg,#04182a,#062840); border:1px solid rgba(0,201,170,0.25); color:#c8f0ee; border-bottom-left-radius:4px; box-shadow:0 0 10px rgba(0,201,170,0.06); }
  .bloupi-bubble strong { color:#00e5ff; font-weight:700; }
  .bloupi-bubble em     { color:#00c9aa; font-style:italic; }
  .bloupi-nav-badge { display:inline-block; background:rgba(0,229,255,0.1); border:1px solid rgba(0,229,255,0.3); color:#00e5ff; font-size:10px; padding:1px 7px; border-radius:20px; margin-left:4px; letter-spacing:.04em; }
  .bloupi-modal-badge { display:inline-block; background:rgba(0,201,170,0.12); border:1px solid rgba(0,201,170,0.35); color:#00c9aa; font-size:10px; padding:1px 7px; border-radius:20px; margin-left:4px; letter-spacing:.04em; cursor:pointer; transition:background .2s; }
  .bloupi-modal-badge:hover { background:rgba(0,201,170,0.25); }

  .bloupi-typing-bubble { display:flex; align-items:center; gap:5px; padding:10px 14px; }
  .bloupi-typing-bubble span { width:7px; height:7px; background:#00c9aa; border-radius:50%; animation:bloupi-bounce .9s ease-in-out infinite; box-shadow:0 0 6px rgba(0,201,170,0.5); }
  .bloupi-typing-bubble span:nth-child(2){animation-delay:.18s} .bloupi-typing-bubble span:nth-child(3){animation-delay:.36s}
  @keyframes bloupi-bounce { 0%,80%,100%{transform:scale(0.7);opacity:.5} 40%{transform:scale(1.15);opacity:1} }

  .bloupi-suggestions { display:flex; flex-wrap:wrap; gap:6px; padding:8px 12px; border-top:1px solid rgba(14,64,96,0.5); }
  .bloupi-sug { background:rgba(6,40,64,0.8); border:1px solid #0e4060; color:#b0e8e2; font-size:10.5px; font-family:'Share Tech Mono','Courier New',monospace; padding:5px 10px; border-radius:20px; cursor:pointer; transition:background .2s,border-color .2s,color .2s,transform .15s; letter-spacing:.02em; }
  .bloupi-sug:hover { background:rgba(0,201,170,0.12); border-color:#00c9aa; color:#00e5ff; transform:translateY(-1px); }

  .bloupi-input-area { display:flex; align-items:center; gap:8px; padding:10px 12px; border-top:1px solid #0e4060; background:rgba(2,13,20,0.5); }
  #bloupi-input { flex:1; background:rgba(6,40,64,0.6); border:1px solid #0e4060; border-radius:10px; color:#c8f0ee; font-family:'Share Tech Mono','Courier New',monospace; font-size:12px; padding:8px 12px; outline:none; transition:border-color .2s,box-shadow .2s; caret-color:#00e5ff; }
  #bloupi-input::placeholder { color:#2a5060; }
  #bloupi-input:focus { border-color:#00c9aa; box-shadow:0 0 0 2px rgba(0,201,170,0.12); }
  #bloupi-send { background:linear-gradient(135deg,#00c9aa,#00e5ff); border:none; border-radius:10px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#020d14; transition:transform .2s,box-shadow .2s; flex-shrink:0; }
  #bloupi-send:hover { transform:scale(1.1); box-shadow:0 0 14px rgba(0,229,255,0.4); }
  #bloupi-send:disabled { opacity:0.4; cursor:default; transform:none; }

  /* Mode lumineux */
  body.ocean-light #bloupi-btn { background:linear-gradient(135deg,#b8e8f5 60%,#a0d8ec); border-color:#007a6a; box-shadow:0 0 18px rgba(0,122,106,0.3),0 0 40px rgba(0,119,170,0.1); }
  body.ocean-light #bloupi-win { background:linear-gradient(160deg,#b4e2f2 0%,#9ed4ea 60%,#aadcea 100%); border-color:#7acde0; box-shadow:0 8px 48px rgba(0,80,120,0.2),0 0 0 1px rgba(0,119,170,0.1); }
  body.ocean-light .bloupi-header { background:linear-gradient(90deg,#9fd5ea,#b4e2f2); border-bottom-color:#7acde0; }
  body.ocean-light .bloupi-msg-user .bloupi-bubble { background:linear-gradient(135deg,#90cce4,#a8dcee); border-color:#7acde0; color:#002a3a; }
  body.ocean-light .bloupi-msg-bot  .bloupi-bubble { background:linear-gradient(135deg,#b4e2f2,#9ed4ea); border-color:rgba(0,122,106,0.3); color:#002a3a; }
  body.ocean-light .bloupi-bubble strong { color:#0077aa; }
  body.ocean-light .bloupi-bubble em     { color:#007a6a; }
  body.ocean-light #bloupi-input { background:rgba(150,210,235,0.7); border-color:#7acde0; color:#002a3a; caret-color:#0077aa; }
  body.ocean-light .bloupi-sug { background:rgba(150,210,235,0.8); border-color:#7acde0; color:#1a5060; }
  body.ocean-light .bloupi-sug:hover { background:rgba(0,122,106,0.1); border-color:#007a6a; color:#0077aa; }
  body.ocean-light .bloupi-input-area { background:rgba(140,200,225,0.4); border-top-color:#7acde0; }
  body.ocean-light .bloupi-suggestions { border-top-color:rgba(122,205,224,0.5); }
  body.ocean-light .bloupi-modal-badge { background:rgba(0,122,106,0.12); border-color:rgba(0,122,106,0.4); color:#007a6a; }
  `;

  function injectCSS() {
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ── Build UI ─────────────────────────────────────────────
  function buildUI() {
    injectCSS();

    const btn = document.createElement('div');
    btn.id = 'bloupi-btn'; btn.title = 'Bloupi — assistant portfolio';
    btn.innerHTML = bloupiSVG(34);
    btn.onclick = toggleChat;
    document.body.appendChild(btn);

    const win = document.createElement('div');
    win.id = 'bloupi-win';
    win.innerHTML = `
      <div class="bloupi-header">
        <div class="bloupi-header-info">
          <div class="bloupi-avatar">${bloupiSVG(30)}</div>
          <div>
            <div class="bloupi-name">Bloupi 🐟</div>
            <div class="bloupi-status">poisson guide · portfolio de Yohan</div>
          </div>
        </div>
        <button class="bloupi-close" onclick="window._bloupiToggle()">✕</button>
      </div>
      <div class="bloupi-messages" id="bloupi-messages"></div>
      <div class="bloupi-suggestions" id="bloupi-suggestions"></div>
      <div class="bloupi-input-area">
        <input id="bloupi-input" type="text" placeholder="Posez votre question..." autocomplete="off" autocorrect="off"/>
        <button id="bloupi-send" onclick="window._bloupiSend()">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M14 8L2 2l2 6-2 6 12-6z" fill="currentColor"/></svg>
        </button>
      </div>`;
    document.body.appendChild(win);

    document.getElementById('bloupi-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); window._bloupiSend(); }
    });

    const sugEl = document.getElementById('bloupi-suggestions');
    sugEl.innerHTML = SUGGS.map(s =>
      `<button class="bloupi-sug" onclick="window._bloupiSuggest('${s.t.replace(/'/g, "\\'")}')">${s.l}</button>`
    ).join('');

    setTimeout(() => addMsg('bot',
      "Bloup ! 🐟 Je suis **Bloupi**, le poisson guide de Yohan. Demandez-moi un projet ou un stage pour l'ouvrir directement !"
    ), 500);
  }

  function toggleChat() {
    isOpen = !isOpen;
    document.getElementById('bloupi-win').classList.toggle('open', isOpen);
    document.getElementById('bloupi-btn').classList.toggle('active', isOpen);
    if (isOpen) setTimeout(() => document.getElementById('bloupi-input')?.focus(), 350);
  }
  window._bloupiToggle = toggleChat;

  function addMsg(role, text) {
    const c = document.getElementById('bloupi-messages');
    if (!c) return;
    const d = document.createElement('div');
    d.className = `bloupi-msg bloupi-msg-${role}`;
    let html = text
      .replace(/\[NAV:(\w+)\]/g, (_, pg) => {
        setTimeout(() => { if (typeof showPage === 'function') showPage(pg); }, 80);
        return `<span class="bloupi-nav-badge">→ ${pg}</span>`;
      })
      .replace(/\[MODAL:(\w+-?\w*)\]/g, (_, id) => {
        return `<span class="bloupi-modal-badge" onclick="openModal('${id}')">📂 ouvrir</span>`;
      })
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    d.innerHTML = `<div class="bloupi-bubble">${html}</div>`;
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
    if (role === 'user') {
      const s = document.getElementById('bloupi-suggestions');
      if (s) s.style.display = 'none';
    }
  }

  function showTyping() {
    const c = document.getElementById('bloupi-messages');
    const d = document.createElement('div');
    d.className = 'bloupi-msg bloupi-msg-bot'; d.id = 'bloupi-typing';
    d.innerHTML = `<div class="bloupi-bubble bloupi-typing-bubble"><span></span><span></span><span></span></div>`;
    c.appendChild(d); c.scrollTop = c.scrollHeight;
  }
  function hideTyping() { document.getElementById('bloupi-typing')?.remove(); }

  function sendMsg(txt) {
    if (!txt.trim()) return;
    addMsg('user', txt);
    const inp = document.getElementById('bloupi-input');
    const btn = document.getElementById('bloupi-send');
    if (inp) { inp.disabled = true; inp.value = ''; }
    if (btn) btn.disabled = true;
    showTyping();
    setTimeout(() => {
      hideTyping();
      addMsg('bot', getReply(txt));
      if (inp) { inp.disabled = false; inp.focus(); }
      if (btn) btn.disabled = false;
    }, 350 + Math.random() * 550);
  }

  window._bloupiSend    = () => { const i = document.getElementById('bloupi-input'); if (i?.value.trim()) sendMsg(i.value); };
  window._bloupiSuggest = (t) => sendMsg(t);

  document.addEventListener('DOMContentLoaded', buildUI);

})();

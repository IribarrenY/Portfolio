// ─── MODALS ───────────────────────────────────────────────────────────────────
var MODAL_DATA = {};

function buildSep(txt) {
  return '<div class="sep" style="margin:.8rem 0"><div class="sepline"></div><div class="septxt">' + txt + '</div><div class="sepline"></div></div>';
}
function buildTags(arr) {
  var cls = ['tc2','tt','tg','tr','ta'];
  return '<div class="tags" style="margin-bottom:.8rem">' + arr.map(function(t,i){return '<span class="tag '+cls[i%cls.length]+'">'+t+'</span>';}).join('') + '</div>';
}
function buildUl(items) {
  return '<ul style="color:var(--text-dim);font-size:.78rem;line-height:2.2;padding-left:1.4rem;list-style:disc">' + items.map(function(i){return '<li>'+i+'</li>';}).join('') + '</ul>';
}
function p(txt) { return '<p style="color:var(--text-dim);font-size:.8rem;line-height:1.8;margin-bottom:.6rem">'+txt+'</p>'; }
function cyan(txt) { return '<p style="color:var(--cyan);font-size:.77rem;margin:.6rem 0 .2rem;letter-spacing:.04em">'+txt+'</p>'; }

MODAL_DATA['cv-perso'] = {
  title: '🌐 Site Web personnel (CV)',
  body: [
    '<div class="cmeta"><span>1ère année</span> · Semestre 1</div>',
    buildSep('// langages &amp; outils'),
    buildTags(['HTML','CSS','JavaScript']),
    buildSep('// notions'),
    p('Construction de pages Web statiques, navigation entre les pages, mise en place d\'un menu et d\'une horloge.'),
    buildSep('// compétences'),
    buildUl([
      '1.3 — Développement de la présence en ligne de l\'organisation',
      '1.3.1 — Valorisation de l\'image sur les médias numériques',
      '1.6 — Organisation de son développement professionnel',
      '1.6.3 — Gérer son identité professionnelle',
      '1.6.4 — Développer son projet professionnel'
    ])
  ].join('')
};

MODAL_DATA['locaboard'] = {
  title: '🚗 Projet Locaboard',
  body: [
    '<div class="cmeta"><span>1ère année</span> · Semestre 1</div>',
    buildSep('// langages &amp; outils'),
    buildTags(['HTML','CSS','PHP','JavaScript']),
    buildSep('// notions'),
    p('Construction d\'un site dynamique.'),
    buildSep('// compétences'),
    buildUl([
      '1.3 — Développement de la présence en ligne de l\'organisation',
      '1.3.1 — Valorisation de l\'image sur les médias numériques'
    ])
  ].join('')
};

MODAL_DATA['picdumidi'] = {
  title: '🏔️ Site Boutique Pic du Midi',
  body: [
    '<div class="cmeta"><span>1ère année</span> · Semestre 2</div>',
    buildSep('// langages &amp; outils'),
    buildTags(['WordPress','GanttProject','CMS']),
    buildSep('// notions'),
    buildUl([
      'CMS WordPress : fonctionnalités et paramétrages',
      'Charte graphique, image de l\'organisation et identité numérique',
      'Mode de projet classique (approche prédictive séquentielle)',
      'Outil de gestion de projet : planification, sauvegarde et restauration',
      'Création de pages dynamiques interactives'
    ]),
    buildSep('// compétences'),
    buildUl([
      '1.1 — Gérer le patrimoine informatique',
      '1.1.1 — Gérer des sauvegardes',
      '1.3 — Développer la présence en ligne',
      '1.3.2 — Faire évoluer un site Web exploitant les données de l\'organisation',
      '1.4 — Travailler en mode projet',
      '1.4.1 — Planifier les activités'
    ])
  ].join('')
};

MODAL_DATA['netcar'] = {
  title: '🚘 Projet Netcar',
  body: [
    '<div class="cmeta"><span>1ère année</span> · Semestre 2</div>',
    buildSep('// langages &amp; outils'),
    buildTags(['HTML','CSS','Git','NetBeans']),
    buildSep('// notions'),
    p('Langage SQL (LID), intégration continue des versions, architecture MVC.'),
    buildSep('// compétences'),
    buildUl([
      '1.1 — Gérer le patrimoine informatique',
      '1.3 — Faire évoluer un site Web exploitant les données de l\'organisation',
      '2.1 — Conception et développement d\'applications',
      '2.1.1 — Développement d\'une solution applicative',
      '2.1.2 — Conception de l\'architecture d\'une solution applicative'
    ])
  ].join('')
};

// ─── HELPERS IMAGES ───────────────────────────────────────────────────────────
function logo(src, alt) {
  return '<img src="img/' + src + '" alt="' + (alt||'') + '" style="height:40px;width:auto;border-radius:4px;object-fit:contain;">';
}
function thumb(src, alt) {
  return '<div onclick="openLightbox(\'img/' + src + '\')" style="position:relative;display:inline-block;width:220px;height:130px;margin:.3rem;cursor:pointer;border-radius:6px;overflow:hidden;border:1px solid var(--border);flex-shrink:0;transition:border-color .2s;" onmouseover="this.style.borderColor=\'var(--cyan)\';this.querySelector(\'.thumb-hint\').style.opacity=\'1\'" onmouseout="this.style.borderColor=\'var(--border)\';this.querySelector(\'.thumb-hint\').style.opacity=\'0\'">'
    + '<img src="img/' + src + '" alt="' + (alt||'') + '" style="width:100%;height:100%;object-fit:cover;display:block;">'
    + '<div class="thumb-hint" style="position:absolute;inset:0;background:rgba(2,13,20,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;font-size:.7rem;color:var(--cyan);letter-spacing:.06em;text-align:center;pointer-events:none;">🔍 Cliquer pour agrandir</div>'
    + '</div>';
}
function strong(txt) { return '<p style="color:var(--foam);font-size:.8rem;font-weight:bold;margin:.8rem 0 .2rem">' + txt + '</p>'; }

// Lightbox
(function() {
  var lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(2,13,20,.95);backdrop-filter:blur(8px);cursor:default;align-items:center;justify-content:center;';
  lb.innerHTML = '<img id="lb-img" style="max-width:90vw;max-height:90vh;border-radius:8px;border:1px solid var(--border2);box-shadow:0 0 60px rgba(0,229,255,.15);cursor:default;" />';
  lb.onclick = function() { lb.style.display = 'none'; document.body.style.overflow = ''; };
  document.addEventListener('DOMContentLoaded', function() { document.body.appendChild(lb); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { lb.style.display = 'none'; document.body.style.overflow = ''; } });
  window.openLightbox = function(src) {
    document.getElementById('lb-img').src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
})();

// ═══════════════════════════════════════════
//  SITE FA
// ═══════════════════════════════════════════
MODAL_DATA['sitefa'] = {
  title: '🎡 Projet Site FA',
  body: [
    '<div class="cmeta"><span>2ème année</span> · Semestre 1 · Méthode Agile</div>',

    buildSep('// langages &amp; outils'),
    '<div style="display:flex;gap:1rem;align-items:center;margin:.5rem 0;flex-wrap:wrap">',
      logo('logophp.png','PHP'),
      logo('logocss.png','CSS'),
      logo('logohtml.jpg','HTML'),
    '</div>',

    buildSep('// contexte'),
    p('Création d\'un site web qui permet de gérer les entrées dans le parc via une billetterie en ligne pour gérer l\'affluence grandissante.'),

    buildSep('// notions'),
    p('Construction de pages Web dynamiques avec architecture MVC/DAO, gestion des sessions et des rôles (client / employé / admin), interactions avec la base de données.'),

    buildSep('// mise en place du projet'),
    p('Mise en place d\'un GitHub pour le projet, création d\'une branche de développement, utilisation de commits réguliers pour suivre l\'évolution et faciliter la collaboration.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      logo('logogithub.png','GitHub'),
    '</div>',
    p('Travail en méthode agile — rétrospectives en étoile de mer pour identifier les axes d\'amélioration.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('etoilefa.PNG','Rétrospective étoile de mer'),
    '</div>',

    buildSep('// architecture MVC'),
    p('Mise en place de l\'architecture MVC et DAO pour organiser le code et faciliter la maintenance du site. Utilisation de PHP pour gérer les interactions avec la base de données et générer dynamiquement les pages Web.'),

    strong('Contrôleurs :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('fa_mvc_ctrl.png','Contrôleurs FA'),
    '</div>',

    strong('Modèles :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('fa_mvc_modeles.png','Modèles FA'),
    '</div>',

    strong('Vues :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('fa_mvc_vues.png','Vues FA'),
    '</div>',

    buildSep('// fonctionnalités développées'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('accueilfa.PNG','Accueil'),
      thumb('connexionscreen.PNG','Page de connexion'),
    '</div>',

    strong('Admin :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('commandeadmin.PNG','Commandes admin'),
      thumb('toutescommandesfa.PNG','Toutes les commandes'),
      thumb('commandefutureadmin.PNG','Commandes futures admin'),
    '</div>',

    strong('Client :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('connexionclient.PNG','Connexion client'),
      thumb('fasejourclientcommander.PNG','Commander un séjour'),
      thumb('clientcommandefa.PNG','Commandes client'),
    '</div>',

    buildSep('// exemple de fonctionnalité : connexion'),
    strong('Page de connexion — Visuel :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('connexionscreen.PNG','Visuel connexion'),
    '</div>',
    strong('Vue :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('connexioncodescreen.PNG','Code vue connexion'),
    '</div>',
    strong('Contrôleur :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('controleurfaconnexion.PNG','Contrôleur connexion 1'),
      thumb('controleurfaconnexion2.PNG','Contrôleur connexion 2'),
    '</div>',
	
    strong('Modèle — Compte.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('compte_php_1.png', 'Compte.php — partie 1'),
      thumb('compte_php_2.png', 'Compte.php — partie 2'),
    '</div>',
    strong('Modèle — CompteDAO.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('comptedao_php_1.png', 'CompteDAO.php — partie 1'),
      thumb('comptedao_php_2.png', 'CompteDAO.php — partie 2'),
      thumb('comptedao_php_3.png', 'CompteDAO.php — partie 3'),
    '</div>',
    strong('Visuel client :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('connexionclient.PNG','Connexion client'),
    '</div>',
    strong('Visuel admin :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('connexionadmin.PNG','Connexion admin'),
    '</div>',
    strong('Index.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('indexfa.PNG','Index FA 1'),
      thumb('indexfa2.PNG','Index FA 2'),
    '</div>',

    buildSep('// compétences'),
    buildUl([
      '1.3 — Développement de la présence en ligne de l\'organisation',
      '1.4 — Travail en mode projet (méthode Agile)',
      '2.1 — Conception et développement d\'une solution applicative (MVC/DAO)',
      '2.3 — Gestion des données (SQL, base de données relationnelle)',
      '1.6 — Organisation de son développement professionnel'
    ])
  ].join('')
};

// ═══════════════════════════════════════════
//  DOMOLANDES
// ═══════════════════════════════════════════
MODAL_DATA['domolandes'] = {
  title: '🏗️ Stage de 1ère année — Domolandes',
  body: [
    '<div class="cmeta"><span>Juin – Juillet 2025</span> · Saint-Geours-de-Maremne</div>',
    buildSep('// l\'entreprise'),
    p('Technopôle créé en 2011, basé à Saint-Geours-de-Maremne. Spécialisé dans la construction durable, le numérique et la transition écologique. Stage au sein du laboratoire de recherche dirigé par M. Humberto Alvarez Valera.'),
    buildSep('// objectifs'),
    buildUl(['Améliorer un site web en développement','Créer une identité visuelle pour le laboratoire','Mettre à jour la documentation technique des projets']),
    buildSep('// missions'),
    cyan('Analyse du site'),
    p('Audit de la structure et du design. Identification des incohérences. Propositions d\'amélioration. <em>Outils : Docker, navigateur web</em>'),
    cyan('Identité visuelle'),
    p('Recherche de nom et création de logo. Vérification juridique via l\'INPI. Validation collective du choix final. <em>Outils : Google Docs, site INPI</em>'),
    cyan('Rédaction de contenus'),
    p('Simplification de documents techniques. Rédaction de textes clairs et accessibles. Intégration au site du laboratoire. <em>Outils : Bloc-notes, documentation interne</em>'),
    cyan('Projet EcoFloc'),
    p('Mise à jour du fichier README.md. Amélioration de la lisibilité. Respect du format Markdown. <em>Outils : GitHub, VSCode</em>'),
    cyan('Documentation finale'),
    p('Synthèse du travail effectué. Rédaction des consignes de passation. Transmission au futur développeur. <em>Outils : Google Docs, Gmail</em>'),
    buildSep('// compétences'),
    buildUl(['Utilisation de GitHub et Markdown','Analyse de site et ergonomie web','Rédaction technique et vulgarisation','Création graphique simple','Organisation et rigueur']),
    buildSep('// difficultés &amp; solutions'),
    buildUl([
      'Absence de documentation → échanges avec le tuteur',
      'Découverte du Markdown → autoformation rapide',
      'Noms déjà déposés → vérification légale et sondage interne',
      'Documents complexes → simplification progressive'
    ]),
    buildSep('// bilan'),
    p('Expérience concrète dans un environnement professionnel. Développement de compétences techniques et organisationnelles. Sensibilisation aux enjeux du numérique responsable.'),
    buildTags(['Docker','GitHub','Markdown','VSCode'])
  ].join('')
};

// ═══════════════════════════════════════════
//  29STUDIO
// ═══════════════════════════════════════════
MODAL_DATA['studio29'] = {
  title: '📸 Stage de 2ème année — 29Studio',
  body: [
    '<div class="cmeta"><span>Janvier – Février 2026</span> · Paris</div>',

    buildSep('// l\'entreprise'),
    p('Entreprise de shooting photos créée en 2025, basée à Paris. Spécialisée dans la production dans le domaine du luxe. Dirigée par Mme Delage Karine.'),

    buildSep('// objectifs'),
    buildUl([
      'Création d\'un site de gestion de fournisseurs, clients et projets pour une agence de communication',
      'Développement d\'une interface complète en architecture MVC/DAO avec couche de sécurité',
      'Mise en place de tests unitaires PHPUnit pour fiabiliser l\'application'
    ]),

    buildSep('// github &amp; versioning'),
    p('Projet versionné sur GitHub en équipe. 92 commits au total, 2 branches actives. Gestion des pull requests et intégration continue.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('studio29_github.png','Dépôt GitHub 29Studio — 92 commits, 9 contributeurs'),
    '</div>',

    buildSep('// base de données'),
    p('Conception et implémentation d\'une base de données relationnelle complète : Entreprises, Clients, Fournisseurs, Projets, Documents, Factures, Membres, Tournées, Étapes, Calendrier, Notifications et droits d\'accès.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('29Studio_BDD.png','Schéma complet de la base de données'),
    '</div>',

    buildSep('// architecture MVC/DAO'),
    p('Architecture MVC complète avec couche DAO dédiée pour chaque entité métier. Séparation claire des responsabilités entre contrôleurs, modèles et vues.'),

    strong('Contrôleurs :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('studio29_mvc_1.png','Liste des contrôleurs 29Studio'),
    '</div>',

    strong('Modèles :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('studio29_mvc_2.png','Modèles 29Studio — partie 1'),
      thumb('studio29_mvc_3.png','Modèles 29Studio — partie 2'),
      thumb('studio29_mvc_4.png','Modèles 29Studio — partie 3'),
    '</div>',

    strong('Vues :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0">',
      thumb('studio29_mvc_5.png','Liste des vues 29Studio'),
    '</div>',

    buildSep('// missions réalisées'),
    cyan('Analyse des besoins'),
    p('Recueil des besoins auprès de l\'équipe. Identification des fonctionnalités clés : fournisseurs, clients, projets, factures, documents, tournées. <em>Outils : réunions d\'équipe, Google Docs</em>'),
    cyan('Conception de l\'application'),
    p('Modélisation UML des classes métier. Conception de la BDD avec MCD. Définition de l\'architecture MVC/DAO. <em>Outils : MySQL Workbench, Google Docs</em>'),
    cyan('Développement du site web'),
    p('Développement d\'une interface utilisateur complète. Intégration des fonctionnalités CRUD pour toutes les entités. <em>Outils : VSCode, Docker, GitHub</em>'),
    cyan('Tests et sécurité'),
    p('Mise en place de PHPUnit pour les tests unitaires. Authentification sécurisée (password_hash / password_verify). Gestion des rôles et droits d\'accès par projet. CAPTCHA anti-robot.'),

    buildSep('// compétences'),
    buildUl([
      '2.1 — Conception et développement d\'une solution applicative (MVC/DAO complet)',
      '2.3 — Gestion des données (BDD relationnelle, 15+ tables, triggers)',
      '1.5 — Mise à disposition des utilisateurs (tests PHPUnit, déploiement Docker)',
      '1.4 — Travail en mode projet (GitHub et 92 commits)',
      '3.5 — Cyber sécurisation (authentification, hachage, rôles, CAPTCHA)',
      '2.2 — Maintenance corrective et évolutive (intégration continue, versioning)'
    ]),

    buildSep('// difficultés &amp; solutions'),
    buildUl([
      'Gestion de documents complexes → architecture documentaire dédiée',
      'Évolution des exigences → adaptation agile et commits fréquents',
      'Contrainte d\'unicité en BDD → refactoring avec triggers SQL',
      'BDD complexe (15+ tables liées) → modélisation MCD rigoureuse en amont'
    ]),

    buildSep('// bilan'),
    p('Expérience très enrichissante dans un environnement professionnel stimulant. Développement de compétences techniques avancées (MVC/DAO complet, PHPUnit, Docker) et travail en équipe réelle avec 9 contributeurs et 92 commits GitHub.'),
    buildTags(['PHP','MVC','DAO','PHPUnit','GitHub','Docker','MySQL'])
  ].join('')
};

function openModal(id) {
  var m = MODAL_DATA[id];
  if (!m) return;
  document.getElementById('modal-title').textContent = m.title;
  document.getElementById('modal-body').innerHTML = m.body;
  document.getElementById('modal-overlay').style.display = 'block';
  document.getElementById('modal-box').style.display = 'block';
  document.getElementById('modal-box').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.getElementById('modal-box').style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

function toggleAcc(el) {
  var body = el.querySelector('.acc-body');
  var arrow = el.querySelector('.acc-arrow');
  var isOpen = el.classList.contains('acc-open');
  document.querySelectorAll('.acc-item.acc-open').forEach(function(item) {
    item.classList.remove('acc-open');
    item.querySelector('.acc-body').style.maxHeight = '0';
    item.querySelector('.acc-arrow').style.transform = 'rotate(0deg)';
  });
  if (!isOpen) {
    el.classList.add('acc-open');
    body.style.maxHeight = body.scrollHeight + 'px';
    arrow.style.transform = 'rotate(90deg)';
  }
}

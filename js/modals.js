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




// ─── HELPERS IMAGES ───────────────────────────────────────────────────────────
function logo(src, alt) {
  return '<img src="img/' + src + '" alt="' + (alt||'') + '" style="height:40px;width:auto;border-radius:4px;object-fit:contain;">';
}
function thumb(src, alt) {
  return '<div onclick="openLightbox(\'img/' + src + '\')" style="position:relative;display:inline-block;width:min(220px,calc(50vw - 2rem));height:120px;margin:.3rem;cursor:pointer;border-radius:6px;overflow:hidden;border:1px solid var(--border);flex-shrink:0;transition:border-color .2s;" onmouseover="this.style.borderColor=\'var(--cyan)\';this.querySelector(\'.thumb-hint\').style.opacity=\'1\'" onmouseout="this.style.borderColor=\'var(--border)\';this.querySelector(\'.thumb-hint\').style.opacity=\'0\'">'
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
  title: '🎡 Projet Site Fâ',
  body: [
    '<div class="cmeta"><span>2ème année</span> · Semestre 1 · Méthode Agile · Épreuve E6 BTS SIO SLAM</div>',

    buildSep('// langages &amp; outils'),
    '<div style="display:flex;gap:1rem;align-items:center;margin:.5rem 0;flex-wrap:wrap">',
      logo('logophp.png','PHP'),
      logo('logocss.png','CSS'),
      logo('logohtml.jpg','HTML'),
      logo('logogithub.png','GitHub'),
    '</div>',
    buildTags(['PHP','HTML','CSS','SQL','MVC','DAO','GitHub','Méthode Agile']),

    buildSep('// contexte'),
    p('Le site de Fâ est un site gallo-romain situé en Charente-Maritime, dans le village de Barzan. Ouvert au public depuis 2005, il propose aux visiteurs des ateliers pédagogiques et ludiques : visite humoristique, fouilles archéologiques, atelier vin romain, présentation de la vie quotidienne gallo-romaine, ingénierie romaine et représentation des gladiateurs.'),
    p('La région est l\'un des financeurs principaux du site. Les employés, polyvalents, assurent aussi bien la tenue des ateliers que la gestion des entrées selon un planning rodé. La communication passe notamment par le site <em>fa-barzan.com</em> et des guides distribués dans les offices de tourisme.'),
    p('Face à une affluence grandissante, la gestion papier des entrées monopolisait le personnel lors des pics de visite, au moment même où ils devaient se préparer pour leurs ateliers. L\'objectif était de développer une <strong>billetterie en ligne</strong> pour fluidifier les accès et permettre aux employés de se consacrer pleinement à leurs missions.'),

    buildSep('// base de données'),
    p('Script SQL complet modélisant l\'ensemble des entités du projet : visiteurs, billets, séances, ateliers, employés et rôles. Disponible dans : <em>database/sources-sql/projet_sio2_fa.sql</em>'),

    buildSep('// architecture MVC / DAO'),
    p('Architecture MVC complète avec couche DAO dédiée pour chaque entité métier. Séparation stricte des responsabilités entre contrôleurs, modèles (classe métier + classe technique DAO) et vues PHP.'),

    strong('Contrôleurs :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('fa_mvc_ctrl.png','Contrôleurs FA'),
    '</div>',
    strong('Modèles :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('fa_mvc_modeles.png','Modèles FA'),
    '</div>',
    strong('Vues :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('fa_mvc_vues.png','Vues FA'),
    '</div>',

    buildSep('// mise en place du projet'),
    p('Mise en place d\'un dépôt GitHub, branche de développement dédiée et commits réguliers pour suivre l\'évolution et faciliter la collaboration en équipe.'),
    p('Travail en <strong>méthode Agile</strong> — rétrospectives en étoile de mer pour identifier les axes d\'amélioration à chaque sprint.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('etoilefa.PNG','Rétrospective étoile de mer'),
    '</div>',

    buildSep('// fonctionnalités développées'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('accueilfa.PNG','Accueil'),
      thumb('connexionscreen.PNG','Page de connexion'),
    '</div>',
    strong('Interface Admin :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('commandeadmin.PNG','Commandes admin'),
      thumb('toutescommandesfa.PNG','Toutes les commandes'),
      thumb('commandefutureadmin.PNG','Commandes futures admin'),
    '</div>',
    strong('Interface Client :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('connexionclient.PNG','Connexion client'),
      thumb('fasejourclientcommander.PNG','Commander un séjour'),
      thumb('clientcommandefa.PNG','Commandes client'),
    '</div>',

    buildSep('// exemple de fonctionnalité — connexion (admin)'),
    p('Fonctionnalité complète de connexion avec gestion des rôles admin / client / employé. Contrôleur : <em>gestionConnexion.php</em>'),
    strong('Visuel — page de connexion :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('connexionscreen.PNG','Visuel connexion'),
    '</div>',
    strong('Modèle — Compte.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('compte_php_1.png', 'Compte.php — partie 1'),
      thumb('compte_php_2.png', 'Compte.php — partie 2'),
    '</div>',
    strong('Modèle — CompteDAO.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('comptedao_php_1.png', 'CompteDAO.php — partie 1'),
      thumb('comptedao_php_2.png', 'CompteDAO.php — partie 2'),
      thumb('comptedao_php_3.png', 'CompteDAO.php — partie 3'),
    '</div>',
    strong('Contrôleur — gestionConnexion.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('controleurfaconnexion.PNG','Contrôleur connexion 1'),
      thumb('controleurfaconnexion2.PNG','Contrôleur connexion 2'),
    '</div>',
    strong('Vue — connexion.php &amp; index.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('connexioncodescreen.PNG','Code vue connexion'),
      thumb('indexfa.PNG','Index FA 1'),
      thumb('indexfa2.PNG','Index FA 2'),
    '</div>',
    strong('Visuel client vs admin :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('connexionclient.PNG','Connexion client'),
      thumb('connexionadmin.PNG','Connexion admin'),
    '</div>',

    buildSep('// compétences'),
    buildUl([
      '1.2 — Réponse aux incidents et demandes d\'assistance (gestion des accès et rôles)',
      '1.3 — Développement de la présence en ligne de l\'organisation',
      '1.4 — Travail en mode projet (méthode Agile, rétrospectives étoile de mer)',
      '2.1 — Conception et développement d\'une solution applicative (MVC/DAO PHP)',
      '2.3 — Gestion des données (SQL, base de données relationnelle)',
      '1.6 — Organisation de son développement professionnel'
    ])
  ].join('')
};

// ═══════════════════════════════════════════
//  CANIS PRO
// ═══════════════════════════════════════════
MODAL_DATA['canispro'] = {
  title: '🐕 Canis Pro — Épreuve E6',
  body: [
    '<div class="cmeta"><span>2ème année</span> · Semestre 2 · Épreuve E6 BTS SIO SLAM · 2026</div>',

    buildSep('// contexte'),
    p('Le projet CanisPro Éducation s\'inscrit dans un contexte où la place de l\'animal domestique a fortement évolué dans la société contemporaine. Le chien n\'est plus seulement un animal utilitaire : il est désormais intégré à la vie familiale et sociale, ce qui transforme la relation humain-animal.'),
    p('L\'éducation canine moderne vise à développer une relation équilibrée entre le propriétaire et son animal, fondée sur la communication, la sociabilisation et la compréhension du comportement. En cohérence avec le thème de culture générale du BTS SIO : <em>"Les animaux et nous : imaginer, connaître, comprendre l\'animal"</em>.'),
    p('Le centre propose des cours individuels d\'éducation personnalisée et des cours collectifs (sociabilisation, obéissance, agility) adaptés à trois niveaux : chiot, débutant et confirmé. La gestion des chiens, propriétaires, cours et inscriptions était assurée sur papier et tableurs, entraînant erreurs, manque de visibilité et désorganisation.'),

    buildSep('// objectifs de la mission'),
    buildUl([
      'Centraliser les informations dans une base de données unique (chiens, propriétaires, cours, séances, inscriptions)',
      'Offrir au grand public un accès en lecture aux cours et séances à venir',
      'Permettre aux membres (propriétaires) de gérer leur espace personnel : informations, chiens, inscriptions',
      'Donner à l\'administrateur un contrôle total sur l\'ensemble des entités',
      'Garantir la sécurité des accès via un système de rôles (ROLE_USER, ROLE_ADMIN) et une authentification sécurisée'
    ]),

    buildSep('// modèle conceptuel des données (MCD)'),
    p('Modélisation complète des entités et de leurs relations : Utilisateur, Propriétaire, Chien, Race, NiveauxApprentissage, Cours, Séance, Inscription.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_mcd.png','MCD — Modèle Conceptuel des Données'),
    '</div>',

    buildSep('// entités &amp; repositories'),
    strong('Entités Doctrine :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_entities.png','Liste des entités'),
      thumb('canispro_repositories.png','Liste des repositories'),
    '</div>',

    strong('Entité Chien.php — documentation &amp; relations :'),
    p('Chien est l\'entité centrale du domaine métier. Elle appartient à un Propriétaire, est catégorisée par une Race et un NiveauApprentissage, et peut être inscrite à plusieurs séances via ses Inscriptions.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_entity_chien_1.png','Chien.php — en-tête de classe'),
      thumb('canispro_entity_chien_2.png','Chien.php — relations ManyToOne'),
      thumb('canispro_entity_chien_relations.png','Chien.php — OneToMany Inscription + constructeur'),
    '</div>',

    strong('Entité Inscription.php — documentation &amp; relations :'),
    p('Inscription est la table de liaison entre Chien et Séance. Elle matérialise le fait qu\'un chien est inscrit à une séance planifiée. Elle porte à la fois la clé étrangère chien_id et seance_id.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_entity_inscription_2.png','Inscription.php — en-tête de classe'),
      thumb('canispro_entity_inscription_1.png','Inscription.php — nb_Chien_Inscrit'),
      thumb('canispro_entity_inscription_3.png','Inscription.php — ManyToOne Chien &amp; Séance'),
    '</div>',

    buildSep('// architecture MVC — controllers &amp; templates'),
    p('Architecture MVC complète avec Symfony. Séparation stricte : Contrôleurs, Entités Doctrine (ORM), Templates Twig. 4 contrôleurs distincts selon les rôles : Admin, Membre, Visiteur, Sécurité.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_controllers.png','Controllers — AdminController, MembreController, VisiteurController, SécuritéController'),
    '</div>',

    strong('Arborescence des templates Twig :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_templates_1.png','Templates — admin, chien, cours, inscription, membre'),
      thumb('canispro_templates_2.png','Templates — niveau_apprentissage, propriétaire, race, séance, sécurité'),
      thumb('canispro_templates_3.png','Templates — utilisateur, visiteur, base, index, menu'),
    '</div>',

    buildSep('// exemple 1 — modifier un chien (admin)'),
    p('L\'administrateur accède à la liste complète des chiens et peut modifier les informations de n\'importe quel chien.'),
    buildUl([
      'Modèle : <em>Chien.php</em> + <em>ChienType.php</em>',
      'Contrôleur : <em>AdminController.php</em> — méthode <em>edit()</em>',
      'Vues : <em>chien/index.html.twig</em> · <em>chien/edit.html.twig</em>'
    ]),

    strong('Liste admin des chiens :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_admin_liste_chiens_1.png','Liste admin — chiens sans données complètes'),
      thumb('canispro_admin_liste_chiens_2.png','Liste admin — chiens avec race, niveau et propriétaire'),
    '</div>',

    strong('Vue Twig — chien/index.html.twig (extrait) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_vue_admin_liste_chiens.png','Vue Twig — liste admin avec actions Voir/Modifier'),
    '</div>',

    strong('Formulaire de modification (visuel) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_admin_modifier_chien.png','Formulaire admin — Modifier un chien'),
    '</div>',

    strong('Vue Twig — chien/edit.html.twig :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_vue_chien_edit.png','Vue Twig — chien/edit.html.twig'),
    '</div>',

    strong('Contrôleur — AdminController::edit() :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_admin_controller_edit.png','AdminController.php — méthode edit()'),
    '</div>',

    strong('Formulaire Symfony — ChienType.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_chientype_form.png','ChienType.php — buildForm()'),
      thumb('canispro_chientype_options.png','ChienType.php — configureOptions()'),
    '</div>',

    buildSep('// exemple 2 — modifier son chien (membre)'),
    p('Chaque propriétaire connecté peut consulter ses chiens et modifier les informations de son propre chien uniquement. Le contrôleur récupère le chien manuellement via le repository pour gérer une 404 personnalisée.'),
    buildUl([
      'Modèle : <em>Chien.php</em>',
      'Contrôleur : <em>MembreController.php</em> — méthode <em>modifierUnChien()</em>',
      'Vues : <em>membre/espace_chien.html.twig</em> · <em>membre/modification_chien.html.twig</em>'
    ]),

    strong('Espace chien — vue membre :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_membre_chiens_chiot.png','Espace membre — chien niveau chiot'),
      thumb('canispro_membre_chiens_debutant.png','Espace membre — chien niveau débutant'),
    '</div>',

    strong('Vue Twig — membre/espace_chien.html.twig (card-actions) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_vue_membre_card.png','Vue Twig — card-actions membre chien'),
    '</div>',

    strong('Formulaire membre — modification_chien.html.twig :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_membre_form_chien.png','Visuel formulaire membre — WOUF! WOUF!'),
      thumb('canispro_vue_membre_form.png','Vue Twig — modification_chien.html.twig'),
    '</div>',

    strong('Contrôleur — MembreController::modifierUnChien() :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_membre_controller_edit.png','MembreController.php — modifierUnChien()'),
    '</div>',

    buildSep('// exemple 3 — supprimer une inscription (admin)'),
    p('Suppression sécurisée d\'une inscription avec token CSRF et confirmation JavaScript. La fonctionnalité est accessible aussi bien à l\'admin qu\'au membre via des routes distinctes, contrôlées par <em>is_granted(\'ROLE_ADMIN\')</em> dans le template Twig.'),
    buildUl([
      'Modèle : <em>Inscription.php</em>',
      'Contrôleur : <em>AdminController.php</em> — méthode <em>deleteInscription()</em>',
      'Vues : <em>inscription/index.html.twig</em> · <em>inscription/_delete_form.html.twig</em>'
    ]),

    strong('Liste des inscriptions :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_gestion_inscription_vide.png','Gestion inscription — liste vide'),
      thumb('canispro_gestion_inscription_card.png','Gestion inscription — card avec actions'),
    '</div>',

    strong('Vue Twig — inscription card-actions :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_vue_inscription_card.png','Vue Twig — card-actions inscription (VIEW, EDIT)'),
    '</div>',

    strong('Vue Twig — _delete_form.html.twig (gestion des rôles) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_delete_form_roles.png','_delete_form.html.twig — ROLE_ADMIN vs membre'),
    '</div>',

    strong('Confirmation de suppression :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_delete_confirm.png','Dialogue de confirmation — Are you sure?'),
    '</div>',

    strong('Contrôleur — AdminController::deleteInscription() :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('canispro_admin_delete_inscription.png','AdminController.php — deleteInscription() avec CSRF'),
    '</div>',

    buildSep('// compétences'),
    buildUl([
      '1.2 — Réponse aux demandes d\'assistance (gestion des accès et rôles ROLE_USER / ROLE_ADMIN)',
      '2.1 — Conception et développement d\'une solution applicative (Symfony, MVC complet)',
      '2.3 — Gestion des données (relations Doctrine ORM, BDD relationnelle MySQL)',
      '3.5 — Cyber sécurisation (authentification Symfony Security, CSRF, gestion des rôles)',
      '1.4 — Travail en mode projet (épreuve E6, équipe de développeurs)',
      '1.5 — Mise à disposition des utilisateurs (déploiement, tests)'
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
    '<div class="cmeta"><span>Janvier – Février 2026</span> · Paris · 2ème arrondissement</div>',

    buildSep('// l\'entreprise'),
    p('Entreprise de shooting photos créée en 2025, basée à Paris. Spécialisée dans la production dans le domaine du luxe. Dirigée par Mme Delage Karine.'),

    buildSep('// objectifs'),
    buildUl([
      'Création d\'un site de gestion de fournisseurs, clients, projets, factures et tournées',
      'Développement d\'une interface complète en architecture MVC/DAO avec couche de sécurité',
      'Mise en place de tests non-régressifs (TNR) avec PHPUnit pour fiabiliser l\'application',
      'Sécurisation : gestion des accès utilisateurs, protection injections SQL',
      'Documentation technique et utilisateur'
    ]),

    buildSep('// github &amp; versioning'),
    p('Projet versionné sur GitHub en équipe. 92 commits au total, 2 branches actives. Gestion des pull requests et intégration continue.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('studio29_github.png','Dépôt GitHub 29Studio — 92 commits, 9 contributeurs'),
    '</div>',

    buildSep('// base de données'),
    p('Conception et implémentation d\'une base de données relationnelle complète : Entreprises, Clients, Fournisseurs, Projets, Documents, Factures, Membres, Tournées, Étapes, Calendrier, Notifications et droits d\'accès (15+ tables liées).'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('29Studio_BDD.png','Schéma complet de la base de données'),
    '</div>',

    buildSep('// architecture MVC / DAO'),
    p('Architecture MVC complète avec couche DAO dédiée pour chaque entité métier. Séparation claire des responsabilités entre contrôleurs, modèles (classe métier + classe technique) et vues.'),

    strong('Contrôleurs :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('studio29_mvc_1.png','Liste des contrôleurs 29Studio'),
    '</div>',

    strong('Modèles :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('studio29_mvc_2.png','Modèles 29Studio — partie 1'),
      thumb('studio29_mvc_3.png','Modèles 29Studio — partie 2'),
      thumb('studio29_mvc_4.png','Modèles 29Studio — partie 3'),
    '</div>',

    strong('Vues :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('studio29_mvc_5.png','Liste des vues 29Studio'),
    '</div>',

    buildSep('// missions réalisées'),
    cyan('Analyse des besoins'),
    p('Recueil des besoins auprès de l\'équipe. Identification des fonctionnalités clés : fournisseurs, clients, projets, factures, documents, tournées. <em>Outils : réunions d\'équipe, Google Docs</em>'),
    cyan('Conception de l\'application'),
    p('Modélisation UML des classes métier. Conception de la BDD avec MCD. Définition de l\'architecture MVC/DAO. <em>Outils : MySQL Workbench, Google Docs</em>'),
    cyan('Développement du site web'),
    p('Développement d\'une interface utilisateur complète. Intégration des fonctionnalités CRUD pour toutes les entités métier (fournisseurs, clients, projets, factures, membres, tournées). <em>Outils : VSCode, Docker, GitHub</em>'),
    cyan('Tests non-régressifs (TNR) &amp; sécurité'),
    p('Mise en place de PHPUnit pour les tests unitaires non-régressifs. Authentification sécurisée (password_hash / password_verify). Gestion des rôles et droits d\'accès par projet. CAPTCHA anti-robot. Protection contre les injections SQL.'),
    cyan('Documentation'),
    p('Rédaction de la documentation technique (architecture, BDD, API interne) et de la documentation utilisateur (guide d\'utilisation, procédures).'),

    buildSep('// compétences'),
    buildUl([
      '2.1 — Conception et développement d\'une solution applicative (MVC/DAO complet)',
      '2.3 — Gestion des données (BDD relationnelle, 15+ tables, triggers SQL)',
      '1.5 — Mise à disposition des utilisateurs (tests PHPUnit/TNR, déploiement Docker)',
      '1.4 — Travail en mode projet (GitHub, 92 commits, gestion des branches)',
      '3.5 — Cyber sécurisation (authentification, hachage, rôles, CAPTCHA, anti-injection)',
      '2.2 — Maintenance corrective et évolutive (intégration continue, versioning)'
    ]),

    buildSep('// difficultés &amp; solutions'),
    buildUl([
      'Gestion de documents complexes → architecture documentaire dédiée',
      'Évolution des exigences en cours de stage → adaptation agile et commits fréquents',
      'Contrainte d\'unicité en BDD → refactoring avec triggers SQL',
      'BDD complexe (15+ tables liées) → modélisation MCD rigoureuse en amont'
    ]),

    buildSep('// bilan'),
    p('Expérience très enrichissante dans un environnement professionnel stimulant. Développement de compétences techniques avancées (MVC/DAO complet, PHPUnit/TNR, Docker) et travail en équipe réelle avec 9 contributeurs et 92 commits GitHub.'),
    buildTags(['PHP','MVC','DAO','PHPUnit','TNR','GitHub','Docker','MySQL'])
  ].join('')
};

// ═══════════════════════════════════════════
//  JOURNÉE D'INTÉGRATION
// ═══════════════════════════════════════════
MODAL_DATA['journeeintegration'] = {
  title: '🤝 Journée d\'intégration — Atelier pro',
  body: [
    '<div class="cmeta"><span>2ème année</span> · Atelier professionnel · MVC/DAO · GitHub</div>',

    buildSep('// langages &amp; outils'),
    buildTags(['PHP','HTML','CSS','GitHub','MVC','DAO']),

    buildSep('// contexte'),
    p('Atelier professionnel de 2ème année simulant une situation réelle d\'intégration dans une équipe de développement. Prise en main d\'un projet existant, compréhension de l\'architecture en place, et contribution rapide au code via la gestion de branches GitHub.'),

    buildSep('// architecture MVC / DAO'),
    p('Le projet suit une architecture MVC avec couche DAO. Chaque entité métier dispose de sa classe métier et de sa classe technique (DAO) pour l\'accès aux données.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('journee_mvc.png','Architecture MVC/DAO — Journée intégration'),
    '</div>',

    buildSep('// gestion de versions'),
    p('Utilisation de GitHub avec gestion de branches : branche principale, branche de développement, branches fonctionnelles. Suivi des différentes versions et historique des commits.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('journee_github.png','Versions GitHub — branches'),
    '</div>',

    buildSep('// exemple de fonctionnalité — modifier un développeur'),
    p('Fonctionnalité complète illustrant le fonctionnement MVC/DAO du projet : modification des informations d\'un développeur, accessible depuis la page À Propos.'),

    cyan('Modèle — Developpeur.php (classe métier)'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('journee_developpeur_php.png','Classe métier Developpeur.php'),
    '</div>',

    cyan('Contrôleur — gestionDeveloppeurs.php'),
    p('Méthode de modification d\'un développeur dans le contrôleur dédié.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('journee_controleur.png','Contrôleur gestionDeveloppeurs.php'),
    '</div>',

    cyan('Vue — aPropos.html'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('journee_vue.png','Vue aPropos.html'),
    '</div>',

    cyan('Visuel'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('journee_visuel.png','Rendu visuel de la page'),
    '</div>',

    buildSep('// ticket'),
    p('Ticket de demande d\'évolution traité lors de la journée, documentant la fonctionnalité à implémenter et son contexte.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('journee_ticket.png','Ticket de la fonctionnalité'),
    '</div>',

    buildSep('// compétences'),
    buildUl([
      '1.2 — Réponse aux incidents et demandes d\'assistance (traitement de ticket)',
      '2.1 — Conception et développement d\'une solution applicative (MVC/DAO)',
      '1.1 — Gestion du patrimoine informatique (gestion de versions GitHub)',
      '1.4 — Travail en mode projet (intégration dans une équipe existante)',
      '2.2 — Maintenance corrective ou évolutive (prise en main d\'un projet existant)'
    ])
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
  setTimeout(function() {
    var body = document.getElementById('modal-body');
    if (body && !body.querySelector('.tech-bar') && typeof buildTechBar === 'function') {
      var bar = buildTechBar(id);
      if (bar) body.insertAdjacentHTML('afterbegin', bar);
    }
  }, 30);
  setTimeout(function() {
    if (typeof window._particlesStart === 'function') window._particlesStart();
  }, 50);
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.getElementById('modal-box').style.display = 'none';
  document.body.style.overflow = '';
  if (typeof window._particlesStop === 'function') window._particlesStop();
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

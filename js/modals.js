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
    p('Expérience concrète dans un environnement professionnel. Développement de compétences techniques et organisationnelles. Sensibilisation aux enjeux du numérique responsable.')
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
      'Architecture MVC/DAO complète avec gestion des rôles (admin, éditeur, visiteur)',
      'Mise en place de tests non-régressifs (TNR) avec PHPUnit',
      'Sécurisation : droits SQL par rôle, protection injections SQL, audit log',
      'Documentation technique et utilisateur'
    ]),

    buildSep('// architecture du projet'),
    p('Le projet suit une architecture MVC stricte. Les contrôleurs gèrent chaque domaine métier, les modèles séparent classe métier et DAO, les vues PHP assurent le rendu. Un fichier <em>security.php</em> centralise le contrôle des accès.'),

    strong('Arborescence générale :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('archi.png','Arborescence — controleurs, modeles, vues, security.php, configBDD.php'),
    '</div>',

    strong('Contrôleurs (11 domaines métier) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('controleurs.png','Contrôleurs — Calendrier, Client, CyberSecurite, Document, Entreprise, Fournisseur, Membre, Notification, Projet, Renseignement, Tournee'),
    '</div>',

    strong('Modèles (classes métier + DAO) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('modele.png','Modèles — Appartient, AuditLog, Base, CaisseEtape, Calendrier, Client, Concerner, Document, DroitProjet, Entreprise, Etape, Facture, Fournisseur...'),
    '</div>',

    strong('Vues (20+ templates PHP) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('vues.png','Vues — ajout, consult, liste pour chaque entité métier'),
    '</div>',

    buildSep('// base de données'),
    p('Base de données relationnelle complète — 15+ tables liées : Membre, Entreprise, Projet, Document, Facture, Tournée, Étape, CaisseEtape, Calendrier, Notification, Renseignement, DroitProjet, Appartenir, Client, Fournisseur, Organisation, Concerner, AuditLog.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('BDD.png','Schéma complet de la base de données — toutes les relations'),
    '</div>',

    buildSep('// configuration BDD &amp; gestion des rôles'),
    p('Chaque entité métier dispose de comptes SQL dédiés par action (Read, Write, Delete, Update) — principe du moindre privilège. La connexion est établie dynamiquement selon le rôle requis via <em>setConnexionSelonRole()</em>.'),

    strong('Configuration DSN et rôles (configBDD.php) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('configBDD.png','configBDD.php — DSN MySQL, rôles ClientRead/Write/Delete'),
    '</div>',

    strong('Création des utilisateurs SQL :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('initBDD_CreationUtilisateurBase.png','CREATE USER — CaisseEtape_Read/Write/Delete/Update, Facture_Read/Write...'),
    '</div>',

    strong('Attribution des droits SQL :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('initBDD_DroitUtilisateurBase.png','GRANT SELECT/INSERT/DELETE/UPDATE par table et rôle'),
    '</div>',

    buildSep('// sécurité — audit log &amp; triggers'),
    p('Un système d\'audit complet trace toutes les modifications de la base de données. Des triggers SQL (AFTER INSERT/UPDATE/DELETE) alimentent la table <em>AuditLog</em> qui enregistre la table, l\'opération, l\'utilisateur responsable, l\'horodatage et les anciennes/nouvelles valeurs.'),

    strong('Table AuditLog :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('BDDLog.png','AuditLog — table_name, operation, record_id, user_responsible, change_timestamp, old_values, new_values, ip_address'),
    '</div>',

    strong('Triggers — liste complète (21 triggers) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('AudiLog.png','Triggers AFTER INSERT/UPDATE/DELETE sur Appartenir, Document, DroitProjet, Facture, Membre, Projet, Renseignement'),
    '</div>',

    buildSep('// exemple de fonctionnalité — liste des projets avec droits'),
    p('Fonctionnalité centrale illustrant la gestion des rôles : la liste des projets affichés et les actions disponibles (Voir/Modifier/Supprimer) varient selon le droit de l\'utilisateur (admin, éditeur, visiteur).'),

    strong('Contrôleur — case listeProjets :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('controleurCaseListeProjet.png','case listeProjets — récupération droits par projet, toutProjet si admin'),
    '</div>',

    strong('Vue — listeProjets.php (partie 1 — filtre &amp; bouton ajout) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('vueListeProjetv1.png','Vue listeProjets — bouton Ajouter si admin, filtre par projet'),
    '</div>',

    strong('Vue — listeProjets.php (partie 2 — table avec droits) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('vueListeProjetv2.png','Vue listeProjets — bouton Modifier masqué si visiteur, Supprimer si admin'),
    '</div>',

    buildSep('// gestion des droits par projet'),
    p('Chaque membre peut avoir un droit différent sur chaque projet : <strong>admin</strong> (accès total), <strong>éditeur</strong> (lecture + modification), <strong>visiteur</strong> (lecture seule). Un membre admin voit tous les projets de son entreprise.'),

    strong('Ajouter un membre au projet — visuel :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('siteAjouterMembreAuProjet.png','Formulaire ajout membre — sélection + droit Visiteur/Éditeur/Admin'),
    '</div>',

    strong('Membres du projet — liste avec droits :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('siteVoirLesMembreDuprojetTest.png','Membres du projet — DuPainChaine Visiteur (Ce projet) / Delage Karine éditeur (Tous)'),
    '</div>',

    strong('DAO — méthode ajouterDroitProjet() :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('methodeAjoutDroitProjet.png','DroitProjetDAO — ajouterDroitProjet() avec requête préparée INSERT'),
    '</div>',

    buildSep('// visuels — différence éditeur / visiteur'),
    strong('Vue projet — rôle éditeur (boutons Modifier disponibles) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('siteConsulterProjetEditeur.png','Détails projet — éditeur : boutons Modifier le projet visibles'),
    '</div>',

    strong('Vue projet — rôle visiteur (lecture seule) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('siteConsuterProjetVisiteur.png','Détails projet — visiteur : pas de bouton Modifier'),
    '</div>',

    strong('Vue membre hors admin — gestion compte :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('siteCompteHorsAdmin.png','Modifier un Membre — Nom, Prénom, login, mdp généré, sociétés associées'),
    '</div>',

    buildSep('// visuels — factures &amp; tournées'),
    strong('Liste des factures clients :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('siteFactureClient.png','Liste clients — Date, N°, Client, Projet, Libellé, HT, TVA, Échéance, Action (Lecture seule si visiteur)'),
    '</div>',

    strong('Consultation d\'une tournée — rôle éditeur :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('siteCaseEditeur.png','Tournée LaTournée — Étape #1, caisse, récapitulatif global CB/Espèces/TTC/HT/Écart'),
    '</div>',

    strong('Consultation d\'une tournée — rôle visiteur :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('siteCaseVisiteur.png','Tournée LaTournée — même vue sans boutons Modifier/Supprimer/Ajouter'),
    '</div>',

    buildSep('// compétences'),
    buildUl([
      '2.1 — Conception et développement d\'une solution applicative (MVC/DAO complet, 11 contrôleurs)',
      '2.3 — Gestion des données (BDD relationnelle 15+ tables, triggers SQL, AuditLog)',
      '1.5 — Mise à disposition des utilisateurs (TNR PHPUnit, déploiement Docker)',
      '1.4 — Travail en mode projet (GitHub, 92 commits, gestion des branches)',
      '3.1 — Protection des données à caractère personnel (Renseignement, RGPD)',
      '3.2 — Préservation de l\'identité numérique (audit log, traçabilité)',
      '3.3 — Sécurisation des accès (rôles admin/éditeur/visiteur, moindre privilège SQL)',
      '3.4 — Garantie disponibilité/intégrité/confidentialité (triggers AFTER, AuditLog complet)',
      '3.5 — Cyber sécurisation (requêtes préparées, password_hash, CAPTCHA)',
      '2.2 — Maintenance corrective et évolutive (intégration continue, versioning)'
    ]),

    buildSep('// difficultés &amp; solutions'),
    buildUl([
      'Gestion des droits par projet complexe → table DroitProjet + méthode trouverDroitProjet()',
      'Traçabilité des modifications → 21 triggers AFTER sur toutes les tables sensibles',
      'BDD 15+ tables liées → modélisation MCD rigoureuse, schéma validé en amont',
      'Évolution des exigences en cours de stage → adaptation agile, commits fréquents'
    ]),

    buildSep('// bilan'),
    p('Stage très enrichissant dans un environnement professionnel réel. Développement d\'une application complète de A à Z, avec une attention particulière portée à la sécurité (audit log, rôles SQL, triggers) et à la maintenabilité (architecture MVC/DAO, PHPUnit/TNR).')
  ].join('')
};

// ═══════════════════════════════════════════
//  JOURNÉE D'INTÉGRATION
// ═══════════════════════════════════════════
MODAL_DATA['journeeintegration'] = {
  title: '🤝 Journée d\'intégration — Atelier pro',
  body: [
    '<div class="cmeta"><span>2ème année</span> · Atelier professionnel · MVC/DAO · GitHub</div>',

    buildSep('// contexte'),
    p('Atelier professionnel de 2ème année simulant une situation réelle d\'intégration dans une équipe de développement. Prise en main d\'un projet PHP MVC/DAO existant — application <strong>"Journée d\'intégration"</strong> du BTS SIO du lycée Saint-John Perse. L\'objectif : comprendre l\'architecture en place, traiter des tickets de support et contribuer rapidement au code via la gestion de branches GitHub.'),

    buildSep('// architecture MVC / DAO'),
    p('Le projet suit une architecture MVC stricte avec couche DAO dédiée. Les contrôleurs (<em>gestionDeveloppeurs.php</em>, <em>gestionCompetence.php</em>) orchestrent la logique, les modèles séparent classe métier et accès BDD (BaseDAO, BaseDeveloppeurDAO, BaseCompetenceDAO), les vues PHP assurent le rendu.'),

    strong('Arborescence du projet :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('BaseMVC_Inte.png','Arborescence MVC — controleurs, modeles, vues'),
      thumb('baseDAO_Inte.png','Couche DAO — BaseDAO, BaseDeveloppeurDAO, BaseCompetenceDAO'),
    '</div>',

    buildSep('// gestion de versions — GitHub'),
    p('Utilisation de GitHub avec gestion de branches et versioning sémantique. Chaque version correspond à un incrément fonctionnel : de l\'initial commit jusqu\'à V4 avec la fonctionnalité de recherche.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('branche_Inte.png','Branches GitHub — main, suprimer-modifier, V2.2, V2.1'),
      thumb('version_Inte.png','Historique des commits — V4, v3, V2.2, V2.1, V1'),
    '</div>',

    buildSep('// configuration BDD &amp; gestion des accès'),
    p('La base de données <em>tp_sio2_bdjourneeintegration</em> est configurée via <em>configBdd.php</em> avec des rôles utilisateurs distincts selon les actions (lecture, modification, suppression). Chaque compte dispose uniquement des droits nécessaires — principe du moindre privilège.'),

    strong('Configuration DSN et rôles :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('configBDD_Inte.png','configBdd.php — DSN local/remote, rôles DevRead/CompRead'),
    '</div>',

    strong('Création des utilisateurs SQL :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('createUser_Inte.png','CREATE USER — JI_Dev_Read, CompModif, lili, lala...'),
      thumb('droitUtilisateur_Inte.png','GRANT — droits SELECT/UPDATE/DELETE par table et rôle'),
    '</div>',

    cyan('Méthode setConnexionSelonRole() — BaseDAO'),
    p('La connexion à la BDD est établie dynamiquement selon le rôle requis, en utilisant les variables d\'environnement définies dans configBdd.php.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('methodeConnexion_Inte.png','BaseDAO — setConnexionSelonRole($role)'),
    '</div>',

    buildSep('// exemple de fonctionnalité — modifier un développeur'),
    p('Fonctionnalité complète illustrant le fonctionnement MVC/DAO : modification des informations d\'un développeur depuis la page À Propos, avec requête préparée anti-injection SQL.'),

    strong('Modèle — Developpeur.php (classe métier) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('developpeur_Inte.png','Developpeur.php — id, nom, prenom, getters'),
    '</div>',

    strong('DAO — BaseDeveloppeurDAO — méthode modifDev() :'),
    p('Connexion avec le rôle <em>"lili"</em> (UPDATE autorisé), puis requête UPDATE avec les données du développeur.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('methodeModif_Inte.png','BaseDeveloppeurDAO — modifDev() avec setConnexionSelonRole'),
    '</div>',

    strong('Contrôleur — case modifDev dans gestionDeveloppeurs.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('caseModif_Inte.png','Contrôleur — case modifDev : POST → modifDev() → apropos.php'),
    '</div>',

    strong('Vue — modifDev.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('modifDev_Inte.png','Vue modifDev.php — formulaire Nom/Prenom avec action POST'),
    '</div>',

    strong('Vue — vueApropos.php (table des développeurs) :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('vueApropos.png','Vue apropos.php — tableau Nom/Prénom/Id/Supprimer/Modifier'),
    '</div>',

    strong('Visuels — résultat avant / après modification :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('resultatAprops_Inte.png','Page À Propos — liste développeurs avec actions'),
      thumb('visuelApropos_Inte.png','Page À Propos — après modification GUETTE Lala → Garry'),
      thumb('resultatMofier_Inte.png','Formulaire Modif Développeur — champs Nom/Prenom pré-remplis'),
    '</div>',

    buildSep('// fonctionnalité — lecture des salles (JSON)'),
    p('Ticket #25785 traité : affichage des salles depuis un fichier JSON externe via la classe <em>FichierJSON</em>. Les données (nom, type, capacité, nbOrdinateurs, vidéoprojecteur) sont lues dynamiquement à chaque mise à jour du fichier.'),

    strong('Données JSON — salle.json :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('salleJson_Inte.png','salle.json — salles 23/30/27 avec type, capacité, nbOrdinateurs'),
    '</div>',

    strong('Modèle — FichierJSON.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('FichierJson_Inte.png','FichierJSON.php — getLesSalles() via file_get_contents + json_decode'),
    '</div>',

    strong('Vue — vueSalle.php :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('vueSalle_Inte.png','Vue salles — foreach $lesSalles echo nom/type/capacité/nbOrd/vidéo'),
    '</div>',

    strong('Visuel — page Salles :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('visuSalle_Inte.png','Page Salles — liste des salles 23mixte, 30cours, 27ordinateurs'),
    '</div>',

    buildSep('// sécurité — requête préparée'),
    p('La fonctionnalité de recherche de développeur utilise des requêtes préparées PDO pour prévenir les injections SQL : <em>bindValue</em> avec <em>PDO::PARAM_STR</em> sur les paramètres <em>:nom</em> et <em>:prenom</em>.'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('requetePrepare.png','rechercheDeveloppeur() — requête préparée LIKE :nom/:prenom'),
    '</div>',

    buildSep('// tickets traités'),
    p('4 tickets issus du système de ticketing GLPI ont été traités lors de cet atelier :'),
    '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.4rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
      thumb('ticket1_Inte.png','Ticket #25782 — Mise à jour programme journée d\'intégration 2025'),
      thumb('ticket2_Inte.png','Ticket #25787 — Incident : erreur PDOException colonne prénon'),
      thumb('ticket3_Inte.png','Ticket #25783 — Compléments affichage ateliers (durée, capacité)'),
      thumb('ticket4_Inte.png','Ticket #25785 — Ajout fonctionnalité liste des salles (JSON)'),
    '</div>',

    buildSep('// compétences'),
    buildUl([
      '1.2 — Réponse aux incidents et demandes d\'assistance (4 tickets GLPI traités)',
      '2.1 — Conception et développement d\'une solution applicative (MVC/DAO PHP)',
      '1.1 — Gestion du patrimoine informatique (gestion de versions GitHub, branches)',
      '1.4 — Travail en mode projet (intégration dans une équipe existante)',
      '2.2 — Maintenance corrective ou évolutive (correction bug PDOException, évolutions)',
      '2.3 — Gestion des données (rôles SQL, requêtes préparées, lecture JSON)',
      '3.3 — Sécurisation des équipements et des usages (principe moindre privilège, anti-injection)'
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

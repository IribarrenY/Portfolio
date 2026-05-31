// ═══════════════════════════════════════════════════
//  TECH LOGOS — Portfolio Yohan IRIBARREN
//  Expose buildTechBar() — appelé depuis modals.js
// ═══════════════════════════════════════════════════
var TECH_LOGOS = {
  'HTML':         { color:'#e44d26', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M5 3l1.8 20.3L16 26l9.2-2.7L27 3H5z" fill="#e44d26"/><path d="M16 24.4V5.3h8.8L23.2 21.2 16 24.4z" fill="#f16529"/><path d="M9.9 13.3h6.1v-2.6H7.2l.2 2.1 2.6 7.1 5.9 1.6.1-.1v-2.7l-.1.1-3.2-.9-1.8-5.6z" fill="#ebebeb"/><path d="M16 10.7h6.2l-.5 5.2-5.7 1.6v2.7l5.2-1.4 1.7-9.2H16v1.1z" fill="#fff"/></svg>' },
  'CSS':          { color:'#264de4', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M5 3l1.8 20.3L16 26l9.2-2.7L27 3H5z" fill="#264de4"/><path d="M16 24.4V5.3h8.8L23.2 21.2 16 24.4z" fill="#2965f1"/><path d="M10 13.3l.3 3.4L16 18.3v-2.7l-3.1-.8-.2-2.1-2.7.6zm-.6-5h2.7l.2 1.9H16V7.7H7.1l.2 2.6 5.4 1.6H16v-2.5h-3.2l-.1-1.1H9.4z" fill="#ebebeb"/><path d="M16 13.3v2.6l3.1.8-.3 3.3-2.8.8v2.7l5.2-1.4.9-10.8H16z" fill="#fff"/><path d="M16 7.7v2.5h5.5l-.2 2-5.3 1.5v2.6l5.3-1.4.7-7.2H16z" fill="#fff"/></svg>' },
  'JavaScript':   { color:'#f7df1e', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#f7df1e"/><path d="M9.6 25.2c.6 1 1.4 1.7 2.8 1.7 1.2 0 1.9-.6 1.9-1.4 0-1-.8-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.5-3.6 3.9-3.6 1.7 0 2.9.6 3.8 2.1L14.3 19c-.5-.8-1-.1-1.5-.1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.4l.7.3c2.3 1 3.7 2 3.7 4.3 0 2.4-1.9 3.8-4.5 3.8-2.5 0-4.1-1.2-4.9-2.8L9.6 25.2zm10.9.5c.7 1.2 1.6 2.1 3.2 2.1 1.3 0 2.2-.7 2.2-1.6 0-1.1-.9-1.5-2.3-2.1l-.8-.3c-2.3-.9-3.8-2.2-3.8-4.7 0-2.4 1.9-4.3 4.8-4.3 2.1 0 3.6.7 4.7 2.6l-2.6 1.6c-.6-1-1.2-1.4-2.1-1.4-.9 0-1.5.5-1.5 1.3 0 .9.6 1.3 1.9 1.8l.8.3c2.7 1.2 4.2 2.4 4.2 5 0 2.9-2.3 4.5-5.3 4.5-3 0-4.9-1.4-5.8-3.3l2.4-1.5z" fill="#000"/></svg>' },
  'PHP':          { color:'#777bb4', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="16" rx="15" ry="9" fill="#777bb4"/><path d="M9.3 13h1.9l-.3 1.5h-1.9l.3-1.5zM8.4 17.5h1.9l.5-2.5h2.5c1.3 0 2-.6 2.3-1.9.3-1.4-.4-2.1-1.8-2.1H10L8.4 17.5zm12.3-4.5h1.9l-.3 1.5h-1.9l.3-1.5zm-1 4.5h1.9l.5-2.5h2.5c1.3 0 2-.6 2.3-1.9.3-1.4-.4-2.1-1.8-2.1h-3.8L19.7 17.5zm-4.5 0l.4-2h2.2l-.4 2H16l.3-1h-.5l-.3 1h-1.3z" fill="#fff"/></svg>' },
  'SQL':          { color:'#00758f', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#00758f"/><ellipse cx="16" cy="9" rx="9" ry="3.5" fill="#fff" opacity=".9"/><path d="M7 9v5c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V9c0 1.9-4 3.5-9 3.5S7 10.9 7 9z" fill="#fff" opacity=".7"/><path d="M7 14v5c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5v-5c0 1.9-4 3.5-9 3.5S7 15.9 7 14z" fill="#fff" opacity=".5"/></svg>' },
  'MySQL':        { color:'#00618a', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#00618a"/><path d="M24.7 22.3c-1.2 0-2.1.3-2.8.8-.2.2-.5.4-.5.7.1.4.6.5 1 .5.6.1 1.3 0 1.9-.2.5-.2 1-.5 1.4-.9v-.9c-.3 0-.6 0-.9 0zm1.3-1.6v-.2c0-.6-.1-1.3-.7-1.7-.5-.4-1.3-.5-1.9-.5-1.2 0-2.5.4-2.6 1.8l1.5.2c.1-.3.2-.6.5-.7.3-.2.7-.2 1-.2.4 0 .8.1 1 .4.2.3.2.6.2.9v.2c-.3 0-.7-.1-1.1-.1-1.2 0-2.8.3-2.8 1.9 0 1.2 1 1.8 2.1 1.8.8 0 1.5-.4 2-.9.1.2.2.5.3.7h1.5c-.2-.4-.4-.9-.4-1.4l.3-3.5c0-.6-.2-1.1-.6-1.5-.8-.7-2.2-.8-3.2-.8-.9 0-2 .2-2.7.8-.4.3-.6.7-.7 1.1l1.5.2c.2-.6.8-.9 1.4-.9.4 0 1 0 1.3.3.3.3.3.7.3 1.1V21h-.2zm-8.5-1.9L15.9 13h-1.5l1.5 7.5h1.2L20 13h-1.5L17.5 18.8zM7 13v7.5h1.5v-5.1l1.9 5.1h1.2l1.8-5.1v5.1H15V13h-2.1L11 18l-1.9-5H7z" fill="#fff"/></svg>' },
  'Git':          { color:'#f05032', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M29.5 14.5L17.5 2.5a1.7 1.7 0 00-2.4 0L12.7 4.9l3 3a2 2 0 012.6 2.6l2.9 2.9a2 2 0 012.6 2.6 2 2 0 11-3-.1l-2.7-2.7v7a2 2 0 11-2.4 1.9 2 2 0 011.4-1.9v-7a2 2 0 01-1.2-2.6L13 7.7 2.5 18.2a1.7 1.7 0 000 2.4l12 12a1.7 1.7 0 002.4 0l12.6-12.6a1.7 1.7 0 000-2.5z" fill="#f05032"/></svg>' },
  'GitHub':       { color:'#6e7681', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 2A14 14 0 002 16c0 6.2 4 11.4 9.5 13.3.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.3-.8.1-.8.1-.8 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.8-3.1-.4-6.4-1.6-6.4-6.9 0-1.5.5-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.1-.4 3.7 1.4a13 13 0 016.8 0c2.5-1.7 3.6-1.4 3.6-1.4.8 1.9.3 3.3.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.4-3.3 6.6-6.4 6.9.5.4 1 1.3 1 2.6v3.9c0 .4.3.8 1 .7A14 14 0 0016 2z" fill="#24292e"/></svg>' },
  'Docker':       { color:'#2496ed', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M28.7 13.6c-.3-.2-1-.7-2.9-.5-.2-1.9-1.5-3-1.7-3.1l-.4-.3-.3.4c-.4.6-.7 1.5-.7 2.3 0 .5.1 1.2.5 1.9-1.1.5-2.2.5-2.4.5H3.5c-.3 0-.5.2-.5.5 0 1.7.3 3.4 1.1 4.8.9 1.5 2.2 2.7 3.8 3.3 1.7.7 4.6.9 7 .9 1.3 0 2.6-.1 3.8-.3 1.7-.3 3.3-1 4.6-2.1 1.1-1 2-2.3 2.5-3.7.7 0 2.3.1 3.1-1.3.1-.1.4-.7.5-1l-.7-.3zM9 14.5H7.2v1.8H9V14.5zm2.2 0H9.4v1.8h1.8V14.5zm2.3 0h-1.8v1.8h1.8V14.5zm2.2 0h-1.8v1.8h1.8V14.5zm-6.7-2.2H7.2v1.8H9V12.3zm2.2 0H9.4v1.8h1.8V12.3zm2.3 0h-1.8v1.8h1.8V12.3zm2.2 0h-1.8v1.8h1.8V12.3zm2.3 0h-1.8v1.8h1.8V12.3zm-4.5-2.3h-1.8V12H16V10zm2.3 0h-1.8V12h1.8V10z" fill="#2496ed"/></svg>' },
  'VSCode':       { color:'#007acc', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M23.3 3L13 13.6 7.4 8.7 3 11.1v9.8l4.4 2.4L13 18.4 23.3 29l5.7-2.3V5.3L23.3 3zM27 24.5l-10-7.3 10-7.3v14.6z" fill="#007acc"/></svg>' },
  'WordPress':    { color:'#21759b', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#21759b"/><path d="M3.5 16c0-1.7.3-3.4.9-4.9l5 13.7C5.4 23 3.5 19.7 3.5 16zm12.5 12c-1.1 0-2.2-.2-3.2-.4l3.4-9.9 3.5 9.6c0 .1.1.2.1.3-1.2.3-2.5.4-3.8.4zm5.5-15.8c.5-1.2.6-2.3.6-3.2.9 1.6 1.4 3.4 1.4 5.3 0 2.4-.6 4.6-1.7 6.5l-3.5-10.4c.7-.8 1.2-1.8 1.2-2zM16 4.5c1.9 0 3.7.5 5.2 1.4-.1 0-.2 0-.3 0-1.5 0-2.6 1.3-2.6 2.7 0 1.2.7 2.2 1.5 3.4.6 1 1.2 2.2 1.2 4 0 .5 0 1-.1 1.5l-1.5 5-5.4-16.2C14.8 4.6 15.4 4.5 16 4.5zm-8.9 1.7L11.5 20 5.3 10.8c.8-1.7 2-3.2 3.8-4.6z" fill="#fff"/></svg>' },
  'Symfony':      { color:'#89c4e1', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#1a1a1a"/><path d="M16 5c-2.1 0-4.1.8-5.7 2.3-1.2 1.2-1.8 2.6-1.7 4 .1 1.5.9 2.4 2.1 2.4.9 0 1.5-.5 1.5-1.3 0-.5-.2-.9-.4-1.3-.3-.5-.5-.9-.5-1.3 0-1.2 1.2-2 2.7-2 2.1 0 3.3 1.2 3.3 3.2 0 2.9-2.3 5.5-5.1 7.4l.4.6c1.4-.9 2.6-1.8 3.7-2.9 1.4-1.4 2.3-3 2.3-4.8C18.6 6.9 17.6 5 16 5zm2.8 9.8c-.7 0-1.2.5-1.2 1.2 0 .9.7 1.4 1.7 1.8.8.3 1 .6 1 1.1 0 .7-.6 1.1-1.6 1.1-.8 0-1.5-.3-2.2-.8l-.4.5c.8.6 1.7 1 2.7 1 1.7 0 2.8-.9 2.8-2.2 0-1-.6-1.6-1.8-2-.7-.3-.9-.6-.9-1 0-.5.4-.8.9-.8.6 0 1.1.3 1.5.7l.4-.5c-.5-.7-1.2-1.1-2-1.1z" fill="#89c4e1"/></svg>' },
  'Twig':         { color:'#bacf2f', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#1a1a1a"/><path d="M5 18.5c3-5 8-8 13-8s9 3 9 7c0 3.5-3 6-7 6-3 0-5-1.5-5-3.5 0-1.5 1-2.5 2.5-2.5.8 0 1.5.4 2 1-1 .3-1.5.8-1.5 1.5 0 .8.7 1.3 1.7 1.3 1.5 0 2.5-1 2.5-2.5 0-2-2-3.5-5-3.5-4 0-7 2.5-8.5 6.5L5 18.5z" fill="#bacf2f"/></svg>' },
  'Doctrine':     { color:'#fc6a31', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#fc6a31"/><path d="M16 6c-5.5 0-9 2-9 5v10c0 3 3.5 5 9 5s9-2 9-5V11c0-3-3.5-5-9-5zm7 15c0 1.7-3 3-7 3s-7-1.3-7-3V11c0 1.7 3 3 7 3s7-1.3 7-3v10zm-7-9c-4 0-7-1.3-7-3s3-3 7-3 7 1.3 7 3-3 3-7 3z" fill="#fff"/></svg>' },
  'Markdown':     { color:'#083fa1', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="28" height="18" rx="3" fill="#083fa1"/><path d="M5 21V11l4 5 4-5v10H5zm14-5l3-3v8h-2v-5l-1 1.5-1-1.5v5h-2V13l3 3zm5 3l-3-3h2v-5h2v5h2l-3 3z" fill="#fff"/></svg>' },
  'PHPUnit':      { color:'#8892be', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#464b7c"/><path d="M6 10h5.5c2.5 0 4 1.2 4 3.2 0 2.1-1.5 3.3-4 3.3H8.5V20H6V10zm2.5 4.5h2.7c1.2 0 1.8-.5 1.8-1.3 0-.9-.6-1.3-1.8-1.3H8.5v2.6zM18 10h5.5c2.5 0 4 1.2 4 3.2 0 2.1-1.5 3.3-4 3.3H20.5V20H18V10zm2.5 4.5h2.7c1.2 0 1.8-.5 1.8-1.3 0-.9-.6-1.3-1.8-1.3H20.5v2.6z" fill="#fff"/><circle cx="10" cy="23" r="1.5" fill="#39ff88"/><circle cx="16" cy="23" r="1.5" fill="#39ff88"/><circle cx="22" cy="23" r="1.5" fill="#39ff88"/></svg>' },
  'NetBeans':     { color:'#1b6ac6', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#1b6ac6"/><path d="M7 16L13 8l12 8-12 8L7 16zm6-5.5v11l8.5-5.5-8.5-5.5z" fill="#fff"/></svg>' },
  'Agile':        { color:'#0052cc', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#0052cc"/><path d="M16 5a11 11 0 110 22A11 11 0 0116 5zm0 2a9 9 0 100 18A9 9 0 0016 7zm-1 2h2v7l-5 3-1-1.7 4-2.3V9z" fill="#fff"/></svg>' },
  'MVC':          { color:'#00c9aa', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#04182a"/><rect x="3" y="5" width="8" height="6" rx="1.5" fill="#00c9aa"/><rect x="12" y="5" width="8" height="6" rx="1.5" fill="#00e5ff"/><rect x="21" y="5" width="8" height="6" rx="1.5" fill="#39ff88"/><text x="7" y="11" font-size="4" fill="#04182a" text-anchor="middle" font-family="monospace" font-weight="bold">M</text><text x="16" y="11" font-size="4" fill="#04182a" text-anchor="middle" font-family="monospace" font-weight="bold">V</text><text x="25" y="11" font-size="4" fill="#04182a" text-anchor="middle" font-family="monospace" font-weight="bold">C</text><rect x="3" y="18" width="26" height="9" rx="1.5" fill="#062840" stroke="#0e4060" stroke-width="1"/><text x="16" y="24.5" font-size="5.5" fill="#00c9aa" text-anchor="middle" font-family="monospace" font-weight="bold">DAO</text></svg>' },
  'GanttProject': { color:'#e57a00', svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#1a1a1a"/><rect x="4" y="8" width="14" height="4" rx="1.5" fill="#e57a00"/><rect x="4" y="14" width="10" height="4" rx="1.5" fill="#f7b731"/><rect x="4" y="20" width="18" height="4" rx="1.5" fill="#e57a00"/><line x1="4" y1="6" x2="4" y2="26" stroke="#5a9090" stroke-width="1"/></svg>' },
};

var PROJECT_TECHS = {
  'cv-perso':           ['HTML','CSS','JavaScript'],
  'locaboard':          ['HTML','CSS','PHP','JavaScript'],
  'picdumidi':          ['WordPress','GanttProject','MVC'],
  'netcar':             ['HTML','CSS','SQL','Git','NetBeans'],
  'sitefa':             ['PHP','HTML','CSS','SQL','GitHub','Agile'],
  'journeeintegration': ['PHP','HTML','CSS','GitHub','MVC'],
  'canispro':           ['Symfony','PHP','Twig','Doctrine','MySQL','GitHub'],
  'domolandes':         ['Docker','GitHub','Markdown','VSCode'],
  'studio29':           ['PHP','MVC','PHPUnit','GitHub','Docker','MySQL','VSCode'],
};

function buildTechBar(projectId) {
  var techs = PROJECT_TECHS[projectId];
  if (!techs) return '';
  var light  = document.body.classList.contains('ocean-light');
  var bg     = light ? 'rgba(180,226,242,0.7)' : 'rgba(6,40,64,0.7)';
  var border = light ? '#7acde0' : '#0e4060';
  var color  = light ? '#002a3a' : '#c8f0ee';
  var html   = '<div class="tech-bar" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:4px 0 12px;">';
  for (var i = 0; i < techs.length; i++) {
    var t = techs[i], l = TECH_LOGOS[t];
    if (!l) continue;
    html += '<div class="tech-pill" title="' + t + '" style="'
      + 'display:inline-flex;align-items:center;gap:6px;background:' + bg + ';'
      + 'border:1px solid ' + border + ';border-radius:20px;padding:4px 10px 4px 5px;'
      + 'font-family:\'Share Tech Mono\',monospace;font-size:11px;color:' + color + ';'
      + 'cursor:default;transition:border-color .2s,box-shadow .2s;"'
      + ' onmouseover="this.style.borderColor=\'' + l.color + '\';this.style.boxShadow=\'0 0 8px ' + l.color + '55\'"'
      + ' onmouseout="this.style.borderColor=\'' + border + '\';this.style.boxShadow=\'none\'">'
      + '<div style="width:20px;height:20px;flex-shrink:0;border-radius:3px;overflow:hidden;">' + l.svg + '</div>'
      + t + '</div>';
  }
  return html + '</div>';
}

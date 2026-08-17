const wikiNav = [
  { group: 'Wiki', items: [
    ['index.html','Visão geral','home'],
    ['foundations.html','Foundations','palette'],
    ['components.html','Components','widgets'],
    ['patterns.html','Patterns','view_quilt'],
    ['motion.html','Motion','motion_mode']
  ]},
  { group: 'Protótipos', items: [
    ['screens.html','Screens & Flows','smartphone'],
    ['stitch-screenbook.html','Stitch Screenbook','dashboard_customize']
  ]},
  { group: 'Referência', items: [
    ['data/tokens.json','tokens.json','data_object']
  ]}
];

function renderWikiSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const current = location.pathname.split('/').pop() || 'index.html';
  const groups = wikiNav.map(section => {
    const links = section.items.map(([href,label,icon]) => {
      const active = current === href ? ' active' : '';
      return `<a class="nav-link${active}" data-nav href="${href}"><span class="material-symbols-outlined nav-icon">${icon}</span><span>${label}</span></a>`;
    }).join('');
    return `<div class="nav-group"><div class="nav-title">${section.group}</div>${links}</div>`;
  }).join('');

  sidebar.innerHTML = `
    <a class="brand-block" href="index.html" aria-label="Ono Pocket Design System">
      <div class="brand">ONO POCKET</div>
      <div class="version">DESIGN SYSTEM · v0.1</div>
    </a>
    ${groups}
    <div class="sidebar-foot mono">OBSIDIAN PROTOCOL<br>DOCS / UI REFERENCE</div>
  `;
}

function normalizeWikiFooter() {
  document.querySelectorAll('.footer').forEach(footer => {
    footer.classList.add('mono');
    footer.textContent = 'ONO POCKET DESIGN SYSTEM · v0.1 · DARK MODE · MOBILE-FIRST';
  });
}

function normalizeExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.rel = 'noopener noreferrer';
  });
}

renderWikiSidebar();
normalizeWikiFooter();
normalizeExternalLinks();

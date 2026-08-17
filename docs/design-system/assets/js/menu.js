const ONO_WIKI_MENU = [
  {
    group: 'Wiki',
    items: [
      ['index.html', 'Visão geral', 'home'],
      ['foundations.html', 'Foundations', 'palette'],
      ['components.html', 'Components', 'widgets'],
      ['patterns.html', 'Patterns', 'view_quilt'],
      ['motion.html', 'Motion', 'motion_mode']
    ]
  },
  {
    group: 'Protótipos',
    items: [
      ['screens.html', 'Fluxos & comportamento', 'account_tree'],
      ['stitch-screenbook.html', 'Stitch Screenbook', 'dashboard_customize']
    ]
  },
  {
    group: 'Referência',
    items: [
      ['data/tokens.json', 'tokens.json', 'data_object']
    ]
  }
];

function getWikiCurrentPage() {
  const page = location.pathname.split('/').pop();
  return page || 'index.html';
}

function renderWikiMenu() {
  const sidebar = document.getElementById('wiki-sidebar');
  if (!sidebar) return;

  const current = getWikiCurrentPage();

  const groups = ONO_WIKI_MENU.map(({ group, items }) => {
    const links = items.map(([href, label, icon]) => {
      const active = current === href ? ' active' : '';
      return `
        <a class="nav-link${active}" href="${href}"${active ? ' aria-current="page"' : ''}>
          <span class="material-symbols-outlined nav-icon" aria-hidden="true">${icon}</span>
          <span>${label}</span>
        </a>`;
    }).join('');

    return `
      <div class="nav-group">
        <div class="nav-title">${group}</div>
        ${links}
      </div>`;
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

renderWikiMenu();

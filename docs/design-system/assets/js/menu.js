const ONO_WIKI_ICONS = {
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8v9.7a.5.5 0 0 1-.5.5H15v-6H9v6H3.5a.5.5 0 0 1-.5-.5z"/></svg>',
  palette: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 1.3-3.1 1.9 1.9 0 0 1 1.3-3.2H18A3 3 0 0 0 21 12a9 9 0 0 0-9-9Zm-5 9.5a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm2.1-4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm5.8 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm2.2 4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"/></svg>',
  widgets: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/></svg>',
  patterns: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6zM11 7h2v10h-2zM7 11h10v2H7z"/></svg>',
  motion: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9v2H4zm0 4h13v2H4zm0 4h9v2H4zm12-9 4 6-4 6z"/></svg>',
  flow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm14 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8 6h6a4 4 0 0 1 4 4v3h-2v-3a2 2 0 0 0-2-2H8zm8 10H10a4 4 0 0 1-4-4v-1h2v1a2 2 0 0 0 2 2h6z"/></svg>',
  screen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18v13H3zm2 2v9h14V6zm4 13h6v2H9z"/></svg>',
  data: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h10l4 4v14H5zm2 2v14h10V8h-3V5zm2 6h6v2H9zm0 4h6v2H9z"/></svg>'
};

const ONO_WIKI_MENU = [
  {
    group: 'Wiki',
    items: [
      ['index.html', 'Visão geral', 'home'],
      ['foundations.html', 'Foundations', 'palette'],
      ['components.html', 'Components', 'widgets'],
      ['patterns.html', 'Patterns', 'patterns'],
      ['motion.html', 'Motion', 'motion']
    ]
  },
  {
    group: 'Protótipos',
    items: [
      ['screens.html', 'Fluxos & comportamento', 'flow'],
      ['stitch-screenbook.html', 'Stitch Screenbook', 'screen']
    ]
  },
  {
    group: 'Referência',
    items: [
      ['data/tokens.json', 'tokens.json', 'data']
    ]
  }
];

function getWikiCurrentPage() {
  const path = location.pathname.replace(/\/+$/, '');
  const page = path.split('/').pop();
  return page || 'index.html';
}

function renderWikiMenu() {
  const sidebar = document.getElementById('wiki-sidebar');
  if (!sidebar) return;

  const current = getWikiCurrentPage();
  const groups = ONO_WIKI_MENU.map(({ group, items }) => {
    const links = items.map(([href, label, icon]) => {
      const active = current === href ? ' active' : '';
      return `<a class="nav-link${active}" href="${href}"${active ? ' aria-current="page"' : ''}><span class="nav-icon" aria-hidden="true">${ONO_WIKI_ICONS[icon] || ''}</span><span>${label}</span></a>`;
    }).join('');
    return `<div class="nav-group"><div class="nav-title">${group}</div>${links}</div>`;
  }).join('');

  sidebar.innerHTML = `<a class="brand-block" href="index.html" aria-label="Ono Pocket Design System"><div class="brand">ONO POCKET</div><div class="version">DESIGN SYSTEM · v0.1</div></a>${groups}<div class="sidebar-foot mono">OBSIDIAN PROTOCOL<br>DOCS / UI REFERENCE</div>`;
}

renderWikiMenu();

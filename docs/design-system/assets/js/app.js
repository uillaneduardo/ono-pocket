function normalizeWikiFooter() {
  document.querySelectorAll('.footer').forEach(footer => {
    footer.classList.add('mono');
    footer.textContent = 'ONO POCKET DESIGN SYSTEM · v0.1 · DARK MODE · MOBILE-FIRST';
  });
}

function ensureSharedFonts() {
  if (!document.querySelector('link[data-ono-fonts]')) {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.dataset.onoFonts = 'true';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Material+Symbols+Outlined&display=swap';
    document.head.appendChild(fonts);
  }
}

function normalizeExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.rel = 'noopener noreferrer';
  });
}

ensureSharedFonts();
normalizeWikiFooter();
normalizeExternalLinks();

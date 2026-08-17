document.querySelectorAll('[data-nav]').forEach(a=>{
  const page = location.pathname.split('/').pop() || 'index.html';
  if(a.getAttribute('href') === page) a.classList.add('active');
});
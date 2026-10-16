const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
function closeMenu(){sidebar.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu ☰';}
menu.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close ×':'Menu ☰';});
sidebar.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&sidebar.classList.contains('open')){closeMenu();menu.focus();}});
const links=[...document.querySelectorAll('nav a')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}})},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main>section').forEach(section=>observer.observe(section));}
document.getElementById('year').textContent=new Date().getFullYear();

document.getElementById('y').textContent = new Date().getFullYear();
var btn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
btn.addEventListener('click', function(){
  var open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', function(e){ if(e.target.tagName==='A'){ menu.classList.remove('open'); btn.setAttribute('aria-expanded', false);} });
var formEl = document.getElementById('form');
if(formEl) formEl.addEventListener('submit', function(e){
  e.preventDefault();
  var n = nome.value.trim(), m = mail.value.trim(), t = testo.value.trim(), out = document.getElementById('msg');
  if(!n || !/^\S+@\S+\.\S+$/.test(m) || !t){ out.textContent = 'Compila nome, email valida e messaggio.'; return; }
  var body = 'Nome: '+n+'\nEmail: '+m+'\nMotivo: '+tema.value+'\n\n'+t;
  window.location.href = 'mailto:info@esempio.it?subject='+encodeURIComponent('Richiesta dal sito: '+tema.value)+'&body='+encodeURIComponent(body);
  out.textContent = 'Si apre il tuo programma di posta: invia l’email per completare la richiesta.';
});

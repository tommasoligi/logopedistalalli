document.getElementById('y').textContent = new Date().getFullYear();
var btn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
btn.addEventListener('click', function(){
  var open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', function(e){ if(e.target.tagName==='A'){ menu.classList.remove('open'); btn.setAttribute('aria-expanded', false);} });
var formEl = document.getElementById('form');
if(formEl){
  formEl.addEventListener('submit', function(e){
    e.preventDefault();
    var out = document.getElementById('msg');
    var n = formEl.nome.value.trim(), m = formEl.email.value.trim(), t = formEl.messaggio.value.trim();
    if(!n || !/^\S+@\S+\.\S+$/.test(m) || !t){ out.style.color = '#b3261e'; out.textContent = 'Compila nome, email valida e messaggio.'; return; }
    out.style.color = ''; out.textContent = 'Invio in corso...';
    fetch(formEl.action, { method: 'POST', body: new FormData(formEl), headers: { 'Accept': 'application/json' } })
      .then(function(r){ return r.json().then(function(d){ return { ok: r.ok, data: d }; }); })
      .then(function(res){
        if(res.ok && String(res.data.success) !== 'false'){
          out.textContent = 'Messaggio inviato! Ti rispondo al più presto.';
          formEl.reset();
        } else {
          out.style.color = '#b3261e';
          out.textContent = 'Invio non riuscito. Riprova o scrivimi direttamente per email.';
        }
      })
      .catch(function(){
        out.style.color = '#b3261e';
        out.textContent = 'Impossibile inviare: controlla la connessione e riprova.';
      });
  });
}

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

// Pulsante WhatsApp fisso in basso a destra, sempre visibile mentre si scorre
(function(){
  // Stile incluso qui: il pulsante funziona anche se style.css non è aggiornato
  var st = document.createElement('style');
  st.textContent = '.wa-float{position:fixed!important;right:16px;top:auto;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:9999;width:56px;height:56px;border-radius:50%;background:#25D366!important;color:#fff!important;display:flex!important;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.3);text-decoration:none}'
    + '.wa-float:hover{background:#1ebe5b!important}.wa-float svg{width:30px;height:30px;fill:#fff!important;flex:none}'
    + '@media (max-width:480px){.wa-float{width:52px;height:52px;right:12px}.wa-float svg{width:26px;height:26px}}';
  document.head.appendChild(st);
  var wa = document.querySelector('.wa-float');
  if(!wa){
    wa = document.createElement('a');
    wa.className = 'wa-float';
    wa.href = 'https://wa.me/393661211086?text=Buongiorno%2C%20vorrei%20avere%20informazioni%20e%20fissare%20una%20prima%20visita%20logopedica.%20Grazie.';
    wa.target = '_blank'; wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Scrivimi su WhatsApp');
    wa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
    document.body.appendChild(wa);
  }
})();

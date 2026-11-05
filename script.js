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

// Pulsante WhatsApp: scivola lungo il bordo destro seguendo lo scorrimento della pagina
(function(){
  var wa = document.querySelector('.wa-float');
  if(!wa) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur = 0, target = 0, raf = null;
  function calc(){
    var size = wa.offsetHeight || 58, margin = 16, topMin = 84;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.pageYOffset / max)) : 1;
    var bottom = window.innerHeight - size - margin;
    target = topMin + p * Math.max(0, bottom - topMin);
  }
  function step(){
    cur += (target - cur) * 0.12;
    if(Math.abs(target - cur) < 0.5){ cur = target; raf = null; }
    wa.style.top = cur + 'px';
    if(raf !== null) raf = requestAnimationFrame(step);
  }
  function update(){
    calc();
    if(reduce){ cur = target; wa.style.top = cur + 'px'; return; }
    if(raf === null) raf = requestAnimationFrame(step);
  }
  wa.classList.add('wa-follow');
  calc(); cur = target; wa.style.top = cur + 'px';
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
})();

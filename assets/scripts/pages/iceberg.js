const wrap = document.getElementById('wrap');
const solo = document.getElementById('solo');

// Applique les images dès le départ
wrap.querySelectorAll('.r').forEach(r=>{
  r.style.backgroundImage = `url(${r.dataset.img})`;
  r.addEventListener('click', ()=> showText(r.dataset.text));
});

function showText(txt){
  document.body.style.opacity = 0;  // fade-out

  setTimeout(()=>{
    solo.textContent = txt;
    solo.classList.add('show');
  }, 500);
}

solo.addEventListener('click', ()=>{
  solo.classList.remove('show');
  document.body.style.opacity = 1;
});

const grid = document.getElementById('grid');
    const main = document.getElementById('main');
    const detail = document.getElementById('detail');
    const imgDetail = document.getElementById('imageDetail');
    const texteDetail = document.getElementById('texteDetail');
    const retour = document.getElementById('retour');

    const mots = [
      { mot: 'Basilic Eternel', texte: 'Basilic Eternel', image: 'assets/images/plante/Basilic.JPG' },
      { mot: 'Ciboulette', texte: 'Ciboulette', image: 'assets/images/plante/Ciboulette.JPG' },
      { mot: 'Salvina', texte: 'Salvina', image: 'assets/images/plante/Salvina.JPG' },
      { mot: 'Trèfle Pourpre', texte: 'Trèfle Pourpre', image: 'assets/images/plante/Trèfle Pourpre.JPG' },
      { mot: 'Poireau', texte: 'Poireau', image: 'assets/images/plante/Poireau.JPG' }
    ];

    function genererMots() {
      grid.innerHTML = '';
      mots.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'word';
        btn.textContent = item.mot;
        btn.dataset.text = item.texte;
        btn.dataset.image = item.image;
        grid.appendChild(btn);
      });
    }
    genererMots();

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.word');
      if (!btn) return;

      btn.classList.add('fade');
      setTimeout(() => btn.classList.remove('fade'), 380);

      const text = btn.dataset.text || '';
      const image = btn.dataset.image || '';

      main.style.opacity = 0;
      setTimeout(() => {
        main.style.display = 'none';
        texteDetail.textContent = text;
        if (image) {
          imgDetail.src = image;
          imgDetail.style.display = 'block';
        } else {
          imgDetail.style.display = 'none';
        }
        detail.style.display = 'flex';
      }, 400);
    });

    retour.addEventListener('click', () => {
      detail.style.display = 'none';
      main.style.display = 'block';
      setTimeout(() => {
        main.style.opacity = 1;
      }, 100);
    });

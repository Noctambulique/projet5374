const container = document.getElementById('container');
    const resetBtn = document.getElementById('resetBtn');

    // sauvegarde l'HTML initial pour pouvoir réinitialiser
    const initialHTML = container.innerHTML;

    function formatTextLiteral(str){
      if(!str) return '';
      // remplace les doubles backslash-n (avec éventuellement des espaces entre) en <br><br>
      let s = str.replace(/\\n\s*\\n/g, '<br><br>');
      // puis remplace les simples backslash-n restants en <br>
      s = s.replace(/\\n/g, '<br>');
      return s;
    }

    // événement sur les rectangles
    container.addEventListener('click', e => {
      const card = e.target.closest('.card');
      if(!card) return;

      // récupère le texte depuis l'attribut data-text (le texte peut contenir des séquences \n)
      const raw = card.getAttribute('data-text') || '';
      const html = formatTextLiteral(raw);

      // remplace toute la grille par une zone blanche affichant le texte
      // ceci "chasse" les images (elles ne sont plus dans le DOM)
      container.innerHTML = `
        <div class="reader">
          <div class="content">${html}</div>
        </div>
      `;

      // met aussi le fond de la page en blanc (optionnel) pour que ce soit bien lisible
      document.body.style.background = '#ffffff';

      // scroll en haut pour mettre le texte en vue
      window.scrollTo({top:0,behavior:'smooth'});
    });

    // bouton réinitialiser : remet les images en place et restaure le fond d'origine
    resetBtn.addEventListener('click', () => {
      container.innerHTML = initialHTML;
      document.body.style.background = '#f3f4f6';
    });

    // --- Astuce pour éditer : si vous voulez mettre des "retours à la ligne" dans l'attribut data-text,
    // écrivez littéralement "\\n" (backslash + n). Pour obtenir un saut de paragraphe, écrivez "\\n \\n".

const input = document.getElementById('input');

    function convertirTexte(texte){
      if (!texte) return '';
      let s = texte.replace(/\r\n/g, '\n');
      s = s.replace(/\n{2,}/g, '\\n \\n ');
      s = s.replace(/\n/g, '\\n ');
      return s.trim();
    }

    function inverserTexte(texte){
      if (!texte) return '';
      let s = texte.replace(/\\n *\\n/g, '\n\n');
      s = s.replace(/\\n/g, '\n');
      return s.trim();
    }

    document.getElementById('convert').addEventListener('click', ()=>{
      input.value = convertirTexte(input.value);
    });

    document.getElementById('reverse').addEventListener('click', ()=>{
      input.value = inverserTexte(input.value);
    });

    document.getElementById('clear').addEventListener('click', ()=>{
      input.value = '';
    });

    document.getElementById('openWindow').addEventListener('click', ()=>{
      const newWin = window.open('', '_blank');
      newWin.document.write('<pre style="white-space: pre-wrap; font-family: monospace;">' + input.value.replace(/[&<>]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])) + '</pre>');
      newWin.document.title = 'Texte converti';
    });

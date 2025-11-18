const fileInput = document.getElementById('file');
    const sheetSelect = document.getElementById('sheetSelect');
    const previewWrap = document.getElementById('previewWrap');
    const htmlOut = document.getElementById('htmlOut');
    const generateBtn = document.getElementById('generate');
    const copyBtn = document.getElementById('copy');
    const downloadBtn = document.getElementById('download');
    const outType = document.getElementById('outType');
    const includeStyles = document.getElementById('includeStyles');

    let workbook = null;

    fileInput.addEventListener('change', async (e) => {
      const f = e.target.files[0];
      if(!f) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const data = ev.target.result;
        try{
          // lecture binaire du workbook
          const wb = XLSX.read(data, {type: 'binary'});
          workbook = wb;
          populateSheetList(wb.SheetNames);
          sheetSelect.disabled = false;
          renderPreview(sheetSelect.value || wb.SheetNames[0]);
        }catch(err){
          // fallback pour CSV (FileReader peut envoyer texte)
          try{
            const wb2 = XLSX.read(data, {type:'string'});
            workbook = wb2;
            populateSheetList(wb2.SheetNames);
            sheetSelect.disabled = false;
            renderPreview(sheetSelect.value || wb2.SheetNames[0]);
          }catch(e){
            previewWrap.innerText = 'Erreur de lecture du fichier : ' + e.message;
            htmlOut.value = '';
          }
        }
      };

      // lire en binaire si possible
      if(f.name.toLowerCase().endsWith('.csv')){
        reader.readAsText(f);
      }else{
        reader.readAsBinaryString(f);
      }
    });

    function populateSheetList(names){
      sheetSelect.innerHTML = '';
      names.forEach((s,i)=>{
        const opt = document.createElement('option');
        opt.value = s; opt.textContent = s;
        sheetSelect.appendChild(opt);
      });
    }

    sheetSelect.addEventListener('change', ()=>{
      renderPreview(sheetSelect.value);
    });

    function renderPreview(sheetName){
      if(!workbook) return;
      const sheet = workbook.Sheets[sheetName];
      if(!sheet){ previewWrap.innerText = 'Feuille introuvable.'; return; }
      const html = XLSX.utils.sheet_to_html(sheet, {id: 'sheet-table', editable: false});
      previewWrap.innerHTML = html;
      // small visual cleanup
      const tbl = previewWrap.querySelector('table');
      if(tbl){ tbl.style.borderCollapse = 'collapse'; tbl.querySelectorAll('td,th').forEach(c=>{ c.style.border='1px solid #ddd'; c.style.padding='6px' }); }
    }

    generateBtn.addEventListener('click', ()=>{
      if(!workbook){ alert('Chargez d’abord un fichier Excel.'); return; }
      const sheetName = sheetSelect.value || workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const tableHtml = XLSX.utils.sheet_to_html(sheet, {id: 'sheet-table', editable: false});

      if(outType.value === 'table'){
        let code = tableHtml;
        if(includeStyles.checked){
          code = `<style>table{border-collapse:collapse}table td,table th{border:1px solid #ddd;padding:6px}</style>\n` + code;
        }
        htmlOut.value = code;
      }else{
        // page complète
        const styles = includeStyles.checked ? `<style>body{font-family:system-ui,Arial;margin:20px}table{border-collapse:collapse}table td,table th{border:1px solid #ddd;padding:6px}</style>` : '';
        const full = `<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name=viewport content=width=device-width,initial-scale=1>\n<title>Table - ${escapeHtml(sheetName)}</title>\n${styles}\n</head>\n<body>\n<h1>Feuille: ${escapeHtml(sheetName)}</h1>\n${tableHtml}\n</body>\n</html>`;
        htmlOut.value = full;
      }
    });

    copyBtn.addEventListener('click', async ()=>{
      if(!htmlOut.value){ alert('Aucun code à copier.'); return; }
      try{
        await navigator.clipboard.writeText(htmlOut.value);
        alert('Code copié dans le presse-papiers.');
      }catch(e){
        // fallback
        htmlOut.select(); document.execCommand('copy');
        alert('Code copié (fallback).');
      }
    });

    downloadBtn.addEventListener('click', ()=>{
      if(!htmlOut.value){ alert('Générez le code avant de télécharger.'); return; }
      const blob = new Blob([htmlOut.value], {type: 'text/html'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'table.html';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });

    // small helper to escape title
    function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

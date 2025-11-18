const STORAGE_KEY = 'tasks_ultra_simple';
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const list = document.getElementById('list');
    const form = document.getElementById('taskForm');
    const titleInput = document.getElementById('title');
    const clearBtn = document.getElementById('clearBtn');

    function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }

    function addTask(title){ tasks.push({id:Date.now(),title,done:false}); save(); render(); }
    function toggle(id){ const t=tasks.find(x=>x.id===id); t.done=!t.done; save(); render(); }
    function del(id){ tasks = tasks.filter(t=>t.id!==id); save(); render(); }

    function render(){
      list.innerHTML="";
      if(tasks.length===0){ list.innerHTML='<p>Aucune tâche.</p>'; return; }

      tasks.forEach(t=>{
        const el = document.createElement('div');
        el.className = 'task' + (t.done ? ' done' : '');
        el.innerHTML = `<span>${t.title}</span>`;

        const btns = document.createElement('div');
        const b1 = document.createElement('button'); b1.className='btn-sm'; b1.textContent='✓'; b1.onclick=()=>toggle(t.id);
        const b2 = document.createElement('button'); b2.className='btn-sm'; b2.textContent='✖'; b2.onclick=()=>del(t.id);
        btns.appendChild(b1); btns.appendChild(b2);

        el.appendChild(btns);
        list.appendChild(el);
      });
    }

    form.addEventListener('submit', e=>{
      e.preventDefault();
      const title = titleInput.value.trim(); if(!title) return;
      addTask(title);
      form.reset();
    });

    clearBtn.addEventListener('click', ()=>{
      if(confirm('Tout supprimer ?')){ tasks=[]; save(); render(); }
    });

    render();

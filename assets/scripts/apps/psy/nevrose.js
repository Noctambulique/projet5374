const questions = [
      {id:1, text:"Je rejette parfois des aspects de moi que je trouve faibles ou indésirables."},
      {id:2, text:"Il m'arrive de vivre des situations différentes qui finissent pourtant par se ressembler."},
      {id:3, text:"Quand une émotion me dépasse, j’ai tendance à me distraire."},
      {id:5, text:"Certains de mes comportements semblent automatiques, comme dictés par un vieux scénario intérieur."},
      {id:6, text:"Je ressens parfois une inertie : savoir ce qu’il faudrait faire, sans parvenir à passer le cap."},
      {id:7, text:"Je cherche souvent à comprendre mes réactions par la logique plutôt qu’à les vivre pleinement."},
      {id:8, text:"Je garde parfois des habitudes ou des relations simplement parce qu’elles me sont familières."},
      {id:9, text:"L’idée de changer profondément suscite chez moi autant d’envie que d’appréhension."},
      {id:10, text:"Quand quelqu’un me confronte à un aspect de moi que je n’aime pas, ma première réaction est la défense."}
    ];

    const qContainer = document.getElementById('questions');

    function makeQuestion(q){
      const div = document.createElement('div');
      div.className = 'q';
      div.innerHTML = `
        <div class="text"><strong>${q.id}.</strong> ${q.text}</div>
        <div class="answers" role="radiogroup" aria-labelledby="q${q.id}">
          ${[1,2,3,4,5].map(n=>`
            <label>
              <input type="radio" name="q${q.id}" value="${n}" />
              <span class="btn">${n}</span>
            </label>`).join('')}
        </div>
      `;
      return div;
    }

    questions.forEach(q=> qContainer.appendChild(makeQuestion(q)));

    function getScore(){
      let score = 0; let answered = 0;
      for(const q of questions){
        const v = document.querySelector(`input[name=q${q.id}]:checked`);
        if(v){ score += parseInt(v.value,10); answered++; }
      }
      return {score, answered};
    }

    function interpret(score){
      if(score <15) return {
        level:'Faible — Peu de signes',
        desc:`Vous montrez peu de signes de stagnation ou de rejet intérieur. Vous êtes certainement en mouvement, ouvert aux différentes parts de vous-même.`
      };
      if(score <= 20) return {
        level:'Modéré — Boucle partielle',
        desc:`Il existe certains moments où vos schémas intérieurs semblent vous retenir. Identifier ces zones avec douceur peut déjà amorcer un changement durable.`
      };
      return {
        level:'Marqué — Boucle persistante',
        desc:`Vous semblez présenter plusieurs traits associés à des schémas répétitifs ou du refus intérieur. Explorer ces zones avec aide (écriture, thérapie, pratiques somatiques) pourrait vous donner un nouvel élan.`
      };
    }

    document.getElementById('submitBtn').addEventListener('click', ()=>{
      const {score, answered} = getScore();
      const box = document.getElementById('resultBox');
      if(answered < questions.length){
        box.hidden = false;
        box.innerHTML = `<strong>Complétez toutes les affirmations</strong><div class="interpret">Vous avez répondu ${answered} / ${questions.length} items.</div>`;
        return;
      }
      const it = interpret(score);
      box.hidden = false;
      box.innerHTML = `
        <div class="score">Score : ${score} / ${questions.length*5}</div>
        <div class="interpret"><strong>${it.level}</strong><div style="margin-top:8px">${it.desc}</div></div>
        <div class="reflection">Prenez un moment pour penser à ce que ce résultat signifie pour vous — ce test n’est qu’un miroir, c’est à vous de choisir ce que vous voulez en faire.</div>
      `;
    });

    document.getElementById('resetBtn').addEventListener('click', ()=>{
      document.getElementById('testForm').reset();
      const box = document.getElementById('resultBox'); box.hidden = true; box.innerHTML = '';
    });

    const firstRadios = document.querySelectorAll('input[type=radio]');
    if(firstRadios.length) firstRadios[0].tabIndex = 0;

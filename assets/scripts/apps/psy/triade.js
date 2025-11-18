const questions = [
      "J'ai un intérêt particulier pour l'humain",
      "Les gens manquent d'efficacité, c'est un vrai problème",
      "Les forums sont un lieu d'échange intéressants",
      "L'esthétique est très importante",
      "J'ai souvent vécu avec un Watson",
      "Je me fais souvent trahir",
      "J'ai des tendances nostalgiques",
      "La notion de pureté a ou a eu un jour de l'importance pour moi",
      "Il y a un lien entre forme et fond",
      "J'aime créer des univers dans la réalité",
      "J'ai un rapport particulier à la transgression",
      "J'ai un goût pour le conflit et le chaos",
      "Je me considère comme marginal",
      "La notion de puissance me parle",
      "Longtemps, je me suis laissé guider par le regard du sexe opposé",
      "Les gens disent que j'ai de l'ego",
      "Les gens introvertis m'apprécient",
      "Malgré moi, j'ai souvent une posture enseignante",
      "Mes émotions et sentiments ne me débordent jamais",
      "Je ne crains jamais le contact d'autrui"
    ];

    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
      document.getElementById("question").innerText = questions[currentQuestion];
    }

    function answer(isYes) {
      if(isYes) score++; // chaque "Oui" vaut 1 point
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }

    function getGrade(percentage) {
      if (percentage < 50) return "A";
      if (percentage < 60) return "B";
      if (percentage < 70) return "C";
      if (percentage < 80) return "D";
      if (percentage < 90) return "E";
      return "F";
    }

    function showResult() {
      document.getElementById("question-container").classList.add("hidden");
      const resultDiv = document.getElementById("result");
      resultDiv.classList.remove("hidden");

      const percentage = (score / questions.length) * 100;
      const grade = getGrade(percentage);

      resultDiv.innerHTML = `
        <h2>Résultats</h2>
        <div class="grade ${grade}">${grade}</div>
      `;
    }

    showQuestion();

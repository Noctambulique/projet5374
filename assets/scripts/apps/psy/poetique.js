// Questions et réponses
        const questions = [
            {
                text: "Sur la connaissance humaine",
                choices: ["On ne peut pas faire de généralités pour expliquer les comportements humains.", "Avec quelques principes on pourrait expliquer la plupart des comportements humains.", "Les comportements humains pourraient tous être expliqués par une théorie."],
                name: "q1"
            },
            {
                text: "Le plus important entre moi et les autres",
                choices: ["Respect", "Complicité", "Sincerité"],
                name: "q2"
            },
            {
                text: "Le plus important",
                choices: ["Ce que je sais", "Ce que je fais"],
                name: "q3"
            },
            {
                text: "Mon identité",
                choices: ["J'ai parfois l'impression d'être plusieurs personnes", "J'ai le sentiment d'être toujours le même"],
                name: "q4"
            },
            {
                text: "Mes préférences",
                choices: [" J'aime qu'on s'intéresse à moi", "J'aime qu'on m'emmène découvrir des choses"],
                name: "q5"
            }
        ];

        // Réponses personnalisées
        const responses = {
            "AAAAA": "Le renard porte l’automne dans sa queue.",
            "AAAAB": "Le paon porte des galaxies dans ses plumes.",
            "AAABA": "Le cerf porte un soleil entre ses bois",
            "AAABB": "L'araignée capture le soleil dans sa toile",
            "AABAA": "L'écureuil s'endort à l'ombre d'un vieux chêne",
            "AABAB": "Le chameau marche sous un ciel de solitude éternelle.",
            "AABBA": "Le cheval porte un souffle de tempête dans sa crinière.",
            "AABBB": "La panthère traverse la nuit sans jamais toucher le sol.",
            "ABAAA": "L’escargot avance sur l’infini de sa propre spirale.",
            "ABAAB": "La grenouille observe l’âme de l’eau.",
            "ABABA": "Le koala dort dans le creux d’une étoile.",
            "ABABB": "La chouette porte les ténèbres dans son bec",
            "ABBAA": "Le fennec porte l’écho du désert dans ses pas.",
            "ABBAB": "Le corbeau cache la nuit sous ses plumes.",
            "ABBBA": "Le hiboux scrute la noirceur des abîmes",
            "ABBBB": "La corneille s’épanouit dans l’ombre d’un rêve",
            "ACAAA": "Le crocodile cache l’éternité dans son regard.",
            "ACAAB": "La carpe remonte une cascade flamboyante",
            "ACABA": "Le poisson-lanterne éclaire la mer",
            "ACABB": "L’anguille trace des chemins d’éclats furtifs",
            "ACBAA": "Le morse rêve de glace éternelle et secrète.",
            "ACBAB": "La pieuvre s’efface dans l’encre noire",
            "ACBBA": "Le poulpe joue aux cartes avec le néant",
            "ACBBB": "Les carpes dansent sur l’eau noire des abysses",
            "BAAAA": "La nuit, la pie essaye de voler la lune",
            "BAAAB": "La raie est un fantôme qui danse sous l’eau.",
            "BAABA": "Le lion porte l’horizon dans sa crinière.",
            "BAABB": "La tortue emporte le monde sur son dos.",
            "BABAA": "La mouette porte l’océan dans son cri.",
            "BABAB": "La mouette porte les voix perdues du vent.",
            "BABBA": "La rose cache une pluie dans son cœur.",
            "BABBB": "Le vent frôle la feuille d’un dernier adieu.",
            "BBAAA": "Le paon déploie un ciel au bout de ses plumes.",
            "BBAAB": "Les nuées avalent la lumière du jour",
            "BBABA": "Le caméléon pense en couleurs.",
            "BBABB": "Le nuage étreint le vieux chêne solitaire.",
            "BBBAA": "L’albatros glisse sur les lignes du vent.",
            "BBBAB": "Le vautour plane dans la chaleur des adieux.",
            "BBBBA": "Le cerf traverse l’ombre d’une nuit sans fin.",
            "BBBBB": "Les nuées portent des ombres sans forme",
            "BCAAA": "Le corbeau rêve sur le toit glacé.",
            "BCAAB": "Le loup marche sous un ciel de fer.",
            "BCABA": "Le héron traverse l'étang d'un vol silencieux.",
            "BCABB": "L’écureuil saute d’arbre en arbre sans bruit.",
            "BCBAA": "L’araignée tisse un rêve entre deux mondes.",
            "BCBAB": "Le cactus souffre du murmure des hirondelles.",
            "BCBBA": "Le lézard lit le soleil sur les pierres.",
            "BCBBB": "L'éléphant danse sur les vagues du désert d'azur.",
            "CAAAA": "Le volcan souffle des éclats de lumière",
            "CAAAB": "Le paresseux glisse entre les heures.",
            "CAABA": "Le phasme oublie son corps dans la feuille.",
            "CAABB": "Le tigre traverse l’océan sur un tapis d’étoiles.",
            "CABAA": "Le hibou lit des livres la nuit.",
            "CABAB": "Le bison se repose sous un ciel fait de feu.",
            "CABBA": "Le flamant rose trace des arcs-en-ciel sous la pluie.",
            "CABBB": "Le pélican porte des rêves d’or sous ses ailes d’argent.",
            "CBAAA": "Le chameau traverse un ciel fait de sable et de verres.",
            "CBAAB": "Le panda grimpe un arbre fait de brume.",
            "CBBBB": "Le renne emporte l’aurore sur son dos.",
            "CBBBA": "Le bison disparaît dans une tempête d’étoiles.",
            "CBABA": "Le chameau porte le désert dans sa majesté infinie.",
            "CBBAB": "Le rhinocéros se cache derrière un voile de lumière.",
            "CBBAA": "Le panda veille dans la forêt d’un temps sacré.",
            "CBABB": "Le flamant rose danse sur les cieux de diamant.",
            "CCAAA": "Les galets portent des éclats de lumière oubliée",
            "CCBBB": "L'aigle dévore l'horizon avec ses ailes de feu.",
            "CCAAB": "Le faucon fend l’air comme une flèche de feu.",
            "CCABA": "Le mouton dort dans le souffle des collines.",
            "CCBAA": "Le lièvre écoute l’hiver sous la neige.",
            "CCBAB": "Le lapin court à travers des champs de neige.",
            "CCBBA": "Les coraux chantent dans la pénombre",
            "CCABB": "Le lézard se réchauffe sous des rayons d’or.",
            // Ajoutez d'autres combinaisons ici
        };

        // Récupère l'index de la question courante dans l'URL (ou 0 par défaut)
        const currentQuestion = parseInt(new URLSearchParams(window.location.search).get('q')) || 0;

        // Si aucune réponse n'est enregistrée, initialise un tableau vide
        let answers = JSON.parse(localStorage.getItem('answers')) || [];

        // Fonction pour rendre la question
        function renderQuestion() {
            const questionContainer = document.getElementById('questionContainer');
            const nextButton = document.getElementById('nextBtn');

            // Si on est à la fin du test, on affiche le résultat
            if (currentQuestion >= questions.length) {
                showResult();
                return;
            }

            // Charge la question courante
            const question = questions[currentQuestion];
            questionContainer.innerHTML = `
                <div class="question">
                    <label>${question.text}</label>
                    ${question.choices.map((choice, index) => `
                        <div>
                            <!-- Enregistre chaque réponse avec la valeur A, B, C, etc. -->
                            <input type="radio" name="${question.name}" value="${String.fromCharCode(65 + index)}" onclick="saveAnswer('${String.fromCharCode(65 + index)}')"> ${choice}
                        </div>
                    `).join('')}
                </div>
            `;

            // Désactive le bouton "Suivant" tant qu'aucune réponse n'est sélectionnée
            nextButton.disabled = true;
        }

        // Fonction pour sauvegarder la réponse sélectionnée
        function saveAnswer(answer) {
    answers[currentQuestion] = answer; // Enregistre la réponse dans le tableau
    localStorage.setItem('answers', JSON.stringify(answers)); // Sauvegarde dans localStorage
    document.getElementById('nextBtn').disabled = false; // Active le bouton "Suivant" immédiatement
}

        // Fonction pour aller à la question suivante
        function navigate() {
            // Incrémente l'index de la question et recharge la page avec le nouvel index
            window.location.href = `?q=${currentQuestion + 1}`;
        }

        // Fonction pour afficher le résultat à la fin du test
        function showResult() {
            const resultContainer = document.getElementById('questionContainer');
            const path = answers.join(''); // Crée un chemin comme "AAAAA"

            // Debugging : afficher les réponses et le chemin généré
            console.log("Réponses enregistrées :", answers);
            console.log("Chemin généré :", path);

            const resultText = responses[path] || "Votre personnalité est unique et difficile à définir simplement.";

            // Affiche le résultat
            resultContainer.innerHTML = `<div class="result">${resultText}</div>`;
            document.getElementById('nextBtn').style.display = 'none'; // Cache le bouton "Suivant"
        }

        // Nettoyer le stockage local une fois terminé
        window.addEventListener('beforeunload', () => {
            if (currentQuestion >= questions.length) {
                localStorage.removeItem('answers');
            }
        });

        // Initialisation
        renderQuestion();

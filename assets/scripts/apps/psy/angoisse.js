const phrasesList = document.getElementById("phrases");
        const generateButton = document.getElementById("generate-result");
        const resultBox = document.getElementById("result");

        let draggingItem;

        // Ajouter les événements de glisser-déposer
        phrasesList.addEventListener("dragstart", (e) => {
            if (e.target.tagName === "LI") {
                draggingItem = e.target;
                setTimeout(() => e.target.classList.add("invisible"), 0);
            }
        });

        phrasesList.addEventListener("dragend", (e) => {
            draggingItem = null;
            e.target.classList.remove("invisible");
        });

        phrasesList.addEventListener("dragover", (e) => {
            e.preventDefault();
            const currentItem = getDraggableAfter(phrasesList, e.clientY);
            if (currentItem == null) {
                phrasesList.appendChild(draggingItem);
            } else {
                phrasesList.insertBefore(draggingItem, currentItem);
            }
        });

        function getDraggableAfter(container, y) {
            const items = [...container.querySelectorAll("li:not(.invisible)")];
            return items.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }

        // Générer les résultats
        generateButton.addEventListener("click", () => {
            const orderedPhrases = [...phrasesList.querySelectorAll("li")].map(
                (item, index) => `${index + 1}. ${item.textContent.replace("×", "").trim()}`
            ).join("\n");
            resultBox.value = `Voici mon classement des phrases les plus angoissantes :\n${orderedPhrases}`;
            resultBox.select();
            document.execCommand("copy");
            alert("Résultats copiés dans le presse-papiers !");
        });

        // Supprimer une phrase
        phrasesList.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                e.target.parentElement.remove();
            }
        });

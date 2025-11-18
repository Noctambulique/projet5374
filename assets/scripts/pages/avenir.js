/*
  Personnalisez ici les textes affichés pour chaque position.
  Indices: 0 -> très décevant, 1 -> décevant, 2 -> bien, 3 -> merveilleux
*/
const labels = ["MISANTHROPE", "BANAL", "CLAN", "TRIADIQUE"];

/* Texte principal affiché pour chaque position — modifiez librement. */
const messages = [
  "J’ai tendance à penser ma vie comme un cycle de renaissances, marqué par des interruptions, des moments de rupture et des phases où tout recommence avec un nouveau paradigme, de nouvelles règles, de nouveaux comportements et des attitudes totalement différentes. D’une manière générale, ce qui est resté toutefois invariable au cours de ces derniers cycles, c’est une forme d’ingratitude et de manque d’efficacité chez les gens. D’une part, mes investissements n’ont pas toujours mené à une simple reconnaissance, et là où j’imaginais les relations sociales comme une sorte de pot commun dans lequel chacun donnerait sans trop regarder, je me suis souvent aperçu que j’étais le seul à y contribuer. Pourtant, je pense qu’il est important de garder espoir en l’humanité autant que possible, et de toujours partir en quête d’un cercle social au sein duquel nos aspirations peuvent se réaliser, même si cela est difficile. Ce n’est pas simplement une recherche, mais aussi un travail de réflexion sur soi et sur les autres. Toutefois, il existe selon moi des constantes : cette forme de générosité naturelle devrait être indispensable au sein d’un cercle d’amis. Ainsi, bien que le pot se brise régulièrement, j’ai toujours tenu à le reconstruire et à y remettre des pièces, à renaître sous des formes plus adaptées et plus justes, afin de mieux correspondre aux aspirations sociales qui étaient les miennes. Mais il est fort probable qu’un jour je n’ai plus l’énergie de reconstruire ce pot, et que je préfère alors l’isolement. Il existe également un problème d’efficacité qui me détachera probablement de l’humanité et me poussera vers la misanthropie : c’est le manque d’efficacité des gens. D’une manière générale, nous nous engageons dans certaines tâches parce que des pulsions, des émotions ou des sentiments nous poussent à nous réaliser à travers des objectifs personnels. Cela signifie que nous prenons rarement les choses extérieures à nous véritablement au sérieux. Le plus souvent, nous ne les considérons que sous l’angle de ce qu’elles reflètent de nous ou de ce que nous y avons investi. Cela révèle un manque de sérieux et d’efficacité qui semble isoler chacun dans sa propre subjectivité, enfermé en lui-même ; dans cette perspective, les relations sociales ne seraient alors que de simples malentendus.",
  "On passe notre temps à rêver que des choses extraordinaires pourraient nous arriver ; on imagine des futurs possibles, des scénarios grandioses. On se projette ici et là, et les circonstances de la vie nous poussent parfois à revoir nos ambitions à la hausse, comme si tout était sur le point de basculer en notre faveur. Mais il arrive aussi que l’on se retrouve seul, dans un square ou chez soi, avec l’impression que le monde avance sans nous. Comme si l’on était devenu un esprit, un fantôme, observant la vie défiler sans pouvoir y exercer la moindre influence. Alors, tous les rêves qu’on avait construits se désagrègent sous nos yeux. Par rapport à tout ce que l’on avait imaginé, la réalité se révèle profondément différente : on voit le temps passer, sans évoluer, sans atteindre ce que l’on avait espéré. Et l’on comprend que tout cela n’était peut-être qu’une belle illusion.",
  "Créer un clan.",
  "Je rencontrerai enfin les gens que je dois rencontrer. Nos talents s'uniraient pour n'en former qu'un, et réaliser la palingénésie."
];

const shortLabels = ["MISANTHROPE", "BANAL", "Bien", "Merveilleux"]; // version courte pour l'en-tête si souhaité

const slider = document.getElementById("slider");
const currentLabel = document.getElementById("currentLabel");
const message = document.getElementById("message");

// Initialise l'affichage en fonction de la valeur initiale
function updateDisplay(value){
  const v = Number(value);
  currentLabel.textContent = shortLabels[v] || labels[v] || v;
  message.textContent = messages[v] || "";
  slider.setAttribute("aria-valuenow", String(v));
}

// Événements : mise à jour en direct (input) et au changement (change)
slider.addEventListener("input", e => updateDisplay(e.target.value));
slider.addEventListener("change", e => updateDisplay(e.target.value));

// Accessibilité : permettre sauts (si l'utilisateur souhaite) via touches +/- (optionnel)
slider.addEventListener("keydown", e => {
  if (e.key === "+" || e.key === "=") {
    e.preventDefault();
    slider.stepUp();
    updateDisplay(slider.value);
  } else if (e.key === "-" || e.key === "_") {
    e.preventDefault();
    slider.stepDown();
    updateDisplay(slider.value);
  }
});

// initial
updateDisplay(slider.value);

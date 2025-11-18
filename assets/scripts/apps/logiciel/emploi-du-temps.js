const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById('progress-bar');
const title = document.getElementById('title');

const greenShades = [
    "#e8f5e9", "#d0f0d0", "#b8e8b8", "#a0e0a0",
    "#88d888", "#70d070", "#58c858", "#40c040",
    "#28b828", "#10b010"
];

const flowers = ['🌸','🌼','🌺','🌻','🌷','💐','🌹'];

const baseTexts = {};
const clickCount = {};

function randomFlowers(count = 6) {
    let res = '';
    for (let i = 0; i < count; i++) {
        res += flowers[Math.floor(Math.random() * flowers.length)] + " ";
    }
    return res.trim();
}

checkboxes.forEach(cb => {
    const label = document.querySelector(`label[for="${cb.id}"]`);
    const item = cb.closest('.todo-item');
    baseTexts[cb.id] = label.textContent;
    clickCount[cb.id] = 0;

    cb.addEventListener('change', () => {
        if (cb.checked) {
            clickCount[cb.id]++;
            if (clickCount[cb.id] === 2) {
                label.textContent = randomFlowers(8);
                item.classList.add('floral');
            } else {
                label.textContent = baseTexts[cb.id];
                item.classList.remove('floral');
            }
        } else {
            // On laisse le texte en l’état à la décoche
        }
        updateProgress();
    });
});

function updateProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const percent = (checked / total) * 100;
    progressBar.style.width = percent + '%';

    if (checked === total) {
        title.textContent = "⭐⭐ MISSION ACHEVÉE ⭐⭐";
        title.classList.add("completed");
        document.body.style.backgroundColor = "#fff9c4";
        progressBar.style.backgroundColor = "#FFD700";
        checkboxes.forEach(cb => cb.style.accentColor = "#4CAF50");
    } else {
        title.textContent = "Mes Objectifs 🌿";
        title.classList.remove("completed");
        updateBackground(checked);
        progressBar.style.backgroundColor = "#66bb6a";
        checkboxes.forEach(cb => cb.style.accentColor = "#66bb6a");
    }
}

function updateBackground(checkedCount) {
    const index = Math.min(checkedCount, greenShades.length - 1);
    document.body.style.backgroundColor = greenShades[index];
}

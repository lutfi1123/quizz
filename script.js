const pages = document.querySelectorAll(".page");
function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* SOAL */
let questions = [
    {
        q: "Apa kepanjangan HTML?",
        o: ["Hyper Text Markup Language", "High Tool Machine", "Home Tool Markup", "Hyperlink Test"],
        a: 0
    },
    {
        q: "CSS berfungsi untuk?",
        o: ["Logika", "Database", "Tampilan", "Server"],
        a: 2
    }
];

let index = 0;
let score = 0;
let time = 15;
let timer;
let playerName = "";

/* ELEMENT */
const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const finalScoreEl = document.getElementById("finalScore");

/* TIMER */
function startTimer() {
    time = 15;
    timerEl.textContent = "Waktu: " + time;

    timer = setInterval(() => {
        time--;
        timerEl.textContent = "Waktu: " + time;

        if (time === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

/* START QUIZ */
function startQuiz() {
    playerName = document.getElementById("playerName").value;

    if (!playerName) {
        alert("Masukkan nama dulu!");
        return;
    }

    index = 0;
    score = 0;
    showPage("quiz");
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    questionEl.textContent = questions[index].q;
    optionBtns.forEach((btn, i) => {
        btn.textContent = questions[index].o[i];
    });
    startTimer();
}

function checkAnswer(choice) {
    if (choice === questions[index].a) {
        score += 10;
    }
    clearInterval(timer);
}

function nextQuestion() {
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        saveRanking();
        finalScoreEl.textContent = "Skor kamu: " + score;
        showPage("score");
    }
}

/* ===== PERINGKAT ===== */

function saveRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({
        name: playerName,
        score: score
    });

    // Urutkan skor tertinggi
    ranking.sort((a, b) => b.score - a.score);

    // Simpan hanya 10 besar
    ranking = ranking.slice(0, 10);

    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function loadRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    const list = document.getElementById("rankingList");
    list.innerHTML = "";

    ranking.forEach((r, i) => {
        let li = document.createElement("li");
        li.textContent = `${r.name} - ${r.score}`;
        list.appendChild(li);
    });
}

/* AUTO LOAD RANKING */
document.querySelector("li[onclick=\"showPage('rank')\"]")
    .addEventListener("click", loadRanking);
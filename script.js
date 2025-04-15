const startBtn = document.getElementById("start-btn");
const gameArea = document.getElementById("game-area");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

// Начало игры
startBtn.addEventListener("click", startGame);

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    timerElement.textContent = `Время: ${timeLeft}`;
    gameArea.innerHTML = ""; // Очищаем поле

    startBtn.disabled = true; // Блокируем кнопку

    // Запускаем таймер
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Время: ${timeLeft}`;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Создаём звёзды каждую секунду
    gameInterval = setInterval(createStar, 1000);
}

// Создание звезды
function createStar() {
    const star = document.createElement("div");
    star.className = "star";

    // Случайная позиция
    const x = Math.random() * (gameArea.clientWidth - 30);
    const y = Math.random() * (gameArea.clientHeight - 30);

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    gameArea.appendChild(star);

    // Клик по звезде
    star.addEventListener("click", () => {
        score++;
        scoreElement.textContent = score;
        star.remove();
    });

    // Звезда исчезает через 1.5 секунды
    setTimeout(() => {
        if (star.parentNode === gameArea) {
            star.remove();
        }
    }, 1500);
}

// Конец игры
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    startBtn.disabled = false;
    alert(`Игра окончена! Ваш результат: ${score} очков!`);
}
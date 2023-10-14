const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if(hole === lastHole) {
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popOut() {
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up')
    setTimeout(function () {
        hole.classList.remove('up');
        if(!timeUp) popOut();
    }, time)
}

function startGame() {
    countdown = timeLimit / 1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(() => {
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(() => {
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            let topScore = timeLimit / 1000;
            let message = ''
            if (score >= topScore * 0.75) {
                message = 'FAST AF BRUH!';
            } else if (topScore * 0.5 < score && score < topScore * 0.75) {
                message = 'NOICE!';
            } else if (topScore* 0.25 < score && score <= topScore * 0.5) {
                message = 'MAN! ARE YOU EVEN TRYING?';
            } else {
                message = 'KEEP UP OLD MAN!';
            }
            countdownBoard.textContent = `TIMES UP! ${message}`;
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

function whack(e) {
    score++;
    this.style.backgroundImage = 'url("yoda2.png")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("yoda1.png")';
        this.style.pointerEvents = 'all';
    }, 800);
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack))
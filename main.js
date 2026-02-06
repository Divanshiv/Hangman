const WORDS = [
    { word: "JANUARY", hint: "The first month of the year." },
    { word: "BORDER", hint: "The edge or boundary of something." },
    { word: "IMAGE", hint: "A visual representation or picture." },
    { word: "FLIM", hint: "A thin layer or coating (often misspelled film)." },
    { word: "PROMISE", hint: "A declaration that one will do something." },
    { word: "KIDS", hint: "Young human beings." },
    { word: "LUNGS", hint: "Organs used for breathing." },
    { word: "DOLL", hint: "A small model of a human, used as a toy." },
    { word: "RHYME", hint: "Correspondence of sound between words." },
    { word: "DAMAGE", hint: "Physical harm that impairs value." },
    { word: "PLANTS", hint: "Living organisms like trees and flowers." }
];
const MAX_TURNS = 6;

let currentWordObj = {};
let targetWord = "";
let guessedLetters = new Set();
let remainingTurns = MAX_TURNS;

// DOM Elements
const wordDisplay = document.getElementById('word-display');
const hintDisplay = document.getElementById('hint-display');
const keyboard = document.getElementById('keyboard');
const turnsCount = document.getElementById('turns-count');
const statusMessage = document.getElementById('status-message');
const modal = document.getElementById('game-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const btnRestart = document.getElementById('btn-restart');
const mobileInput = document.getElementById('mobile-input');
const usedLettersList = document.getElementById('used-letters-list');

function initGame() {
    currentWordObj = WORDS[Math.floor(Math.random() * WORDS.length)];
    targetWord = currentWordObj.word;
    guessedLetters = new Set();
    remainingTurns = MAX_TURNS;

    // Reset UI
    updateWordDisplay();
    createKeyboard();
    updateHangman();
    hintDisplay.textContent = `Hint: ${currentWordObj.hint}`;
    usedLettersList.textContent = "";
    turnsCount.textContent = remainingTurns;
    statusMessage.textContent = "Unmask the mystery word, or face the gallows.";
    statusMessage.className = "status-message";
    modal.classList.remove('active');
    document.querySelector('.game-container').classList.remove('shake');

    // Clear hangman parts
    document.querySelectorAll('.part').forEach(part => part.classList.remove('visible'));
}

function updateWordDisplay() {
    wordDisplay.innerHTML = "";
    [...targetWord].forEach(letter => {
        const slot = document.createElement('div');
        slot.className = `letter-slot ${guessedLetters.has(letter) ? 'revealed' : ''}`;
        slot.textContent = guessedLetters.has(letter) ? letter : "";
        wordDisplay.appendChild(slot);
    });

    checkGameStatus();
}

function createKeyboard() {
    keyboard.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(char => {
        const key = document.createElement('button');
        key.className = 'key';
        key.textContent = char;
        key.addEventListener('click', () => handleGuess(char));
        keyboard.appendChild(key);
    });
}

function handleGuess(letter) {
    if (guessedLetters.has(letter) || remainingTurns <= 0 || modal.classList.contains('active')) return;

    guessedLetters.add(letter);

    const key = [...keyboard.children].find(k => k.textContent === letter);
    if (key) {
        key.disabled = true;
        if (targetWord.includes(letter)) {
            key.classList.add('correct');
        } else {
            key.classList.add('wrong');
            remainingTurns--;
            turnsCount.textContent = remainingTurns;
            updateHangman();

            // Add shake animation to container on wrong guess
            const container = document.querySelector('.game-container');
            container.classList.remove('shake');
            void container.offsetWidth; // Trigger reflow
            container.classList.add('shake');
        }
    }

    updateWordDisplay();
    updateUsedLetters();
}

function updateUsedLetters() {
    usedLettersList.textContent = [...guessedLetters].sort().join(", ");
}

function updateHangman() {
    const partsCount = MAX_TURNS - remainingTurns;
    for (let i = 0; i < partsCount; i++) {
        const part = document.getElementById(`part-${i}`);
        if (part) part.classList.add('visible');
    }
}

function checkGameStatus() {
    const isWon = [...targetWord].every(letter => guessedLetters.has(letter));
    const isLost = remainingTurns <= 0;

    if (isWon) {
        setTimeout(() => showGameOver(true), 500);
    } else if (isLost) {
        setTimeout(() => showGameOver(false), 500);
    }
}

function showGameOver(isWon) {
    modal.classList.add('active');
    modalTitle.textContent = isWon ? "ASCENSION" : "DEFEAT";
    modalTitle.className = isWon ? "win" : "lose";
    modalMessage.innerHTML = isWon ?
        `Divine intuition! The word was indeed <strong>${targetWord}</strong>` :
        `The shadows claim you. The word was <strong>${targetWord}</strong>`;
}

// Physical keyboard and mobile input support
window.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key) && !modal.classList.contains('active')) {
        handleGuess(key);
    }
});

// Trigger mobile keyboard on tap
document.addEventListener('click', () => {
    if (window.innerWidth <= 768 && !modal.classList.contains('active')) {
        mobileInput.focus();
    }
});

mobileInput.addEventListener('input', (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length > 0) {
        const char = value[value.length - 1];
        if (/^[A-Z]$/.test(char)) {
            handleGuess(char);
        }
        e.target.value = ""; // Clear for next input
    }
});

btnRestart.addEventListener('click', initGame);

// Load game
initGame();

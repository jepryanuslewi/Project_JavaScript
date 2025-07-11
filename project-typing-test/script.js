const word = [
    'The quick brown fox jumps over the lazy dog.',
    'i wanna go to the party tonight',
    'we can do anything what you want',
    'the dog Is very happy',
    'if you need help just call me',
    'you is so cool dan very hot',
]


const textToTypeElemen = document.getElementById('text-to-type');
const userInput = document.getElementById('user-input');
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('word-per-minute');

let startTime;
let currentword = 0;
let timeLeft = 60;
let timeInterval;
let currentIndex = 0;

function randomWord(word) {
    currentIndex = Math.round(Math.random() * (word.length - 1));
    console.log(currentIndex);
    textToTypeElemen.textContent = word[currentIndex];
}

function startTest() {
    const start = new Date();
    startTime = start.getTime() / 1000;
    randomWord(word);
    timeLeft = 60;
    userInput.value = '';
    userInput.disabled = false;
    timeDisplay.textContent = timeLeft;
    userInput.focus();
    clearInterval(timeInterval);
    timeInterval = setInterval(updateTime, 1000);
}

function updateTime() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timeInterval);
        userInput.disabled = true;
        showWpm();
    }
}

function showWpm() {
    const end = new Date().getTime() / 1000;
    const timeused = end - startTime;
    const wpm = (currentword / timeused) * 60;
    console.log(wpm);
    wpmDisplay.textContent = `${Math.round(wpm)}`;
}

function checkWord() {
    const textToType = textToTypeElemen.textContent.split(' ');
    console.log(textToType);
    const wordInput = userInput.value.split(' ');
    console.log(wordInput);
    textToTypeElemen.innerHTML = textToType.map(word => `<span>${word}</span>`).join(' ');
    const span = textToTypeElemen.querySelectorAll('span');
    let current = 0;
    span.forEach((spans, index) => {
        if (wordInput[index] === textToType[index]) {
            spans.className = 'correct';
            current++;
        } else if (wordInput[index].length < textToType[index].length) {
            spans.className = '';
        } else if (wordInput[index != textToType[index]]) {
            spans.className = 'incorrect';
        } else {
            spans.className = 'incorrect';
        }
    });
    currentword = current;

    if ((wordInput.length - 1) >= textToType.length) {
        clearInterval(timeInterval);
        userInput.disabled = true;
        showWpm();
    }
}



userInput.addEventListener('input', checkWord);
startButton.addEventListener('click', startTest);
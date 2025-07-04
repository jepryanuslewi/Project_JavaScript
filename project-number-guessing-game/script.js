let randomNumber = Math.floor(Math.random() * 100 +1);
let attemps = 0;
console.log(randomNumber);

// get element html
let guesInput = document.getElementById('guessInput');
const guesButton = document.getElementById('guessButton');
const playAgain = document.getElementById('playAgain');
const message = document.getElementById('message');

function checkNumber() {
    let userGuess = Number(guesInput.value);
    attemps++;
    if (userGuess === randomNumber) {
        message.innerText = 'Congratulation You Guess Is Corrected, You Try ' + attemps + ' times';
        message.style.color = 'aqua';
        endGame();
    } else if (userGuess > randomNumber) {
        message.innerText = 'Ohh Your Guess Is Higher Than The Number'
        message.style.color = 'red';
    } else if (userGuess < randomNumber) {
        message.innerText = `ohh Your Guess Is Lower Than The Number`
        message.style.color = 'red';
    }
    guesInput.value = ''
    guesInput.focus();
}

function endGame() {
     guesButton.disabled = true;
     guesInput.disabled = true;
     playAgain.style.display = 'inline';
}

function restartGame() {
    attemps = 0
    guesButton.disabled = false;
    guesInput.disabled = false;
    playAgain.style.display = 'none';
    randomNumber = Math.floor(Math.random() * 100 + 1);
    message.innerText = 'Good Luck! Start Guess...'
    guesInput.value = '';
    guesInput.focus();
    console.log(randomNumber);
}

guesButton.addEventListener('click', checkNumber);
playAgain.addEventListener('click', restartGame);
guesInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkNumber();
    }
})
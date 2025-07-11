const quizData = [
  {
    question: "Apa ibu kota Indonesia?",
    answer: [
      { text: 'Pontianak', corect: false },
      { text: 'Medan', corect: false },
      { text: 'Jakarta', corect: true },
      { text: 'Monas', corect: false },
    ]
  },
  {
    question: "Siapa penemu lampu pijar?",
    answer: [
      { text: 'Nikola Tesla', corect: false },
      { text: 'Thomas Edison', corect: true },
      { text: 'Albert Einstein', corect: false },
      { text: 'Isaac Newton', corect: false },
    ]
  },
  {
    question: "Apa hasil dari 2 + 2 x 2?",
    answer: [
      { text: '6', corect: true },   // 2 + (2x2)
      { text: '8', corect: false },
      { text: '4', corect: false },
      { text: '10', corect: false },
    ]
  },
  {
    question: "Bahasa pemrograman mana yang berjalan di browser?",
    answer: [
      { text: 'Python', corect: false },
      { text: 'Java', corect: false },
      { text: 'C++', corect: false },
      { text: 'JavaScript', corect: true },
    ]
  },
  {
    question: "Apa nama planet terbesar di tata surya?",
    answer: [
      { text: 'Mars', corect: false },
      { text: 'Saturnus', corect: false },
      { text: 'Bumi', corect: false },
      { text: 'Jupiter', corect: true },
    ]
  }
];


let currentQuestionIndex = 0;
let score = 0;

// Ambil Semua Element
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerBtn = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElemen = document.getElementById('score');
const restart = document.getElementById('restart-btn');

// create function to start quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.style.display = 'none';
  resultContainer.style.display = 'none';
  questionContainer.style.display = 'block';

  // function to display quiz
  showQuestion();
}

function showQuestion() {
  // resset state
  resetState();

  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // create button for the answer
  currentQuestion.answer.forEach(answer => {
    const buttonAnswer = document.createElement('button');
    buttonAnswer.textContent = answer.text;
    buttonAnswer.classList.add('answer-btn');
    if (answer.corect) {
      buttonAnswer.dataset.correct = answer.corect;
    }
    buttonAnswer.addEventListener('click', selectAnswer);
    answerBtn.appendChild(buttonAnswer);
    console.log(buttonAnswer)
  })
}

function resetState() {
  nextBtn.style.display = 'none';
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const correct = selectBtn.dataset.correct === 'true';
  if (correct) {
    score++;
    selectBtn.style.backgroundColor = 'green';
  } else {
    selectBtn.style.backgroundColor = 'red';
  }
  Array.from(answerBtn.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.corret) {
      button.style.backgroundColor = 'green';
    }
  })

  // tampilkan pertanyaan selanjutnya
  if (currentQuestionIndex < quizData.length - 1) {
    nextBtn.style.display = 'inline-block';
  } else {
    showResult();
  }
}

// handle event Listener for nextQuestion{
nextBtn.addEventListener('click', ()=>{
  currentQuestionIndex++;
  showQuestion();
});

function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElemen.textContent = `Your Score : ${score} / ${quizData.length}`
}

restart.addEventListener('click', startQuiz);


startQuiz();
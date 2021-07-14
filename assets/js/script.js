// Global Variables
var score = 0;
var time = 120;
var count = 0;
var scores = JSON.parse(localStorage.getItem('submitHighScores')) || [];

// DOM Elements
var startPage = document.getElementById('start-page');
var startBtnEl = document.getElementById('start-btn');
var timerEl = document.getElementById('time');
var h3StartPageEl = document.getElementById('quiz-title');
var optionsEl = document.getElementById('options');
var optionsButtonsEl = document.getElementById('option-btns');
var questionHeaderEl = document.getElementById('question-header');
var btn1El = document.getElementById('btn-1');
var btn2El = document.getElementById('btn-2');
var btn3El = document.getElementById('btn-3');
var btn4El = document.getElementById('btn-4');
var correctWrongEl = document.getElementById('correct-wrong');
var quizCompleteEl = document.getElementById('quiz-complete');
var currentScoreEl = document.getElementById('current-score');
var submitScoreEl = document.getElementById('submit-score-btn');
var highScoresEl = document.getElementById('high-scores');
var hsListEl = document.getElementById('hs-list');
var hsNavEl = document.getElementById('hs-nav');
var startOverEl = document.getElementById('start-over');
var clearScoresEl = document.getElementById('clear-scores');

// Quiz Questions, Choices and Answers
var questions = [
  {
    q: 'Commonly used data types DO NOT include:',
    c: ['strings', 'booleans', 'alerts', 'numbers'],
    a: 'alerts',
  },
  {
    q: 'The condition in an if / else statement is enclosed within ________.',
    c: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    a: 'parentheses',
  },
  {
    q: 'Arrays in Javascript can be used to store ____.',
    c: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    a: 'all of the above',
  },
  {
    q: 'String values must be enclosed within _____when being assigned to variables.',
    c: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    a: 'quotes',
  },
  {
    q: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    c: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    a: 'console.log',
  },
];

// Function that starts game (triggered by 'Start Quiz' button)
const startGame = function () {
  hideSection(startPage);
  showSection(optionsEl);
  timer();
  questionIndex(count);
};

// Go to start page
const startOver = function () {
  window.location.href = '/index.html';
};

// Hide section by class
var hideSection = function (sectionClass) {
  sectionClass.className = 'hide';
};

// Show section by class
var showSection = function (sectionClass) {
  sectionClass.classList.remove('hide');
};

// Start timer
function timer() {
  setInterval(function () {
    if (time === 0 || count === questions.length) {
      document.getElementById('time').innerHTML = 'Complete';
    } else {
      document.getElementById('time').innerHTML = time;
    }
    time--;
  }, 1000);
}

// Keeps track of current question within array
var questionIndex = function (count) {
  if (count < questions.length) {
    showQuestion(count);
  } else {
    quizComplete();
  }
};

// Shows question within array, based on question index function
var showQuestion = function (count) {
  questionHeaderEl.textContent = questions[count].q;
  btn1El.textContent = questions[count].c[0];
  btn2El.textContent = questions[count].c[1];
  btn3El.textContent = questions[count].c[2];
  btn4El.textContent = questions[count].c[3];
};

// Checks if the answer is correct / wrong
const checkAnswer = function (btnText) {
  if (count < questions.length + 1) {
    if (btnText === questions[count].a) {
      count++;
      score += 20;
      questionIndex(count);
      showSection(correctWrongEl);
      correctWrongEl.textContent = 'Correct';
    } else {
      count++;
      time -= 10;
      questionIndex(count);
      showSection(correctWrongEl);
      correctWrongEl.textContent = 'Wrong';
    }
  }
};

// Quiz complete (All done) page
const quizComplete = function () {
  showSection(quizCompleteEl);
  hideSection(optionsEl);
  showSection(correctWrongEl);
  currentScoreEl.textContent = score;
};

// Display high scores screen
const displayHighScores = function () {
  hideSection(startPage);
  hideSection(quizCompleteEl);
  showSection(highScoresEl);
};

// Saves high score function
var saveHighScores = function () {
  // get the initials
  var initialsValue = document.getElementById('initials').value;
  // get the high scores from local storage and save them to a variable
  var scores = JSON.parse(localStorage.getItem('submitHighScores')) || [];
  // push a new score to the variable containing the high scores from local storage
  scores.push({ initials: initialsValue, highScore: score });
  // send the high scores to local storage
  localStorage.setItem('submitHighScores', JSON.stringify(scores));
};

// Prints high score function
var printHighScores = function () {
  // get the high scores` from local storage
  var scores = JSON.parse(localStorage.getItem('submitHighScores')) || [];
  // sort the scores

  scores.sort(function (b, a) {
    return a.highScore - b.highScore;
  });

  // loop through the high scores and create the li’s and append them
  for (let i = 0; i < scores.length; i++) {
    var hsLI = document.createElement('li');
    hsLI.textContent = `${scores[i].highScore} — ${scores[i].initials}`;
    hsListEl.appendChild(hsLI);
  }
};

// Clears scores from local storage and UI
function clearScores() {
  localStorage.clear();
  hsListEl.remove();
}

// EVENT LISTENERS
// When start button is clicked
startBtnEl.addEventListener('click', function () {
  startGame();
});

// When choice is selected by pressing button
btn1El.addEventListener('click', function () {
  checkAnswer(btn1El.textContent);
});

btn2El.addEventListener('click', function () {
  checkAnswer(btn2El.textContent);
});

btn3El.addEventListener('click', function () {
  checkAnswer(btn3El.textContent);
});

btn4El.addEventListener('click', function () {
  checkAnswer(btn4El.textContent);
});

// Submit scores button
submitScoreEl.addEventListener('click', function (event) {
  event.preventDefault();
  displayHighScores();
  saveHighScores();
  printHighScores();
});

// High Scores Nav button in top left hand corner
hsNavEl.addEventListener('click', function (event) {
  displayHighScores();
  printHighScores();
});

// Start over button
startOverEl.addEventListener('click', function () {
  startOver();
});

// Clear Scores button
clearScoresEl.addEventListener('click', function () {
  clearScores();
});

// Global Variables
var score = 0;
var time = 120;
var count = 0;

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

// Stores high scores
var scores = [];

// Function that starts game (triggered by 'Start Quiz' button)

const startGame = function () {
  // hide start page div
  hideSection(startPage);
  showSection(optionsEl);
  timer();
  questionIndex(count);
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
  if (count < questions.length) {
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

const quizComplete = function () {
  showSection(quizCompleteEl);
  hideSection(optionsEl);
  showSection(correctWrongEl);
  currentScoreEl.textContent = score;
};

var submitScores = function (initialsValue) {
  scores.push({ initials: initialsValue, highScore: score });

  // loop through savedTasks array
  for (let i = 0; i < scores.length; i++) {
    // pass each task object into the `createTaskEl()` function
    var hsLI = document.createElement('li');
    hsLI.textContent = `${scores[i].highScore} — ${scores[i].initials}`;
    hsListEl.appendChild(hsLI);
  }

  saveScores();
  displayScores();
};

const highScores = function () {
  hideSection(quizCompleteEl);
  quizCompleteEl.style.display = 'none !important';
  showSection(highScoresEl);
  var initialsValue = document.getElementById('initials').value;
  submitScores(initialsValue);
};

// show highScores div with buttons
// if Replay button pressed, call startGame function
// if clear high scores button pressed, clear high scores

// Local Storage

var saveScores = function () {
  localStorage.setItem('highscores', JSON.stringify(scores));
};

function displayScores() {
  // Parsing the JSON string to an object
  let storedScoreList = JSON.parse(localStorage.getItem('highScores'));
}

function clearScores() {
  localStorage.clear();
  hsListEl.remove();
}

// when start button is clicked

if (window.location.href.indexOf('index.html') === 22) {
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

  submitScoreEl.addEventListener('click', function () {
    event.preventDefault();
    highScores();
  });

  hsNavEl.addEventListener('click', function () {
    hideSection(startPage);
    hideSection(quizCompleteEl);
    showSection(highScoresEl);
  });

  clearScoresEl.addEventListener('click', function () {
    clearScores();
  });
} else {
}
// displayOption.setAttribute('data-task-id', taskId);
// optionsButtonsEl.appendChild(editButtonEl);

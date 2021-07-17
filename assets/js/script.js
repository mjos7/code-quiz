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
var correctWrongEl2 = document.getElementById('correct-wrong-2');
var quizCompleteEl = document.getElementById('quiz-complete');
var currentScoreEl = document.getElementById('current-score');
var submitScoreEl = document.getElementById('submit-score-btn');
var highScoresEl = document.getElementById('high-scores');
var navEl = document.getElementById('nav');
var hsListEl = document.getElementById('hs-list');
var hsNavEl = document.getElementById('hs-nav');
var startOverEl = document.getElementById('start-over');
var clearScoresEl = document.getElementById('clear-scores');

// Quiz Questions, Choices and Answers
var questions = [
  {
    q: 'Commonly used data types DO NOT include:',
    c: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
    a: '3. alerts',
  },
  {
    q: 'The condition in an if / else statement is enclosed within ________.',
    c: [
      '1. quotes',
      '2. curly brackets',
      '3. parentheses',
      '4. square brackets',
    ],
    a: '3. parentheses',
  },
  {
    q: 'Arrays in Javascript can be used to store ____.',
    c: [
      '1. numbers and strings',
      '2. other arrays',
      '3. booleans',
      '4. all of the above',
    ],
    a: '4. all of the above',
  },
  {
    q: 'String values must be enclosed within _____when being assigned to variables.',
    c: ['1. commas', '2. curly brackets', '3. quotes', '4. parenthesis'],
    a: '3. quotes',
  },
  {
    q: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    c: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
    a: '4. console.log',
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
  window.location.href = 'https://mjos7.github.io/code-quiz/';
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
  var intervalID = setInterval(function () {
    if (time <= 0 || count === questions.length) {
      timerEl.innerHTML = 'Complete';
      quizComplete();
      clearInterval(intervalID);
    } else {
      timerEl.innerHTML = time;
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
      correctWrongEl2.textContent = 'Correct';
    } else {
      count++;
      time -= 10;
      questionIndex(count);
      showSection(correctWrongEl);
      correctWrongEl.textContent = 'Wrong';
      correctWrongEl2.textContent = 'Wrong';
    }
  }
};

// Quiz complete (All done) screen
const quizComplete = function () {
  showSection(quizCompleteEl);
  hideSection(optionsEl);
  currentScoreEl.textContent = score;
  showSection(correctWrongEl2);
  checkAnswer(
    btn1El.textContent ||
      btn2El.textContent ||
      btn3El.textContent ||
      btn4El.textContent
  );
};

// Display high scores screen
const displayHighScores = function () {
  hideSection(startPage);
  hideSection(quizCompleteEl);
  hideSection(hsNavEl);
  showSection(highScoresEl);
  navEl.style.justifyContent = 'flex-end';
};

// Saves high score function
var saveHighScores = function (initialsValue) {
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

  // get the initials
  var initialsValue = document.getElementById('initials').value;

  // return if initials are empty
  if (initialsValue == '') {
    alert('Please enter your initials!');
    return;
  } else {
    saveHighScores(initialsValue);
    displayHighScores();
    printHighScores();
  }
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

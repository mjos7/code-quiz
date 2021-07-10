var score = 0;
var time = 120;
var count = 0;

var startPage = document.querySelector('.start-page');
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
var quizCompleteEl = document.getElementById('quiz-complete');
var highScoreEl = document.getElementById('high-score');
var initialsEl = document.getElementById('initials');

// const shuffledQuestions, currentQuestionIndex

// Questions array with objects for each question
var questions = [
  {
    q: 'Commonly used data types DO NOT include:',
    c: ['strings', 'booleans', 'alerts', 'numbers'],
    a: 'alerts',
  },
  {
    q: 'The condition in an if / else statement is enclosed within ____.',
    c: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    a: 'parentheses',
  },
  {
    q: 'Arrays in Javascript can be used to store ____.',
    c: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    a: 'all of the above',
  },
  {
    q: 'String values must be enclosed within ____ when being assigned to variables.',
    c: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    a: 'quotes',
  },
  {
    q: 'A very useful tool for used during development and debugging for printing content to the debugger is:',
    c: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    a: 'console.log',
  },
];

const startGame = function () {
  // hide start page div
  hideSection(startPage);
  showSection(optionsEl); // MAYBE MOVE THIS TO NEXT QUESTION FUNCTION....
  timer();
  questionIndex(count);
  // showOption();
};

// start timer
function timer() {
  setInterval(function () {
    if (time > 1) {
      document.getElementById('time').innerHTML = time;
    } else {
      clearInterval(timer);
      document.getElementById('time').innerHTML = 'Complete';
      quizComplete();
    }
    time--;
  }, 1000);
}

// Hide main section by class
var hideSection = function (sectionClass) {
  sectionClass.className = 'hide';
};

// Show main section by class
var showSection = function (sectionClass) {
  sectionClass.classList.remove('hide');
};

var questionIndex = function (count) {
  if (count < questions.length) {
    showQuestion(count);
  } else {
    quizComplete();
  }
};

var showQuestion = function (count) {
  //loop through questions array

  questionHeaderEl.textContent = questions[count].q;
  btn1El.textContent = `1. ${questions[count].c[0]}`;
  btn2El.textContent = `2. ${questions[count].c[1]}`;
  btn3El.textContent = `3. ${questions[count].c[2]}`;
  btn4El.textContent = `4. ${questions[count].c[3]}`;
  // };
};

const checkAnswer = function (btnText) {
  if (count < questions.length) {
    if (btnText === questions[count].a) {
      score++;
      count++;
      questionIndex(count);
    } else {
      time -= 10;
      count++;
      questionIndex(count);
    }
  }
};

const quizComplete = function () {
  console.log(quizCompleteEl);
  showSection(quizCompleteEl);
  hideSection(optionsEl);
  highScoreEl.textContent = score;
  // show quizComplete div
  // replace p with final score
  // show form
  // store form submission in variable
  // store info in local storage
  // go to high scores screen
};

const highScores = function () {
  // show highScores div with buttons
  // if Replay button pressed, call startGame function
  // if clear high scores button pressed, clear high scores
};

// when start button is clicked

startBtnEl.addEventListener('click', function () {
  startGame();
});

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

btn4El.addEventListener('click', function () {
  checkAnswer(btn4El.textContent);
});

// displayOption.textContent = 'document.innerHTML(questions[i].q);';
// displayOption.className = 'option';
// displayOption.setAttribute('data-task-id', taskId);
// optionsButtonsEl.appendChild(editButtonEl);

// //   if (a === q) {
// //     score += 5;
// //   } else {
// //     window.alert('answer correct');
// //   }
// // }

var time = 120;

var startPage = document.querySelector('.start-page');
var startBtnEl = document.getElementById('start-btn');
var timerEl = document.getElementById('time');
var h3StartPageEl = document.getElementById('quiz-title');
var optionsEl = document.getElementById('options');
var optionsButtonsEl = document.getElementById('option-btns');

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
  showQuestion();
  showOption();
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

var showQuestion = function () {
  //loop through questions array
  //FOR LOOP TO BE EDITED!
  for (var i = 0; i <= questions.length; i++) {
    var showQuesEl = document.createElement('h3');
    showQuesEl.innerHTML = questions[i].q;
    optionsEl.appendChild(showQuesEl);

    // var showOption = function () {
    for (let i = 0; i < questions[i].c.length; i++) {
      console.log('hi');
      var showOptionEl = document.createElement('button');
      showOptionEl.className = 'option';
      showOptionEl.innerHTML = questions[i].c;
    }
    // };
  }
};

// console.log(displayQuestion);
// optionsEl.displayQuestion.textContent = questions[i].q;

// create options 1-4
// replace question h3
// replace options 1-4
// else go to 'quizComplete' screen
// store score in highScore array

const quiz = function () {
  // user selects an option
  // show correct or wrong
  // show next question
  // if question answered right, add 2 points to score variable
  // else subtract 10 seconds from time
};

const quizComplete = function () {
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

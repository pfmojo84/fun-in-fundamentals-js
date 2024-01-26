const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

//created variables to be used to call a new question and to populate the question/choice text of each question
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: 3
    },
    {
        question: "The condition if an if/else statement is enclosed within _____",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parentheses",
        choice4: "square brackets",
        answer: 3
    },
    {
        question: "Arrays in JavaScript can be used to store ______",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choice1: "single or double quotes",
        choice2: "double back slash",
        choice3: "commas",
        choice4: "either bracket type",
        answer: 1
    },
    {
        question: "A useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "VS Code",
        choice2: "console log",
        choice3: "for loops",
        choice4: "terminal commands",
        answer: 2
    }
]

//constant variables plus start game functions


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};

//if questions availabe - question counter cycles through question index and selects new question
//plus splice removes questions which have already been answered
//if availableQuestions equals 0 - bring user to end page
getNewQuestions =() => {
    if (availableQuestions.length === 0) {
        return window.location.assign("./end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() *  availableQuestions.length);
      currentQuestion = availableQuestions[questionIndex];
      question.innerText = currentQuestion.question;

      choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
      });

      availableQuestions.splice(questionIndex, 1);

      acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        getNewQuestions();
    });
} );

startGame();
//query from class 'choice-text' with custom data attribute applied to each element in game.html
const question = document.getElementById("question");
//need to convert class to array as other functions will need to work with the data as an array 
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


//created variables to be used to call a new question and to populate the question/choice text of each question
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//dynamically pull questions from the following array
//checking for 'correctness' if the number in the 'choice' matches up with the number in 'answer'
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

//constant variables plus start game and get new questions functions
const correct_bonus = 10;
const max_questions = 5;

//use of spread operator to take 'questions' array and create a full copy in the new 'availableQuestions' array
//this is necessary because if we set the value of 'availableQuestions' - 'questions' w/o spread operator
//any changes made to one object would effect the other objects
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};

//if questions availabe - question counter cycles through question index and selects new question
//splice removes questions which have already been answered
//if availableQuestions equals 0 - bring user to end page
getNewQuestions =() => {
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign("./end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + '/' + max_questions;

//create questionIndex to pull available question when available questions remain
    const questionIndex = Math.floor(Math.random() *  availableQuestions.length);
      currentQuestion = availableQuestions[questionIndex];

//load questions from array and populate in the question element
      question.innerText = currentQuestion.question;

//loading text from choice array as defined in the Array.from(document.getElementsByClassName("choice-text"))
//pull choice property and data attribute number that is associated with it to get the appropriate choice 
//for the corresponding question
      choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
      });

      availableQuestions.splice(questionIndex, 1);

      acceptingAnswers = true;

};

//initialize mostRecentScore as as the valued stored in the browsers local storage or 0 if there is no value stored
let mostRecentScore = localStorage.getItem('mostRecentScore') || 0;
//!acceptingAnswers and acceptingAnswers = false will create a short delay between questions. 
//Accepting answers value is changed to true after the choice is made and the availableQuestions have been spliced
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

//check if answer is correct and increase score based on correct_bonus            
            if (classToApply === 'correct') {
                incrementScore(correct_bonus);
            } else {
//decrease timer when question is answered incorrectly
                timeLeft -=10;
            }
            
            selectedChoice.parentElement.classList.add(classToApply);
//add delay before correct or incorrect class is applied. remove class and getNewQuestion
            setTimeout(()  => {
                selectedChoice.parentElement.classList.remove(classToApply);
                   getNewQuestions();  
            }, 1000);
        });     
    });

    incrementScore = num => {
        score +=num;
        scoreText.innerText = score;
        mostRecentScore = score;
//whenever the 'score' is updated, the mostRecentScore variable will be updated accordingly
        localStorage.setItem('mostRecentScore', mostRecentScore);
    }

//creating function to update timer for every second
const timerElement = document.getElementById('timer');
let timeLeft = 75;
//start timer
const timerInterval = setInterval(() => {
    timeLeft--;
     timerElement.textContent = timeLeft;
//redirect to end page when timer reaches 0
     if (timeLeft <= 0) {
        clearInterval(timerInterval);
        window.location.href = "end.html";
     }
}, 1000);  

startGame();
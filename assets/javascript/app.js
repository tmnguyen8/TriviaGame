// PSEUDO CODE
// GLOBAL VARIABLES
// *****************************************
// QUESTIONS
var availableQuestions = [
    {
        question: "How many cups are in 28 fluid ounces?",
        choices: ["3.5", "14", "7"],
        correctAnswer: "7"
    },

    {
        question: "Budapest is the capital of what European country?",
        choices: ["Austria", "Hungary", "Portugal"],
        correctAnswer: "Hungary"
    },

    {
        question: "Between 1455 and 1485, the war of the roses took place in what country?",
        choices: ["France", "England", "Germany"],
        correctAnswer: "England"
    },

    {
        question: "A common type of radio wave is referred to as VHF. What do the letters VHF stand for?",
        choices: ["Very High Frequency", "Video Homing Frequency", "Variable High Frequency"],
        correctAnswer: "Very High Frequency"
    },

    {
        question: "If Tres is facing north and turns 90 degrees to his right, what direction is he now facing?",
        choices: ["South", "East", "West"],
        correctAnswer: "East"
    }
];

var funnyNoGif = [
    "assets/images/No1.gif",
    "assets/images/No2.gif",
    "assets/images/No3.gif",
    "assets/images/No4.gif",
    "assets/images/No5.gif",
];

var funnyYesGif = [
    "assets/images/Yes1.gif",
    "assets/images/Yes2.gif",
    "assets/images/Yes3.gif",
    "assets/images/Yes4.gif",
    "assets/images/Yes5.gif",
];
// Defining functional variables
var counter = 45;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer = 0;

// FUNCTIONS 
// *****************************************

//function to start the next function; stops the game when the current question reaches the end
function nextQuestion (){
    
    if (currentQuestion === (availableQuestions.length-1)) {
        console.log('Game Over');
        displayResult ();
    }else {
        currentQuestion++;
        displayQuestion();
    }
}

//timer is counting down; clear the timer when  it reaches 0 and load next question
function countDown () {
    counter--;

    $("#time").html(`Timer: ${counter}`);
    //clear the timer when counter reaches 0
    if  (counter===0) {
        clearInterval(timer);
        lost++;
        clearInterval(timer);
        displayWrongAnswer(correctAnswer);
        
    }
}
//function to display questions
function displayQuestion () {
    counter = 45;
    timer = setInterval(countDown, 1000);

    //calling the questions, choices and answer from availableQuestion
    var question = availableQuestions[currentQuestion].question;
    var choices = availableQuestions[currentQuestion].choices;

    $("#time").html(`<h4>${timer}</h4>`)
    $("#triviaGame").html(`
        <h4>${question}</h4>
        <h4>${displayChoices(choices)}</h4>
    `)

}
//function to display choices
function displayChoices(choices) {
    var result = "";
    for (i of choices) {
        result += `<button class="btn btn-primary btn-choices choices" data-choice="${i}">${i}</button>`
    }
    return result;
}
//function to display result
function displayResult () {
    var result = `
        <p>${score}/${availableQuestions.length} question(s) correct</p>
        <p>${lost}/${availableQuestions.length} question(s) missed</p>
    `   //end of result

    $("#score").html(result);
    $("#triviaGame").html(`<button class="btn btn-primary btn-choices" id="reset">Reset Game</button>`)
}
// Display funny gif when the answer is wrong
function displayWrongAnswer (correctAnswer){
    var randomNoGif = funnyNoGif[Math.floor(Math.random()*funnyNoGif.length)];
    console.log(randomNoGif);
    var result = `
        <p>Sorry! The correct answer is ${correctAnswer}.</p>
        <img class="img-fluid funny-gift" src="${randomNoGif}"> <br>
        <button class="btn btn-primary" onclick="nextQuestion()">Continue</button>
        
        `

    $("#triviaGame").html(result); //End of displayWrongAnswer HTML 
}

// Display funny gif when the answer is wrong
function displayRightAnswer (correctAnswer){
    var randomYesGif = funnyYesGif[Math.floor(Math.random()*funnyYesGif.length)];
    console.log(randomYesGif);
    var result = `
        <p>Correct! The correct answer is ${correctAnswer}.</p>
        <img class="img-fluid funny-gif" src="${randomYesGif}"> <br>
        <button class="btn btn-primary" onclick="nextQuestion()">Continue</button>
        
        `

    $("#triviaGame").html(result); //End of displayWrongAnswer HTML 
    
}

// EXECUTION
// *****************************************
//On click to take in the choices and compare with the correct answer
$(document).on("click", ".choices", function() {
    var userChoice = $(this).attr("data-choice")
    var correctAnswer = availableQuestions[currentQuestion].correctAnswer;
    console.log(`${userChoice} is clicked`)

    if(correctAnswer === userChoice) {
        console.log("Correct Answer!")
        score++;
        clearInterval(timer);
        displayRightAnswer(correctAnswer);
    } else {
        console.log("Wrong Answer!")
        lost++;
        clearInterval(timer);
        displayWrongAnswer(correctAnswer);
    }
    
    
});
//On click to start the game
$(document).on("click", "#newGame", function() {
    // the Start Game will be hidden once clicked
    $("#newGame").hide()
    counter = 45;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;    
    displayQuestion();
});

// On click to reset the game
$(document).on("click", "#reset", function() {    
    counter = 45;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    $("#score").empty();
    displayQuestion();

});
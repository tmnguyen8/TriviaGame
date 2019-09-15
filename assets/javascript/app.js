// PSEUDO CODE
// GLOBAL VARIABLES
// *****************************************
// Defining global class with question, availableAnswer, correctAnswer
// Defining list of questions
// Defining Number of question
// Defining Number of correct
// Defining the time
// Defining decremental
var counter = 5;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer = 0;
// FUNCTIONS 
// *****************************************
function startGame() {

}


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
        nextQuestion();
    }
}
//function to display questions
function displayQuestion () {
    counter = 5;
    timer = setInterval(countDown, 1000);

    //calling the questions, choices and answer from availableQuestion
    var question = availableQuestions[currentQuestion].question;
    var choices = availableQuestions[currentQuestion].choices;

    $("#time").html(`<h4>${timer}</h4>`)
    $("#triviaGame").html(`
        <h4>${question}</h4>
        <h5>${displayChoices(choices)}</h5>
    `)

}
//function to display choices
function displayChoices(choices) {
    var result = "";
    for (i of choices) {
        result += `<p class="button choices" data-choice="${i}">${i}</p>`
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
    $("#triviaGame").html(`<button class="btn btn-primary" id="reset">Reset Game</button>`)
}

// EXECUTION
// *****************************************
//On click to take in the choices and compare with the correct answer
$(document).on("click", ".choices", function() {
    var userChoice = $(this).attr("data-choice")
    var correctAnswer = availableQuestions[currentQuestion].correctAnswer;
    console.log(`${userChoice} is clicked`)

    if(correctAnswer === userChoice) {
        console.log("You Win!")
        score++;
    } else {
        console.log("You Lose!")
        lost++;
    }
    // displayResult();
    clearInterval(timer);
    nextQuestion()
});

$(document).on("click", "#newGame", function() {
    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;    
    displayQuestion();
});

$(document).on("click", "#reset", function() {    
    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    displayQuestion();
});
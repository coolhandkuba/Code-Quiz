// Variables to hold questions, choices, and answers 
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector('#timer');
var startTime = document.querySelector('#start');
var questionsId = document.querySelector('#questions');
var container = document.querySelector('#container');
var createUl = document.createElement("ul");

// Variables for the timer
var timeLeft = 76;
var holdInterval = 0;
var incorrect = 10;

// Event Listener to start timer on click 
startTime.addEventListener('click', function(){
    if (holdInterval === 0) {
        holdInterval = setInterval(function(){
            timeLeft--;
            currentTime.textContent = 'Time: ' + timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(holdInterval);
                    done();
                    currentTime.textContent = 'Time\'s Up!';
                }
        }, 1000);
    }
    display(questionIndex);
})

// display function that will display the questions using a for loop
function display(questionIndex){
    questionsId.innerHTML = '';
    createUl.innerHTML = '';
    for (var i = 0; i < questions.length; i++){
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsId.textContent = userQuestion;
    }

    // creates new li element for each round of questions
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement('li');
        listItem.textContent = newItem;
        questionsId.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener('click', (compare));
    })
}
// Function to compare answers with questions 
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // If statement for correct answer
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // else statement for incorrect answer
        } else {
            // incorrect answer will deduct 5 seconds 
            timeLeft = timeLeft - incorrect;
            createDiv.textContent = 'Wrong! The correct answer is:  ' + questions[questionIndex].answer;
        }
    }

    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // End of quiz, will show score (time left) and how many correct answers
        done();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        display(questionIndex);
    }
    questionsId.appendChild(createDiv);
}

// function for when the timer is at 0 - creates the elements below. 
function done() {
    questionsId.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsId.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsId.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsId.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsId.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsId.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsId.appendChild(createSubmit);

    // Function that submits the scores to Local Storage  
    createSubmit.addEventListener("click", function(){
        var initials = createInput.value;
        if (initials === null){
        alert("No value entered!");
        } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        // console.log(finalScore);
        var allScores = localStorage.getItem('allScores');
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        // pushes score as JSON string  
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem('allScores', newScore);
        // redirects to the highscores.html 
        window.location.replace('./highscores.html')
    }
});
}
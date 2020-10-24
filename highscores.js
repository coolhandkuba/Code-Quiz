// Assigned Variables
var highScore = document.querySelector('#highScore');
var goBack = document.querySelector('#goBack');
var clear = document.querySelector('#clear');

// CLear button - clears local storage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});

// Use JSON parse to convert string to objects 
var allScores = JSON.parse(localStorage.getItem("allScores")) || [];
console.log(allScores);

// Loop to run through all the scores in local storage and append to page
if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++){
        var createLi = document.createElement('li');
        createLi.textContent = allScores[i].initials + ' ' + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

//Go Back function event to take you back to the index 
goBack.addEventListener('click', function() {
    window.location.replace('./index.html');
});


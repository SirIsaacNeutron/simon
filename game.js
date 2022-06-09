var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColor = null;
var userClickedPattern = [];
var gameStarted = false;

var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    ++level;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    var buttonAudio = new Audio("sounds/" + name + ".mp3");
    buttonAudio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    gamePattern = [];
    userChosenColor = null;
    userClickedPattern = [];
    gameStarted = false;

    level = 0;
}

function checkAnswer() {
    var lastAnswerIndex = userClickedPattern.length - 1;

    if (userClickedPattern[lastAnswerIndex] === gamePattern[lastAnswerIndex]) {
        console.log("success");
    } else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        return; // prevent game from continuing
    }

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
        userClickedPattern = [];
    }
}

$(".btn").click(function () {
    if (gameStarted) {
        userChosenColor = this.getAttribute("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer();
    }

})

$(document).keydown(function (e) {
    gameStarted = true;
    nextSequence();
})
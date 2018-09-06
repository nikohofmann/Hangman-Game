var randomWord;
var guessesRemaining = 10;
var remainingLetters;
var guess;
var wins = 0;
var losses = 0;
var k = 0;
var blankWord = [];
var ready = false;
var gameOver = false;
var lettersGuessed = []; // Create the array to house the letters guessed by the user
var wordsList = ["celtics", "nets", "knicks", "raptors", "bulls", "cavaliers", "pistons", "pacers", "bucks", "hawks", "hornets", "heat", "magic", "wizards", "nuggets", "timberwolves", "thunder", "trailblazers", "jazz", "warriors", "clippers", "lakers", "suns", "kings", "mavericks", "rockets" , "grizzlies", "pelicans", "spurs"];

function resetGame() {
  k = 0; // Reset the counter
  chooseWord(); // Choose a new random word
  setReady(); // Set ready flag to true
  guessesRemaining = 10; // Reset guesses
  lettersGuessed = []; // Reset letters guessed array
  document.getElementById("instructions").style.display = "none";
  document.getElementById("playAgain").classList.toggle("d-none");
  document.getElementById("playAgain").classList.remove("btn-danger");
  document.getElementById("playAgain").classList.remove("btn-success");
  document.getElementById("hangmanImg").src = "assets/images/hangman" + guessesRemaining + ".png";
  document.getElementById("jsGuessesRemaining").innerHTML = guessesRemaining;
  document.getElementById("jsLetters").innerHTML = lettersGuessed;
}


function chooseWord() {
  randomWord = wordsList[Math.floor(Math.random() * wordsList.length)]; // Choose a random word

  var i = 0;

  blankWord = [];

  // Populate the empty array with underscores representing the number of letters in the random word
  for (i = 0; i < randomWord.length; i++) {
    blankWord[i] = "_";
  } 

  remainingLetters = randomWord.length; // Track the number of letters remaining; once this reaches 0, the user wins

  document.getElementById("jsWord").innerHTML = blankWord.join(" ");
}



function setReady() {
  ready = true;
}

function setGameOver() {
  ready = false;
  gameOver = true; // Prevents the game from doing anything after a game has ended and before the user clicks "Play again"
}

document.onkeyup = function(event) {
  if (ready === false && event.key === "Enter" && gameOver === false) { // Sets all necessary items to start a game from scratch
    chooseWord();
    setReady();
    document.getElementById("instructions").style.display = "none";
    document.getElementById("hangmanImg").src = "assets/images/hangman" + guessesRemaining + ".png";
    document.getElementById("jsGuessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("jsWord").innerHTML = blankWord.join(" ");
    document.getElementById("jsLetters").innerHTML = lettersGuessed;
    document.getElementById("gameParameters").classList.toggle("d-none");
    document.getElementById("jsWins").innerHTML = "Wins: " + wins;
    document.getElementById("jsLosses").innerHTML = "Losses: " + losses;
  } else if (ready === true) {

    while (remainingLetters >= 0 && guessesRemaining >= 0) {

      guess = event.key.toLowerCase();
      document.getElementById("instructions").style.display = "none";
      
      if (lettersGuessed.includes(guess) || blankWord.includes(guess)) {
        document.getElementById("instructions").style.display = "block";
        document.getElementById("instructions").style.color = "red";
        document.getElementById("instructions").innerHTML = "You already guessed that letter";
        break;
      } else if ((/[a-z]/.test(guess.toLowerCase()) === false) || guess.length !== 1) {
        break;
      } else {
        var letterExists = false;
        for (var j = 0; j < randomWord.length; j++) { // If the letter exists anywhere in the random word, fill it in
          if (guess === randomWord[j]) {
            blankWord[j] = guess;
            remainingLetters--;
            letterExists = true;
          }
        }
        if (letterExists === false) { // If the letter doesn't exist anywhere in the random word, decrement guesses remaining
          guessesRemaining--;
        }
        if (lettersGuessed.includes(guess) === false && blankWord.includes(guess) === false) { // If the letter guessed hasn't already been guessed, add it to the array
          lettersGuessed[k] = guess;
          k++;
        }
        break;
      }
    } 
    document.getElementById("hangmanImg").src = "assets/images/hangman" + guessesRemaining + ".png";
    document.getElementById("jsGuessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("jsWord").innerHTML = blankWord.join(" ");
    document.getElementById("jsLetters").innerHTML = lettersGuessed;

    if (guessesRemaining === 0) { // If no guesses remain, the user has lost
    document.getElementById("instructions").style.display = "block";
    document.getElementById("instructions").style.color = "red";
    document.getElementById("instructions").innerHTML = "You Lose!";
    document.getElementById("playAgain").classList.toggle("d-none");
    document.getElementById("playAgain").classList.add("btn-danger");
    setGameOver();
    losses++;
    document.getElementById("jsLosses").innerHTML = "Losses: " + losses;
    for (i = 0; i < randomWord.length; i++) {
      blankWord[i] = randomWord.charAt(i);
    }
    document.getElementById("jsWord").innerHTML = blankWord.join(" ");
    } else if (remainingLetters === 0) { // If there are no remaining letters, the user has won
    document.getElementById("instructions").style.display = "block";
    document.getElementById("instructions").style.color = "green";
    document.getElementById("instructions").innerHTML = "You Win!";
    document.getElementById("playAgain").classList.toggle("d-none");
    document.getElementById("playAgain").classList.add("btn-success");
    setGameOver();
    wins++;
    document.getElementById("jsWins").innerHTML = "Wins: " + wins;
    }
  }
};


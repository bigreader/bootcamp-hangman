
const words = [ "garnet", "amethyst", "pearl", "quartz", "nephrite", "lapis",
"bismuth", "peridot", "jasper", "ruby", "sapphire", "diamond", "agate",
"carnelian", "aquamarine", "topaz", "zircon", "rutile", "citrine", "emerald",
"opal", "sugilite", "alexandrite", "malachite", "sardonyx", "rhodonite",
"fluorite", "jade", "sunstone", "obsidian"];

const allowedWrongGuesses = 7;



var currentWord = "";
var guessedLetters = [];
var repeatedGuess = "";

function reset() {
	currentWord = "";
	guessedLetters = [];
	repeatedGuess = "";
	updateWordDisplay();
	updateGuessesDisplay();
}

function newGame() {
	reset();
	currentWord = words[Math.floor(Math.random()*words.length)];
	console.log(currentWord);
	updateWordDisplay();

	var guessedDiv = document.getElementById("guessed")
	guessedDiv.innerHTML = '<p class="lead">Press any key to get started!</p>';
}

function updateWordDisplay() {
	var out = [];
	var complete = true;
	for (var i=0; i<currentWord.length; i++) {
		var char = currentWord.charAt(i);
		if (guessedLetters.includes(char)) {
			out.push(char);
		} else {
			out.push("_");
			complete = false;
		}
	}

	var word = document.getElementById("word")
	word.innerText = out.join(" ");
	word.className = complete ? "text-success" : "";
}

function updateGuessesDisplay() {
	var guessedDiv = document.getElementById("guessed")
	guessedDiv.innerHTML = "";
	guessedLetters.forEach(function(item) {
		var guess = document.createElement("div");
		guess.className = "guess";
		if (! currentWord.includes(item)) {
			guess.className += " wrong";
		}
		if (item === repeatedGuess) {
			guess.className += " repeated";
		}
		guess.innerText = item;
		guessedDiv.appendChild(guess);
	});
}

document.onkeypress = function(event) {
	var newGuess = event.key.toLowerCase();

	if (guessedLetters.includes(newGuess)) {
		console.log("repeated:", newGuess);
		repeatedGuess = newGuess;
		updateGuessesDisplay();
	} else {
		console.log("guess:", newGuess);
		guessedLetters.push(event.key);
		repeatedGuess = "";
		updateWordDisplay();
		updateGuessesDisplay();
	}

	// remove duplicates from guessedLetters
	// guessedLetters = [...new Set(guessedLetters)];
}



newGame();

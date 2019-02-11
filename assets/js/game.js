
const words = ["garnet", "amethyst", "pearl", "quartz", "nephrite", "lapis",
"bismuth", "peridot", "jasper", "ruby", "sapphire", "diamond", "agate",
"carnelian", "aquamarine", "topaz", "zircon", "rutile", "citrine", "emerald",
"opal", "sugilite", "alexandrite", "malachite", "sardonyx", "rhodonite",
"fluorite", "jade", "sunstone", "obsidian"];

const allowedWrongGuesses = 7;


var alphabet = "abcdefghijklmnopqrstuvwxyz";
var currentWord = "";
var guessedLetters = [];
var repeatedGuess = "";
var livesLeft = allowedWrongGuesses;
var active = false;

function reset() {
	currentWord = "";
	guessedLetters = [];
	repeatedGuess = "";
	livesLeft = allowedWrongGuesses;
	updateGuessesDisplay();
	updateWordDisplay();
	document.getElementById("gem").src = "assets/img/pink-normal.png";
}

function newGame() {
	reset();

	currentWord = words[Math.floor(Math.random()*words.length)];
	console.log(currentWord);
	updateWordDisplay();

	setInfo("Press any key to get started!");
	active = true;
}

function updateGuessesDisplay() {
	livesLeft = allowedWrongGuesses;

	var guessedDiv = document.getElementById("guessed")
	guessedDiv.innerHTML = "";

	guessedLetters.forEach(function(item) {
		var guess = document.createElement("div");
		guess.className = "guess";
		if (! currentWord.includes(item)) {
			guess.className += " wrong";
			livesLeft--;
		}
		if (item === repeatedGuess) {
			guess.className += " repeated";
		}
		guess.innerText = item;
		guessedDiv.appendChild(guess);
	});

	if (guessedLetters.length > 0) {
		guessedDiv.className = "mt-3";
	} else {
		guessedDiv.className = "mt-3 empty";
	}

	setInfo("");

	document.getElementById("lives").innerText = livesLeft;
	if (livesLeft <= 0) {
		document.getElementById("gem").src = "assets/img/pink-broken.png";
		setInfo("You lose - the word was <em>" + currentWord + "</em>. Press return to play again!");
		active = false;
	}
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

	var word = document.getElementById("word");
	word.innerText = out.join(" ");
	word.className = complete ? "text-success" : "";
	if (complete) {
		document.getElementById("gem").src = "assets/img/pink-fancy.png";
		setInfo("You win! Press return to play again.");
		active = false;
	}
}

function setInfo(str) {
	document.getElementById("info").innerHTML = str;
}

document.onkeypress = function(event) {
	var key = event.key.toLowerCase();

	if (!active) {
		if (key === "enter") {
			newGame();
		}
		return;
	}

	if (!alphabet.includes(key)) {
		//not a valid guess
		return;
	}

	if (guessedLetters.includes(key)) {
		console.log("repeated:", key);
		repeatedGuess = key;
		updateGuessesDisplay();
	} else {
		console.log("guess:", key);
		guessedLetters.push(event.key);
		repeatedGuess = "";
		updateGuessesDisplay();
		updateWordDisplay();
	}

	// remove duplicates from guessedLetters
	// guessedLetters = [...new Set(guessedLetters)];
}



newGame();

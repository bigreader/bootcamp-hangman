
const words = ["garnet", "amethyst", "pearl", "quartz", "nephrite", "lapis",
"bismuth", "peridot", "jasper", "ruby", "sapphire", "diamond", "agate",
"carnelian", "aquamarine", "topaz", "zircon", "rutile", "citrine", "emerald",
"opal", "sugilite", "alexandrite", "malachite", "sardonyx", "rhodonite",
"fluorite", "jade", "sunstone", "obsidian"];

const invert = ["agate", "alexandrite", "aquamarine", "bismuth", "citrine",
"diamond", "emerald", "fluorite", "jade", "jasper", "lapis", "malachite",
"opal", "pearl", "peridot", "quartz", "sardonyx", "topaz", "zircon"];

const allowedWrongGuesses = 7;


var alphabet = "abcdefghijklmnopqrstuvwxyz";
var currentWord = "";
var guessedLetters = [];
var repeatedGuess = "";
var livesLeft = allowedWrongGuesses;
var active = false;
var wins = 0;
var streak = 0;

function reset() {
	currentWord = "";
	guessedLetters = [];
	repeatedGuess = "";
	livesLeft = allowedWrongGuesses;
	updateGuesses();
	updateWord();
	document.getElementById("gem").src = "assets/img/diamond.png";
}

function newGame() {
	reset();

	currentWord = words[Math.floor(Math.random()*words.length)];
	console.log(currentWord);
	updateWord();
	document.getElementById("gem").src = "assets/img/" + currentWord + ".png";
	if (invert.includes(currentWord)) {
		document.getElementById("lives").className = "text-dark";
	} else {
		document.getElementById("lives").className = "";
	}

	setInfo("Press any key to get started!");
	active = true;
}

function updateGuesses() {
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
		setInfo("You lose - the word was <em>" + currentWord + "</em>. Press return to play again!");
		updateWins(false);
		active = false;
	}
}

function updateWord() {
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
		setInfo("You win! Press return to play again.");
		updateWins(true);
		active = false;
	}
}

function updateWins(won) {
	if (!active) return;

	if (won) {
		wins++;
		streak++;
	} else {
		streak = 0;
	}

	var out = wins;
	out += (wins===1)? " win" : " wins"
	if (streak > 2) {
		// only show if streak is impressive
		out += " - " + streak + " word streak!"
	}
	document.getElementById("wins").innerText = out;
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
		updateGuesses();
	} else {
		console.log("guess:", key);
		guessedLetters.push(event.key);
		repeatedGuess = "";
		updateGuesses();
		updateWord();
	}

	// remove duplicates from guessedLetters
	// guessedLetters = [...new Set(guessedLetters)];
}



newGame();

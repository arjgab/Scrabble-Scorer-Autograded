// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   word = input.question("Enter a word to score: ");
   // console.log(oldScrabbleScorer(word));
   // return word.length;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   return word.length; // could use a for loop but in simple terms, simple scorer = length of word since letters worth 1 pt.
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U'];

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += 3;
      } else {
         letterPoints += 1;
      }
   }
   return letterPoints;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (letter in newPointStructure) {
         if (letter === word[i]) {
            letterPoints += newPointStructure[letter];
         }
      }
   }
   return letterPoints;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   let scoreOption = Number(input.question(`Which scoring algorithm would you like to use?
      0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
      1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
      2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
      Enter 0, 1, or 2: `));

      let userScore = scoringAlgorithms[scoreOption].scorerFunction(word);
      console.log(`Score for '${word}': ${userScore}`);
      return userScore;
}

function transform(oldPointStructure) {
    let newPointStructure = {};
    for (pointValue in oldPointStructure) {
      for(letter in oldPointStructure[pointValue]) {
         newPointStructure[oldPointStructure[pointValue][letter].toLowerCase()] = Number(pointValue);
      }
   }
   return newPointStructure;

};



function runProgram() {
   initialPrompt();
   scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

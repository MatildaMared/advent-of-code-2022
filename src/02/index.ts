import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 1 🎅 🎄

let parsedStrategyGuide: string[][] = fs
	.readFileSync(path.join(__dirname, "strategyGuide.txt"), "utf8")
	.split("\n")
	.map((line: string) => line.split(" "));

// 🍬 🍭 Part 1 🍭 🍬

// A = Rock 🪨, B = Paper 📄, C = Scissors ✂️
// X = Rock 🪨, Y = Paper 📄, Z = Scissors ✂️

function calculateScoreForPart1(): number {
	let totalScore = 0;

	parsedStrategyGuide.forEach((round) => {
		let opponent = round[0];
		let player = round[1];
		let gameRoundScore = 0;

		switch (opponent) {
			case "A":
				switch (player) {
					case "X":
						gameRoundScore += 4;
						break;
					case "Y":
						gameRoundScore += 8;
						break;
					case "Z":
						gameRoundScore += 3;
						break;
				}
				break;
			case "B":
				switch (player) {
					case "X":
						gameRoundScore += 1;
						break;
					case "Y":
						gameRoundScore += 5;
						break;
					case "Z":
						gameRoundScore += 9;
						break;
				}
				break;
			case "C":
				switch (player) {
					case "X":
						gameRoundScore += 7;
						break;
					case "Y":
						gameRoundScore += 2;
						break;
					case "Z":
						gameRoundScore += 6;
						break;
				}
				break;
		}

		totalScore += gameRoundScore;
	});

	return totalScore;
}

const totalScoreForPart1 = calculateScoreForPart1();
console.log(
	`Part 2 total score for the rock paper scissors game is ${totalScoreForPart1}! 🎅 🎄`
);

// 🍬 🍭 Part 2 🍭 🍬

// A = Rock 🪨, B = Paper 📄, C = Scissors ✂️
// X = You need to lose, Y = You need to tie, Z = You need to win

function calculateScoreForPart2(): number {
	let totalScore = 0;

	parsedStrategyGuide.forEach((round) => {
		let opponent = round[0];
		let prediction = round[1];
		let gameRoundScore = 0;

		switch (opponent) {
			case "A":
				switch (prediction) {
					case "X":
						gameRoundScore += 3;
						break;
					case "Y":
						gameRoundScore += 4;
						break;
					case "Z":
						gameRoundScore += 8;
						break;
				}
				break;
			case "B":
				switch (prediction) {
					case "X":
						gameRoundScore += 1;
						break;
					case "Y":
						gameRoundScore += 5;
						break;
					case "Z":
						gameRoundScore += 9;
						break;
				}
				break;
			case "C":
				switch (prediction) {
					case "X":
						gameRoundScore += 2;
						break;
					case "Y":
						gameRoundScore += 6;
						break;
					case "Z":
						gameRoundScore += 7;
						break;
				}
				break;
		}

		totalScore += gameRoundScore;
	});

	return totalScore;
}

const totalScoreForPart2 = calculateScoreForPart2();
console.log(
	`Part 2 total score for the rock paper scissors game is ${totalScoreForPart2}! 🎅 🎄`
);

import * as fs from "fs";
import * as path from "path";
import { forEachChild } from "typescript";

// 🎄 🎅 Advent of Code 2022 Day 3 🎅 🎄

const directions = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((line) => line.split(" "));

// 🍬 🍭 Part 1 🍭 🍬

let stacks = [
	[],
	["N", "H", "S", "J", "F", "W", "T", "D"],
	["G", "B", "N", "T", "Q", "P", "R", "H"],
	["V", "Q", "L"],
	["Q", "R", "W", "S", "B", "N"],
	["B", "M", "V", "T", "F", "D", "N"],
	["R", "T", "H", "V", "B", "D", "M"],
	["J", "Q", "B", "D"],
	["Q", "H", "Z", "R", "V", "J", "N", "D"],
	["S", "M", "H", "N", "B"],
];

directions.forEach((direction) => {
	const amountOfStacksToBeMoved = +direction[1];
	const fromColumn = +direction[3];
	const toColumn = +direction[5];

	for (let i = 1; i <= amountOfStacksToBeMoved; i++) {
		const crate = stacks[fromColumn].shift();
		stacks[toColumn].unshift(crate!);
	}
});

let cratesOnTop = "";

for (let i = 1; i < stacks.length; i++) {
	cratesOnTop += stacks[i][0];
}

console.log(`The crates on top after moving are ${cratesOnTop}! 🎅 🎁`);

// 🍬 🍭 Part 2 🍭 🍬

stacks = [
	[],
	["N", "H", "S", "J", "F", "W", "T", "D"],
	["G", "B", "N", "T", "Q", "P", "R", "H"],
	["V", "Q", "L"],
	["Q", "R", "W", "S", "B", "N"],
	["B", "M", "V", "T", "F", "D", "N"],
	["R", "T", "H", "V", "B", "D", "M"],
	["J", "Q", "B", "D"],
	["Q", "H", "Z", "R", "V", "J", "N", "D"],
	["S", "M", "H", "N", "B"],
];

directions.forEach((direction) => {
	const amountOfStacksToBeMoved = +direction[1];
	const fromColumn = +direction[3];
	const toColumn = +direction[5];

	const cratesToBeMoved = stacks[fromColumn].splice(0, amountOfStacksToBeMoved);
	stacks[toColumn].unshift(...cratesToBeMoved);
});

cratesOnTop = "";

for (let i = 1; i < stacks.length; i++) {
	cratesOnTop += stacks[i][0];
}

console.log(`The crates on top after moving are ${cratesOnTop}! 🎅 🎁`);

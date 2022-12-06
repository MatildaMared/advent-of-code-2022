import * as fs from "fs";
import * as path from "path";
import { forEachChild } from "typescript";

// 🎄 🎅 Advent of Code 2022 Day 6 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("");

function hasUniqueCharacters(arr: string[]) {
	return arr.every((char) => arr.indexOf(char) === arr.lastIndexOf(char));
}

function listOfCharactersCountingBackwards(
	input: string[],
	start: number,
	count: number
) {
	const characters = [];
	for (let i = 0; i < count; i++) {
		characters.push(input[start - i]);
	}
	return characters;
}

// 🍬 🍭 Part 1 🍭 🍬

for (let i = 3; i < input.length; i++) {
	const characters = listOfCharactersCountingBackwards(input, i, 4);
	if (hasUniqueCharacters(characters)) {
		console.log(
			`${
				i + 1
			} characters needs to be processed before the first start-of-packet marker is detected! 🎄🎅`
		);
		break;
	}
}

// 🍬 🍭 Part 2 🍭 🍬

for (let i = 13; i < input.length; i++) {
	const characters = listOfCharactersCountingBackwards(input, i, 14);
	if (hasUniqueCharacters(characters)) {
		console.log(
			`${
				i + 1
			} characters needs to be processed before the first start-of-nessage marker is detected! 🎄🎅`
		);
		break;
	}
}

import * as fs from "fs";
import * as path from "path";
import { forEachChild } from "typescript";

// 🎄 🎅 Advent of Code 2022 Day 3 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((line) => line.split(","));

function findAllRangeOfNumbers(range: string[]) {
	const start = parseInt(range[0]);
	const end = parseInt(range[1]);

	const rangeOfNumbers = [];
	for (let i = start; i <= end; i++) {
		rangeOfNumbers.push(i);
	}
	return rangeOfNumbers;
}

// 🍬 🍭 Part 1 🍭 🍬

function listOfNumbersFullyOverlap(list1: number[], list2: number[]) {
	let overlap = (first: number[], second: number[]) =>
		second.every((v) => first.includes(v));

	return overlap(list1, list2) || overlap(list2, list1);
}

let totalOverlap = 0;

input.forEach((pairOfElves) => {
	const firstElfSectionsToClean = findAllRangeOfNumbers(
		pairOfElves[0].split("-")
	);

	const secondElfSectionsToClean = findAllRangeOfNumbers(
		pairOfElves[1].split("-")
	);

	const isOverlapping = listOfNumbersFullyOverlap(
		firstElfSectionsToClean,
		secondElfSectionsToClean
	);

	if (isOverlapping) {
		totalOverlap++;
	}
});

console.log(
	`The total amount of pairs that fully contains the other is is ${totalOverlap}! 🎅 🍭 🍬`
);

// 🍬 🍭 Part 2 🍭 🍬

function listOfNumbersOverlaps(list1: number[], list2: number[]) {
	let overlap = (first: number[], second: number[]) =>
		second.some((v) => first.includes(v));

	return overlap(list1, list2) || overlap(list2, list1);
}

let numberOfSectionsOverlapping = 0;

input.forEach((pairOfElves) => {
	const firstElfSectionsToClean = findAllRangeOfNumbers(
		pairOfElves[0].split("-")
	);

	const secondElfSectionsToClean = findAllRangeOfNumbers(
		pairOfElves[1].split("-")
	);

	const isOverlapping = listOfNumbersOverlaps(
		firstElfSectionsToClean,
		secondElfSectionsToClean
	);

	if (isOverlapping) {
		numberOfSectionsOverlapping++;
	}
});

console.log(
	`The total amount of pairs that overlaps each other is is ${numberOfSectionsOverlapping}! 🎅 🍭 🍬`
);

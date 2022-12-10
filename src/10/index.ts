import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 10 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((line) => line.split(" "));

enum Command {
	Noop = "noop",
	AddX = "addx",
}

let drawing: string[][] = [[], [], [], [], [], []];
let currentDrawingPosition = 0;
let breakPoints = [40, 80, 120, 160, 200, 240];
let x = 1;
let currentCycle = 1;

// 🍬 🍭 Part 1 🍭 🍬

const cyclesToKeepTrackOf = [20, 60, 100, 140, 180, 220];
const signalStrengths = new Map<number, number>();

for (let i = 0; i < input.length; i++) {
	const [command, value] = input[i];

	logCyclesToKeepTrackOf();
	draw();

	switch (command) {
		case Command.Noop:
			currentCycle++;
			if (cyclesToKeepTrackOf.includes(currentCycle)) {
				signalStrengths.set(currentCycle, x * currentCycle);
			}
			break;
		case Command.AddX:
			const numberToAdd = Number(value);
			currentCycle += 1;
			logCyclesToKeepTrackOf();
			draw();
			currentCycle += 1;
			x = x + numberToAdd;
	}
}

function logCyclesToKeepTrackOf() {
	if (cyclesToKeepTrackOf.includes(currentCycle)) {
		signalStrengths.set(currentCycle, x * currentCycle);
	}
}

const totalSignalStrength = Array.from(signalStrengths.values()).reduce(
	(acc, curr) => acc + curr,
	0
);

console.log(`The total sum of signal strengths is ${totalSignalStrength} 🎄🎁`);

// 🍬 🍭 Part 2 🍭 🍬

function draw() {
	const spritePositions = [x, x + 1, x + 2];
	const currentPositionInLine = drawing[currentDrawingPosition].length + 1;

	if (spritePositions.includes(currentPositionInLine)) {
		drawing[currentDrawingPosition].push("#");
	} else {
		drawing[currentDrawingPosition].push(".");
	}

	if (breakPoints.includes(currentCycle)) {
		currentDrawingPosition += 1;
	}
}

drawing.forEach((line) => {
	console.log(line.join(""));
});
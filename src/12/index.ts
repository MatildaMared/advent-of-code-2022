import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 12 🎅 🎄

// 🍬 🍭 Part 1 🍭 🍬

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((line) => line.split(""));

const elevations = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

interface Position {
	x: number;
	y: number;
}

function findPosition(input: string[][], pos: string): Position {
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			if (input[y][x] === pos) {
				return { x, y };
			}
		}
	}
	return { x: 0, y: 0 };
}

function findElevationForPosition(input: string[][], pos: Position): string {
	if (pos.x < 0 || pos.y < 0) {
		return "";
	} else if (input[pos.y][pos.x] === "S") {
		return "a";
	} else if (input[pos.y][pos.x] === "E") {
		return "z";
	} else {
		return input[pos.y][pos.x];
	}
}

enum Direction {
	Up,
	Down,
	Left,
	Right,
}

function findSurroundingPositions(input: string[][], pos: Position) {
	let positions = [
		{ x: pos.x, y: pos.y - 1 },
		{ x: pos.x, y: pos.y + 1 },
		{ x: pos.x - 1, y: pos.y },
		{ x: pos.x + 1, y: pos.y },
	].filter((pos) => positionExists(input, pos));

	const currentElevationIndex = elevations.indexOf(
		findElevationForPosition(input, pos)
	);

	positions = positions.filter((pos) => {
		const positionElevationIndex = elevations.indexOf(
			findElevationForPosition(input, pos)
		);

		return positionElevationIndex <= currentElevationIndex + 1;
	});

	return positions;
}

function positionExists(input: string[][], pos: Position) {
	return (
		pos.x >= 0 &&
		pos.y >= 0 &&
		pos.y < input.length &&
		pos.x < input[pos.y].length
	);
}

const endPoint = findPosition(input, "E");

function calculateShortestDistanceToEnd(
	input: string[][],
	startingPoint: Position
): number {
	const positionsVisited = new Set<string>();
	let waysToExplore: [Position, number][] = [[startingPoint, 0]];
	let leastAmountOfStepsToReachEnd = 0;

	while (waysToExplore.length) {
		let [currentPosition, numberOfSteps] = waysToExplore.shift()!;

		if (positionsVisited.has(JSON.stringify(currentPosition))) {
			continue;
		}

		const surroundingPositions = findSurroundingPositions(
			input,
			currentPosition
		);

		positionsVisited.add(JSON.stringify(currentPosition));

		if (JSON.stringify(currentPosition) === JSON.stringify(endPoint)) {
			leastAmountOfStepsToReachEnd = numberOfSteps;
			break;
		}

		surroundingPositions.forEach((pos) => {
			waysToExplore.push([pos, numberOfSteps + 1]);
		});
	}
	return leastAmountOfStepsToReachEnd;
}

// 🍬 🍭 Part 1 🍭 🍬

const startingPoint = findPosition(input, "S");
const shortestDistanceToEnd = calculateShortestDistanceToEnd(
	input,
	startingPoint
);

console.log(
	`The fewest steps required to move from the current position to the location to get the best signal is ${shortestDistanceToEnd} 🎄`
);

// 🍬 🍭 Part 2 🍭 🍬

const startingPoints: Position[] = [];

input.forEach((row, y) => {
	row.forEach((col, x) => {
		if (col === "S" || col === "a") {
			startingPoints.push({ x, y });
		}
	});
});

let distancesToEnd: number[] = [];

startingPoints.forEach((startingPoint) => {
	distancesToEnd.push(calculateShortestDistanceToEnd(input, startingPoint));
});

distancesToEnd = distancesToEnd.filter((distance) => distance > 0);

console.log(
	`The fewest steps required to move to the location with the best signal considering all points with elevation 'a' is ${Math.min(
		...distancesToEnd
	)} 🎄`
);

import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 14 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((line) => line.split(" -> "))
	.map((input) =>
		input.map((value) => {
			const [x, y] = value.split(",");
			return { x: Number(x), y: Number(y) } as Position;
		})
	);

const rockPositions: Position[][] = [];

for (let i = 0; i < input.length; i++) {
	rockPositions.push([]);
	for (let j = 0; j < input[i].length; j++) {
		let start = input[i][j];
		let end = input[i][j + 1];

		if (end === undefined) {
			break;
		}

		rockPositions[i].push(start);

		if (end.y < start.y) {
			for (let k = start.y - 1; k > end.y; k--) {
				rockPositions[i].push({ x: start.x, y: k });
			}
		} else if (end.y > start.y) {
			for (let k = start.y + 1; k < end.y; k++) {
				rockPositions[i].push({ x: start.x, y: k });
			}
		} else if (end.x < start.x) {
			for (let k = start.x - 1; k > end.x; k--) {
				rockPositions[i].push({ x: k, y: start.y });
			}
		} else if (end.x > start.x) {
			for (let k = start.x + 1; k < end.x; k++) {
				rockPositions[i].push({ x: k, y: start.y });
			}
		}

		rockPositions[i].push(end);
	}
}

interface Position {
	x: number;
	y: number;
}

const xValues = rockPositions
	.map((value) => value.map((position) => position.x))
	.flat();

const yValues = rockPositions
	.map((value) => value.map((position) => position.y))
	.flat();

const rows = Math.max(...yValues) + 1;
const columns = Math.max(...xValues) + 1 - Math.min(...xValues);

const grid: string[][] = [];

for (let i = 0; i < rows; i++) {
	const row = [];
	for (let j = 0; j < columns; j++) {
		row.push(".");
	}
	grid.push(row);
}

rockPositions.forEach((rock) => {
	rock.forEach((position) => {
		grid[position.y][position.x - Math.min(...xValues)] = "#";
	});
});

// 🍬 🍭 Part 1 🍭 🍬

let sandThrown = 0;
let overflow = false;

function findPosition(position: Position) {
	try {
		const foundPosition = grid[position.y][position.x - Math.min(...xValues)];

		if (foundPosition === undefined) {
			throw new Error();
		}

		return foundPosition;
	} catch (error) {
		overflow = true;
	}
}

function dropSand() {
	const position = { x: 500, y: 0 };

	while (position.y < rows) {
		const southPosition = { x: position.x, y: position.y + 1 };

		if (findPosition(southPosition) === ".") {
			position.y++;
			continue;
		}

		const southWestPosition = { x: position.x - 1, y: position.y + 1 };
		if (findPosition(southWestPosition) === ".") {
			position.x--;
			position.y++;
			continue;
		}

		const southEastPosition = { x: position.x + 1, y: position.y + 1 };
		if (findPosition(southEastPosition) === ".") {
			position.x++;
			position.y++;
			continue;
		}

		const foundPosition = findPosition(position);

		grid[position.y][position.x - Math.min(...xValues)] = "o";
		sandThrown++;
		break;
	}
}

while (!overflow) {
	dropSand();
}

// Display grid
grid.forEach((row, index) => {
	console.log(index, row.join(""));
});

console.log(
	`The amount of sand thrown before overflowing is ${sandThrown - 1} 🎅`
);

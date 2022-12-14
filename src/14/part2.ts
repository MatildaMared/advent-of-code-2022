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

let xValues = rockPositions
	.map((value) => value.map((position) => position.x))
	.flat();

xValues = xValues
	.filter((value, index, self) => {
		return self.indexOf(value) === index;
	})
	.sort((a, b) => a - b);

let yValues = rockPositions
	.map((value) => value.map((position) => position.y))
	.flat();

yValues
	.filter((value, index, self) => {
		return self.indexOf(value) === index;
	})
	.sort((a, b) => a - b);

let rows = Math.max(...yValues) + 1;
let columns = Math.max(...xValues) + 1 - Math.min(...xValues);

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

function addFloor() {
	const lastFloor = grid[grid.length - 1];
	const newFloor = lastFloor.map(() => ".");
	const bottomFloor = lastFloor.map(() => "#");
	grid.push(newFloor);
	grid.push(bottomFloor);

	rows += 2;
	yValues.push(yValues[yValues.length - 1] + 1);
	yValues.push(yValues[yValues.length - 1] + 1);
}

addFloor();

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

function expand() {
	grid.forEach((row, index) => {
		if (index === grid.length - 1) {
			row.unshift("#");
			row.unshift("#");
			row.push("#");
			row.push("#");
		} else {
			row.unshift(".");
			row.unshift(".");
			row.push(".");
			row.push(".");
		}
	});
	columns += 4;
	xValues.unshift(xValues[0] - 1);
	xValues.unshift(xValues[0] - 1);
	xValues.push(xValues[xValues.length - 1] + 1);
	xValues.push(xValues[xValues.length - 1] + 1);
}

function dropSand() {
	let position = { x: 500, y: 0 };
	throwSand(position);

	function throwSand(position: Position) {
		while (position.y < rows) {
			if (position.x - 1 < 0) {
				expand();
				position.x++;
				throwSand(position);
			}

			if (
				position.x + 1 > Math.max(...xValues) ||
				position.x - 1 < Math.min(...xValues)
			) {
				expand();
				throwSand(position);
			}

			if (position.y === grid.length - 2) {
				grid[position.y][position.x - Math.min(...xValues)] = "o";
				break;
			}

			let southPosition = { x: position.x, y: position.y + 1 };
			let southWestPosition = { x: position.x - 1, y: position.y + 1 };
			let southEastPosition = { x: position.x + 1, y: position.y + 1 };

			if (findPosition(southPosition) === ".") {
				position.y++;
				continue;
			}

			if (findPosition(southWestPosition) === ".") {
				position.x--;
				position.y++;
				continue;
			}

			if (findPosition(southEastPosition) === ".") {
				position.x++;
				position.y++;
				continue;
			}

			if (findPosition({ x: 500, y: 0 }) === "o") {
				console.log(`Overflow!`);
				overflow = true;
				return;
			}

			grid[position.y][position.x - Math.min(...xValues)] = "o";
			break;
		}
	}
}

while (!overflow) {
	dropSand();
}

// Display grid
grid.forEach((row, index) => {
	console.log(index, row.join(""));
});

// count all sand
let count = 0;
grid.forEach((row) => {
	row.forEach((position) => {
		if (position === "o") {
			count++;
		}
	});
});

// 🍬 🍭 Part 2 🍭 🍬

console.log(
	`The amount of sand thrown before the source of sand becomes blocked is ${count}! 🎁 🎅`
);

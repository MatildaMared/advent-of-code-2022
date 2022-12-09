import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 9 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((line) => line.split(" "));

enum Direction {
	Up = "U",
	Down = "D",
	Left = "L",
	Right = "R",
}

interface Position {
	x: number;
	y: number;
}

// 🍬 🍭 Part 1 🍭 🍬

const positionsForPart1 = [
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
];

function calculateUniquePositionsVisitedByTail(positions: Position[]) {
	const tailPositionsVisited = [{ x: 0, y: 0 }];

	input.forEach((instruction) => {
		const direction = instruction[0] as Direction;
		const amount = parseInt(instruction[1]);

		for (let i = 0; i < amount; i++) {
			switch (direction) {
				case Direction.Up:
					positions[0].y += 1;
					for (let i = 1; i < positions.length; i++) {
						move(i);
					}
					break;
				case Direction.Down:
					positions[0].y -= 1;
					for (let i = 1; i < positions.length; i++) {
						move(i);
					}
					break;
				case Direction.Left:
					positions[0].x -= 1;
					for (let i = 1; i < positions.length; i++) {
						move(i);
					}
					break;
				case Direction.Right:
					positions[0].x += 1;
					for (let i = 1; i < positions.length; i++) {
						move(i);
					}
					break;
			}
		}
	});

	function move(i: number) {
		const tail = positions[i];
		const head = positions[i - 1];

		if (head.x === tail.x - 2 && head.y === tail.y + 2) {
			tail.x -= 1;
			tail.y += 1;
		} else if (head.x === tail.x + 2 && head.y === tail.y + 2) {
			tail.x += 1;
			tail.y += 1;
		} else if (head.x === tail.x - 2 && head.y === tail.y - 2) {
			tail.x -= 1;
			tail.y -= 1;
		} else if (head.x === tail.x + 2 && head.y === tail.y - 2) {
			tail.x += 1;
			tail.y -= 1;
		} else if (head.x === tail.x - 1 && head.y === tail.y + 2) {
			tail.x -= 1;
			tail.y += 1;
		} else if (head.x === tail.x && head.y === tail.y + 2) {
			tail.y += 1;
		} else if (head.x === tail.x + 1 && head.y === tail.y + 2) {
			tail.x += 1;
			tail.y += 1;
		} else if (head.x === tail.x - 2 && head.y === tail.y + 1) {
			tail.x -= 1;
			tail.y += 1;
		} else if (head.x === tail.x - 2 && head.y === tail.y) {
			tail.x -= 1;
		} else if (head.x === tail.x - 2 && head.y === tail.y - 1) {
			tail.x -= 1;
			tail.y -= 1;
		} else if (head.x === tail.x - 1 && head.y === tail.y - 2) {
			tail.x -= 1;
			tail.y -= 1;
		} else if (head.x === tail.x && head.y === tail.y - 2) {
			tail.y -= 1;
		} else if (head.x === tail.x + 1 && head.y === tail.y - 2) {
			tail.x += 1;
			tail.y -= 1;
		} else if (head.x === tail.x + 2 && head.y === tail.y - 1) {
			tail.x += 1;
			tail.y -= 1;
		} else if (head.x === tail.x + 2 && head.y === tail.y) {
			tail.x += 1;
		} else if (head.x === tail.x + 2 && head.y === tail.y + 1) {
			tail.x += 1;
			tail.y += 1;
		}

		if (i === positions.length - 1) {
			tailPositionsVisited.push({ ...tail });
		}
	}

	const uniquePositionsVisited: Position[] = [];
	tailPositionsVisited.forEach((position) => {
		if (
			!uniquePositionsVisited.some(
				(uniquePosition) =>
					uniquePosition.x === position.x && uniquePosition.y === position.y
			)
		) {
			uniquePositionsVisited.push(position);
		}
	});

	return uniquePositionsVisited.length;
}

const uniquePositionsVisitedForPart1 =
	calculateUniquePositionsVisitedByTail(positionsForPart1);

console.log(
	`For part 1, the tail of the rope vists ${uniquePositionsVisitedForPart1} positions at least once! 🎄🤶`
);

// 🍬 🍭 Part 2 🍭 🍬

const positionsForPart2 = [
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
];

const uniquePositionsVisitedForPart2 =
	calculateUniquePositionsVisitedByTail(positionsForPart2);

console.log(
	`For part 2, the tail of the rope vists ${uniquePositionsVisitedForPart2} positions at least once! 🎄🤶`
);

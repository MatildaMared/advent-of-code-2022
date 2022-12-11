import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 11 🎅 🎄

// 🍬 🍭 Part 1 🍭 🍬

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n\n");

class Monkey {
	id: number;
	items: number[];
	operation: (itemNumber: number) => number;
	test: (itemNumber: number) => number;
	itemsInspected: number = 0;

	constructor(
		id: number,
		items: number[],
		operation: (itemNumber: number) => number,
		test: (itemNumber: number) => number
	) {
		this.id = id;
		this.items = items;
		this.operation = operation;
		this.test = test;
	}

	lowerWorryLevel(itemNumber: number, isPart2: boolean) {
		if (isPart2) {
			return itemNumber % productOfAllDivisors;
		}
		return Math.floor(itemNumber / 3);
	}
}

let productOfAllDivisors = 1;

function solve(numberOfRounds: number, isPart2: boolean = false) {
	productOfAllDivisors = 1;
	const monkeys: Monkey[] = [];

	input.forEach((monkeyInformation) => {
		let monkeyId = 0;
		let monkeyItems: number[] = [];
		let monkeyOperation: (itemNumber: number) => number = () => 0;
		let testNumber: number = 0;
		let ifTrue: number;
		let ifFalse: number;

		const lines = monkeyInformation.split("\n");
		lines.forEach((line) => {
			if (line.includes("Monkey")) {
				monkeyId = parseInt(line.split(" ")[1]);
			}

			if (line.includes("items")) {
				const items = line
					.split(":")[1]
					.trim()
					.split(", ")
					.map((item) => parseInt(item));
				monkeyItems = items;
			}

			if (line.includes("Operation")) {
				const operation = line
					.split(":")[1]
					.trim()
					.split("=")[1]
					.trim()
					.split(" ");
				const operator = operation[1];
				const value = parseInt(operation[2]);
				switch (operator) {
					case "*":
						if (isNaN(value)) {
							monkeyOperation = (itemNumber: number) => itemNumber * itemNumber;
							break;
						} else {
							monkeyOperation = (itemNumber: number) => itemNumber * value;
							break;
						}
					case "+":
						if (isNaN(value)) {
							monkeyOperation = (itemNumber: number) => itemNumber + itemNumber;
							break;
						} else {
							monkeyOperation = (itemNumber: number) => itemNumber + value;
							break;
						}
				}
			}

			if (line.includes("Test")) {
				const test = line.split(" ").at(-1);
				if (test) {
					testNumber = parseInt(test);
				}
			}

			if (line.includes("true")) {
				const trueValue = line.split(" ").at(-1);
				if (trueValue) {
					ifTrue = parseInt(trueValue);
				}
			}

			if (line.includes("false")) {
				const falseValue = line.split(" ").at(-1);
				if (falseValue) {
					ifFalse = parseInt(falseValue);
				}
			}
		});

		const test = (itemNumber: number) => {
			if (itemNumber % testNumber === 0) {
				return ifTrue;
			} else {
				return ifFalse;
			}
		};

		monkeys.push(new Monkey(monkeyId, monkeyItems, monkeyOperation, test));
		productOfAllDivisors *= testNumber;
	});

	for (let i = 0; i < numberOfRounds; i++) {
		monkeys.forEach((monkey) => {
			while (monkey.items.length > 0) {
				let item = monkey.items.shift();
				if (item) {
					item = monkey.operation(item);
					item = monkey.lowerWorryLevel(item, isPart2);
					const monkeyToThrowTo = monkey.test(item);
					const monkeyToThrowToIndex = monkeys.findIndex(
						(monkey) => monkey.id === monkeyToThrowTo
					);
					monkeys[monkeyToThrowToIndex].items.push(item);
					monkey.itemsInspected++;
				}
			}
		});
	}

	const inspectedItemsAmounts = monkeys
		.map((monkey) => monkey.itemsInspected)
		.sort((a, b) => b - a);

	const monkeyBusinessLevel =
		inspectedItemsAmounts[0] * inspectedItemsAmounts[1];

	return monkeyBusinessLevel;
}

// 🍬 🍭 Part 1 🍭 🍬

const monkeyBusinessLevelForPart1 = solve(20);

console.log(
	`The level of monkey business after 20 rounds of stuff-slinging simian shenanigans is ${monkeyBusinessLevelForPart1}! 🐒 `
);

// 🍬 🍭 Part 2 🍭 🍬
const monkeyBusinessLevelForPart2 = solve(10000, true);

console.log(
	`The level of monkey business after 10000 rounds of stuff-slinging simian shenanigans with the new rules is ${monkeyBusinessLevelForPart2}! 🐒 `
);

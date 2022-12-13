import * as fs from "fs";
import * as path from "path";
import { isJSDocReadonlyTag } from "typescript";

// 🎄 🎅 Advent of Code 2022 Day 13 🎅 🎄

// 🍬 🍭 Part 1 🍭 🍬

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n\n")
	.map((x) => x.split("\n"))
	.map((x) => x.map((y) => JSON.parse(y)));

// 🍬 🍭 Part 1 🍭 🍬

let resultsThatAreInRightOrder = [];

for (let currentIndex = 1; currentIndex <= input.length; currentIndex++) {
	console.log(`== Pair ${currentIndex} ==`);
	const leftValue = input[currentIndex - 1][0];
	const rightValue = input[currentIndex - 1][1];

	const result = compare(leftValue, rightValue);
	console.log(`Result: ${result}`);
	console.log("---");

	if (result === true) {
		resultsThatAreInRightOrder.push(currentIndex);
	}
}

function compare(leftValue: any, rightValue: any): any {
	console.log(
		`- Compare ${JSON.stringify(leftValue)} vs ${JSON.stringify(rightValue)}`
	);

	const maxIndex = Math.max(leftValue.length, rightValue.length);

	for (let index = 0; index < maxIndex; index++) {
		let leftItem = leftValue[index];
		let rightItem = rightValue[index];

		if (leftItem === undefined) {
			return true;
		} else if (rightItem === undefined) {
			return false;
		}

		if (typeof leftItem === "number" && typeof rightItem === "number") {
			if (leftItem < rightItem) {
				return true;
			} else if (leftItem > rightItem) {
				return false;
			} else {
				continue;
			}
		}

		if (typeof leftItem === "number" && typeof rightItem !== "number") {
			return compare([leftItem], rightItem);
		}

		if (typeof rightItem === "number" && typeof leftItem !== "number") {
			return compare(leftItem, [rightItem]);
		}

		const result = compare(leftItem, rightItem);
		if (result !== undefined) {
			return result;
		}
	}
}

const totalOfResultsThatAreInRightOrder = resultsThatAreInRightOrder.reduce(
	(a, b) => a + b,
	0
);

console.log(
	"totalOfResultsThatAreInRightOrder",
	totalOfResultsThatAreInRightOrder
);

// 🍬 🍭 Part 2 🍭 🍬

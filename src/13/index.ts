import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 13 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n\n")
	.map((x) => x.split("\n"))
	.map((x) => x.map((y) => JSON.parse(y)));

// 🍬 🍭 Part 1 🍭 🍬

let resultsThatAreInRightOrder = [];
const allPackets = [];

for (let currentIndex = 1; currentIndex <= input.length; currentIndex++) {
	const leftValue = input[currentIndex - 1][0];
	const rightValue = input[currentIndex - 1][1];

	allPackets.push(leftValue);
	allPackets.push(rightValue);

	const result = compare(leftValue, rightValue);

	if (result === true) {
		resultsThatAreInRightOrder.push(currentIndex);
	}
}

function compare(leftValue: any, rightValue: any): any {
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
	`The amount of pairs of packets that are in the right order is: ${totalOfResultsThatAreInRightOrder}! 🎄 🎁`
);

// 🍬 🍭 Part 2 🍭 🍬

const decoderPackage1 = [[2]];
const decoderPackage2 = [[6]];

allPackets.push(decoderPackage1);
allPackets.push(decoderPackage2);

// sort all packets
const sortedPackets = allPackets.sort((a, b) => {
	const result = compare(a, b);
	return result ? -1 : 1;
});

let result = 0;

for (let index = 1; index <= sortedPackets.length; index++) {
	if (
		JSON.stringify(allPackets[index - 1]) === JSON.stringify(decoderPackage1)
	) {
		result += index;
	} else if (
		JSON.stringify(allPackets[index - 1]) === JSON.stringify(decoderPackage2)
	) {
		result *= index;
	}
}

console.log(`The decoder key for the distress signal is: ${result}! 🎄 🎁`);

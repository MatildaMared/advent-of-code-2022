import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 3 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n");

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
	""
);

// 🍬 🍭 Part 1 🍭 🍬

let totalPriorityPoints = 0;

let sortedRucksacks = input.map((rucksack) => {
	const middleIndex = Math.floor(rucksack.length / 2);
	const firstDepartment = rucksack.slice(0, middleIndex);
	const secondDepartment = rucksack.slice(middleIndex);
	return [firstDepartment, secondDepartment];
});

sortedRucksacks.forEach((rucksack) => {
	const firstDepartment = rucksack[0];
	const secondDepartment = rucksack[1];

	let commonItem;

	for (let i = 0; i < firstDepartment.length; i++) {
		const item = firstDepartment[i];
		if (secondDepartment.includes(item)) {
			commonItem = item;
			break;
		}
	}

	if (commonItem) {
		const pointForCommonItem = alphabet.indexOf(commonItem) + 1;
		totalPriorityPoints += pointForCommonItem;
	}
});

console.log(
	`The sum of all priority points are ${totalPriorityPoints}! 🎅 🍭 🍬`
);

// 🍬 🍭 Part 2 🍭 🍬

let totalBadgePoints = 0;

for (
	let indexOfCurrentGroup = 0;
	indexOfCurrentGroup < input.length;
	indexOfCurrentGroup += 3
) {
	const currentGroup = input.slice(
		indexOfCurrentGroup,
		indexOfCurrentGroup + 3
	);

	// find common item
	let commonItem;
	for (let i = 0; i < currentGroup[0].length; i++) {
		const item = currentGroup[0][i];
		if (currentGroup[1].includes(item) && currentGroup[2].includes(item)) {
			commonItem = item;
			break;
		}
	}

	if (commonItem) {
		totalBadgePoints += alphabet.indexOf(commonItem) + 1;
	}
}

console.log(`The sum of all badges are ${totalBadgePoints}! 🎅 🍭 🍬`);

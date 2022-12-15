import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 8 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((row) => row.split(""));

// 🍬 🍭 Part 1 🍭 🍬

let visibleTrees = 0;

input.forEach((rowOfTrees, rowIndex) => {
	if (rowIndex === 0 || rowIndex === input.length - 1) {
		visibleTrees += rowOfTrees.length;
		return;
	}

	rowOfTrees.forEach((tree, index) => {
		if (index === 0 || index === rowOfTrees.length - 1) {
			visibleTrees += 1;
			return;
		}

		const currentRow = [...input[rowIndex]].map((tree) => +tree);

		const treesVisibleFromLeft = currentRow.slice(0, index);

		let isVisibleFromLeft = true;
		treesVisibleFromLeft.forEach((visibleTree) => {
			if (visibleTree >= +tree) {
				isVisibleFromLeft = false;
			}
		});
		if (isVisibleFromLeft) {
			visibleTrees += 1;
			return;
		}

		const treesVisibleFromRight = currentRow.slice(index + 1);
		let isVisibleFromRight = true;
		treesVisibleFromRight.forEach((visibleTree) => {
			if (visibleTree >= +tree) {
				isVisibleFromRight = false;
				return;
			}
		});
		if (isVisibleFromRight) {
			visibleTrees += 1;
			return;
		}

		const currentColumn = input.map((row) => row[index]).map((tree) => +tree);

		const treesVisibleFromTop = currentColumn.slice(0, rowIndex);

		let isVisibleFromTop = true;

		treesVisibleFromTop.forEach((visibleTree) => {
			if (visibleTree >= +tree) {
				isVisibleFromTop = false;
			}
		});
		if (isVisibleFromTop) {
			visibleTrees += 1;
			return;
		}

		const treesVisibleFromBottom = currentColumn.slice(rowIndex + 1);
		let isVisibleFromBottom = true;
		treesVisibleFromBottom.forEach((visibleTree) => {
			if (visibleTree >= +tree) {
				isVisibleFromBottom = false;
			}
		});
		if (isVisibleFromBottom) {
			visibleTrees += 1;
			return;
		}
	});
});

console.log(
	`There are ${visibleTrees} trees visible from the outside grid! 🎄 🎁`
);

// 🍬 🍭 Part 2 🍭 🍬

let allScenicScores: number[] = [];

input.forEach((rowOfTrees, rowIndex) => {
	rowOfTrees.forEach((tree, index) => {
		let viewDistanceFromLeft = 0;
		const treesToTheLeft = rowOfTrees.slice(0, index);

		for (let i = treesToTheLeft.length - 1; i >= 0; i--) {
			const treeFromLeft = treesToTheLeft[i];
			viewDistanceFromLeft += 1;
			if (treeFromLeft >= tree) {
				break;
			}
		}

		const treesToTheRight = rowOfTrees.slice(index + 1);
		let viewDistanceFromRight = 0;

		for (let i = 0; i < treesToTheRight.length; i++) {
			const treeFromRight = treesToTheRight[i];
			viewDistanceFromRight += 1;
			if (treeFromRight >= tree) {
				break;
			}
		}

		const treesAbove = input.slice(0, rowIndex).map((row) => row[index]);
		console.log("trees above", treesAbove);
		let viewDistanceFromTop = 0;
		for (let i = treesAbove.length - 1; i >= 0; i--) {
			const treeFromTop = treesAbove[i];
			viewDistanceFromTop += 1;
			if (treeFromTop >= tree) {
				break;
			}
		}

		const treesBelow = input.slice(rowIndex + 1).map((row) => row[index]);
		let viewDistanceFromBottom = 0;
		for (let i = 0; i < treesBelow.length; i++) {
			const treeFromBottom = treesBelow[i];
			viewDistanceFromBottom += 1;
			if (treeFromBottom >= tree) {
				break;
			}
		}

		if (viewDistanceFromLeft === 0) viewDistanceFromLeft = 1;
		if (viewDistanceFromRight === 0) viewDistanceFromRight = 1;
		if (viewDistanceFromTop === 0) viewDistanceFromTop = 1;
		if (viewDistanceFromBottom === 0) viewDistanceFromBottom = 1;

		const scenicScore =
			viewDistanceFromLeft *
			viewDistanceFromRight *
			viewDistanceFromTop *
			viewDistanceFromBottom;

		allScenicScores.push(scenicScore);
	});
});

const maxScenicScore = Math.max(...allScenicScores);

console.log(`The maximum scenic score possible is ${maxScenicScore}! 🎄 🎁`);

import * as fs from "fs";
import * as path from "path";
import { parseListOfCalories } from "./parseListOfCalories";
import { addAndSortCalories } from "./addAndSortCalories";

// 🎄 🎅 Advent of Code 2022 Day 1 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const listOfCalories = parseListOfCalories(input);
const sortedListOfCalories = addAndSortCalories(listOfCalories);

// 🍬 🍭 Part 1 🍭 🍬

const elfWithMostCalories = sortedListOfCalories[0];

console.log(
	`The elf with the most calories has ${elfWithMostCalories} calories! 🎅 🍭 🍬`
);

// 🍬 🍭 Part 2 🍭 🍬

const topThreeElvesWithMostCalories = sortedListOfCalories.slice(0, 3);
const totalOfTopThreeElves = topThreeElvesWithMostCalories.reduce(
	(a, b) => a + b,
	0
);

console.log(
	`The top three elves with the most calories have ${totalOfTopThreeElves} calories in total! 🎅 🍭 `
);

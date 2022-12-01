import * as fs from "fs";
import * as path from "path";

function parseListOfCalories(input: string) {
	const baseArray = input.split("\n");
	let result: string[][] = [];
	let currentIndex = 0;

	baseArray.forEach((item) => {
		if (item === "") {
			currentIndex += 1;
			return;
		}

		if (!result[currentIndex]) {
			result[currentIndex] = [];
		}

		result[currentIndex].push(item);
	});

	return result;
}

function findElfWithMostCalories(listOfCalories: string[][]) {
	let listOfAddedCalories: number[] = [];

	listOfCalories.forEach((list) => {
		let result = 0;

		list.forEach((item) => {
			result += +item;
		});

		listOfAddedCalories.push(result);
	});

	return Math.max(...listOfAddedCalories);
}

const listOfCalories = fs.readFileSync(
	path.join(__dirname, "input.txt"),
	"utf8"
);

const sortedListOfCalories = parseListOfCalories(listOfCalories);
const mostCalories = findElfWithMostCalories(sortedListOfCalories);

console.log(mostCalories);

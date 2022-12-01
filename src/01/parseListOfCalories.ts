export function parseListOfCalories(input: string) {
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
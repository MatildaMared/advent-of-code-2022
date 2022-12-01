export function addAndSortCalories(listOfCalories: string[][]) {
	let listOfAddedCalories: number[] = [];

	listOfCalories.forEach((list) => {
		let result = 0;

		list.forEach((item) => {
			result += +item;
		});

		listOfAddedCalories.push(result);
	});

	const sortedListOfCalories = listOfAddedCalories.sort((a, b) => b - a);
	return sortedListOfCalories;
}

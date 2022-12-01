"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAndSortCalories = void 0;
function addAndSortCalories(listOfCalories) {
    let listOfAddedCalories = [];
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
exports.addAndSortCalories = addAndSortCalories;

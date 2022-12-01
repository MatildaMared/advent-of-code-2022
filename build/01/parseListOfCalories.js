"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseListOfCalories = void 0;
function parseListOfCalories(input) {
    const baseArray = input.split("\n");
    let result = [];
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
exports.parseListOfCalories = parseListOfCalories;

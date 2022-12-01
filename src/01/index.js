"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
function findElfWithMostCalories(listOfCalories) {
    let listOfAddedCalories = [];
    listOfCalories.forEach((list) => {
        let result = 0;
        list.forEach((item) => {
            result += +item;
        });
        listOfAddedCalories.push(result);
    });
    return Math.max(...listOfAddedCalories);
}
const listOfCalories = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const sortedListOfCalories = parseListOfCalories(listOfCalories);
const mostCalories = findElfWithMostCalories(sortedListOfCalories);
console.log(mostCalories);

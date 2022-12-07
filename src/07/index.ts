import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 7 🎅 🎄

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n");

const fileTree: Directory = {
	type: "directory",
	contents: {},
};

interface Directory {
	type: "directory";
	contents: {
		[key: string]: Directory | File;
	};
}

interface File {
	type: "file";
	size: number;
}

let currentPath: string[] = [];

function getDirectory(directory: any, path: string[]): any {
	const [currentPath, ...rest] = path;
	if (path.length === 0) {
		return directory;
	} else {
		return getDirectory(directory.contents[currentPath], rest);
	}
}

function handleCommand(line: string, index: number) {
	const [_, ...commands] = line.split(" ");
	switch (commands[0]) {
		case "cd":
			if (commands[1] === "..") {
				currentPath.pop();
			} else {
				if (commands[1].charAt(0) !== "/") {
					currentPath.push(commands[1]);
				}
			}
			break;
		case "ls":
			const contents = [];
			for (let i = index + 1; i < input.length; i++) {
				if (input[i].charAt(0) === "$") break;
				contents.push(input[i]);
			}
			const currentDirectory = getDirectory(fileTree, currentPath);
			contents.forEach((content) => {
				const parts = content.split(" ");
				if (parts[0].match(/^\d/)) {
					currentDirectory.contents[parts[1]] = {
						type: "file",
						size: parseInt(parts[0]),
					};
				} else {
					currentDirectory.contents[parts[1]] = {
						type: "directory",
						contents: {},
					};
				}
			});
			break;
	}
}

input.forEach((line, index) => {
	if (line.charAt(0) === "$") {
		handleCommand(line, index);
	}
});

function getSize(element: Directory | File): number {
	if (element.type === "directory") {
		return Object.values(element.contents).reduce(
			(size, content) => size + getSize(content),
			0
		);
	} else {
		return element.size;
	}
}

// 🍬 🍭 Part 1 🍭 🍬

let sizes = [];

let directoriesToSearch = [fileTree];

while (directoriesToSearch.length > 0) {
	const currentDirectory = directoriesToSearch.pop();
	let currentFolderSize = 0;

	if (currentDirectory) {
		for (const element of Object.values(currentDirectory.contents)) {
			currentFolderSize += getSize(element);
			if (element.type === "directory") directoriesToSearch.push(element);
		}
	}

	sizes.push(currentFolderSize);
}

const MAX_SIZE = 100000;
const applicableSizes = sizes.filter((size) => size < MAX_SIZE);

const totalOfApplicableSizes = applicableSizes.reduce(
	(total, size) => total + size,
	0
);

console.log(
	`The total size of all directories that has a total size that is less than 10000: ${totalOfApplicableSizes} 🎄 🎁`
);

// 🍬 🍭 Part 2 🍭 🍬

const totalAmountOfUsedSpace = Math.max(...sizes);

const maxDiskSpace = 70000000;
const availableSpaceNeeded = 30000000;

const currentAvailableSpace = maxDiskSpace - totalAmountOfUsedSpace;
const minimumAmountToDelete = availableSpaceNeeded - currentAvailableSpace;

const sortedSizes = sizes.sort((a, b) => a - b);

const folderToDelete = sortedSizes.find((size) => size > minimumAmountToDelete);

console.log(
	`The folder that needs to be deleted to free up the needed available space is ${folderToDelete} 🎄 🎁`
);

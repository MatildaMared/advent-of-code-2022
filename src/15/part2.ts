import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2022 Day 15 🎅 🎄

interface Position {
	x: number;
	y: number;
}

interface SensorData {
	sensorPosition: Position;
	beaconPosition: Position;
}

const input = fs
	.readFileSync(path.join(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((line) => line.split("="))
	.reduce((acc, cur) => {
		const sensorData = {
			sensorPosition: {
				x: +cur[1].split(",")[0].trim(),
				y: +cur[2].split(":")[0].trim(),
			},
			beaconPosition: {
				x: +cur[3].split(",")[0].trim(),
				y: +cur[4],
			},
		};
		return [...acc, sensorData];
	}, [] as SensorData[]);

const min = 0;
const max = 4000000;

function findIndexOfAvailableXPosition(targetRow: number): number | undefined {
	const ranges: any[] = [];

	input.forEach((sensorData) => {
		const sensorPosition = sensorData.sensorPosition;
		const beaconPosition = sensorData.beaconPosition;

		const xDiff = Math.abs(beaconPosition.x - sensorPosition.x);
		const yDiff = Math.abs(beaconPosition.y - sensorPosition.y);

		const signalLength = xDiff + yDiff;
		const currentRow = sensorPosition.y;

		if (
			currentRow - signalLength <= targetRow &&
			currentRow + signalLength >= targetRow
		) {
			const difference = Math.abs(targetRow - currentRow);
			const rangeStartForTargetRow =
				sensorPosition.x - (signalLength - difference);
			const rangeEndForTargetRow =
				sensorPosition.x + (signalLength - difference);

			ranges.push({
				rangeStart: rangeStartForTargetRow,
				rangeEnd: rangeEndForTargetRow,
			});
		}
	});

	let firstUnblockedRange = 0;

	ranges.sort((a, b) => a.rangeStart - b.rangeStart);

	ranges.forEach((range) => {
		if (
			range.rangeStart < firstUnblockedRange &&
			range.rangeEnd > firstUnblockedRange
		) {
			firstUnblockedRange = range.rangeEnd + 1;
		}
	});

	if (firstUnblockedRange > 0 && firstUnblockedRange <= max) {
		return firstUnblockedRange;
	}
}

// 🍬 🍭 Part 2 🍭 🍬
for (let i = min; i <= max; i++) {
	console.log(`Checking row ${i}`);
	const result = findIndexOfAvailableXPosition(i);
	if (typeof result === "number") {
		const distressBeaconPosition = {
			x: result,
			y: i,
		};
		console.log(distressBeaconPosition);
		const tuningFrequency =
			distressBeaconPosition.x * 4000000 + distressBeaconPosition.y;
		console.log(
			`The tuning frequency for the distress beacon is ${tuningFrequency}`
		);
		break;
	}
}

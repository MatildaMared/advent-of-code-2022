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

function calculateHowManyPositionsCannotContainABeaconInTargetRow(
	targetRow: number
) {
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

	const minimumRangeStart = Math.min(...ranges.map((r) => r.rangeStart));
	const maximumRangeEnd = Math.max(...ranges.map((r) => r.rangeEnd));

	let positionsCoveredBySignalInTargetRow = 0;

	for (let i = minimumRangeStart + 1; i <= maximumRangeEnd; i++) {
		positionsCoveredBySignalInTargetRow++;
	}

	return positionsCoveredBySignalInTargetRow;
}

// 🍬 🍭 Part 1 🍭 🍬

console.log(
	`The number of positions that cannot contain a beacon in the target row are ${calculateHowManyPositionsCannotContainABeaconInTargetRow(
		2000000
	)}! 🎁 🎄`
);

// 🍬 🍭 Part 2 🍭 🍬

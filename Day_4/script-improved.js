console.time();

import { readFile } from "../helpers.js";

const fileContent = readFile("input.txt").trim().split('\n');

const rows = fileContent.length;
const cols = fileContent[0].length;
const chars = new Uint8Array(rows * cols);
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        chars[i * cols + j] = fileContent[i][j].charCodeAt(0);
    }
}

const x = 'X'.charCodeAt(0);
const m = 'M'.charCodeAt(0);
const a = 'A'.charCodeAt(0);
const s = 'S'.charCodeAt(0);

const getChar = (row, col) => 
    row >= 0 && row < rows && col >= 0 && col < cols ? chars[row * cols + col] : 0;

const checkXMAS = (row, col, rowDelta, colDelta) => 
    getChar(row, col) === x &&
    getChar(row + rowDelta, col + colDelta) === m &&
    getChar(row + rowDelta * 2, col + colDelta * 2) === a &&
    getChar(row + rowDelta * 3, col + colDelta * 3) === s;

const checkMAS = (row, col, rowDelta, colDelta) => {
    const c1 = getChar(row, col);
    const c2 = getChar(row + rowDelta, col + colDelta);
    const c3 = getChar(row + rowDelta * 2, col + colDelta * 2);
    return (c1 === m && c2 === a && c3 === s) ||
           (c1 === s && c2 === a && c3 === m);
};

const possibleDirections = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
    [1, 1], // right+down
    [1, -1], // left+down
    [-1, -1], // left+up
    [-1, 1] // right+up
];

const countXMAS = () => {
    let count = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (getChar(row, col) === x) {
                count += possibleDirections.reduce((sum, [rowDelta, colDelta]) => 
                    sum + (checkXMAS(row, col, rowDelta, colDelta) ? 1 : 0), 0);
            }
        }
    }
    return count;
};

const countCrossMAS = () => {
    let count = 0;
    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            if (getChar(row, col) === a) {
                count += (checkMAS(row - 1, col - 1, 1, 1) && 
                         checkMAS(row - 1, col + 1, 1, -1)) ? 1 : 0;
            }
        }
    }
    return count;
};

// Part 1 answer
console.log(countXMAS()); // 2500

// Part 2 answer
console.log(countCrossMAS()); // 1933

console.timeEnd();
// 5.457ms
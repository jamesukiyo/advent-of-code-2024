console.time();

import { readFile } from "../helpers.js";

const fileContent = readFile("input.txt").trim().split("\n").map(line => line.split(""));

const findXMAS = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

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

    const checkDirection = (row, col, dRow, dCol) => {
        const word = "XMAS";
        for (let i = 0; i < word.length; i++) {
            const newRow = row + (dRow * i);
            const newCol = col + (dCol * i);
            
            if (newRow < 0 || newRow >= rows || 
                newCol < 0 || newCol >= cols || 
                grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    };
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 'X') {
                for (const [dRow, dCol] of possibleDirections) {
                    if (checkDirection(row, col, dRow, dCol)) {
                        count++;
                    }
                }
            }
        }
    }
    return count;
};

const findCrossMAS = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const checkMAS = (row, col, dRow, dCol) => {
        const forward = [];
        const backward = [];
        
        for (let i = 0; i < 3; i++) {
            const newRow = row + (dRow * i);
            const newCol = col + (dCol * i);
            
            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
                return false;
            }
            
            forward.push(grid[newRow][newCol]);
            backward.unshift(grid[newRow][newCol]);
        }
        
        return forward.join('') === 'MAS' || backward.join('') === 'MAS';
    };

    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            if (grid[row][col] === 'A') {

                const topLeftToBottomRight = checkMAS(row - 1, col - 1, 1, 1);
                const topRightToBottomLeft = checkMAS(row - 1, col + 1, 1, -1);
                
                if (topLeftToBottomRight && topRightToBottomLeft) {
                    count++;
                }
            }
        }
    }
    return count;
};

// Part 1 answer
console.log(findXMAS(fileContent)); // 2500

// Part 2 answer
console.log(findCrossMAS(fileContent)); // 1933

console.timeEnd();
// 8.614ms
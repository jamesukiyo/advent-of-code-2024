console.time()

const fs = require("node:fs");

// Utility functions
const readFile = (file) => {
    try {
        return fs.readFileSync(file, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        process.exit(1);
    }
};

const splitFile = (str) => 
    str.split("\n").map(item => item.split("   "));

const arrToNumbers = (arr) => 
    arr.map(row => row.map(Number));

const splitInTwo = (nestedArr) => {
    const arr1 = [];
    const arr2 = [];
    
    nestedArr.forEach(pair => {
        arr1.push(pair[0]);
        arr2.push(pair[1]);
    });
    
    return { arr1, arr2 };
};

const processFile = (file) => {
    const fileContent = readFile(file);
    const splitContent = splitFile(fileContent);
    const numberedContent = arrToNumbers(splitContent);
    return splitInTwo(numberedContent);
};

const finalCalc = (arr1, arr2) => 
    arr1.reduce((total, value, i) => 
        total + Math.abs(value - arr2[i]), 0);

const findSimilarityScore = (arr1, arr2) => {
    const countMap = new Map();
    
    arr2.forEach(value => {
        countMap.set(value, (countMap.get(value) || 0) + 1);
    });
    
    return arr1.reduce((score, value) => 
        score + (value * (countMap.get(value) || 0)), 0);
};

// Main execution
const { arr1, arr2 } = processFile("input.txt");

const orderedArr1 = arr1.sort((a, b) => a - b);
const orderedArr2 = arr2.sort((a, b) => a - b);

// Part 1 answer
console.log(finalCalc(orderedArr1, orderedArr2)); // 2430334

// Part 2 answer
console.log(findSimilarityScore(orderedArr1, orderedArr2)); // 28786472

console.timeEnd()
// 4.224ms
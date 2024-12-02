console.time();

import { readFile } from "../helpers.js";

const processFile = (file) => {
    const fileContent = readFile(file);
    return fileContent
        .split("\n")
        .map(line => line.split(" ").map(Number));
};

const isArrSafe = (arr) => {
    const isIncreasing = arr.every((num, index) => 
      index === 0 || num - arr[index - 1] >= 1 && num - arr[index - 1] <= 3
    );
  
    const isDecreasing = arr.every((num, index) => 
      index === 0 || arr[index - 1] - num >= 1 && arr[index - 1] - num <= 3
    );
  
    return isIncreasing || isDecreasing;
  }

const safeMaker = (arr) => {
    if (isArrSafe(arr)) return true;
    
    for (let i = 0; i < arr.length; i++) {
        const newArr = arr.filter((_, index) => index !== i);
        if (isArrSafe(newArr)) return true;
    }
    
    return false;
};

const data = processFile("input.txt");

// Part 1 answer
console.log(data.filter(isArrSafe).length); // 585

// Part 2 answer
console.log(data.filter(safeMaker).length); // 626

console.timeEnd();
// 3.089ms
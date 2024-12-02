console.time()

import { readFile } from "../helpers.js";

const splitFile = (str) => 
    str.split("\n").map(item => item.split(" "));

const arrToNumbers = (arr) => 
    arr.map(row => row.map(Number));

const processFile = (file) => {
    const fileContent = readFile(file);
    const splitContent = splitFile(fileContent);
    const numberedContent = arrToNumbers(splitContent);
    return numberedContent;
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
        const newArr = [
        ...arr.slice(0, i),
        ...arr.slice(i + 1)
        ];

        if (isArrSafe(newArr)) return true;
    }
    return false;
}

// Part 1 answer
console.log(processFile("input.txt").filter(isArrSafe).length); // 585

// Part 2 answer
console.log(processFile("input.txt").filter(safeMaker).length); // 626

console.timeEnd();
// 3.761ms
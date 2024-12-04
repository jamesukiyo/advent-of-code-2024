console.time();

import { readFile } from "../helpers.js";

const MUL_REGEX = /mul\((\d+),(\d+)\)/g;
const MUL_DO_DONT_REGEX = /do\(\)|don\'t\(\)|mul\(\d+,\d+\)/g;

const scanFileForMulRegex = (file) => {
    const fileContent = readFile(file);
    const matchArr = [];
    
    let match;
    while((match = MUL_REGEX.exec(fileContent)) !== null) {
        matchArr.push(match[0]);
    }
    
    return matchArr;
};

const scanFileForMulDoDontRegex = (file) => {
    const fileContent = readFile(file);
    const matchDoDontArr = [];

    let match;
    let isDo = true;
    
    while((match = MUL_DO_DONT_REGEX.exec(fileContent)) !== null) {
        if(match[0].startsWith("do()")) isDo = true;
        else if(match[0].startsWith("don't()")) isDo = false;
        else { if (isDo) matchDoDontArr.push(match[0]); }
        
    }
    return matchDoDontArr;
}

const matchArr = scanFileForMulRegex("input.txt");
const matchDoDontArr = scanFileForMulDoDontRegex("input.txt");

const trimMatchMul = (arr) => {
    return arr.map((item) =>
        item.replaceAll("mul(", "").replaceAll(")","")
    );
};

const trimmedMulArr = trimMatchMul(matchArr);
const trimmedMulDoDontArr = trimMatchMul(matchDoDontArr);

const splitAndNumberfy = (arr) => {
    return arr.map((item) => 
        item.split(",").map(Number)
    );
};

const splitNumberArr = splitAndNumberfy(trimmedMulArr);
const splitNumberDoDontArr = splitAndNumberfy(trimmedMulDoDontArr);


const calcMul = (arr) => {
    let total = 0;
    arr.forEach((item) => total += item[0] * item[1])
    return total;
}

// Part 1 answer
console.log(calcMul(splitNumberArr)); // 188741603

// Part 2 answer
console.log(calcMul(splitNumberDoDontArr)) // 67269798

console.timeEnd();
// 1.761ms
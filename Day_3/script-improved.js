console.time();

import { readFile } from "../helpers.js";

const fileContent = readFile("input.txt");

const COMBINED_REGEX = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;

const scanForRegex = (content) => {
    const part1Numbers = [];
    const part2Numbers = [];
    let isDo = true;
    let match;
    
    while ((match = COMBINED_REGEX.exec(content)) !== null) {
        const [fullMatch, num1, num2] = match;
        
        if (fullMatch === "do()") isDo = true;
        else if (fullMatch === "don't()") isDo = false;
        else if (num1 && num2) {
            const nums = [+num1, +num2];
            part1Numbers.push(nums);
            if (isDo) part2Numbers.push(nums);
        }
    }
    return [part1Numbers, part2Numbers];
};

const calcTotal = numbers => 
    numbers.reduce((sum, [a, b]) => sum + a * b, 0);

const [part1Numbers, part2Numbers] = scanForRegex(fileContent);

// Part 1 answer
console.log(calcTotal(part1Numbers)); // 188741603

// Part 2 answer
console.log(calcTotal(part2Numbers)); // 67269798

console.timeEnd();
// 1.245ms
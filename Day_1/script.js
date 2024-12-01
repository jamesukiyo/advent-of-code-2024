console.time()

const fs = require("node:fs");

const readFile = (file) => fs.readFileSync(file, 'utf8');

const splitFile = (str) => {
    const arr = [];
    const split = str.split("\n");
    split.forEach((item) => {
        arr.push(item.split("   "))
    });
    return arr;
}

const arrToNumbers = (arr) => {
    arr.forEach((row, i) => {
        row.forEach((_, j) => {
            arr[i][j] = Number(arr[i][j])
        })
    })  
    return arr;      
}

const orderArrAsc = (arr) => arr.sort((a,b) => {return a-b});

const prepareFile = (file) => arrToNumbers(splitFile(readFile(file)))

const splitInTwo = (nestedArr) => nestedArr.forEach(pair => arr1.push(pair[0]) && arr2.push(pair[1]))

let abc = prepareFile("input.txt")

const arr1 = []
const arr2 = []

splitInTwo(abc)

const orderedArr1 = orderArrAsc(arr1);
const orderedArr2 = orderArrAsc(arr2);

const finalCalc = (arr1, arr2) => {
    let totalDiff = 0;
    arr1.forEach((value, i) => {
        totalDiff += Math.abs(value - arr2[i]);
    });
    return totalDiff;
}

const findSimilarityScore = (arr1, arr2) => {
    let similarityScore = 0;
    arr1.forEach(value => {
        const currentCount = arr2.filter(item => item === value).length;
        similarityScore += value * currentCount;
    });
    return similarityScore;
}

// Part 1 answer
console.log(finalCalc(orderedArr1, orderedArr2)) // 2430334

// Part 2 answer
console.log(findSimilarityScore(orderedArr1, orderedArr2)) // 28786472

console.timeEnd()
// 8.099ms
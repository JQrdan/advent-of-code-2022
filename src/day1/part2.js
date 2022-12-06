const { getInputString } = require('../utils/getInputString.js');

const file = getInputString(1, false);
// util func
const sum = arr => arr.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

// represent each elf as an array of calories
const elfs = file.split('\n\n').map(calories => calories.split('\n').map(str => parseInt(str)));

// reduce each elf to it's totalled calories
const totaledElfs = elfs.map(elf => sum(elf))

// to track the top 3
const top3Elves = [];

for(let i = 0; i < 3; i++) {
  let currentLargest = Math.max(...totaledElfs);
  top3Elves.push(currentLargest);

  let index = totaledElfs.indexOf(currentLargest);
  totaledElfs.splice(index, 1);
}

console.log(sum(top3Elves));

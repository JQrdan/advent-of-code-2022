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

const largest =  Math.max(...totaledElfs);

console.log(largest);

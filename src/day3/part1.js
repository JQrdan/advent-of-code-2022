const { getInputString } = require('../utils/getInputString.js');

const file = getInputString(3, false);

const sum = arr => arr.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

const rucksacks = file.split('\n');

// add space at start to act as value 0 lol
const priorities = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const priorityScores = [];
rucksacks.forEach(rucksack => {
  const compartment1 = rucksack.slice(0, rucksack.length / 2);
  const compartment2 = rucksack.slice(rucksack.length / 2, rucksack.length);

  let match;
  for(const char of compartment1) {
    if(compartment2.includes(char)) {
      match = char;
      break;
    }
  }

  const priorityScore = priorities.indexOf(match);
  priorityScores.push(priorityScore);
});

console.log(sum(priorityScores))
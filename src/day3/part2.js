const { getInputString } = require('../utils/getInputString.js');

const file = getInputString(3, false);

const sum = arr => arr.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

const rucksacks = file.split('\n');

// add space at start to act as value 0 lol
const priorities = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// sort rucksacks into groups of 3
const groups = [];
let group = [];
for(const rucksack of rucksacks) {
  if(group.length === 3) {
    groups.push([...group]); 
    group = [];
  }
  group.push(rucksack);
}
groups.push([...group]);

// find the common char in the 3 rucksacks of each group
const priorityScores = [];
groups.forEach(group => {
  const [r1, r2, r3] = group;

  let match;
  for(const char of r1) {
    if(r2.includes(char) && r3.includes(char)) {
      match = char;
      break;
    }
  }

  const priorityScore = priorities.indexOf(match);
  priorityScores.push(priorityScore);
});

console.log(sum(priorityScores))
const fs = require('fs');
const path = require('path');

// parse the input
const file = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

const pairs = file.split('\n');

const rangeToList = (range) => {
  const [start, end] = range.split('-');

  const list = [];
  for(let i = parseInt(start); i <= end; i++) {
    list.push(`"${i}"`);
  }
  return list.join('');
}

const completeOverLaps = pairs.filter(pair => {
  let [elf1, elf2] = pair.split(',');

  elf1 = rangeToList(elf1);
  elf2 = rangeToList(elf2);

  return elf1.includes(elf2) || elf2.includes(elf1)
});

console.log(completeOverLaps.length);
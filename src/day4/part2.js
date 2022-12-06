const { getInputString } = require('../utils/getInputString.js');

const file = getInputString(4, false);

const pairs = file.split('\n');

const rangeToList = (range) => {
  const [start, end] = range.split('-');

  const list = [];
  for(let i = parseInt(start); i <= end; i++) {
    list.push(i);
  }
  return list;
}

const overLaps = pairs.filter(pair => {
  let [elf1, elf2] = pair.split(',');

  elf1 = rangeToList(elf1);
  elf2 = rangeToList(elf2);

  let match = false;
  for(const section of elf1) {
    if(elf2.includes(section)) {
      match = true;
      break;
    }
  }
  return match;
});

console.log(overLaps.length);
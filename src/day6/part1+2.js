const { getInputString } = require('../utils/getInputString.js');

const message = getInputString(6, false);

const WINDOW_SIZE = 4 // or 14 for part 2

const getCharacterIndex = (message) => {
  let offset = 0;
  while(true) {
    const window = message.slice(offset, WINDOW_SIZE + offset);
    const set = new Set(window);
    if(set.size === WINDOW_SIZE) {
      return WINDOW_SIZE + offset;
    }
    offset++
  }
}

console.log(getCharacterIndex(message));

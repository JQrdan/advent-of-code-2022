const { getInputString } = require("../utils/getInputString.js");

const sum = arr => arr.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

const getPairs = (file) => {
  const pairs = [];
  let currentPair = [];

  for(const line of file.split('\n')) {
    if(line === "") {
      pairs.push(currentPair);
      currentPair = [];
    } else {
      currentPair.push(JSON.parse(line));
    }
  }
  pairs.push(currentPair);

  return pairs
}

const results = {
  continue: 'c',
  failed: 'f',
  passed: 'p'
}

const comparePair = (left, right) => {
  console.log(left, right)
  const loops = Math.max(left.length, right.length);

  for(let i = 0; i < loops; i++) {
    let result = results.continue;

    const leftItem = left[i]
    const rightItem = right[i]

    console.log(`compare ${leftItem} vs ${rightItem}`)

    if(leftItem === undefined) {
      console.log('left side ran out of items so inputs are in the right order')
      return results.passed;
    }

    if(rightItem === undefined) {
      console.log('right side ran out of items so inputs are not in the right order')
      return results.failed;
    }

    if(Array.isArray(leftItem) && Array.isArray(rightItem)) {
      result = comparePair(leftItem, rightItem)
    } else if(Array.isArray(leftItem) && !Array.isArray(rightItem)) {
      result = comparePair(leftItem, [rightItem]);
    } else if(!Array.isArray(leftItem) && Array.isArray(rightItem)) {
      result = comparePair([leftItem], rightItem);
    } else if(leftItem > rightItem) {
      console.log('right side is smaller, so inputs are not in the right order')
      result = results.failed;
    } else if (leftItem < rightItem) {
      console.log('left side is smaller, so inputs are in the right order')
      result = results.passed;
    }

    if(result === results.failed) {
      return results.failed;
    }
    if(result === results.passed) {
      return results.passed;
    }
  }
}

const Run = () => {
  const file = getInputString(13, false);

  const pairs = getPairs(file);

  const indexes = [];
  for(const i in  pairs) {
    const pair = pairs[i];
    const result = comparePair(pair[0], pair[1]);
  
    if(result === results.passed) {
      indexes.push(parseInt(i)+1);
    }
  }
  
  console.log(sum(indexes));
}

Run();

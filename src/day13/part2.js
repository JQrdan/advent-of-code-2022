const { getInputString } = require("../utils/getInputString.js");

const product = arr => arr.reduce((acc, cur) => {
  acc *= cur;
  return acc;
}, 1);

const getPackets = (file) => {
  const packets = [];
  for(const line of file.split('\n')) {
    if(line !== "") {
      packets.push(JSON.parse(line));
    }
  }
  return packets;
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
  const packets = getPackets(file);
  const additionalPackets = [[[2]], [[6]]];

  const sorted = [...packets, ...additionalPackets].sort((left, right) => comparePair(left, right) === results.passed ? -1 : 1);

  const indices = [];
  for(const i in sorted) {
    const packet = sorted[i];

    if(JSON.stringify(packet) === JSON.stringify(additionalPackets[0]) || JSON.stringify(packet) === JSON.stringify(additionalPackets[1])) {
      indices.push(parseInt(i) + 1);
    }
  }
  console.log(product(indices));
}

Run();

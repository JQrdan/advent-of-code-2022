
const { getInputString } = require("../utils/getInputString.js");

const sum = arr => arr.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

const file = getInputString(10, false);
const instructions = file.split("\n");

let x = 1;
let instructionNum = 0;
let timeToWait = 0;
let valueToAddOnceDoneWaiting = 0;
let doneWithInstructions = false;
let cycleToWatch = 20;
let watch = [];

for (let cycle = 1; !doneWithInstructions; cycle++) {
  if (timeToWait === 0) {
    x += valueToAddOnceDoneWaiting;

    if (instructionNum === instructions.length - 1) {
      doneWithInstructions = true;
    }

    const instruction = instructions[instructionNum];
    instructionNum++;
    if (instruction === "noop") {
      valueToAddOnceDoneWaiting = 0;
      timeToWait += 1;
    } else {
      valueToAddOnceDoneWaiting = parseInt(instruction.split(" ")[1]);
      timeToWait += 2;
    }
  }
  timeToWait--;

  if(cycle === cycleToWatch) {
    cycleToWatch+=40
    watch.push(x * cycle);
  }
}

console.log(watch);
console.log(sum(watch));

// let nextWatchCycle = 20;
// let watch = [];

// do {
//   const instruction = instructions[currentCycle];
//   currentCycle++;

//   if(nextWatchCycle === currentCycle) {
//     nextWatchCycle += 40
//     watch.push(x);
//   }

//   toExecute.map((execute, index) => {
//     if(execute.executionTime === currentCycle) {
//       x += execute.value;
//       toExecute.splice(index, 1);
//     }
//   });

//   if(instruction && instruction !== "noop") {
//     const value = parseInt(instruction.split(" ")[1]);
//     toExecute.push({
//       executionTime: currentCycle + 2,
//       value
//     })
//   }

//   console.log(currentCycle, x);
// } while (toExecute.length > 0 || instructions.slice(currentCycle, instructions.length - 1).length > 0)

// console.log(toExecute)
// console.log(watch);

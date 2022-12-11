
const { appendFileSync } = require("fs");
const { getInputString } = require("../utils/getInputString.js");

const sum = arr => arr.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

const file = getInputString(10, false);
const instructions = file.split("\n");

const Run = () => {
  let x = 1;
  let instructionNum = 0;
  let timeToWait = 0;
  let valueToAddOnceDoneWaiting = 0;
  let doneWithInstructions = false;
  
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
  
    draw(cycle, x);
  }
}

const getRowToDraw = (cycle, rowToDraw = 0) => {
  if(cycle > 40) {
    return getRowToDraw(cycle - 40, rowToDraw + 1);
  }
  return [rowToDraw, cycle];
}

const screen = [[],[],[],[],[],[]];
const draw = (cycle, x) => { 
  const [row, column] = getRowToDraw(cycle)
  const spriteWindow = [x, x+1, x+2];

  const lit = spriteWindow.includes(column);

  screen[row][column] = lit ? "#" : ".";
}

Run()

for(const row of screen) {
  appendFileSync("test.txt", row.join(''));
  appendFileSync("test.txt", '\n');
}
appendFileSync("test.txt", '\n');

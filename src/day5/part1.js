const { getInputString } = require('../utils/getInputString.js');

const file = getInputString(5, false);
const lines = file.split("\n");

const getStartingState = (lines) => {
  const rows = [];
  for (let line of lines) {
    if (!line.includes("[")) {
      break;
    }
    rows.push(line.replace(/\s\s\s\s/g, "[-]").replace(/(\s|\[|\])/g, ""));
  }

  const numRows = rows[0].length; // row length should be uniform

  const state = [];
  for (let i = 0; i < numRows; i++) {
    let column = [];
    for (const row of rows) {
      column.push(row[i]);
    }
    state.push([...column.filter((char) => char !== "-")]);
  }

  return state;
};

const executeInstructions = (lines, state) => {
  for (const line of lines) {
    if (line.startsWith("move")) {
      state = executeInstruction(line, state);
    }
  }
  return state;
};

const executeInstruction = (instruction, state) => {
  // extract the numbers from the instructions
  const [a, count, b, from, c, to] = instruction.split(' ');

  for (let i = 0; i < count; i++) {
    const char = state[from - 1].shift();
    state[to - 1].unshift(char);
  }

  return state;
};

const getMessage = (state) =>
  state.reduce((acc, col) => {
    acc += col[0];
    return acc;
  }, "");

let state = getStartingState(lines);
state = executeInstructions(lines, state);

console.log(getMessage(state));

const fs = require("fs");
const path = require("path");

// parse the input
const file = fs.readFileSync(path.resolve(__dirname, "input.txt")).toString();

const hands = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
};

const outcomes = {
  LOSE: "X",
  DRAW: "Y",
  WIN: "Z",
};

const outcomeScores = {
  WIN: 6,
  DRAW: 3,
};

const startingScores = {
  [hands.ROCK]: 1,
  [hands.PAPER]: 2,
  [hands.SCISSORS]: 3,
};

const choosePlay = (elf, outcome) => {
  switch (outcome) {
    case outcomes.LOSE:
      switch (elf) {
        case hands.ROCK:
          return hands.SCISSORS;
        case hands.PAPER:
          return hands.ROCK;
        case hands.SCISSORS:
          return hands.PAPER;
      }
    case outcomes.WIN:
      switch (elf) {
        case hands.ROCK:
          return hands.PAPER;
        case hands.PAPER:
          return hands.SCISSORS;
        case hands.SCISSORS:
          return hands.ROCK;
      }
    case outcomes.DRAW:
      return elf;
  }

  return score;
};

const getScore = (elf, me) => {
  let score = startingScores[me];
  switch (elf) {
    case hands.ROCK:
      if (me === hands.ROCK) {
        score += outcomeScores.DRAW;
      } else if (me === hands.PAPER) {
        score += outcomeScores.WIN;
      }
      break;
    case hands.PAPER:
      if (me === hands.PAPER) {
        score += outcomeScores.DRAW;
      } else if (me === hands.SCISSORS) {
        score += outcomeScores.WIN;
      }
      break;
    case hands.SCISSORS:
      if (me === hands.SCISSORS) {
        score += outcomeScores.DRAW;
      } else if (me === hands.ROCK) {
        score += outcomeScores.WIN;
      }
      break;
  }

  return score;
};

const rounds = file.split("\n");
const totalScore = rounds.reduce((acc, round) => {
  const elfPlay = round.split(" ")[0];
  const outcome = round.split(" ")[1];

  const myPlay = choosePlay(elfPlay, outcome);

  acc += getScore(elfPlay, myPlay);
  return acc;
}, 0);

console.log(totalScore);

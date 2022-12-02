const fs = require('fs');
const path = require('path');

// parse the input
const file = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

const startingScores = {
  X: 1,
  Y: 2,
  Z: 3
}

const outcomes = {
  WIN: 6,
  DRAW: 3
}

const elfHands = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C"
};

const myHands = {
  ROCK: "X",
  PAPER: "Y",
  SCISSORS: "Z"
}

const getScore = (elf, me) => {
  let score = startingScores[me];
  switch(elf) {
    case elfHands.ROCK:
      if(me === myHands.ROCK) {
        score += outcomes.DRAW
      } else if(me === myHands.PAPER) {
        score += outcomes.WIN
      }
      break;
    case elfHands.PAPER:
      if(me === myHands.PAPER) {
        score += outcomes.DRAW
      } else if(me === myHands.SCISSORS) {
        score += outcomes.WIN
      }
      break;
    case elfHands.SCISSORS:
      if(me === myHands.SCISSORS) {
        score += outcomes.DRAW
      } else if(me === myHands.ROCK) {
        score += outcomes.WIN
      }
      break;
  }

  return score;
}

const rounds = file.split('\n');
const totalScore = rounds.reduce((acc, round) => {
  const elfPlay = round.split(' ')[0]
  const myPlay = round.split(' ')[1]

  acc += getScore(elfPlay, myPlay)
  return acc
}, 0);

console.log(totalScore)
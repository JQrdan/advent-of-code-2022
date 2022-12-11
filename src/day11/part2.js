
const { getInputString } = require("../utils/getInputString.js");

const file = getInputString(11, false);

const getMonkeys = (file) => {
  const monkeys = []
  let currentMonkey;
  for(const line of file.split('\n')) {
    if(line.startsWith("Monkey")) {
      currentMonkey = {
        inspected: 0
      };
    } else if (line.includes("Starting items:")) {
      const itemList = line.split(": ")[1];
      const items = itemList.split(', ').map(item => parseInt(item));
      currentMonkey.items = items;
    } else if (line.includes("Operation:")) {
      const operation = line.split("old ")[1];
      const [operator, value] = operation.split(" ");
      currentMonkey.operator = operator;
      currentMonkey.operationValue = value === "old" ? value : parseInt(value);
    } else if (line.includes("Test:")) {
      const divisible = line.split("divisible by ")[1];
      currentMonkey.divisible = parseInt(divisible);
    } else if (line.includes("If true:")) {
      const monkeyTo = line.split("to monkey ")[1];
      currentMonkey.ifTrue = parseInt(monkeyTo);
    } else if (line.includes("If false:")) {
      const monkeyTo = line.split("to monkey ")[1];
      currentMonkey.ifFalse = parseInt(monkeyTo);
    } else {
      monkeys.push(currentMonkey);
    }
  }
  return monkeys;
}

const getNewWorryLevel = (currentWorryLevel, operator, value, modulo) => {
  if(value === "old") {
    value = currentWorryLevel;
  }

  let newWorryLevel
  switch(operator) {
    case "+":
      newWorryLevel = currentWorryLevel + value
      break;
    case "-":
      newWorryLevel = currentWorryLevel - value
      break;
    case "*":
      newWorryLevel = currentWorryLevel * value
      break;
    case "/":
      newWorryLevel = currentWorryLevel / value
      break;
  }

  newWorryLevel = newWorryLevel % modulo;
  return newWorryLevel;
}

const doRound = (monkeys, modulo) => {
  for(let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]

    for(let j = 0; j < monkey.items.length; j++) {
      monkey.inspected++;
      const item = monkey.items[j]

      const newWorryLevel = getNewWorryLevel(item, monkey.operator, monkey.operationValue, modulo);
      if(newWorryLevel % monkey.divisible === 0) {
        monkeys[monkey.ifTrue].items.push(newWorryLevel);
      } else {
        monkeys[monkey.ifFalse].items.push(newWorryLevel);
      }
    }

    monkey.items = []
  }
};

const Run = (rounds) => {
  const monkeys = getMonkeys(file);
  const totalDivisible = monkeys.map(monkey => monkey.divisible).reduce((acc, divisible) => acc * divisible, 1);

  for(let i = 1; i < rounds + 1; i++){
    doRound(monkeys, totalDivisible);
  }

  const inspections = monkeys.map(monkey => monkey.inspected);
  const topTwoInspections = inspections.sort((x, y) => y - x).slice(0, 2);

  console.log(topTwoInspections[0] * topTwoInspections[1])
}

Run(10000);
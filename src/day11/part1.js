
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

const getNewWorryLevel = (currentWorryLevel, operator, value) => {
  if(value === "old") {
    value = currentWorryLevel;
  }

  let newWorryLevel
  switch(operator) {
    case "+":
      newWorryLevel = currentWorryLevel + value
      console.log(`    Worry level is increased by ${value} to ${newWorryLevel}`)
      break;
    case "-":
      newWorryLevel = currentWorryLevel - value
      console.log(`    Worry level is descreased by ${value} to ${newWorryLevel}`)
      break;
    case "*":
      newWorryLevel = currentWorryLevel * value
      console.log(`    Worry level is muliplied by ${value} to ${newWorryLevel}`)
      break;
    case "/":
      newWorryLevel = currentWorryLevel / value
      console.log(`    Worry level is divided by ${value} to ${newWorryLevel}`)
      break;
  }

  newWorryLevel = Math.floor(newWorryLevel / 3);
  console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${newWorryLevel}`);
  return newWorryLevel;
}

const doRound = (monkeys) => {
  for(let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]
    console.log(`Monkey ${i}`);

    for(let j = 0; j < monkey.items.length; j++) {
      monkey.inspected++;
      const item = monkey.items[j]

      console.log(`  Monkey inspects an item with a worry level of ${item}`);
      const newWorryLevel = getNewWorryLevel(item, monkey.operator, monkey.operationValue);
      if(newWorryLevel % monkey.divisible === 0) {
        console.log(`    Current worry level is divisible by ${monkey.divisible}`)
        console.log(`    Item with worry level ${newWorryLevel} is thrown to monkey ${monkey.ifTrue}.`)
        monkeys[monkey.ifTrue].items.push(newWorryLevel);
      } else {
        console.log(`    Current worry level is not divisible by ${monkey.divisible}`)
        console.log(`    Item with worry level ${newWorryLevel} is thrown to monkey ${monkey.ifFalse}.`)
        monkeys[monkey.ifFalse].items.push(newWorryLevel);
      }
    }

    monkey.items = []
  }

  for(let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]
    console.log(`Monkey ${i}: ${monkey.items.join(', ')}`);
  }
  console.log();
};

const Run = (rounds) => {
  const monkeys = getMonkeys(file);

  for(let i = 0; i < rounds; i++){
    console.log(`Round ${i + 1}`)
    doRound(monkeys);
  }

  const inspections = monkeys.map(monkey => monkey.inspected);
  const topTwoInspections = inspections.sort((x, y) => y - x).slice(0, 2);

  console.log(topTwoInspections[0] * topTwoInspections[1])
}

Run(20);
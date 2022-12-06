const fs = require("fs");
const path = require("path");

const getInputString = (day, test) => {
  let fileName = "input.txt";
  if(test) {
    fileName = "testinput.txt";
  }

  return fs.readFileSync(path.resolve(__dirname, `../day${day}` ,fileName)).toString();
}

module.exports = { getInputString };
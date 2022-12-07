const util = require("util");
const { getInputString } = require("../utils/getInputString.js");

const file = getInputString(7, false);

const createFileSystem = (input) => {
  // root needs to exist at the start
  let fileSystem = { "/": { } };

  let currentDir = fileSystem;
  let parents = [];
  for (const line of input.split("\n")) {
    if (line.startsWith("$")) {
      if (line.includes("$ cd")) {
        const loc = line.split("$ cd ")[1];

        if (loc === "..") {
          currentDir = parents.pop();
        } else {
          parents.push(currentDir);
          currentDir = currentDir[loc];
        }
      }
      if (line.includes("$ ls")) {
      }
    } else {
      if (line.startsWith("dir")) {
        const dir = line.split("dir ")[1];
        currentDir[dir] = {};
      } else {
        const [size, file] = line.split(" ");
        currentDir[`${file} (file)`] = parseInt(size);
      }
    }
  }

  return fileSystem;
};

let total = 0;
const getSizeOfDirectory = (directory) => {
  // this is partially unused for part 1
  return Object.entries(directory).reduce((acc, [name, dir]) => {
    if(name.includes('(file)')) {
      acc+= dir;
    } else {
      const sizeOfDirectory = getSizeOfDirectory(dir);
      acc += sizeOfDirectory;

      if(sizeOfDirectory <= 100000) {
        total += sizeOfDirectory;
      }
    }    

    return acc;
  }, 0);
};

const fileSystem = createFileSystem(file);
getSizeOfDirectory(fileSystem);

console.log(util.inspect(fileSystem, false, null, true))
console.log(total);
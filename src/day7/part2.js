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

let smallestValidDirSize = 9999999999999;
const getSizeOfDirectory = (directory, spaceToMakeup) => {
  return Object.entries(directory).reduce((acc, [name, dir]) => {
    if(name.includes('(file)')) {
      acc+= dir;
    } else {
      const sizeOfDirectory = getSizeOfDirectory(dir, spaceToMakeup);
      acc += sizeOfDirectory;

      if(spaceToMakeup && sizeOfDirectory > spaceToMakeup && sizeOfDirectory < smallestValidDirSize) {
        smallestValidDirSize = sizeOfDirectory
      }
    }    

    return acc;
  }, 0);
};

const fileSystem = createFileSystem(file);
const totalSpaceUsed = getSizeOfDirectory(fileSystem);
const freeSpace = 70000000 - totalSpaceUsed;

const spaceToMakeup = 30000000 - freeSpace;

getSizeOfDirectory(fileSystem, spaceToMakeup);
console.log(smallestValidDirSize);

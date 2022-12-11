const { appendFileSync, rmSync } = require("fs");
const { getInputString } = require("../utils/getInputString.js");

const file = getInputString(9, true);

const getNewHeadPosition = (headPosition, direction) => {
  switch (direction) {
    case "R":
      return {
        x: headPosition.x + 1,
        y: headPosition.y,
      };
    case "U":
      return {
        x: headPosition.x,
        y: headPosition.y + 1,
      };
    case "L":
      return {
        x: headPosition.x - 1,
        y: headPosition.y,
      };
    case "D":
      return {
        x: headPosition.x,
        y: headPosition.y - 1,
      };
  }
};

const getSurroundingPositions = (headPosition) => {
  const neighbours = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];

  return neighbours.map(([dx, dy]) => ({
    x: headPosition.x + dx,
    y: headPosition.y + dy,
  }));
};

const getDistanceBetween = (start, end) => {
  const x = Math.abs(start.x - end.x);
  const y = Math.abs(start.y - end.y);

  return Math.max(x, y);
}

const getClosestNeighbor = (headPosition, tailPosition) => {
  const surroundingPositions = getSurroundingPositions(headPosition);

  let shortestDistance = 9;
  let closestNeighbor;
  for(const position of surroundingPositions) {
    let distance = getDistanceBetween(tailPosition, position);
    if(distance < shortestDistance) {
      shortestDistance = distance;
      closestNeighbor = position;
    }
  }

  return closestNeighbor;
};

const countMatching = (path) => {
  const uniquePath = [];

  for(const coord of path) {
    if(!uniquePath.some(existingCoord => existingCoord.x === coord.x && existingCoord.y === coord.y)) {
      uniquePath.push(coord);
    }
  }

  return uniquePath.length;
}

const drawPositions = (headPosition, tailPositions, minX, maxX, minY, maxY) => {
  const xSize = maxX - minX
  const ySize = maxY - minY

  console.log(ySize, xSize)

  let screen = [...Array(ySize)].map(e => Array(xSize).fill('.'));

  for(let tailNum = 0; tailNum < tailPositions.length; tailNum++) {
    const yPos = screen.length - tailPositions[tailNum].y - minY;
    const xPos = tailPositions[tailNum].x - minX;
    console.log(yPos, xPos)
    screen[yPos][xPos] = tailPositions.length - tailNum;
  }

  console.log()

  const yPos = headPosition.y - minY;
  const xPos = headPosition.x - minX;
  screen[yPos][xPos] = "H";

  for(const row of screen) {
    appendFileSync("test.txt", row.join(''));
    appendFileSync("test.txt", '\n');
  }
  appendFileSync("test.txt", '\n');
}

const drawHistory = (headPath, tailPaths) => {
  for(let i = 0; i < headPath.length; i++) {
    const headPosition = headPath[i];
    const tailPositions = tailPaths.map(tailPath => tailPath[i]);

    const maxX = Math.max(...headPath.map((coord) => coord.x)) + 1;
    const maxY = Math.max(...headPath.map((coord) => coord.y)) + 1;

    const minX = Math.min(...headPath.map((coord) => coord.x)) + 1;
    const minY = Math.min(...headPath.map((coord) => coord.y)) + 1;

    drawPositions(headPosition, tailPositions, minX, maxX, minY, maxY);
  }
}

const Run = () => {
  const headPath = [{ x: 0, y: 0 }]
  const tailPath1 =  [{ x: 0, y: 0 }]
  const tailPath2 =  [{ x: 0, y: 0 }]
  const tailPath3 =  [{ x: 0, y: 0 }]
  const tailPath4 =  [{ x: 0, y: 0 }]
  const tailPath5 =  [{ x: 0, y: 0 }]
  const tailPath6 =  [{ x: 0, y: 0 }]
  const tailPath7 =  [{ x: 0, y: 0 }]
  const tailPath8 =  [{ x: 0, y: 0 }]
  const tailPath9 =  [{ x: 0, y: 0 }]
  const tailPaths = [tailPath1, tailPath2, tailPath3, tailPath4, tailPath5, tailPath6, tailPath7, tailPath8, tailPath9];
  // const tailPaths = [tailPath1];

  for(const instruction of file.split('\n')) {
    const [direction, moves] = instruction.split(" ");

    for (let i = 0; i < moves; i++) {
      const headPosition = headPath[headPath.length - 1];
      const newHeadPosition = getNewHeadPosition(headPosition, direction);

      headPath.push(newHeadPosition);

      for(let j = 0; j < tailPaths.length; j++) {
        const tailPath = tailPaths[j];
        const tailPosition = tailPath[tailPath.length - 1];
        if(j === 0) {
          const shouldMove = getDistanceBetween(newHeadPosition, tailPosition) > 1;
 
          if(shouldMove) {
            const newTailPosition = getClosestNeighbor(newHeadPosition, tailPosition)
            tailPath.push(newTailPosition);
          } else {
            tailPath.push(tailPosition);
          }
        } else {
          const nextTailPath = tailPaths[j-1];
          const nextTailPosition = nextTailPath[nextTailPath.length - 1];
          const shouldMove = getDistanceBetween(nextTailPosition, tailPosition) > 1;
 
          if(shouldMove) {
            const newTailPosition = getClosestNeighbor(nextTailPosition, tailPosition)
            tailPath.push(newTailPosition);
          } else {
            tailPath.push(tailPosition);
          }
        }
      }
    }
  }

  drawHistory(headPath, tailPaths)

  console.log(countMatching(tailPaths[tailPaths.length - 1]));
}

try {
  rmSync("test.txt");
} catch (e) {}

Run();

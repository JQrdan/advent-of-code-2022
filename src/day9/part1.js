const { appendFileSync } = require("fs");
const { getInputString } = require("../utils/getInputString.js");

const file = getInputString(9, true);

const getNewHeadPosition = (headPath, direction) => {
  const currentHeadPosition = headPath[headPath.length - 1];

  switch (direction) {
    case "R":
      return {
        x: currentHeadPosition.x + 1,
        y: currentHeadPosition.y,
      };
    case "U":
      return {
        x: currentHeadPosition.x,
        y: currentHeadPosition.y + 1,
      };
    case "L":
      return {
        x: currentHeadPosition.x - 1,
        y: currentHeadPosition.y,
      };
    case "D":
      return {
        x: currentHeadPosition.x,
        y: currentHeadPosition.y - 1,
      };
  }
};

const getSurroundingPositions = (headPosition, canBeDiagonal) => {
  let neighbours;
  if(canBeDiagonal) {
    neighbours = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      // [0, 0],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
  } else {
    neighbours = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];
  }

  return neighbours.map(([dx, dy]) => ({
    x: headPosition.x + dx,
    y: headPosition.y + dy,
  }));
};

const isTouchingDiagonally = (headPosition, tailPosition) => {
  const neighbours = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  const isTouching = neighbours.map(([dx, dy]) => ({
    x: headPosition.x + dx,
    y: headPosition.y + dy,
  })).some(
    ({ x, y }) => x === tailPosition.x && y === tailPosition.y
  );
  return isTouching
};

const getDistanceBetween = (start, end) => {
  return Math.max(Math.abs(start.x - end.x), Math.abs(start.y - end.y));
}

const getClosestNeighbor = (headPosition, tailPosition, canBeDiagonal) => {
  const surroundingPositions = getSurroundingPositions(headPosition, canBeDiagonal);

  let shortestDistance = getDistanceBetween(tailPosition, headPosition);
  let closestNeighbor = tailPosition;
  for(const position of surroundingPositions) {
    let distance = getDistanceBetween(tailPosition, position);
    if(distance < shortestDistance) {
      shortestDistance = distance;
      closestNeighbor = position;
    }
  }
  console.log(shortestDistance)
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

const drawPath = (path) => {
  let screen = [...Array(6)].map(e => Array(6).fill('.'));
  for(const coord of path) {
    screen[screen.length - 1 - coord.y][coord.x] = "#";
  }
  console.log(screen);
}

const drawPositions = (headPosition, tailPosition, ySize, xSize) => {
  let screen = [...Array(ySize)].map(e => Array(xSize).fill('.'));

  screen[screen.length - 1 - tailPosition.y][tailPosition.x] = "T";
  screen[screen.length - 1 - headPosition.y][headPosition.x] = "H";

  for(const row of screen) {
    appendFileSync("test.txt", row.toString());
    appendFileSync("test.txt", '\n');
  }
  appendFileSync("test.txt", '\n');
}

const drawHistory = (headPath, tailPath) => {
  for(let i = 0; i < headPath.length; i++) {
    const headPosition = headPath[i];
    const tailPosition = tailPath[i];

    const maxX = Math.max(...headPath.map((coord) => coord.x)) + 1;
    const maxY = Math.max(...headPath.map((coord) => coord.y)) + 1;

    drawPositions(headPosition, tailPosition, maxY, maxX);
  }
}

const Run = () => {
  const headPath = [{ x: 0, y: 0 }];
  const tailPath = [{ x: 0, y: 0 }];

  let wasDiagonalLastTime = false;
  for (const instruction of file.split("\n")) {

    const [direction, moves] = instruction.split(" ");
  
    for (let i = 0; i < moves; i++) {
      const newHeadPosition = getNewHeadPosition(headPath, direction);
      const tailPosition = tailPath[tailPath.length - 1]

      const newTailPosition = getClosestNeighbor(newHeadPosition, tailPosition, !wasDiagonalLastTime);

      // wasDiagonalLastTime = isTouchingDiagonally(newHeadPosition, tailPosition)
      wasDiagonalLastTime =false;

      // drawPositions(newHeadPosition, newTailPosition)

      console.log(newHeadPosition);
      console.log(newTailPosition);
      console.log();

      headPath.push(newHeadPosition);
      tailPath.push(newTailPosition);
    }
  }

  console.log(countMatching(tailPath));

  drawHistory(headPath, tailPath)
}

Run();

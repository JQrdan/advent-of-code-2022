const { getInputString } = require("../utils/getInputString.js");

const getMap = (file) => { 
  const map = [];

  for(const row of file.split("\n")) {
    map.push(row.split(''));
  }

  return map;
}

const findCharPosition = (map, char) => {
  for(const index in map) {
    const row = map[index];
    if(row.includes(char)) {
      return {x: row.indexOf(char), y: parseInt(index)};
    }
  }
}

const getElevation = (map, position) => {
  const ranking = "abcdefghijklmnopqrstuvwxyz";

  let char = map[position.y][position.x];
  if(char === 'S') {
    char = 'a'
  } else if (char === 'E') {
    char = 'z'
  };

  return ranking.indexOf(char);
}

const getValidPositions = (position, map) => {
  const currentElevation = getElevation(map, position);

  const validMoves = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  .filter(([x, y]) => {
    const newPosition = {x: position.x + x, y: position.y + y};

    // can't go off grid
    if((newPosition.x === -1) || (newPosition.y === -1) || (newPosition.x === map[0].length) || (newPosition.y === map.length)) {
      return false;
    }

    const elevation = getElevation(map, {x: position.x + x, y: position.y + y});
    return elevation <= currentElevation + 1;
  });

  return validMoves.map(([x, y]) => ({x: position.x + x, y: position.y + y}));
}

// Breadth first search
const getShortestPath = (map, startPosition, endPosition) => {
  const queue = [[startPosition]];
  const visited = new Set()
  visited.add(JSON.stringify(startPosition));

  while (queue.length > 0) {
    const path = queue.shift();

    const {x, y} = path[path.length - 1];

    if(endPosition.x === x && endPosition.y === y) {
      return path;
    }

    const edges = getValidPositions({x, y}, map);

    edges.filter(pos => !visited.has(JSON.stringify(pos))).forEach(pos => {
      visited.add(JSON.stringify(pos));
      queue.push([...path, pos]);
    });
  }
}

const Run = () => {
  const file = getInputString(12, false);
  const map = getMap(file);

  const startPosition = findCharPosition(map, 'S')
  const endPosition = findCharPosition(map, 'E')

  const path = getShortestPath(map, startPosition, endPosition);
  
  console.log(path.length - 1);
}

Run()
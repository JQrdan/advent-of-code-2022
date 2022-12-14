const { getInputString } = require("../utils/getInputString.js");

const BLOCKING_CHARS = ["#", "O"]

const fillBetween = (a, b) => {
  const path = [a];

  if(b < a) {
    while(path[path.length -1] !== b) {
      path.push(path[path.length -1]-1);
    }
  } else {
    while(path[path.length -1] !== b) {
      path.push(path[path.length -1]+1);
    }
  }

  return path;
}

const getRockClusters = (file) => {
  const clusters = []

  for(const cluster of file.split('\n')) {
    const points = cluster.split(' -> ');

    const filledCluster = [];
    for(let i = 1; i < points.length; i++) {
      const [px, py] = points[i-1].split(',').map(val => parseInt(val));
      const [x, y] = points[i].split(',').map(val => parseInt(val));

      if(px === x) {
        const toFill = fillBetween(py, y);
        for(const ny of toFill) {
          filledCluster.push([x, ny]);
        }
      } else if (py === y) {
        const toFill = fillBetween(px, x);
        for(const nx of toFill) {
          filledCluster.push([nx, y]);
        }
      }
    }
    clusters.push(filledCluster)
  }

  return clusters;
}

const normalise = (sandStart, clusters) => {
  const flatClusters = clusters.flatMap((x) => x);
  const minX = Math.min(...[...flatClusters.map(([x, y]) => x), sandStart[0]]) - 1
  const minY = Math.min(...[...flatClusters.map(([x, y]) => y), sandStart[1]])

  for(const cluster of clusters) {
    for(const point of cluster) {
      point[0] = point[0] - minX;
      point[1] = point[1] - minY;
    }
  }

  sandStart[0] = sandStart[0] - minX;
  sandStart[1] = sandStart[1] - minY;

  return {
    sandStart,
    clusters
  }
}

const createMap = (sandStart, clusters) => {
  clusters = clusters.flatMap((x) => x);

  const maxX = Math.max(...[...clusters.map(([x, y]) => x), sandStart[0]]) + 1
  const maxY = Math.max(...[...clusters.map(([x, y]) => y), sandStart[1]]) + 1

  const map = [...Array(maxY + 1)].map(e => Array(maxX + 1).fill('.'));

  map[sandStart[1]][sandStart[0]] = "+";
  for(const [x, y] of clusters) {
    map[y][x] = '#'
  }

  return map;
}

const draw = (screen) => {
  for(const row of screen) {
    console.log(row.join(''));
  }
}

const getEndSandPosition = (sandPosition, map) => {
  const positionsByPriority = [[0, 1], [-1, 1], [1, 1]];

  const canMove = positionsByPriority.filter(([x, y]) =>  {
    if(sandPosition[1] + y > -1 && sandPosition[1] + y < map.length) {
      if(sandPosition[0] + x > -1 && sandPosition[0] + x < map[0].length) {
        return !BLOCKING_CHARS.includes(map[sandPosition[1] + y][sandPosition[0] + x])
      }
    } 
    return false;
  });
  if(canMove.length === 0) {
    if(sandPosition[1] === map.length - 1) {
      throw new Error("overflow");
    }
    return sandPosition
  } else {
    for(const [x, y] of canMove) {
      if(!BLOCKING_CHARS.includes(map[sandPosition[1] + y][sandPosition[0] + x])) {
        return getEndSandPosition([sandPosition[0] + x, sandPosition[1] + y], map);
      }  
    }
  }
}

const Run = () => {
  const file = getInputString(14, false);

  const {sandStart, clusters} = normalise([500, 0], getRockClusters(file))

  const map = createMap(sandStart, clusters);

  let i = 0;
  while(i >= 0) {
    i++
    try {
      const endPosition = getEndSandPosition(sandStart, map);
      map[endPosition[1]][endPosition[0]] = "O"
    } catch(e) {
      console.log(`overflow at ${i - 1}`)
      break;
    }
  }

  draw(map)
}

Run();

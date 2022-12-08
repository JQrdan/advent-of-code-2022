const { getInputString } = require("../utils/getInputString.js");

const file = getInputString(8, false);

const transpose = (array) => {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

const trees = file.split('\n').map(row => row.split(""));
const transposedTrees = transpose(trees);

const getViewScoreInRow = (treeIndex, row) => {
  // use some method to break when a tall tree is in the way
  let leftScore = 0;
  row.slice(0, treeIndex).reverse().some(tree => {
    leftScore++;
    return tree >= row[treeIndex];
  });

  let rightScore = 0;
  row.slice(treeIndex + 1, row.length).some(tree => {
    rightScore++;
    return tree >= row[treeIndex];
  });

  return leftScore * rightScore
} 

let biggestScore = 0;
for(let y = 0; y <= trees.length - 1; y++) {
  for(let x = 0; x <= trees[y].length -1; x++) {
    const rowScore = getViewScoreInRow(x, trees[y])
    const columnScore = getViewScoreInRow(y, transposedTrees[x])

    const treeScore = rowScore * columnScore;
    if(treeScore > biggestScore) {
      biggestScore = treeScore
    }
  }
}
console.log(biggestScore);

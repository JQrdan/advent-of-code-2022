const { getInputString } = require("../utils/getInputString.js");

const file = getInputString(8, false);

const transpose = (array) => {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

const trees = file.split('\n').map(row => row.split(""));
const transposedTrees = transpose(trees);

const isVisibleInRow = (treeIndex, row) => {
  const visibleFromLeft = row.slice(0, treeIndex).filter(tree => tree >= row[treeIndex]).length === 0
  const visibleFromRight = row.slice(treeIndex + 1, row.length).reverse().filter(tree => tree >= row[treeIndex]).length === 0

  return visibleFromLeft || visibleFromRight;
} 

let visible = 0;
for(let y = 0; y <= trees.length - 1; y++) {
  for(let x = 0; x <= trees[y].length -1; x++) {
    let visibleInRow = isVisibleInRow(x, trees[y])
    let visibleInColumn = isVisibleInRow(y, transposedTrees[x])

    if(visibleInRow || visibleInColumn) {
      visible++
    }
  }
}
console.log(visible);
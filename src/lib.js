import {
  intersection,
  increamentList,
  joinWithComa,
  convertToLinear,
  cartesionProduct,
  isIncludes
} from './util';

const createBoard = function(bound) {
  let x = bound.topLeft[0];
  let xPrime = bound.bottomRight[0];
  let y = bound.topLeft[1];
  let yPrime = bound.bottomRight[1];
  let rows = increamentList(x, xPrime);
  return rows.reduce(addRows.bind(null, y, yPrime), []);
};

const addRows = function(y, yPrime, matrix, rowNumber) {
  let joinIndexes = joinWithComa.bind(null, rowNumber);
  let row = increamentList(y, yPrime).map(joinIndexes);
  matrix.push(row);
  return matrix;
};

const allPossibleNeighbours = function(cell) {
  let x = +cell.split(',')[0];
  let y = +cell.split(',')[1];
  let neighbours = cartesionProduct([x - 1, x, x + 1], [y - 1, y, y + 1]);
  neighbours = neighbours.map(x => x.toString());
  let index = neighbours.indexOf(cell);
  neighbours.splice(index, 1);
  return neighbours;
};

const extractNeighbours = function(bound, cell) {
  let validCells = convertToLinear(createBoard(bound));
  let neighbourCells = allPossibleNeighbours(cell);
  let isValid = isIncludes.bind(null, validCells);
  return neighbourCells.filter(isValid);
};

const isAlive = function(liveCells, bound, cell) {
  let neighbours = extractNeighbours(bound, cell);
  let liveCellsString = liveCells.map(x => x.toString());
  let aliveNeighbours = intersection(neighbours, liveCellsString);
  let willRemainAlive =
    aliveNeighbours.length === 2 && liveCellsString.includes(cell);
  let willComeAlive = aliveNeighbours.length === 3;
  return willRemainAlive || willComeAlive;
};

const calculateWidth = function(world) {
  let lastRow = world[world.length - 1];
  let row = lastRow.length;
  let column = lastRow[row - 1].length + 2;
  return { row: +row, column: +column };
};

export {
  createBoard,
  addRows,
  allPossibleNeighbours,
  extractNeighbours,
  isAlive,
  calculateWidth
};

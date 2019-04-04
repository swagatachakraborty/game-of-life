import { convertToLinear, splitNumbers } from './util.js';
import { isAlive, createBoard } from './lib.js';

const nextGeneration = function(currGeneration, bounds) {
  let world = convertToLinear(createBoard(bounds));
  let isCellAlive = isAlive.bind(null, currGeneration, bounds);
  return world.filter(isCellAlive).map(splitNumbers);
};

export default nextGeneration;

/*
describe('nextGeneration', () => {
  it('should generate an empty generation for a current generation that contains only one live cell', () => {
    let currentGeneration = [[0, 1]];
    let bounds = { topLeft: [0, 0], bottomRight: [3, 3] };
    let actualNextGen = nextGeneration(currentGeneration, bounds);
    assert.deepEqual(actualNextGen, []);
  });

  it('should generate an empty generation for a current generation that contains multiple live cells', () => {
    let currentGeneration = [[0, 0], [0, 1], [1, 0], [2, 2], [2, 3], [3, 3]];
    let bounds = { topLeft: [0, 0], bottomRight: [3, 3] };
    let expectedList = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 2],
      [2, 3],
      [3, 2],
      [3, 3]
    ];
    let actualNextGen = nextGeneration(currentGeneration, bounds);
    assert.deepEqual(actualNextGen, expectedList);
  });

  it('should generate a vertical blinker as the next step of a horizontal blinker', () => {
    let currentGeneration = [[0, 1], [1, 1], [2, 1]];
    let expectedNextGen = [[1, 0], [1, 1], [1, 2]];
    let bounds = { topLeft: [0, 0], bottomRight: [3, 3] };
    let actualNextGen = nextGeneration(currentGeneration, bounds);
    assert.ok(isSame(actualNextGen, expectedNextGen));
    assert.ok(isSameArity(actualNextGen, expectedNextGen));
  });

  it('should kill cells not within bounds', () => {
    let currentGeneration = [[0, 1], [0, 2], [0, 3]];
    let expectedNextGen = [];
    let bounds = { topLeft: [1, 1], bottomRight: [3, 3] };
    let actualNextGen = nextGeneration(currentGeneration, bounds);
    assert.ok(isSame(actualNextGen, expectedNextGen));
    assert.ok(isSameArity(actualNextGen, expectedNextGen));
  });
});
*/

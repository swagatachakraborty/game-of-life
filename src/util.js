const cartesionProduct = function(set1, set2) {
  let result = [];
  for (let valueOfSet1 of set1) {
    for (let valueOfSet2 of set2) {
      result.push([valueOfSet1, valueOfSet2]);
    }
  }
  return result;
};

const joinWithComa = function(item1, item2) {
  return item1 + ',' + item2;
};

const createUniqueList = function(size, element) {
  return new Array(size).fill(element);
};

const concat = function(list1, list2) {
  return list1.concat(list2);
};

const convertToLinear = function(matrix) {
  return matrix.reduce(concat, []);
};

const isIncludes = function(source, element) {
  return source.includes(element);
};

const increamentList = function(begin, end) {
  let size = end - begin + 1;
  if (size < 0) {
    return [];
  }
  return new Array(size).fill(begin).map((x, i) => x + i);
};

const intersection = function(set1, set2) {
  let isContain = isIncludes.bind(null, set2);
  return set1.filter(isContain);
};

const splitNumbers = function(stringOfnumbers) {
  let list = [];
  list = stringOfnumbers.split(',');
  return list.map(x => +x);
};

export {
  isIncludes,
  increamentList,
  cartesionProduct,
  joinWithComa,
  createUniqueList,
  concat,
  convertToLinear,
  intersection,
  splitNumbers
};

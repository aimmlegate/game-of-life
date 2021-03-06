import { flatten } from 'lodash';

const getNeighbors = (field, y, x) => {
  const max = field.length - 1;
  const isNeighbor = (cord, ref) => cord >= ref - 1 && cord <= ref + 1;
  let filtredRows = field.filter((row, i) => isNeighbor(i, y));
  if (y === max) {
    filtredRows = [...filtredRows, field[0]];
  }
  if (y === 0) {
    filtredRows = [field[max], ...filtredRows];
  }
  const filtredCells = filtredRows.map((row) => {
    const test = row.reduce((acc, el, j) => {
      if (isNeighbor(j, x) && x === max && j === max) {
        return [...acc, el, row[0]];
      }
      if (isNeighbor(j, x) && x === 0 && j === 0) {
        return [row[max], ...acc, el];
      }
      if (isNeighbor(j, x)) {
        return [...acc, el];
      }
      return acc;
    }, []);
    return test;
  });
  const filterSelf = filtredCells.map((row, i) => {
    if (i === 1) {
      return row.filter((el, j) => j !== 1);
    }
    return row;
  });
  return flatten(filterSelf);
};

const getAlive = arr => arr.filter(el => (el === 1)).length;

const generationBorn = filed =>
  filed.map((row, i) =>
    row.map((el, j) => {
      const neighbors = getNeighbors(filed, i, j);
      if ((el === 0) && (getAlive(neighbors) === 3)) {
        return '*';
      } return el;
    }));

const generationDead = filed =>
  filed.map((row, i) =>
    row.map((el, j) => {
      const neighbors = getNeighbors(filed, i, j);
      if ((el === 1) && ((getAlive(neighbors) > 3) || (getAlive(neighbors) < 2))) {
        return 0;
      }
      if (el === '*') return 1;
      return el;
    }));

export default filed => generationDead(generationBorn(filed));

const genField = size => new Array(size).fill(null).map(() => new Array(size).fill(0));

export const empty = size => genField(parseInt(size, 10));

export const glider = (size) => {
  const emptyFild = genField(parseInt(size, 10));
  emptyFild[0][2] = 1;
  emptyFild[1][0] = 1;
  emptyFild[1][2] = 1;
  emptyFild[2][1] = 1;
  emptyFild[2][2] = 1;
  return emptyFild;
};

export const addCell = (field, x, y) => {
  const f = field;
  if (f[y][x] === 0) {
    f[y][x] = 1;
  } else {
    f[y][x] = 0;
  }
  return f;
};

export const addGlider = (field) => {
  const f = field;
  f[0][2] = 1;
  f[1][0] = 1;
  f[1][2] = 1;
  f[2][1] = 1;
  f[2][2] = 1;
  return f;
};

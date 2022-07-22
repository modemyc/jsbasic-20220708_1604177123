function getMinMax(str) {
  // ваш код...
  let someNum = str.split(' ').filter(value => isFinite(value)).map(value => parseFloat(value, 100));
  return {
    max: Math.max(...someNum),
    min: Math.min(...someNum)
  }
}

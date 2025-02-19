function factorial(n) {
  // ваш код...
  for (let SomeNum = n - 1; SomeNum > 0; SomeNum--) {
    n = n * SomeNum;
  }
  if (n == 0){
    return(1);
  } else {
    return(n);
  }
}

function sum(a) {
  var currentSum = a;

  function f(b) {
    if (typeof b !== 'undefined') {
      currentSum += parseInt(b, 10);
    };
    return f;
  }

  f.valueOf = function () {
    return currentSum;
  };

  return f;
}

console.log(sum(1)(5)("6"));

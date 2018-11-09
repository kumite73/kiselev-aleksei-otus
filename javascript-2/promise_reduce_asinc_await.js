var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

// Используем асинхронную функцию
async function promiseReduce(asyncFunctions, reduce, initialValue) {
  // инициализируем переменную в которой будет хранится memo начальным значением
  let r = initialValue;

  // Проходим по массиву функций
  for (let asyncFunction of asyncFunctions) {
    // ждем выполнения функции через await
    let f = await asyncFunction();
    // сохраняем результат
    r = reduce(r, f);
  }

  // возвращаем результат
  return r
}

promiseReduce(
  [fn1, fn2],
  function (memo, value) {
    console.log('reduce')
    return memo * value
  },
  1
)
  .then(console.log)

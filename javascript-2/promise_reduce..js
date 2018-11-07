var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
  // инициализируем переменную в которой будет хранится memo начальным значением
  let r = initialValue;

  // Создаем polyfill
  var promise = new Promise(function (resolve, reject) {
    // Инициализируем начало цепочки
    let chain = Promise.resolve();

    // Проходим по массиву функций и добавляем в цепочку
    for (let asyncFunction of asyncFunctions) {
      chain = chain
        .then(() => asyncFunction()) // Ставим вызов асинхронной функции в очередь
        .then((result) => {
          r = reduce(r, result)      // Вычисляем и сохраняем значение функции reduce после выполнения asyncFunction()
        });
    }

    // Последним в цепочке добавляем вывод и завершение
    chain = chain
      .then(() => { resolve(r) } );
  })

  // Возвращаем polyfill
  return promise;
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

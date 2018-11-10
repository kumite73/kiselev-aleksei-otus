# kiselev-aleksei-otus

## JavaScript Otus

## Javascript-1

```javascript
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
```

Функция `sum(a)` выполняется 1 раз, дальше идет вызов `function f(b)`.
Когда список функций заканчивается идет возврат и вызов значения суммы `f.valueOf = function ()`

#### Замечания преподавателя:

Рекомендуется использовать второй параметр в функции parseInt(b, 10) - для строк, которые начинаются с 0 - по умолчанию идет конвертация в 8-ричную систему исчисления

Я лично приверженец тройного оператора сравнения ===, хотя в данном случае это совершенно не важно

## Javascript-2

### Реализация через async/await

```javascript
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

```

### Реализация через цепочку

```javascript
var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
  // Создаем polyfill
  var promise = new Promise(function (resolve, reject) {
    // Инициализируем начало цепочки
    let chain = Promise.resolve();

    // Проходим по массиву функций и добавляем в цепочку
    for (let asyncFunction of asyncFunctions) {
      chain = chain
        .then(asyncFunction) // Ставим вызов асинхронной функции в очередь
        .then((result) => {
          initialValue = reduce(initialValue, result)      // Вычисляем и сохраняем значение функции reduce после выполнения asyncFunction()
        });
    }

    // Последним в цепочке добавляем вывод и завершение
    chain
      .then(() => { resolve(initialValue) } );
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
  3
)
  .then(console.log)
```

#### Замечания преподавателя:

Можно вместо (() => asyncFunction()) написать (asyncFunction)

## Javascript-3

Создаем свой модуль `npm init`
Добавляем модуль `request` для вычисления времени и парсинга ответов `npm install request`
Запускаем сервер `node server.js`
Запускаем скрипт для асинхронных запросов `node request.js 5 async` можно указать третий параметр - это  урл сервера без слеша на конце. По умолчанию http://127.0.0.1:3000

```javascript
[ 'Request time in ms 217 body: Hello World\n path: /0',
  'Request time in ms 229 body: Hello World\n path: /1',
  'Request time in ms 254 body: Hello World\n path: /2',
  'Request time in ms 270 body: Hello World\n path: /3',
  'Request time in ms 288 body: Hello World\n path: /4' ]
```

Если убрать вывод сервера в консоль, результаты интереснее.

```javascript
[ 'Request time in ms 166 body: Hello World\n path: /0',
  'Request time in ms 164 body: Hello World\n path: /1',
  'Request time in ms 164 body: Hello World\n path: /2',
  'Request time in ms 164 body: Hello World\n path: /3',
  'Request time in ms 164 body: Hello World\n path: /4' ]
```

Запуск скрипта с цепочкой запросов `node request.js 5 chain`

```javascript
[ 'Request time in ms 188 body: Hello World\n path: /0',
  'Request time in ms 200 body: Hello World\n path: /1',
  'Request time in ms 220 body: Hello World\n path: /2',
  'Request time in ms 245 body: Hello World\n path: /3',
  'Request time in ms 259 body: Hello World\n path: /4' ]
```

### Замечания преподавателя

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

// Параметры
// (количество запросов) (async/chain) (url по умолчанию http://127.0.0.1:3000 )

const request = require('request')
const host = '127.0.0.1'
const port = 3000

function requestServer(count, type, url) {
  let req = []
  let resultsReq = []

  function getHTTP(u) {
    return new Promise(function (resolve, reject) {
      let start = new Date(); // для вычисления времени ответа
      request(u, function (error, response, body) {
        if (error) {
          resultsReq.push(error) // записываем ошибку в массив результатов
          throw error
        }
        // записываем ркзультат в массив результатов
        resultsReq.push('Request time in ms ' + (new Date() - start) + ' body: ' + body + ' path: ' + response.request.path)
        // завершаем промис (можно передавать результат, тогда в Promise.all можно будет выводить не массив а сразу результат, но не будет ошибок)
        resolve()
      });
    });
  }

  for (let i = 0; i < count; i++) {
    if (typeof url !== 'undefined') {
      req.push(getHTTP(url + '/' + i))
    } else {
      req.push(getHTTP(`http://${host}:${port}/${i}`))
    }
  }

  if (type === 'async') {
    Promise.all(req)
      .then(() => { console.log(resultsReq) })
  } else {
    let chain = Promise.resolve()
    for (let r of req) {
      // работает только через перезаписывание переменной, иначе выводится только первый промис
      chain = chain
        .then(() => r)
    }
    // Получаем результат
    chain.then(() => console.log(resultsReq))
  }
}

requestServer(process.argv[2], process.argv[3], process.argv[4]);

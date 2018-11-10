const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  setTimeout(function () {
    // выводим в консоль запрос (снижает скорость ответа примерно на 25% на тестовом стенде)
    console.log(req)

    // отдаем результат
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World\n')
  }
  , 100);
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

const clog = console.log;

const { Transform, Readable, Writable } = require('stream');

// Указываем потокам, что они работают с объектами
const setOptionsForStreams = { objectMode: true, highWaterMark: 2 }

const rs = new Readable(setOptionsForStreams);
const ts = new Transform(setOptionsForStreams);
const ws = new Writable(setOptionsForStreams);

rs._read = () => {
  let rnd = parseInt((Math.random() * 100), 10);

  // Заполняем поток значениями
  clog('Генерируем число rs: ', 'Шаг + 1', rnd);
  rs.push(rnd + 1);
  clog('Генерируем число rs: ', 'Шаг + 2', rnd + 1);
  rs.push(rnd + 2);
  clog('Генерируем число rs: ', 'Шаг + 3', rnd + 2);
  rs.push(rnd + 3);

  // Указываем потоку, что конец чтения
  rs.push(null);
};

ts._transform = (chunk, encoding, done) => {
  let rnd = parseInt((Math.random() * 100), 10);

  clog('Получаем из rs: ', chunk);
  clog('Генерируем добавочное число: ', rnd);

  done(null, chunk + rnd)
  // Другая реализация:
  // ts.push(chunk + rnd);
  // done();
}

ws._write = (chunk, enc, next) => {
  clog('Пришло из потока ts: ', chunk);
  next();
};

rs.pipe(ts).pipe(ws);

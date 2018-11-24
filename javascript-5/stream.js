const clog = console.log;

const { Transform, Readable, Writable } = require('stream');

// Указываем потокам, что они работают с объектами
const setOptionsForStreams = { objectMode: true, highWaterMark: 2 }

class myReadable extends Readable {
  constructor(options) {
    super(options);
    this._read = () => {
      let rnd = Math.floor(Math.random() * 100);

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
  }
}

class myTransform extends Transform {
  constructor(options) {
    super(options);
    this._transform = (chunk, encoding, done) => {
      let rnd = Math.floor(Math.random() * 100);

      clog('Получаем из rs: ', chunk);
      clog('Генерируем добавочное число: ', rnd);

      done(null, chunk + rnd)
      // Другая реализация:
      // ts.push(chunk + rnd);
      // done();
    };
  }
}

class myWritable extends Writable {
  constructor(options) {
    super(options);
    this._write = (chunk, enc, next) => {
      clog('Пришло из потока ts: ', chunk);
      next();
    };
  }
}

const rs = new myReadable(setOptionsForStreams);
const ts = new myTransform(setOptionsForStreams);
const ws = new myWritable(setOptionsForStreams);

rs.pipe(ts).pipe(ws);

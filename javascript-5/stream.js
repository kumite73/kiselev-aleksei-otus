const clog = console.log;

const { Transform, Readable, Writable } = require('stream');

// Указываем потокам, что они работают с объектами
const setOptionsForStreams = { objectMode: true, highWaterMark: 2 }

class myReadable extends Readable {
  constructor(options) {
    super(options);
  }

  _read() {
    let rnd = Math.floor(Math.random() * 100);

    // Заполняем поток значениями
    clog('Генерируем число rs: ', rnd);
    this.push(rnd);
    // Указываем потоку, что конец чтения
    this.push(null);
  };
}

class myTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, done) {
    let rnd = Math.floor(Math.random() * 100);

    clog('Получаем из rs: ', chunk);
    clog('Генерируем добавочное число: ', rnd);

    done(null, chunk + rnd)
    // Другая реализация:
    // this.push(chunk + rnd);
    // done();
  };
}

class myWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, enc, next) {
    clog('Пришло из потока ts: ', chunk);
    next();
  };
}

const rs = new myReadable(setOptionsForStreams);
const ts = new myTransform(setOptionsForStreams);
const ws = new myWritable(setOptionsForStreams);

// написал для теста. Как можно передать туда setOptionsForStreams?
const wTest = new Writable({
  write(chunk, encoding, callback) {
    clog('Пришло из потока ts: ', chunk);
  },
  objectMode: true,
  highWaterMark: 2
});

rs.pipe(ts).pipe(wTest);

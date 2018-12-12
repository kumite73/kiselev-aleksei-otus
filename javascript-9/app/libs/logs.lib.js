exports.queryLog = (req) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), 'Path:', req.originalUrl);
  }
}

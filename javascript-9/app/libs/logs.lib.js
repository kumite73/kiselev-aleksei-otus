exports.queryLog = (req) => {
  console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), 'Path:', req.originalUrl);
}

const fs = require('mz/fs')
const path = require('path')
const clog = console.log

const out = { files: [], dirs: [] }

function isDirectory(f) {
  return fs.stat(f).then(stat => {
    if (stat.isDirectory()) {
      out.dirs.push(f)
      return true
    } else {
      out.files.push(f)
      return false
    }
  })
}

function readdir(filePath) {
  return fs.readdir(filePath)
    .then(files => {
      return Promise.all(files.map(file => {
        const fullPath = path.join(filePath, file)
        return isDirectory(fullPath)
          .then(isDir => isDir ? readdir(fullPath) : fullPath )
      }))
    })
}

readdir(process.argv[2] || '.')
  .then(() => clog(JSON.stringify(out)))
  .catch(console.error)
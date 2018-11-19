function Tree() {
  const fs = require('mz/fs')
  const path = require('path')

  const out = { files: [], dirs: [] }

  function isDirectory(f) {
    return fs.stat(f).then(stat => stat.isDirectory() ? true : false)
  }

  function readdir(filePath) {
    return fs.readdir(filePath)
      .then(files => {
        return Promise.all(files.map(file => {
          const fullPath = path.join(filePath, file)
          return isDirectory(fullPath)
            .then(isDir => {
              if (isDir) {
                out.dirs.push(fullPath)
                return readdir(fullPath)
              } else {
                out.files.push(fullPath)
                return fullPath
              }
            })
        }))
      })
  }

  this.readdir = function(path) {
    return readdir(path)
      .then(() => { return out })
      .catch(console.error)
  }
}

module.exports = Tree;

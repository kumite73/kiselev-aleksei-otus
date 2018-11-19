const clog = console.log

const tree = require('./tree');
const myTree = new tree();

let out = { files: [], dirs: [] }

myTree.readdir(process.argv[2] || '.')
  .then((res) => {
      out = res;
      clog(out);
    })
  .catch(console.error)

const path_module = require('path');

const { isFile } = require('../isFile.js');
const { isCanReadable } = require('../isCanReadable.js');
const { getStat } = require('../getStat.js');
const { getHash } = require('../getHash.js');

class File {
  constructor(file_path) {
    const fileObj = this;
    fileObj.path = file_path;

    return new Promise((res, rej) => {
      isFile(file_path)
        .then((isF) =>
          isF ? isCanReadable(file_path) : rej(`${file_path} is not file`)
        )
        .then((isRable) =>
          isRable ? getStat(file_path) : rej(`${file_path} is not readable`)
        )
        .then((stats) => {
          fileObj.stats = stats;
          res(fileObj);
        })
        .catch((err) => rej(err));
    });
  }

  getFileSize() {
    return this.stats.size;
  }

  getFileName() {
    return path_module.basename(this.path);
  }

  getHash() {
    return new Promise((res, rej) => {
      getHash(this.path).then(res).catch(rej);
    });
  }
}

// const fileObj = new File('./readme.md'); // test code
// fileObj.then((o) => {
//   console.log(o.getFileSize());
//   console.log(o.getFileName());
//   o.getHash().then(console.log);
// });

exports.File = File;

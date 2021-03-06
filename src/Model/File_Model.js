const path_module = require('path');

const { isFile } = require('../isFile.js');
const { isCanReadable } = require('../isCanReadable.js');
const { getStat } = require('../getStat.js');
const { getHash } = require('../getHash.js');
const { copyFile } = require('../copyFile.js');

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
      getHash(this.path)
        .then((hash) => {
          this.hash = hash;
          res(hash);
        })
        .catch(rej);
    });
  }

  compareSize(fileObj) {
    return this.getFileSize() === fileObj.getFileSize();
  }

  compareHash(fileObj) {
    return new Promise((res, rej) => {
      try {
        Promise.all([this.getHash(), fileObj.getHash()])
          .then((result) => {
            return result[0] == result[1];
          })
          .then(res);
      } catch (error) {
        rej(error);
      }
    });
  }

  compareFile(fileObj) {
    return new Promise((res, rej) => {
      if (this.compareSize(fileObj)) {
        this.compareHash(fileObj).then(res).catch(rej);
      } else {
        res(false);
      }
    });
  }

  async showInfo() {
    console.log(this.path, this.getFileSize(), await this.getHash());
  }

  copyFile(dest_path) {
    const dest = path_module.join(dest_path, this.getFileName());
    return new Promise((res, rej) => {
      copyFile(this.path, dest).then(res).catch(rej);
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

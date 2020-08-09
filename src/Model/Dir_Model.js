const { isDirectory } = require('../isDirectory.js');
const { isCanReadable } = require('../isCanReadable.js');

const { File } = require('./File_Model.js');

class RootDir {
  constructor() {
    this.subDirs = [];
  }

  addSubDirs(dir_path) {
    return new Dir(dir_path).then((dirObj) => {
      this.subDirs.push(dirObj);
      return dirObj;
    });
  }
}

class Dir extends RootDir {
  constructor(dir_path) {
    super();

    const dirObj = this;
    dirObj.path = dir_path;
    dirObj.fileList = [];

    return new Promise((res, rej) => {
      isDirectory(dir_path)
        .then((isDir) =>
          isDir ? isCanReadable(dir_path) : rej(`${dir_path} is not directory`)
        )
        .then((isRable) =>
          isRable ? res(dirObj) : rej(`${dir_path} is not readable`)
        )
        .catch((err) => rej(err));
    });
  }

  addFile(file_path) {
    return new File(file_path).then((fileObj) => {
      this.fileList.push(fileObj);
      return fileObj;
    });
  }
}

// const rootDir = new RootDir(); // test code
// const subdir = rootDir.addSubDirs('./').then((subdir) => {
//   console.log(subdir);
//   return subdir;
// }); // test code
// subdir
//   .then((o) => {
//     const file = o.addFile('./readme.md');
//     return file;
//   })
//   .then(console.log)
//   .then(() => {
//     console.log(subdir);
//   });

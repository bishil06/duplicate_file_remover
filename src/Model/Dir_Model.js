const path_module = require('path');

const { isDirectory } = require('../isDirectory.js');
const { isCanReadable } = require('../isCanReadable.js');
const { getDirent } = require('../getDirent.js');

const { File } = require('./File_Model.js');
const { NoDupFileList } = require('./NoDupFileList_Model.js');

class RootDir {
  constructor() {
    this.subDirs = [];
  }

  addSubDir(dir_path) {
    return new Dir(dir_path).then((dirObj) => {
      this.subDirs.push(dirObj);
      return dirObj;
    });
  }

  getAllFileList() {
    let allFileList = [];
    allFileList = allFileList.concat(this.fileList ? this.fileList : []);
    for (const subDir of this.subDirs) {
      allFileList = allFileList.concat(subDir.getAllFileList());
    }
    return allFileList;
  }

  getAllDirList() {
    let allDirList = [];
    for (const subDir of this.subDirs) {
      allDirList = allDirList.concat(subDir.getDirList());
    }
    return allDirList;
  }

  getNoDupFileList() {
    const noDupFileList = new NoDupFileList();

    return new Promise((res, rej) => {
      try {
        Promise.all(
          this.getAllFileList().map((file) => noDupFileList.addNoDupFile(file))
        ).then(() => res(noDupFileList));
      } catch (err) {
        rej(err);
      }
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

  readDir(r = true) {
    return new Promise(async (res, rej) => {
      try {
        for await (const dirent of getDirent(this.path)) {
          const dirent_path = path_module.join(this.path, dirent.name);

          if (dirent.isFile()) {
            await this.addFile(dirent_path);
          } else if (dirent.isDirectory()) {
            if (r) {
              const subDir = await this.addSubDir(dirent_path);
              await subDir.readDir();
            }
          } else {
            // is not file or directory
          }
        }

        res(this);
      } catch (err) {
        rej(err);
      }
    });
  }

  getDirList() {
    let allDirList = [];
    allDirList.push(this);
    for (const subDir of this.subDirs) {
      allDirList = allDirList.concat(subDir.getDirList());
    }

    return allDirList;
  }
}

const rootDir = new RootDir();

// const subdir = rootDir.addSubDir('./').then((subdir) => {
//   console.log(subdir);
//   return subdir;
// }); // test code
// subdir
//   .then((o) => o.readDir())
//   .then((o) => o.getDirList())
//   .then((r) => console.log(r))
//   .then(() => rootDir.getAllDirList())
//   .then((r) => console.log(r));

exports.rootDir = rootDir;

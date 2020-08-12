const { rootDir } = require('./src/Model/Dir_Model.js');

const { isCanWriteable } = require('./src/isCanWriteable.js');

let dirs = ['./test/test_dir1', './test/test_dir2', './test/test_dir3'];
let dest = './test/dest_dir';

function input_dirs(dest_dir, ...dirs) {
  return new Promise((res, rej) => {
    try {
      isCanWriteable(dest_dir)
        .then((isCanWable) =>
          isCanWable
            ? Promise.resolve(true)
            : rej(`${dest_dir} is not writeable`)
        )
        .then(() => {
          return Promise.all(dirs.map((dir) => rootDir.addSubDir(dir)));
        })
        .then((result) => res(result))
        .catch((err) => rej(err));
    } catch (err) {
      rej(err);
    }
  });
}

function inspect_dirs(...dirObjs) {
  return new Promise((res, rej) => {
    try {
      Promise.all(dirObjs.map((dirObj) => dirObj.readDir())).then(res);
    } catch (err) {
      rej(err);
    }
  });
}

function copyNoDupFileList_to_dest({ fileList }, dest_dir) {
  return new Promise((res, rej) => {
    try {
      Promise.all(
        fileList.map((file) => {
          return file
            .copyFile(dest_dir)
            .then((result) => {
              return {
                copy_success: result,
                file,
                dest_dir,
              };
            })
            .catch((err) => {
              console.error(
                `Copy process is success? ${false} -> ${file.getFileName()} file copy to ${dest} \n ${err}`
              );
              return {
                copy_success: false,
                file,
                dest_dir,
                err,
              };
            });
        })
      ).then(res);
    } catch (error) {
      rej(error);
    }
  });
}

function main() {
  input_dirs(dest, ...dirs)
    .then((dirObjs) => inspect_dirs(...dirObjs))
    .then(() => rootDir.getNoDupFileList())
    .then((noDupFileList) => copyNoDupFileList_to_dest(noDupFileList, dest))
    .then(console.log);
}

main();

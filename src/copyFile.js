const fs = ({
  promises: fsPromises,
  constants: { COPYFILE_EXCL },
} = require('fs'));

// console.log(fs);
// console.log(fsPromises);
// console.log(COPYFILE_EXCL);

function copyFile(file_path, dest_path) {
  return new Promise((res, rej) => {
    fsPromises
      .copyFile(file_path, dest_path, COPYFILE_EXCL)
      .then(() => res(true))
      .catch((err) => rej(err));
  });
}

exports.copyFile = copyFile;

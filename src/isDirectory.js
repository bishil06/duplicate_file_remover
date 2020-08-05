const fs = require('fs');
const fsPromises = fs.promises;

const isDirectory = (dir) => {
  return fsPromises
    .lstat(dir)
    .then((dirent) => dirent.isDirectory())
    .catch((err) => {
      console.error(
        `에러 메세지 : ${err} \n ${dir} 경로를 디렉토리인지 검사하는데 실패했습니다.`
      );
    });
};

// isDirectory('./readme.md').then(console.log); test code

exports.isDirectory = isDirectory;

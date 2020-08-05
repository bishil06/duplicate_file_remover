const fs = require('fs');
const fsPromises = fs.promises;

const { printError } = require('./printError.js');
const { getStat } = require('./getStat.js');

const isDirectory = (dir) => {
  return getStat(dir)
    .catch((err) => {
      printError(
        err,
        `isDirectory - ${dir} 경로의 stat을 얻는데 실패했습니다.`
      );
    })
    .then((stat) => stat.isDirectory())
    .catch((err) => {
      printError(
        err,
        `isDirectory - ${dir} 경로를 디렉토리인지 검사하는데 실패했습니다.`
      );
    });
};

isDirectory('./readme.md').then(console.log); // test code

exports.isDirectory = isDirectory;

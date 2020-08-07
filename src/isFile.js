const fs = require('fs');
const fsPromises = fs.promises;

const { printError } = require('./printError.js');
const { getStat } = require('./getStat.js');

const isFile = (dir) => {
  return getStat(dir)
    .catch((err) => {
      printError(err, `isFile - ${dir} 경로의 stat을 얻는데 실패했습니다.`);
    })
    .then((stat) => stat.isFile())
    .catch((err) => {
      printError(
        err,
        `isFile - ${dir} 경로를 파일인지 검사하는데 실패했습니다.`
      );
    });
};

// isFile('./src').then(console.log); // test code

exports.isFile = isFile;

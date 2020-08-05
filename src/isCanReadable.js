const fs = require('fs');
const fsPromises = fs.promises;

const { printError } = require('./printError.js');

const isCanReadable = (path) => {
  return fsPromises
    .access(path, fs.constants.R_OK)
    .then(() => true)
    .catch((err) => {
      printError(
        err,
        `isCanReadable - ${path} 가 읽을수 있는 경로인지 검사하는데 실패했습니다.`
      );
      return false;
    });
};

// isCanReadable('./src').then(console.log); // test code

exports.isCanReadable = isCanReadable;

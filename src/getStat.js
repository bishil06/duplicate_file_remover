const fs = require('fs');
const fsPromises = fs.promises;

const { printError } = require('./printError.js');

const getStat = (path) => {
  return fsPromises.lstat(path).catch((err) => {
    printError(err, `getStat - ${path} 의 stat을 얻는데 실패했습니다.`);
    return Promise.reject(err);
  });
};

exports.getStat = getStat;

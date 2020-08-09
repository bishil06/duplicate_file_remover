const fs = require('fs');
const fsPromises = fs.promises;

const { printError } = require('./printError.js');
const { getStat } = require('./getStat.js');

const isFile = (file_path) => {
  return new Promise((res, rej) => {
    getStat(file_path)
      .then((stats) => stats.isFile())
      .then(res) // true or false
      .catch((err) => rej(err));
  });
};

// isFile('./readme.md').then(console.log); // test code

exports.isFile = isFile;

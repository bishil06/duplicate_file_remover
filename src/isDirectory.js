const fs = require('fs');
const fsPromises = fs.promises;

const { printError } = require('./printError.js');
const { getStat } = require('./getStat.js');

const isDirectory = (dir_path) => {
  return new Promise((res, rej) => {
    getStat(dir_path)
      .then((stats) => stats.isDirectory())
      .then(res) // true or false
      .catch((err) => rej(err));
  });
};

// isDirectory('./readme.md').then(console.log); // test code

exports.isDirectory = isDirectory;

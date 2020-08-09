const fs = require('fs');
const fsPromises = fs.promises;

const isCanReadable = (some_path) => {
  return new Promise((res, rej) => {
    fsPromises
      .access(some_path, fs.constants.R_OK)
      .then(() => res(true))
      .catch((err) => rej(err));
  });
};

// isCanReadable('./src').then(console.log); // test code

exports.isCanReadable = isCanReadable;

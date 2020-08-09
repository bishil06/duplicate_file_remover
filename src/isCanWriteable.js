const fs = require('fs');
const fsPromises = fs.promises;

const isCanWriteable = (some_path) => {
  return new Promise((res, rej) => {
    fsPromises
      .access(some_path, fs.constants.W_OK)
      .then(() => res(true))
      .catch((err) => rej(err));
  });
};

// isCanWriteable('./src').then(console.log); // test code

exports.isCanWriteable = isCanWriteable;

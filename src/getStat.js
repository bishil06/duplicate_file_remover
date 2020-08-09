const fs = require('fs');
const fsPromises = fs.promises;

const getStat = (path) => {
  return fsPromises.lstat(path);
};

// getStat('./').then(console.log);

exports.getStat = getStat;

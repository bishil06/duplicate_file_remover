const crypto = require('crypto');
const fs = require('fs');

function getHash(file_path) {
  return new Promise((res, rej) => {
    try {
      const hash = crypto.createHash('md5');

      const input = fs.createReadStream(file_path);

      input.on('readable', () => {
        const data = input.read();
        if (data) hash.update(data);
        else {
          res(hash.digest('hex'));
        }
      });
    } catch (err) {
      rej(err);
    }
  });
}

// getHash('./readme.md').then(console.log); // test code

exports.getHash = getHash;

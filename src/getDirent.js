const path_module = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const { isDirectory } = require('./isDirectory.js');
const { isCanReadable } = require('./isCanReadable');

async function* getDirent(dir_path) {
  try {
    const isDir = await isDirectory(dir_path);
    if (!isDir) {
      return Promise.reject(`${dir_path} is not directory`);
    }

    const isRableDir = await isCanReadable(dir_path);
    if (!isRableDir) {
      return Promise.reject(`${dir_path} is not readable`);
    }

    const dir = await fsPromises.opendir(dir_path).catch((err) => {
      return Promise.reject(err);
    });

    for await (const dirent of dir) {
      yield dirent;
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

exports.getDirent = getDirent;

class NoDupFileList {
  constructor() {
    this.fileList = [];
  }

  haveSameFileSize(fileObj) {
    return new Promise((res, rej) => {
      for (const file of this.fileList) {
        const result = fileObj.compareSize(file);
        if (result) {
          res(file);
        }
      }
      res(false);
    });
  }

  addNoDupFile(fileObj) {
    return new Promise((res, rej) => {
      try {
        this.haveSameFileSize(fileObj).then((findSameSize) => {
          if (findSameSize) {
            // find same file size
            fileObj.compareHash(findSameSize).then((isSameHash) => {
              if (isSameHash) {
                // hash 값이 같다
                res(false); // file size 와 hash 값이 같은 파일이 이미 리스트에 존재한다
              } else {
                // hash 값이 다르다 -> 다른 파일
                this.fileList.push(fileObj);
                res(fileObj);
              }
            });
          } else {
            // not find -> 다른파일
            this.fileList.push(fileObj);
            res(fileObj);
          }
        });
      } catch (err) {
        rej(err);
      }
    });
  }
}

exports.NoDupFileList = NoDupFileList;

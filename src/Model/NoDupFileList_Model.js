class NoDupFileList {
  constructor() {
    this.fileList = [];
  }

  // 파일리스트에 같은 파일이 이미 존재하는지 검사
  findSameFile_from_fileList(fileObj) {
    return new Promise(async (res, rej) => {
      for (const file of this.fileList) {
        await fileObj
          .compareFile(file)
          .then((sameFile) => {
            // 아직 전부 탐색된것이 아니기에 res(false) 를 추가하지 않았다.
            if (sameFile) res(true);
          })
          .catch(rej);
      }
      // 전부탐색했는데도 res(true) 가되지 않았기에 false 반환
      res(false);
    });
  }

  // 파일리스트에 같은파일이 이미 존재하는지 검사하고 없다면 추가
  addFile_to_noDupFileList(fileObj) {
    return new Promise((res, rej) => {
      this.findSameFile_from_fileList(fileObj)
        .then((sameFile) => {
          if (sameFile) {
            res(false);
          } else {
            this.fileList.push(fileObj);
            res(true);
          }
        })
        .catch(rej);
    });
  }
}

exports.NoDupFileList = NoDupFileList;

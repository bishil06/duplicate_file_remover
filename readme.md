# 중복파일 제거 애플리케이션

node js 를 사용해서 만들어진 중복파일 제거 애플리케이션 입니다.

이 프로그램의 프로세스는 크게 3단계로 구분됩니다.

1. 입력: 검사할 경로를 입력받습니다.
2. 분석: 입력된 경로를 검사하여 중복파일을 찾아냅니다.
3. 복사: 새로운 경로로 중복된 파일들을 제외하여 복사합니다.

## 입력 프로세스

(...toInspectDirs, destDir)
하나 이상의 검사할 폴더들과 중복이 제거된 파일들을 복사할 폴더를 입력합니다.  
함수는 검사할 폴더들이 유효하고 읽을수 있는지, 복사할 폴더가 유효하고 쓸수 있는지 검사합니다.  
폴더안에 폴더가 더욱더 들어있는 경우 옵션으로 내부까지 검사할지 결정합니다.  
모두 검증이 되었다면 다음 프로세스로 넘어갑니다.

## 분석 프로세스

입력된 검사할 폴더들 안에 있는 모든 파일들의 리스트를 불러온다.
[a, b, c, d, e, ...]
중복 검사 프로세스

1. 파일 사이즈 측정
2. 사이즈가 같다면 hash 값으로 비교

## 복사 프로세스

중복이 제거된 파일 리스트를 하나씩 꺼내서 목적지(중복이 제거된 파일들을 저장할 폴더)에 복사한다.

# 구현 목표

1. 자바스크립트의 비동기 특성을 이용해서 위 프로세스를 비동기적으로 실행할 것이다.
2. 각 프로세스별로 에러처리를 Promise를 활용하여 해결한다.
3. 되도록 함수형 프로그래밍 기법을 활용해서 함수와 함수의 조합으로 문제를 해결한다.

# 현재 하고있는 작업

- 경로가 디렉토리인지 검사 -> 완료

# 메모

- 폴더가 아닌 심볼릭 링크는 어떻게 처리할것인가?
  옵션으로 내부폴더로 인식할경우 stat, 아닐경우 lstat

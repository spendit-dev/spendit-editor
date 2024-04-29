### 유지보수를 위한 개발자 가이드

#### 1. 개발 환경 설정
- Node 18.x 이상 (ck-editor5 라이브러리 사용을 위해)
  
---


#### 2. 프로젝트 설명
이 프로젝트는 NPM 패키지로 배포되는 라이브러리입니다. 이를 위해 vite를 이용해 개발 환경을 구성하고 있습니다.

---


#### 3. 프로젝트 구조
- src/editor.ts : ck-editor를 에디터를 생성하는 가장 핵심적인 코드입니다.
- src/lang: ck-editor에서 사용하는 언어 파일입니다. 이 파일과 관련해서 주의할 점을 6번에서 확인해주세요.
- src/assets/default.css: ck-editor에서 사용하는 기본 css 파일입니다. 이 파일과 관련해서 주의할 점을 6번에서 확인해주세요.
- src/assets/editor.css: spendit에서 ck-editor를 커스텀하기 위해 사용하는 css 파일입니다. 
- src/sample.js : ck-editor를 사용하는 샘플 코드입니다.

---

#### 4. Scripts
- ```yarn run build``` : src/sample.js를 dist 폴더로 빌드합니다. 그리고 나서
- ```yarn run dev```를 하면, dist 폴더의 index.html을 localhost:3003으로 띄웁니다. index.html은 src/sample.js를 로드하고 있습니다.
유지보수할 때 화면을 띄우면서 하기 위해 만들었습니다. (핫리로드는 하지 못했습니다.)
- ```yarn run build:package```를 하면, src/editor.ts를 dist 폴더로 빌드합니다.
이때, es2018로 빌드하며, 이는 사용하는 곳에서 별도의 바벨이나 트랜스파일러를 사용하지 않아도 되도록 하기 위함입니다.

---

### 5. 배포하기
- 배포하기 전에 ```yarn run build:package```를 해주세요. (dist/* 파일을 npm에 배포하기 위함)
- package.json의 version을 올린 후, commit합니다. 
- version을 올리지 않으면 배포가 되지 않습니다.
- 터미널에 ```npm login```를 하면 name을 입력하라고 합니다.
- 'spendit' 입력 후 password를 입력합니다.
- 최초 시도하는 경우 email을 요구합니다. 권한을 부여받은 email을 입력합니다.
- email에 도착한 opt코드를 입력합니다.
- ```npm publish --access=public```을 하면 배포가 됩니다.

---

### 6. 참고사항
- default.css는 dist/assests/index-[hash].css와 dist/assets/index-[hash].css파일은 ck-editor에서 제공하는 ```@ckeditor/ckeditor5-theme-lark```를 이용해 빌드된 결과물입니다. 이를 default.css로 옮겨 일부 코드를 수정하였습니다.
그 이유는 빌드 결과물에서 calc가 사용되어야할 곳에 calc를 누락한 코드들이 있었고, 이를 그대로 사용했을 때 CRA를 사용하는 프로젝트에서 build에 실패하기 때문입니다. 가급적 이 파일을 건드릴 일이 없기를 바랍니다!
- lang 폴더의 파일들은 ck-editor custom으로 만들기에서 다운로드한 결과물에 있는 translations 폴더의 파일들입니다.
- 추가적인 내용은 [컨플](https://spendit.atlassian.net/wiki/x/xQCKvg)에 있습니다.
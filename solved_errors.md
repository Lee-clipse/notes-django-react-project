# 발생한 사소한 오류 및 해결과정

## 1)

**오류)**

console.log() 로 확인

`Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0`

**원인)**

fetch promise 부분에서 JSON 파싱 중 문제가 발생

**해결)**

fetch 안에 

```
headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
```

넣고 url 끝에 '/' 붙여주니 해결

---

## 2)

**오류)**

console.log() 로 확인

`PUT http://127.0.0.1:8000/api/notes/1/ 403 (Forbidden)`

**원인)**

django admin이 로그인 중이라서 접근이 제한됨

**해결)**

직접 admin 페이지 가서 로그아웃 하니 해결

---

## 3)

**오류)**

console.log() 로 확인

`500 (Internal Server Error)`

**원인)**

JS 응답 부분에서 발생
serialize 된 데이터를 Response로 안감싸고 넣어서 오류


**해결)**

Response로 감싸서 해결

---

## 4)

**오류)**

기능이 의도적으로 동작하지 않음을 확인

메모장 생성 - 입력 X - '<' 클릭: 에러

**원인)**

contents가 비어있으면 note 객체 자체가 null인데
note.body === null 조건문을 수행하여 null.body에 접근한게 되어버려서 오류

**해결)**

if (note) 조건문 하나 더 생성해서 해결

---

## 5)

**오류)**

`git push heroku main` 

위를 터미널에 입력 시 아래와 같은 오류 발생

`[remote rejected] main -> main (pre-receive hook declined)`

**원인)**

head 브랜치랑 main이랑 달라서 발생

**해결 1)**

checkout으로 해결

**해결 2)**

head 브랜치가 main인데도 오류가 발생한다면

`heroku config:set DISABLE_COLLECTSTATIC=1` 하면 해결

---

## 6)

**오류)**

터미널에 입력 시

`heroku run python manage.py migrate` 

위를 터미널에 입력 시 아래와 같은 오류 발생

`python: can't open file 'manage.py': [Errno 2] No such file or directory` 

**원인)**

루트 폴더에 `manage.py` 파일이 없기 때문

**해결)**

django project, react file 내용을 전부 루트 폴더로 옮겨서 실행하니 해결

---

## 7)

**오류)**

터미널에서 발생

`App not compatible with buildpack: https://buildpack-registrdetection-failure` 

**원인)**

buildpack 맞는게 없다는 의미

**해결)**

터미널에 `heroku buildpacks:clear` 후 프로젝트에 맞는 buildpack 재설치

> ex) heroku buildpacks:set heroku/python

---

## 8)

**오류)**

react 테스트 중 F12 에서 발생

`GET /%PUBLIC_URL%/manifest.json HTTP/1.1" 404` 

**원인)**

경로를 정규식으로 바꾸어야함

**해결)**

urls.py에 `path()` -> `re_path()` 로 바꾸니 해결

---

## 9)

**오류)**

react 테스트 중 F12 에서

`Manifest: Line: 1, column: 1, Syntax error.` 발생

**원인)**

manifest.json을 찾지 못하는 에러

**해결)**

public/index.html에 manifest.json 호출하는 link 태그 주석 처리하니 해결

---

## 10)

**오류)**

터미널에서 발생

`react-scripts'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.`

**원인)**

`react-scripts` 가 인식되지 않는 문제

**해결)**

`npm install -save react-scripts`

명령어로 재설치하니 해결

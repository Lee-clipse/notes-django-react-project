# Simple note program

## 문제 상황 1

**의도)**

이미 생성된 노트에서 본문을 다 지우고 '<' 클릭 시, 해당 노트가 삭제되고 메인 화면으로 돌아가야함

**상황)**

본문을 다 지웠음에도 불구하고 메인 화면으로 돌아가서 보면 노트가 삭제되지 않고 본문도 그대로 남아있음

---

**접근 1)**

console.log() 로 본문에 남아있는 객체 확인하기

**결과 1)**

본문을 다 지우면 마지막 한 글자가 body에 남아있음
null 조건문으로 들어가지 않아서 deleteNote() 함수가 실행되지 않음을 확인

---

**접근 2)**

문제의 근원지인 note.body의 근처부터 내가 정확히 이해하지 못하고 쓰는 기능이 있는지 고려해봄

**시도 2)**

많은 시도와 구글링 중, defaultValue -> value로 바꾸었더니 의도대로 동작함을 확인

---

**해석)**

defaultValue와 value의 차이를 깨닫고 고친 것은 아니고 우연히 해결한 것임

아래는 위 두 속성의 차이를 설명한 글

`https://www.w3schools.com/jsref/prop_text_defaultvalue.asp 발췌`

```
The difference between the defaultValue and value property, 
is that defaultValue contains the default value, 
while value contains the current value after some changes have been made.
```

---

## 문제 상황 2

**의도)**

`react run build` 후 8000번 포트에서도 3000포트와 같은 기능으로 동작하도록 함

**상황)**

8000번 포트에서 create, update, delete 기능이 `새로고침`을 수동으로 해야만 페이지에 반영이 되는 현상이 일어남

---

**접근 1)**

단편적인 예시로, update 기능을 위해 기존의 노트를 수정 후 '<' 버튼 클릭 ('<': 수정 & 저장 후 list 페이지 이동)
Django 터미널에서 쿼리와 메소드들을 관찰함

**결과 1)**

위 동작은

1. fetch 'POST'로 백엔드에 변경 사항이 update
2. navigate('/')에 의해 'GET'으로 list 페이지 이동

이렇게 두 부분으로 나눌 수 있는데,
터미널에서 'GET' 다음에 'POST'가 수행되는 것을 확인

> 즉, 2번이 수행되어 list 페이지로 돌아가고 백엔드에 변경 사항이 update되서 반영되지 않는 것

---

**해석)**

navigate('/') 대신 window.location.replace("/") 사용하니 문제 해결

`https://geonlee.tistory.com/191 발췌`

```
react-router-dom의 경우 SPA에서 CSR을 구현하기위한 라이브러리이기 때문에 history.push("/")를 이용해 url이 변경된 것처럼 보이지만, 
실제로는 변경되지 않은 상태입니다.
```

---

## 문제 상황 3

**의도)**

`heroku open`

react로 build된 index.html을 찾아 랜더링

**상황)**

Template을 찾을 수 없어서 오류 발생

---

**접근 1)**

`DEBUG = True`로 변경 후 서버가 어느 폴더에서 index.html을 찾으려 하는지 확인.

**결과 1)**

`frontend/build/index.html` 을 찾는다는 것을 알 수 있었음

---

**접근 2)**

settings.py 에서 template 디렉토리 부분 변경, JS 디버깅, package.json 파일 재확인 등등 구글링으로 갖가지 방법들을 동원

frontend 폴더를 못찾는다면 안의 내용들을 루트 폴더로 꺼내면 정상적으로 작동할 것 같다고 생각

**결과 2)**

frontend 폴더 안의 build 폴더, src 폴더, package.json 등을 루트 폴더로 꺼내고 settings.py 에서 template 디렉토리를 수정

> build 디렉토리가 아닌 public 디렉토리를 인식

index.html을 정상적으로 heroku에서 출력함을 확인

---

**해석)**

react로 build된 정적 파일, html을 heroku 서버에서 읽어와 랜더링하는 줄 알았다.

정적 파일은 `python manage.py collectstatic --noinput` 으로 STATIC_ROOT 폴더 (staticfiles)에 모이지만, html 파일은 이에 포함되지 않기 때문에 public 폴더에서 찾아오는 것이 아닐까라고 짐작했다.

어디까지나 현상으로 추론한 것이기 때문에 정확하지 않다.

이는 실력 성장을 위해서라도 더 깊은 원인 분석이 필요하고, 추후에 이것으로 다른 오류가 생길 수 있기 때문에 자세히 알아두어야 할 필요가 있다.

---

## 문제 상황 4

**의도)**

8000번 포트에서 메모장 앱이 켜지는 것처럼 heroku 서버에서도 `/api/notes/~` 로 라우팅 되어 메모장 앱을 랜더링 해야함

**상황)**

8000번 포트에서는 모든 기능이 정상적으로 동작함을 확인

3000번 포트에서는 `Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0` 오류로 인해 Django에서 데이터를 받아오지 못하고 메모장 틀만 랜더링됨

heroku 서버에서는 메모장 틀도 없고 index.html 그 자체를 보여줌

한 마디로 뭔가 설정이 꽤나 꼬인 것처럼 되어버림

---

**접근 1)**

일단 `Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0` 에러는 F12를 통해 NotesListPage.js의 비동기 부분에서 발생함을 확인

> 12, 16번째 useEffect, async 부분

**결과 1)**

문법을 다시 봐도 틀린 사항이 없다고 생각해서 F12 - JS 디버깅을 시도 중

위 함수, 메소드에 관한 깊은 이해가 필요하다고 판단

미해결

---

**접근 2)**

`문제 상황 3` 에서 발생한 문제가 이어서 발생한 것이라 판단

settings.py 의 template 디렉토리 부분을 build, public 둘 중 어느것을 써야 할지 테스트 해봄

**결과 2)**

public을 먼저 선언하면 heroku에서 index.html (빈 화면)이 나오고, Django에서는 template을 찾을 수 없다는 에러가 발생

build를 먼저 선언하면 Django에서는 메모장이 정상적으로 켜지지만, heroku에서는 template을 찾을 수 없다는 에러가 발생

구글링 결과 복수 설정은 불가능한 것으로 예상

react앱의 build과정, public - build 폴더간의 관계에 대한 본질적인 이해가 필요하다고 판단

미해결

---
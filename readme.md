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

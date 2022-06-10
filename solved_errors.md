# 발생한 사소한 오류 및 해결과정

## 1)

**오류)**

console.log() 로 확인

Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0

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

PUT http://127.0.0.1:8000/api/notes/1/ 403 (Forbidden)

**원인)**

django admin이 로그인 중이라서 접근이 제한됨

**해결)**

직접 admin 페이지 가서 로그아웃 하니 해결

---

## 3)

**오류)**

console.log() 로 확인

500 (Internal Server Error)

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

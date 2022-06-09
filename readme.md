# Simple note program

### 문제 상황 1

의도: 이미 생성된 노트에서 본문을 다 지우고 '<' 클릭 시, 해당 노트가 삭제되고 메인 화면으로 돌아가야함

상황: 본문을 다 지웠음에도 불구하고 메인 화면으로 돌아가서 보면 노트가 삭제되지 않고 본문도 그대로 남아있음

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
The difference between the defaultValue and value property, is that defaultValue contains the default value, while value contains the current value after some changes have been made.
```
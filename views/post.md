# html 처리

```js
fetch('http://localhost:4500/login', {
        method: 'POST',
        headers: {'content-type' : 'application/json; utf-8'},
        body: JSON.stringify({name : input.value})
    }).then(res=>res.json())
    .then(res=>console.log(res))
```

# nodejs 처리
## post
1. route(url) 만들기
2. chunk 메모리로 받아서 => 메모리에서 데이터 찾기
3. 기존의 데이터 읽어오기
4. 읽어온 데이터에 js append
5. 추가된 새로운 데이터를 file에 쓰기

## delete
## update
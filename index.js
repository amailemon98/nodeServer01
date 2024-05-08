const http = require('http');
const server = http.createServer();
const PORT = 4500;
const fs = require('fs').promises;
const fsExit = require('fs');
const path = require('path');

// server.request(()=>{})
server.on("request",async (req, res)=>{
    console.log(req.method, req.url);

    const extName = path.extname(req.url); //확장자 뽑아내기
    let contentType = 'text/html;charset=utf-8';

    switch(extName){
        case '.png':
            contentType = 'image/png'; break;
        case '.gif':
            contentType = 'image/gif'; break;
        case '.jpg':
            contentType = 'image/jpg'; break;
        case '.webp':
            contentType = 'image/webp'; break;
        case '.css':
            contentType = 'text/css'; break;
        case '.js':
            contentType = 'text/javascript'; break;
    }
    // console.log(contentType);

    if(req.method === 'GET'){

        // get : localhost:4500
        if(req.url === '/'){    
            const data = await fs.readFile('./views/index.html', 'utf-8');
    
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        
        // get : localhost:4500/user_delete
        }else if(req.url === '/user_delete'){
            const myPath = path.join(__dirname, '/views', 'delete.html'); 
    
            const data = await fs.readFile(myPath, 'utf-8');
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();

        // get : localhost:4500/login
        }else if(req.url === '/login'){
            const myPath = path.join(__dirname, '/views', 'login.html'); 
    
            const data = await fs.readFile(myPath, 'utf-8');
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();

        // get : localhost:4500/ha_swap
        }else if(req.url === '/ha_swap'){
            const myPath = path.join(__dirname, 'ha_swap', 'ha_swap.html');
    
            const data = await fs.readFile(myPath, 'utf-8');
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        // get : localhost:4500/ha_swap.css
        }else if(req.url.includes('ha_swap.css')){ 
            const myPath = path.join(__dirname, 'ha_swap', 'ha_swap.css');
            const data = await fs.readFile(myPath, 'utf-8');
            res.setHeader('Content-Type', 'text/css');
            res.write(data);
            res.end();
        // get : localhost:4500/product 
        }else if(req.url === '/product'){    
            const data = await fs.readFile('./views/product.html', 'utf-8');
    
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        // get : localhost:4500/about
        }else if(req.url === '/about'){    
            const data = await fs.readFile('./views/about.html', 'utf-8');
    
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        // get : localhost:4500/contact
        }else if(req.url === '/contact'){    
            const data = await fs.readFile('./views/contact.html', 'utf-8');
    
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        // get : localhost:4500/reset.css  문서가 요청
        }else if(req.url.includes('/reset.css')){    
            const data = await fs.readFile('./styles/reset.css', 'utf-8');
    
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        // get : localhost:4500/ 각종 이미지 확장자 요청 : 문서가 요청
        }else if(req.url.includes('.png')||req.url.includes('.jpg')||req.url.includes('.gif')){   
            const data = await fs.readFile(path.join(__dirname, req.url));
    
            // res.setHeader('Content-Type', contentType);
            const extName = path.extname(req.url)
            res.setHeader('Content-Type', `image/${extName}`);
            res.write(data);
            res.end();
        // get : localhost:4500/index.js : 문서가 요청
        }else if(req.url.includes('/index.js')){    
            const data = await fs.readFile('./scripts/index.js');
    
            res.setHeader('Content-Type', 'text/javascript');
            res.write(data);
            res.end();
        }

    // get method end
    }else if(req.method === 'POST'){
        // post : localhost:4500/login
        if(req.url === '/login' && req.method === 'POST' ){

            // console.log('/login post');
    
            // chunk : 메모리로 읽어들임
            let body = '';//따로 저장하기 위한 공간
    
            req.on('data', (chunk)=>{
                body += chunk.toString(); // 순수 node의 방법
            })
    
            // body : JSON.stringify({name : input.value})
            req.on('end', async ()=>{
                const {name, pwd} = JSON.parse(body);
                console.log(name, pwd); // 터미널 확인
    
                const user_json = await fs.readFile(path.join(__dirname,'/data', 'user.json'), "utf-8")
                console.log(user_json); // {"name": "철수"} 문자열 형태
                const user_data = JSON.parse(user_json); // 자바스크립트 파일로 변환
                console.log(user_data); // js 상태
    
                user_data.push({name, pwd}) // === name : name // append
    
                if(!fsExit.existsSync('./data')){ //없을때 만든다
                    fsExit.mkdirSync('./data');//현재 폴더 안에 data 만들기
                }
                fs.writeFile(path.join(__dirname,'/data', 'user.json'),// 파일은 없으면 만든다.
                JSON.stringify(user_data, null, "  "),
                err => {if(err) console.log(err)});
                
                // 이상없음을 응답해준다.
                // res.statusCode = 200;
                res.writeHead(201, {'Content-type': 'application/json'})
                res.write(JSON.stringify({success : "성공", message : "회원가입 정상등록"}));
                // 어떤 요건으로 응답할 것인가? 에 대한 규칙
                res.end();
            });
        }else if(req.url === '/sign-up'){

        }else if(req.url === '/product'){

        }

    // post method end

    // params : 꺼내는 메서드, 파라미터로 데이터를 넘긴다는 의미
    // localhost:4500/user/name=지울이름
    // localhost:4500/user/지울이름
    // localhost:4500/user/1(id)
    // localhost:4500/user/2(id)
    // localhost:4500/user/3(id)
    }else if(req.method === 'DELETE'){
        console.log('delete user');
        // localhost:4500/user/hello
        if(req.url.includes('user')){

            const url = req.url;
            console.log(url); // /user/hello

            const slash = url.split('/');
            console.log(slash); // [ '', 'user', 'hello' ]   slash[2] === hello

            const datas = await fs.readFile('./data/user.json', 'utf-8');
            const users = await JSON.parse(datas); // js

            // const index = users.map((data, index)=>data.name); 
            // const index = users.find((data, index)=> data.id === +slash[2]); //find는 데이터 하나만 찾기 // +로 문자를 숫자로 변환하여 비교
            const user_data = users.filter((data, index)=> data.id !== +slash[2]); //filter는 여러개 데이터 찾기

            // console.log('index : ', index); // index :  [ '영희', '철수', '길동' ]
            // console.log('index : ', user_data); // index :  [ '영희', '철수', '길동' ]

            try{
                fs.writeFile(path.join(__dirname,'/data', 'user.json'),// 파일은 없으면 만든다.
                JSON.stringify(user_data, null, "  "),
                err => {if(err) throw err});

                res.writeHead(201, {'Content-type': 'application/json'})
                res.write(JSON.stringify({success : "성공", message : "삭제완료"}));
                res.end();
            }catch(err){
                res.writeHead(503, {'Content-type': 'application/json'})
                res.write(JSON.stringify({success : "실패", message : "삭제불가"}));
                res.end();
            }
        }

    // delete method end

    // update 수정 : put : 전체 데이터를 수정할 때, patch : 부분 데이터를 수정할 때
    // 1. 기존에 있는 데이터 찾기 : fs.readFile
    // 2. 기존에 있는 데이터를 찾아서 삭제 (filter)
    // 3. 넘어온 데이터를 추가한다 : fs.writeFile


    }else if(req.method === 'PUT'){
        // put : localhost:4500/login
        if(req.url === '/login'){

            // console.log('/login post');
    
            // chunk : 메모리로 읽어들임
            let body = '';//따로 저장하기 위한 공간
    
            req.on('data', (chunk)=>{
                body += chunk.toString(); // 순수 node의 방법
            })
    
            // body : JSON.stringify({name : input.value})
            req.on('end', async ()=>{
                const {id, name, pwd} = JSON.parse(body);
                console.log(id, name, pwd); // 터미널 확인
    
                const user_json = await fs.readFile(path.join(__dirname,'/data', 'user.json'), "utf-8")
                const user_data = JSON.parse(user_json); // 자바스크립트 파일로 변환

                const findUser = user_data.find(user => user.name === name)
                // {id, name, pwd}
    
                const delete_users = user_data.filter( user=>user.id !== findUser.id ); // id 기준
                // const delete_users = user_data.filter( user=>user.name !== name ); //이름 기준
                // const new_user = {id: findUser.id, name, pwd};
                // delete_users.push(new_user);

                // 에크마스크립트 문법
                const newUser = {...findUser, name, pwd}; 
                const users = [...delete_users, newUser];

                fs.writeFile(path.join(__dirname,'/data', 'user.json'),// 파일은 없으면 만든다.
                // JSON.stringify(delete_users, null, "  "),
                JSON.stringify(users, null, "  "),
                err => {if(err) console.log(err)});
                
                // 이상없음을 응답해준다.
                // res.statusCode = 200;
                res.writeHead(201, {'Content-type': 'application/json'})
                res.write(JSON.stringify({success : "성공", message : "수정되었습니다."}));
                // 어떤 요건으로 응답할 것인가? 에 대한 규칙
                res.end();
            });
        }
    // put method end
    }else{
        res.writeHead(503, {'Content-type': 'application/json'})
        // res.writeHead(503, {'Content-type': 'text/plain'}) // 순수 문자를 넘길 때
        res.write(JSON.stringify({success : "실패", message : "주소를 찾을 수 없습니다."}));
        // 어떤 요건으로 응답할 것인가? 에 대한 규칙
        res.end();
    }
    
})

server.listen(PORT,()=>{
    console.log(`PORTNUM:${PORT} STARTED`);
});



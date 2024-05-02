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
    console.log(contentType);

    if(req.url === '/login'){
        // const myPath = path.join(__dirname, req.url.slice(1), req.url.slice(1)+'.html');
        const myPath = path.join(__dirname, '/views', 'login.html'); //path.join이 알아서 /,\ 가지런하게 정렬해준다.
        // C://shopping_mall/views/login.html

        const data = await fs.readFile(myPath, 'utf-8');
        res.setHeader('Content-Type', contentType);
        res.write(data);
        res.end();
    }

    if(req.url === '/login' && req.method === 'POST' ){

        console.log('/login post');

        // chunk : 메모리로 읽어들임
        let body = '';//따로 저장하기 위한 공간

        req.on('data', (chunk)=>{
            body += chunk.toString(); // 순수 node의 방법
        })

        // body : JSON.stringify({name : input.value})
        req.on('end', async ()=>{
            const {name} = JSON.parse(body);
            console.log(name);

            const user_json = await fs.readFile(path.join(__dirname,'/data', 'user.json'), "utf-8")
            console.log(user_json); // {"name": "철수"} 문자열 형태
            const user_data = JSON.parse(user_json); // 자바스크립트 파일로 변환
            console.log(user_data); // js 상태

            user_data.push({name}) // === name : name // append

            if(!fsExit.existsSync('./data')){ //없을때 만든다
                fsExit.mkdirSync('./data');//현재 폴더 안에 data 만들기
            }
            fs.writeFile(path.join(__dirname,'/data', 'user.json'),// 파일은 없으면 만든다.
            JSON.stringify(user_data, null, "  "),
            err => {if(err) console.log(err)}
            )
        });

    }

    if(req.url === '/ha_swap'){
        // const myPath = path.join(__dirname, req.url.slice(1), req.url.slice(1)+'.html');
        const myPath = path.join(__dirname, 'ha_swap', 'ha_swap.html'); //path.join이 알아서 /,\ 가지런하게 정렬해준다.
        // C://shopping_mall/ha_swap/ha_swap.html

        const data = await fs.readFile(myPath, 'utf-8');
        res.setHeader('Content-Type', contentType);
        res.write(data);
        res.end();
    }

    if(req.url.includes('ha_swap.css')){ //확장자가 css라면
        const myPath = path.join(__dirname, 'ha_swap', 'ha_swap.css'); //css 불러오기
        const data = await fs.readFile(myPath, 'utf-8');
        // res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Type', 'text/css');
        res.write(data);
        res.end();
    }

    if(req.url === '/'){    
        const data = await fs.readFile('./views/index.html', 'utf-8');

        res.setHeader('Content-Type', contentType);
        res.write(data);
        res.end();
    }

    // /styles/reset.css
    if(req.url.includes('/reset.css')){    
        const data = await fs.readFile('./styles/reset.css', 'utf-8');

        res.setHeader('Content-Type', contentType);
        res.write(data);
        res.end();
    }

    if(req.url.includes('.png')||req.url.includes('.jpg')||req.url.includes('.gif')){   
        const data = await fs.readFile(path.join(__dirname, req.url));

        // res.setHeader('Content-Type', contentType);
        const extName = path.extname(req.url)
        res.setHeader('Content-Type', `image/${extName}`);
        res.write(data);
        res.end();
    }

    // if(req.url.includes('.png')||req.url.includes('.jpg')||req.url.includes('.gif')){
        
    //     const myPath = path.join(__dirname, req.url);
    //     // /images/images.png

    //     // const extName = path.extname(myPath); //확장자 뽑아내기
    //     console.log('path : ',myPath);
    //     console.log('extName : ',extName);
    //     // path :  C:\shopping_mall\images\images.png
    //     // extName :  .png

    //     const data = await fs.readFile(myPath);

    //     // const extName = path.extname(req.url);
    //     // const data = await fs.readFile("./"+req.url);
    //     res.setHeader('Content-Type', `image/${extName}`);
    //     res.write(data);
    //     res.end();
    // }

    if(req.url.includes('/index.js')){    
        const data = await fs.readFile('./scripts/index.js');

        res.setHeader('Content-Type', 'text/javascript');
        res.write(data);
        res.end();
    }

    if(req.url === '/product'){    
        const data = await fs.readFile('./views/product.html', 'utf-8');

        res.setHeader('Content-Type', contentType);
        res.write(data);
        res.end();
    }
    if(req.url === '/about'){    
        const data = await fs.readFile('./views/about.html', 'utf-8');

        res.setHeader('Content-Type', contentType);
        res.write(data);
        res.end();
    }
    if(req.url === '/contact'){    
        const data = await fs.readFile('./views/contact.html', 'utf-8');

        res.setHeader('Content-Type', contentType);
        res.write(data);
        res.end();
    }
})

server.listen(PORT,()=>{
    console.log(`PORTNUM:${PORT} STARTED`);
});



const http = require('http');
const server = http.createServer();
const PORT = 4500;
const fs = require('fs').promises;
const fsExit = require('fs');
const path = require('path');

// server.request(()=>{})
server.on("request", async (req, res)=>{

    // if(req.url ==='/todos'){
    if(req.url.startsWith('/todos')){
        const data = await fs.readFile(path.join(__dirname, 'views', 'todo.html'), 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    }else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("404 사이트를 찾을 수 없습니다.");
    }

    //get
    //delete
    //update
    //add

})

server.listen(PORT,()=>{
    console.log(`PORTNUM:${PORT} STARTED`);
});

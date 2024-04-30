const http = require('http')
const express = require('express');
const path = require('path')

const {Server} = require('socket.io')


const app = express();

const server = http.createServer(app)


//handle the socket.io / server we created is pass through this io
const io = new Server(server)
io.on('connection', (socket)=>{
    socket.on('user-message',(message)=>{
        console.log('A new User message',message);
        io.emit('message',message)
    })
    
})


app.use(express.static(path.resolve('./public')));

app.get('/',(req,res)=>{
   
    return res.sendFile('/public/index.html')
})

server.listen(9000,()=>{
    console.log('server starts at 9000');
})
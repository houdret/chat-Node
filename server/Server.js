//initial
const express = require('express');
const morgan = require('morgan');
const app = express();
const http = require('http');
const server = http.createServer(app);

const Chat = require('./Chat');
const {mongoose} = require('./database');

// connect server
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', socket => {
    let username;
    let listMessage;

    socket.on('connected', (user) =>{
        username = user;           
        socket.broadcast.emit('messages', { message: `${username} entered the chat room `});          
    });

    socket.on('message',(username, message) => {
        io.emit('messages', {username, message});
        const userchat = new Chat({ username: username, message: message});
        userchat.save();    
       listMessage = userchat     
       console.log(listMessage);  
    });

    
    //save db test
    //------------------------------------------------
    
     /*    
     const newChat = new Chat({username: username});
     newChat.save();        
     const chats = Chat.find().sort({ date: 'desc' });
     socket.on('connected user', (chats) =>{
         socket.emit('chats', {chats});
     })   */
    //-----------------------------------------
    socket.on('disconnect', () => {
        io.emit('messages', {server: "Server", message: `${username} to leave the chat room`});
    });
})

server.listen(app.get('port'),() => console.log(`Server connected on port ${app.get('port')}`));


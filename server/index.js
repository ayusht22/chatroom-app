const express=require('express')
const socketio=require('socket.io')
const http =require('http')
const cors=require('cors')

const app=express()
const server=http.createServer(app);
const {addUser,removeUser,getUser,getUserInRoom}=require('./users.js')

const router=require('./router')
const PORT=process.env.PORT||5000;
app.use(router)
app.use(cors)

corsOptions={
    cors: true,
    origins:["http://localhost:3000"],
   }
const io = socketio(server, corsOptions);

io.on('connection',(socket)=>
{
    
    socket.on('join',({name,room},callback)=>
    {
        const {error,user}=addUser({id:socket.id,name,room})
        
        if(error)
        {
            return callback(error);
        }
        socket.join(user.room)

        socket.emit('message',{user:'admin' ,text:`${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined!`})

        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
       
        callback();
    })
  
    socket.on('sendMessage',(message,callback)=>{
    const user=getUser(socket.id)

    io.to(user.room).emit('message',{user:user.name,text:message})

    callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
        }
      })
})



server.listen(PORT,()=>{
    console.log(PORT)
});

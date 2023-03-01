//creating an express application
const express = require('express');
const app = express();
//http and cross origin resource sharing 
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');//imprting socket.io 


app.use(cors());
const server = http.createServer(app);


const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",                 //creating socket.io server and setting it up
        methods:["GET", "POST "]
    }
})

io.on("connection", (socket)=>{
    console.log(`User connected with id: ${socket.id}`);

    socket.on("join__room", (data) =>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} Joined room: ${data}`)
    })

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("recive_message", data)
    })
    
    socket.on("disconnect", ()=>{
        console.log("User Disconnect:", socket.id);
    })
    //when a user enters website console log the id
})

      //when a user leaves website disconncted it 


server.listen(3001, () => {
    console.log('SERVER IS RUNNIG');
})
const express = require("express");
const socket = require("socket.io");
const app = express();
app.use(express.static("public"));
let port = process.env.PORT||5500;
let server = app.listen(5500,()=>{
    console.log("Listening to"+port);
})

let io = socket(server);
io.on("connection",(socket)=>{
    console.log("Connected");
    socket.on("beginPath",(data) =>{
        io.sockets.emit("beginPath",data);
    })
    socket.on("drawPath", (destObj)=>{
        io.sockets.emit("drawPath", destObj);
    })
    socket.on("pushi", (url)=>{
        io.sockets.emit("pushi",url)
    })
    socket.on("und", (track)=>{
        io.sockets.emit("und", track)
    })
    socket.on("redoi",()=>{
      io.sockets.emit("redoi", track);
    })
})
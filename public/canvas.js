

let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle=  "white";
c.fillRect(0,0,window.innerWidth,window.innerHeight);
let mousedown = false;
let trackerundoredo = [];
let track = 0;
let pencilwidth = document.querySelector(".pencil-width");
let eraserwidth = document.querySelector(".eraser-width");
canvas.addEventListener("mousedown", function(e){
   mousedown = true;
   srcobject = {
     x : e.clientX,
     y : e.clientY
   }
//    beginPath(srcobject);
  socket.emit("beginPath",srcobject);
})
function beginPath(srcobject){
    c.beginPath();
    c.moveTo(srcobject.x, srcobject.y);
}
canvas.addEventListener("mousemove" , function(e){
    if(mousedown){
        let pencilcolor = document.querySelector(".pencil-color").value ;
        let destObj = {
            x:  e.clientX,
            y : e.clientY,
            color: eraserflag ? (erasercolor): (pencilcolor),
            width : c.lineWidth = eraserflag ? (eraserwidth.value) : (pencilwidth.value),
        };
         
        socket.emit("drawPath", destObj);
    }
})

function drawPath(destObj){
   
    c.strokeStyle = destObj.color;
    c.lineWidth = destObj.width;
c.lineTo(destObj.x , destObj.y);
c.stroke();
}
canvas.addEventListener("mouseup", function(){
    mousedown = false;
    let url = canvas.toDataURL();
    // pushi(url);
    socket.emit("pushi", url);
})

function pushi(url){
    trackerundoredo.push(url);
    track = trackerundoredo.length-1;
}

let download = document.querySelector(".download");
download.addEventListener("click",function(){
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "rip.jpg";
    a.click();
})
let erasercolor = "white" ;
let undo = document.querySelector(".undo");
undo.addEventListener("click",function(){
if(track > 0){
    track--;
    //  und(track);
   socket.emit( "und", track);
}



})
function und(tracki){
    track =  tracki;
    c.clearRect(0,0,canvas.width,canvas.height);
    let image = new Image();
    image.src = trackerundoredo[track];
    image.onload = (e)=>{
    c.drawImage(image,0,0,canvas.width, canvas.height);}
}
let redo = document.querySelector(".redo");
redo.addEventListener("click", function(){
    if(track < trackerundoredo.length-1){
        track++;
    //    redoi(track);
    socket.emit("redoi", track);    
}

})
function redoi(tracki){
    track = tracki
    let image = new Image();
    image.src = trackerundoredo[track];
    image.onload = (e)=>{
        c.drawImage(image,0,0,canvas.width, canvas.height);}
}

socket.on("beginPath" , (data) =>{
    beginPath(data);
})
socket.on("drawPath", (destObj) =>{
    drawPath(destObj);
})
socket.on("pushi", (url)=>{
    pushi(url);
})
socket.on("und", (tracki)=>{
    und(tracki);
})
socket.on("redoi",(track)=>{
    redoi(track);
})
let optioncont = document.querySelector(".option-cont");
let optionflag = false;
let toolscont = document.querySelector(".tool-cont")
let pencilcont = document.querySelector(".pencil-cont");
let erasercont = document.querySelector(".eraser-cont");
let upload = document.querySelector(".upload");
optioncont.addEventListener("click", function(){
    optionflag = !optionflag;
    if(optionflag){
        let btn = document.querySelector(".option-cont >span");
        btn.innerHTML = `close`;
        toolscont.style.display = "none" ;
        pencilcont.style.display = "none";
        erasercont.style.display = "none";
        pencilflag = false;
         eraserflag = false;
    }
    else{
        let btn = document.querySelector(".option-cont >span");
        btn.innerHTML = `menu`;
        toolscont.style.display = "flex";
        
    }
})

let pencil = document.querySelector(".pencil");
let pencilflag = false;
let eraserflag = false;
pencil.addEventListener("click",function(){
    pencilflag = !pencilflag;
    if(pencilflag){
        let x = pencil.getBoundingClientRect();
     
        pencilcont.style.left = x.right+"px";
    pencilcont.style.display = "flex";}
    else {
        pencilcont.style.display = "none";
    }
})

let eraser = document.querySelector(".eraser");
eraser.addEventListener("click",function(){
    eraserflag = !eraserflag;
   if(eraserflag){
    let x = eraser.getBoundingClientRect();
 
        erasercont.style.left = x.right+"px";
    erasercont.style.display = "flex";}
    else {
        erasercont.style.display = "none";
    }
})

function draganddrop(stickyElem, event)
{

    // (1) prepare to moving: make absolute and on top by z-index
    stickyElem.style.position = 'absolute';
  
  
    // move it out of any current parents directly into body
    // to make it positioned relative to the body

  
    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      stickyElem.style.left = pageX - stickyElem.offsetWidth / 2 + 'px';
      stickyElem.style.top = pageY - stickyElem.offsetHeight / 2 + 'px';
    }
  
    // move our absolutely positioned ball under the pointer

  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // (2) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // (3) drop the ball, remove unneeded handlers
    stickyElem.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      stickyElem.onmouseup = null;
    };
  
  }
  

  let sticky = document.querySelector(".sticky");
  sticky.addEventListener("click",function(){
    let stickyElem = document.createElement("div");
    stickyElem.setAttribute("class", "stickyElem");
    stickyElem.innerHTML=`
    <div class="header-cont">
    <div class="close"><i class="fa-solid fa-xmark"></i></div>
    <div class="minimize"><i class="fa-solid fa-minus"></i></div>
</div>
<div >
    <textarea class="notes-cont" ></textarea>
</div>
    `
    let stickycont = document.querySelector(".sticky-cont");
    stickycont.appendChild(stickyElem);
 
    let minimize = stickyElem.querySelector(".minimize");
    let close = stickyElem.querySelector(".close");
    minimize.addEventListener("click", function(){
        let notescont = stickyElem.querySelector(".notes-cont");
        let displ = getComputedStyle(notescont).display;
        if(displ === "none"){
            notescont.style.display = "block";
        }else {
            notescont.style.display = "none";
        }
    })
    close.addEventListener("click",function(){
    
        stickyElem.remove();
    })
    stickyElem.onmousedown = function(event){
    draganddrop(stickyElem, event);}
  })

upload.addEventListener("click",function(){
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",function(){
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    let type = file.type.slice(0,5);
    let stickyElem = document.createElement("div");
    stickyElem.setAttribute("class", "stickyElem");
    console.log(type);
    if(type === "image"){
        stickyElem.innerHTML =`
          <div class="header-cont">
          <div class="close"><i class="fa-solid fa-xmark"></i></div>
          <div class="minimize"><i class="fa-solid fa-minus"></i></div>
      </div>
      <div class = "notes-cont">
          <img src = ${url} class = "img-cont"><img>
         
      </div>
          `
    }
    else if(type === "video"){
        stickyElem.innerHTML =`
        <div class="header-cont">
        <div class="close"><i class="fa-solid fa-xmark"></i></div>
        <div class="minimize"><i class="fa-solid fa-minus"></i></div>
    </div>
    <div class = "notes-cont">
   
        <video autoplay loop src = ${url} class="img-cont" ></video>
    </div>
        `
    }
    else {
        alert("This can't be inserted");
        stickyElem.innerHTML =`
        <div class="header-cont">
        <div class="close"><i class="fa-solid fa-xmark"></i></div>
        <div class="minimize"><i class="fa-solid fa-minus"></i></div>
        </div>
        <div >
        <textarea class="notes-cont" ></textarea>
        </div>
        `
    }

     
        

          let stickycont = document.querySelector(".sticky-cont");
          stickycont.appendChild(stickyElem);
       
          let minimize = stickyElem.querySelector(".minimize");
          let close = stickyElem.querySelector(".close");
          minimize.addEventListener("click", function(){
              let notescont = stickyElem.querySelector(".notes-cont");
              let displ = getComputedStyle(notescont).display;
              if(displ === "none"){
                  notescont.style.display = "block";
              }else {
                  notescont.style.display = "none";
              }
          })
          close.addEventListener("click",function(){
          
              stickyElem.remove();
          })
          stickyElem.onmousedown = function(event){
          draganddrop(stickyElem,event)};
          stickyElem.ondragstart = function(){
            return false;
          };
       
    })
})
let mouse = {
    x : 0,
    y : 0,
    w : 0,
    alt : false,
    shift : false,
    ctrl : false,
    buttonLastRaw : 0, // user modified value
    buttonRaw : 0,
    over : false,
    buttons : [1, 2, 4, 6, 5, 3], // masks for setting and clearing button raw bits;
};

////////////////////////////////////////////////////////////////////////////////
function mouseMove(event) {

   mouse.x = event.offsetX;
   mouse.y = event.offsetY;
   if (mouse.x === undefined) {
       mouse.x = event.clientX;
       mouse.y = event.clientY;
   }
   mouse.alt = event.altKey;
   mouse.shift = event.shiftKey;
   mouse.ctrl = event.ctrlKey;
   if (event.type === "mousedown") {

       event.preventDefault()
       mouse.buttonRaw |= mouse.buttons[event.which-1];
   console.log(mouse.buttonRaw );
   } else if (event.type === "mouseup") {
       mouse.buttonRaw &= mouse.buttons[event.which + 2];
   console.log(mouse.buttonRaw );
   } else if (event.type === "mouseout") {
       mouse.buttonRaw = 0;
       mouse.over = false;
   } else if (event.type === "mouseover") {
       mouse.over = true;
   } else if (event.type === "mousewheel") {
       event.preventDefault()
       mouse.w = event.wheelDelta;
   } else if (event.type === "DOMMouseScroll") { // FF you pedantic doffus
     mouse.w = -event.detail;
   }
}

////////////////////////////////////////////////////////////////////////////////
function setupMouse(id) {
  let e = document.getElementById(id);
  e.addEventListener('mousemove', this.mouseMove);
  e.addEventListener('mousedown', this.mouseMove);
  e.addEventListener('mouseup', this.mouseMove);
  e.addEventListener('mouseout', this.mouseMove);
  e.addEventListener('mouseover', this.mouseMove);
  e.addEventListener('mousewheel', this.mouseMove);
  e.addEventListener('DOMMouseScroll', this.mouseMove); // fire fox

  e.addEventListener("contextmenu", function (e) {
     e.preventDefault();
  }, false);
}

let myCanvas = new Canvas('myCanvas', document.body, 1278, 520);
myCanvas.create();
myCanvas.createReportList();
let mytext=new Text(myCanvas.ctx, myCanvas.listId,myCanvas.width-200,myCanvas.height-15,'blue','hello world')
mytext.fontSize=13;

let newcur= new Cursor(myCanvas.ctx,myCanvas.listId,625,290);
//grapElements.push(newcur);
newcur.draw();
////////////////////////////////////////////////////////////////////////////////

setupMouse(myCanvas.id);
let displayTransform =new DisplayTransform(myCanvas.ctx)

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                                                                            /
//                                                                            //
//                                                                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

function update(){

  displayTransform.update();
  // set home transform to clear the screem
  displayTransform.setHome();
  myCanvas.clear();
  displayTransform.setTransform();




   myCanvas.ctx.beginPath();
  myCanvas.ctx.rect(0, 0, 100, 100);
   myCanvas.ctx.stroke();
  myCanvas.ctx.beginPath();
  myCanvas.ctx.moveTo(0, 0);
   myCanvas.ctx.lineTo(300, 150);
   myCanvas.ctx.stroke();
   myCanvas.ctx.fillStyle = "black";



/*
var copyTransform={

  x : displayTransform.x,
  y : displayTransform.y,
  scale : displayTransform.scale,
  rotate : displayTransform.rotate,
  ox: displayTransform.ox,
  oy: displayTransform.oy
};

  displayTransform.x = 0;
  displayTransform.y = 0;
  displayTransform.scale = 1;
  displayTransform.rotate = 0;
  displayTransform.ox = 0;
  displayTransform.oy = 0;

   displayTransform.setHome();
   */
   displayTransform.defaultScreenOn();

   newcur.position.x=mouse.x;
   newcur.position.y=mouse.y;

  newcur.draw();
  myCanvas.ctx.strokeStyle="red"
  myCanvas.ctx.beginPath();
  myCanvas.ctx.rect(0, 0, 100, 100);
  myCanvas.ctx.stroke();
  myCanvas.ctx.strokeStyle="black"
  mytext.text="Mouse Position : "+mouse.rx.toFixed(2)+"," + mouse.ry.toFixed(2);

    mytext.draw();
  /////////////////////////////
displayTransform.defaultScreenOff();
/*
        displayTransform.x = copyTransform.x;
       displayTransform.y = copyTransform.y;
       displayTransform.scale =copyTransform.scale;
       displayTransform.rotate = copyTransform.rotate;
       displayTransform.ox = copyTransform.ox;
       displayTransform.oy = copyTransform.oy;

  displayTransform.setTransform();
  //console.log(mouse.rx);
  // console.log(mouse.ry);
*/

  if(mouse.buttonRaw === 4){ // right click to return to homw
       displayTransform.x = 0;
       displayTransform.y = 0;
       displayTransform.scale = 1;
       displayTransform.rotate = 0;
       displayTransform.ox = 0;
       displayTransform.oy = 0;
   }


    requestAnimationFrame(update);
}
update();

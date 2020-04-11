
////////////////CANVAS/////////////

let grapElements=[];
let clickSelection=false;
class grapElement{

		static getElementId(item){

			if(typeof grapElements == "undefined" && grapElements == null && grapElements.length== null && grapElements.length <= 0){

				return 1;

			}else{

				let count=0;
				let fi = new RegExp(item , 'g');
				let str= null;
				let res=null
				for(var i = 0; i < grapElements.length; ++i){

					str=grapElements[i].name
					res=str.match(fi);

					if(res!==null){
						count+=1;
					}
				}

				return count+1

			}
		}

}
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

  // calculate the direction of the lines
  let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

    // optionally, draw a circle where the lines meet
    let intersectionX = x1 + (uA * (x2-x1));
    let intersectionY = y1 + (uA * (y2-y1));

    return true;
  }
  return false;
}
//////////////////////////////////////////////

function isPointInRect(rx1,rx2,ry1,ry2,Px1,Py1){


	if(Px1>=rx1 && Px1<=rx2 && Py1>=ry1 && Py1 <=ry2){
		return true;
	}
	return false;
}
//////////////////////////////////////////////////////////
function isContain(item,filter){
	let res=null;
	let flt= new RegExp(filter , 'g');
	res=item.match(flt);

	if(res===null){
		return false;
	}else{
		return true;
	}

}

function checkClickedAreaItem(_canvas,selectedArea){
	let x1=null;
	let x2=null;
	let y1= null;
	let y2 = null;



	if(selectedArea.startPoint.y <= selectedArea.endPoint.y){
		y1=selectedArea.startPoint.y;
		y2=selectedArea.endPoint.y
	}else{
		y1=selectedArea.endPoint.y
		y2=selectedArea.startPoint.y;
	}


		let pth=null;



			if(selectedArea.color=="green"){

				x1=selectedArea.endPoint.x
				x2=selectedArea.startPoint.x;


				let rectangle={
					x:x1,
					y:y1,
					w:x2-x1,
					h:y2-y1
				};

				for(var i=2;i<grapElements.length;i++){
					if(grapElements[i].selected==0 && grapElements[i]. checkcollusionWithRect(rectangle)){
						grapElements[i].onElement=1;
					}else{
						grapElements[i].onElement=0;
					}
				}

			}else{
				x1=selectedArea.startPoint.x
				x2=selectedArea.endPoint.x;
				let rectangle={
					x:x1,
					y:y1,
					w:x2-x1,
					h:y2-y1
				};


				for(var i=2;i<grapElements.length;i++){

					if(grapElements[i].selected==0 && grapElements[i].checkPointsInRect(rectangle)){

						grapElements[i].onElement=1;
					}else{

						grapElements[i].onElement=0;
					}
				}



			}











}





function checkItem(_canvas,mousePos,com){
	let sensibility=newcur.width;
	let isPoint=0;
	let pth=null;
	let isEmpty=false;
	for(var i=2;i<grapElements.length;i++){

			pth=grapElements[i].Path;

			for(var x = mousePos.x - sensibility ; x <= mousePos.x + sensibility ; x++){
				for(var y = mousePos.y-sensibility ; y <= mousePos.y + sensibility ; y++){

					if(_canvas.ctx.isPointInStroke(pth,x ,y)){
							isPoint=1;
							break ;
					}
				}
				if(isPoint==1){
					break;
				}
			}

			if(com=="selection" ){
				if(isPoint==1){
					grapElements[i].selected=1;
					isEmpty=true;
				}

			}else if (com="onElement"){

				if(isPoint==1){

					grapElements[i].onElement=1;
					isEmpty=true;
				}else{
					grapElements[i].onElement=0;
				}

			}
			isPoint=0;


	}

	return isEmpty



}

class Canvas {
	constructor(_id, parent, width, height) {

		this.id = _id;
		this.listId = null;
		this.parent = parent;
		this.width = width;
		this.height = height;
		this.ctx = null;
		this.textLenght=0;
		this.currentPosX=0;
		this.currentPosY=0;

	}



	create() {
		if(this.ctx !== null) {
			console.log('Canvas already created!');
			return;
		}else{
			let divWrapper = document.createElement('div');
			let canvasElem = document.createElement('canvas');

			this.parent.appendChild(divWrapper);
			divWrapper.appendChild(canvasElem);
			divWrapper.id = this.id;
			canvasElem.width = this.width;
			canvasElem.height = this.height;
			canvasElem.classList.add("cursorClass");
			this.ctx = canvasElem.getContext('2d');
			let postext=new Text(this.ctx, this.listId,this.width-150,this.height-15,'blue','Mouse Position : ')
			postext.fontSize=13;
			grapElements.push(postext);

		}
	}

	createReportList() {
		if(this.listId !== null) {
			console.log('Report list already created!');
			return;
		} else {
			let list = document.createElement('ul');
			list.id = this.id + '-reporter';

			let canvasWrapper = document.getElementById(this.id);
			canvasWrapper.appendChild(list);

			this.listId = list.id;
		}
	}

	getMousePos(evt) {
        var rect = document.getElementById(this.id).getBoundingClientRect();
        return {

          x: Math.trunc( evt.clientX - rect.left),
          y: Math.trunc(evt.clientY - rect.top)
        };
      }



	static events(_canvas){

		const canvas = document.getElementById(_canvas.id);

		/////////////////////////////////////////////
		function eventHandler(e){

			const mousePos = _canvas.getMousePos(e);


			if( isNaN( mousePos.x )   || isNaN( mousePos.y ) ){

				mousePos.x=_canvas.currentPosX;
				mousePos.y=_canvas.currentPosY;

			}else{
				_canvas.currentPosX=mousePos.x;

				_canvas.currentPosY=mousePos.y;

			}
			const message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
			_canvas.ctx.clearRect(0, 0, _canvas.width, _canvas.height);
			grapElements[0].txt=message;


			if(e.type=="mousemove"){
				if(clickSelection==false){
					checkItem(_canvas,mousePos,"onElement");
				}else{
					newArea.endPoint.x=mousePos.x;
					newArea.endPoint.y=mousePos.y;

				}



			}else if(e.type=="click"){
				if(clickSelection==false){
					//checkItem(_canvas,mousePos,"selection");

					if(!checkItem(_canvas,mousePos,"selection")){
						clickSelection= !clickSelection;
						newArea.startPoint.x=mousePos.x;
						newArea.startPoint.y=mousePos.y;
						newArea.endPoint.x=mousePos.x;
						newArea.endPoint.y=mousePos.y;
					}

				}else{
					clickSelection= !clickSelection;

					for(var i=2;i<grapElements.length;i++){

						if(grapElements[i].onElement==1){
							grapElements[i].selected=1;
							grapElements[i].onElement=0;
						}

					}



				}





			}else if(e.type=="keydown"){

				if(clickSelection==false){
					if(e.key=="Escape"&& e.code=="Escape"){
						for(var i=0;i<grapElements.length;i++){
							grapElements[i].selected=0;
						}
					}else if(e.key=="Delete"&& e.code=="Delete"){

						for(var i=0;i<grapElements.length;i++){

							if(grapElements[i].selected==1){

								grapElements.splice(i, 1);
								i--;
							}
						}
					}
				}


			}

			if (clickSelection){
				newArea.draw();
				checkClickedAreaItem(_canvas,newArea)

			}

			for(var i=0;i<grapElements.length;i++){

				grapElements[i].draw();


			}


			if(_canvas.currentPosX<= _canvas.width&&_canvas.currentPosY<=_canvas.height){
				newcur.position.x=_canvas.currentPosX;
				newcur.position.y=_canvas.currentPosY;
			}
				newcur.draw();



		}
		////////////////////////////////////////////////////////////////
		canvas.addEventListener('mouseenter', function(evt) {

				eventHandler(evt);

		}, false);

		document.addEventListener('keydown',function(evt) {

				eventHandler(evt);

		},false);

		canvas.addEventListener('click',function(evt) {

				eventHandler(evt);

		},false);

		canvas.addEventListener('mousemove', function(evt) {

			eventHandler(evt);

		}, false);

	}
}
////////////////////////////////////////////////////////
class selectionArea{

	constructor(ctx,listId,x,y){

		this.ctx=ctx;
		this.listId=listId;

		this.startPoint={
			x:x,
			y:y
		};
		this.endPoint={
			x:x,
			y:y
		};
		this.width= this.endPoint.x -this.startPoint.x;
		this.height= this.endPoint.y -this.startPoint.y;


		this.fillStyle=null;
		this.position={
			x:x,
			y:y
		}
		this.width=4;
		this.lineWidth=1;
		this.strokeStyle = "black";

	}

	updatePoints(){
		this.width = this.endPoint.x-this.startPoint.x;
		this.height = this.endPoint.y-this.startPoint.y;
		if(this.startPoint.x<=this.endPoint.x){
			this.color="blue";
		}else{
			this.color="green";
		}


	}
	draw(){
		this.updatePoints();
		this.ctx.beginPath();
		this.ctx.globalAlpha=0.1;
		this.ctx.rect(this.startPoint.x,this.startPoint.y,this.width,this.height);
		this.ctx.fillStyle=this.color;
		this.ctx.fill();


		this.ctx.beginPath();
		this.ctx.globalAlpha=0.7;
		this.ctx.lineWidth=0.5;
		this.ctx.strokeStyle=this.color
		if(this.color=="green"){
			this.ctx.setLineDash([3,3]);
		}else{

			this.ctx.setLineDash([]);
		}

		this.ctx.rect(this.startPoint.x,this.startPoint.y,this.width,this.height);
		this.ctx.stroke();
		this.ctx.globalAlpha=1;
		this.ctx.setLineDash([]);
	}

}


//////////////////////////////////////////////////////////////////////////////

class Cursor {
	constructor(ctx,listId,x,y,color){
		this.ctx=ctx;
		this.listId=listId;
		this.fillStyle=color;
		this.position={
			x:x,
			y:y
		}
		this.width=4;
		this.lineWidth=1;
		this.strokeStyle = "black";

	}
	draw(){

		this.ctx.beginPath();
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.strokeStyle =this.strokeStyle;

		this.ctx.rect(this.position.x-this.width/2, this.position.y-this.width/2,this.width, this.width);

		this.ctx.moveTo(this.position.x+this.width/2, this.position.y);
		this.ctx.lineTo(this.position.x+15+this.width/2, this.position.y);

		this.ctx.moveTo(this.position.x-this.width/2, this.position.y);
		this.ctx.lineTo(this.position.x-15-this.width/2, this.position.y);

		this.ctx.moveTo(this.position.x, this.position.y+this.width/2);
		this.ctx.lineTo(this.position.x, this.position.y+15+this.width/2);

		this.ctx.moveTo(this.position.x, this.position.y-this.width/2);
		this.ctx.lineTo(this.position.x, this.position.y-15-this.width/2);

		this.ctx.stroke();
	}





}



class Text {
	constructor(ctx,listId,x,y,color,txt){
		this.ctx=ctx;
		this.listId=listId;
		this.selected=0;
		this.onElement=0;
		this.fillStyle=color;
		this.fontFamily='Calibri';
		this.fontSize=10;
		this.font=this.fontSize+'px '+this.fontFamily;
		this.textAlign = 'left';
		this.textBaseline = 'top';
		this.txt=txt;
		this.startPoint={
			x:x,
			y:y
		}
		this.endPoint={
			x:this.startPoint.x+ Math.trunc( this.ctx.measureText(this.txt).width),
			y:this.startPoint.y+Math.trunc(this.ctx.measureText('M').width)

		}

		this.ctx.textAlign = this.textAlign
		this.ctx.textBaseline = this.textBaseline; // important!
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.font=this.font;
		this.name ="Text"+grapElement.getElementId("Text");
		this.draw();

	}
	updatePoints(){
		this.ctx.font = this.fontSize+'px '+this.fontFamily;
		this.endPoint.x=this.startPoint.x+ Math.trunc( this.ctx.measureText(this.txt).width);
		this.endPoint.y=this.startPoint.y+Math.trunc(this.ctx.measureText('M').width);

	}

	draw(){
		this.updatePoints();

		if (this.selected==1){

		this.ctx.fillStyle = this.color;
	    this.ctx.fillRect(this.startPoint.x-2, this.startPoint.y-2, 4,4);
		this.ctx.fillRect(this.endPoint.x-2, this.endPoint.y-2, 4,4);


		}else if(this.onElement==1){

			this.ctx.font = (this.fontSize+1)+'px '+this.fontFamily;

		}else{
			this.ctx.font = this.fontSize+'px '+this.fontFamily;
		}

		this.ctx.textAlign = this.textAlign
		this.ctx.textBaseline = this.textBaseline; // important!
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.fillText(this.txt,this.startPoint.x,this.startPoint.y);

	}
	isTextHover(posx,posy){

		this.updatePoints();
		if(posx > this.startPoint.x && posx < this.endPoint.x &&posy>this.startPoint.y&&posy<this.endPoint.y){

			return true
		}else{
			return false
		}

	}

}

/////////////////////////////////////////////////////////////////////////
class Line {
	constructor(ctx,listId,x1,y1,x2,y2,color) {
		this.ctx = ctx;
		this.listId = listId;
		this.selected=0;
		this.onElement=0;
		this.startPoint={
			x:x1,
			y:y1
		};
		this.endPoint={
			x:x2,
			y:y2
		};
		this.midPoint={
			x:Math.round(Math.abs(this.startPoint.x-this.endPoint.x)/2)+this.startPoint.x,
			y:Math.round(Math.abs(this.startPoint.y-this.endPoint.y)/2)+this.startPoint.y
		};

		this.lenght= Math.sqrt(Math.pow(Math.abs(this.x2-this.x1),2)+Math.pow(Math.abs(this.y2-this.y1),2));
		this.color = color;
		this.Path=null;
		this.LineWidth=1.5;
		this.draw();
		this.reportPerimeter();
		this.name ="Line"+grapElement.getElementId("Line");
	}

	updatePoints(){
		this.midPoint={
			x:Math.round(Math.abs(this.startPoint.x-this.endPoint.x)/2)+this.startPoint.x,
			y:Math.round(Math.abs(this.startPoint.y-this.endPoint.y)/2)+this.startPoint.y
		};

	}

	draw() {
		this.updatePoints();
		this.ctx.strokeStyle = this.color;
		this.ctx.fillStyle = this.color;
		this.Path=new Path2D();

		this.Path.moveTo(this.startPoint.x, this.startPoint.y);
		this.Path.lineTo(this.endPoint.x , this.endPoint.y);

		if (this.selected==1){
			this.ctx.lineWidth = this.LineWidth;

			this.ctx.fillRect(this.startPoint.x-2*this.LineWidth, this.startPoint.y-2*this.LineWidth, this.LineWidth*4, this.LineWidth*4);
			this.ctx.fillRect(this.midPoint.x-2*this.LineWidth, this.midPoint.y-2*this.LineWidth, this.LineWidth*4, this.LineWidth*4);
			this.ctx.fillRect(this.endPoint.x-2*this.LineWidth, this.endPoint.y-2*this.LineWidth, this.LineWidth*4, this.LineWidth*4);
		}else if (this.onElement==1){
			this.ctx.lineWidth = this.LineWidth+1;
		}else{
			this.ctx.lineWidth = this.LineWidth;
		}

		this.ctx.stroke(this.Path);

	}
	checkPointsInRect(rectangle){
		let rx= rectangle.x;
		let ry = rectangle.y;
		let rw= rectangle.w;
		let rh= rectangle.h;

		let p1InRect = isPointInRect(rx,rx+rw,ry,ry+rh,this.startPoint.x,this.startPoint.y);
		let p2InRect = isPointInRect(rx,rx+rw,ry,ry+rh,this.endPoint.x,this.endPoint.y);


		if (p1InRect && p2InRect){
			return true;
		}
		return false;


	}


	 checkcollusionWithRect(rectangle){

		let x1 = this.startPoint.x;      // points for line (controlled by mouse)
		let y1 = this.startPoint.y;
		let x2 = this.endPoint.x;      // static point
		let y2 = this.endPoint.y;
		let rx= rectangle.x;
		let ry = rectangle.y;
		let rw= rectangle.w;
		let rh= rectangle.h;

		let left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
		let right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
		let top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
		let bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

		let inside=  isPointInRect(rx,rx+rw,ry,ry+rh,x1,y1)&& isPointInRect(rx,rx+rw,ry,ry+rh,x2,y2);


	if (left || right || top || bottom|| inside) {
		return true;
	}
	return false;

}

	reportPerimeter() {
		let listItem = document.createElement('li');
		listItem.textContent = `${this.name} perimeter is ${this.lenght}px.`
		let list = document.getElementById(this.listId);
		list.appendChild(listItem);
	}


}
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
class Circle {
  constructor(ctx, listId, radius, x, y, color) {
    this.ctx = ctx;
    this.listId = listId;
	this.selected=0;
	this.onElement=0;
    this.radius = radius;

	this.center={
		x:x,
		y:y
	};
	this.quadrant1={};
	this.quadrant2={};
	this.quadrant3={};
	this.quadrant4={};
	this.updatePoints();
	this.circumference= Math.round(2 * Math.PI * this.radius);
	this.area=Math.round(Math.PI * (this.radius * this.radius));
    this.color = color;
	this.Path=null;
	this.LineWidth=1.5;
	this.draw();
	this. reportArea();
	this.reportPerimeter();
	this.name ="Circle"+grapElement.getElementId("Circle");

  }

  updatePoints(){

	this.quadrant1={
		x:this.center.x,
		y:this.center.y-this.radius
	};
	this.quadrant2={
		x:this.center.x-this.radius,
		y:this.center.y
	};
	this.quadrant3={
		x:this.center.x,
		y:this.center.y+this.radius
	};
	this.quadrant4={
		x:this.center.x+this.radius,
		y:this.center.y
	};

  }


  draw() {

	this.updatePoints();
	this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
	this.Path=new Path2D();
    this.Path.arc(this.center.x, this.center.y, this.radius, degToRad(0), degToRad(360), false);

	if (this.selected==1){
		this.ctx.lineWidth = this.LineWidth;

		this.ctx.fillRect(this.center.x-2*this.LineWidth, this.center.y-2*this.LineWidth, this.LineWidth*4, this.LineWidth*4);
		this.ctx.fillRect(this.quadrant1.x-2*this.LineWidth, this.quadrant1.y-2*this.LineWidth, this.LineWidth*4, this.LineWidth*4);
		this.ctx.fillRect(this.quadrant2.x-2*this.LineWidth, this.quadrant2.y-2*this.LineWidth, this.LineWidth*4, this.LineWidth*4);
		this.ctx.fillRect(this.quadrant3.x-2*this.LineWidth, this.quadrant3.y-2*this.LineWidth, this.LineWidth*4, this.LineWidth*4);
		this.ctx.fillRect(this.quadrant4.x-2*this.LineWidth, this.quadrant4.y-2*this.LineWidth, this.LineWidth*4, this.LineWidth*4);


	}else if (this.onElement==1){

		this.ctx.lineWidth = this.LineWidth+1;

	}else{

		this.ctx.lineWidth = this.LineWidth;
	}


	this.ctx.stroke(this.Path);
  }

	checkPointsInRect(rectangle){

		let rx= rectangle.x;
		let ry = rectangle.y;
		let rw= rectangle.w;
		let rh= rectangle.h;
		let p1InRect = isPointInRect(rx,rx+rw,ry,ry+rh,this.quadrant1.x,this.quadrant1.y);
		let p2InRect = isPointInRect(rx,rx+rw,ry,ry+rh,this.quadrant2.x,this.quadrant2.y);
		let p3InRect = isPointInRect(rx,rx+rw,ry,ry+rh,this.quadrant3.x,this.quadrant3.y);
		let p4InRect = isPointInRect(rx,rx+rw,ry,ry+rh,this.quadrant4.x,this.quadrant4.y);

		if (p1InRect && p2InRect && p3InRect && p4InRect){
			return true;
		}
		return false;


	}


  checkcollusionWithRect(rectangle){

	let cx=this.center.x
	let cy=this.center.y
	let r =this.radius ;
	let rx= rectangle.x;
	let ry = rectangle.y;
	let rw= rectangle.w;
	let rh= rectangle.h;
	let testX = this.center.x;
	let testY = this.center.y;



	if (cx < rx)
	{
		testX = rx;
	}
	else if (cx > rx+rw)
	{
		testX = rx+rw;
	}
	if (cy < ry)
	{
		testY = ry;
	}
	else if (cy > ry+rh)
	{
		testY = ry+rh;
	}




	let distX = cx-testX;
	let distY = cy-testY;
	let distance = Math.sqrt( (distX*distX) + (distY*distY) );

	let d1= Math.sqrt( ((cx-rx)*(cx-rx)) + ((cy-ry)*(cy-ry)) );
	let d2= Math.sqrt( ((cx-rx-rw)*(cx-rx-rw)) + ((cy-ry)*(cy-ry)) );
	let d3= Math.sqrt( ((cx-rx)*(cx-rx)) + ( (cy-ry-rh)* (cy-ry-rh)) );
	let d4= Math.sqrt( ((cx-rx-rw)*(cx-rx-rw)) + ((cy-ry-rh)*(cy-ry-rh)) );


	if (d1<r && d2<r && d3<r && d4<r ){

		return false;

	}



	if (distance <= r) {
		return true;
	}
		return false;
  }

  reportArea() {
    let listItem = document.createElement('li');
    listItem.textContent = `${this.name} area is ${Math.round(Math.PI * (this.radius * this.radius))}px squared.`

    let list = document.getElementById(this.listId);
    list.appendChild(listItem);
  }

  reportPerimeter() {
    let listItem = document.createElement('li');
    listItem.textContent = `${this.name} circumference is ${Math.round(2 * Math.PI * this.radius)}px.`

    let list = document.getElementById(this.listId);
    list.appendChild(listItem);
  }
}



// create the canvas and reporting list

let myCanvas = new Canvas('myCanvas', document.body, 1250, 580);
myCanvas.create();
myCanvas.createReportList();
//myCanvas.writeMessage('Mouse positions: ',1100,570);
let mytext=new Text(myCanvas.ctx, myCanvas.listId,30,30,'blue','hello world')
grapElements.push(mytext);

let newcur= new Cursor(myCanvas.ctx,myCanvas.listId,625,290);
//grapElements.push(newcur);
newcur.draw();
let newArea= new selectionArea(myCanvas.ctx,myCanvas.listId,0,0)

let line1= new Line(myCanvas.ctx, myCanvas.listId,0,0,200,200,'blue');
grapElements.push(line1);

let line2= new Line(myCanvas.ctx, myCanvas.listId,300,300,450,450,'red');
grapElements.push(line2);

let circle1 = new Circle(myCanvas.ctx, myCanvas.listId, 75, 200, 100, 'green');
grapElements.push(circle1);

Canvas.events(myCanvas);

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

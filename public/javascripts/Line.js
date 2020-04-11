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

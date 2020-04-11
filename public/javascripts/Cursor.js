class Cursor {
	constructor(ctx,listId,x,y,color){
		this.ctx=ctx;
		this.listId=listId;
		this.fillStyle=color;
		this.position={
			x:x,
			y:y
		}
		this.width=6;
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

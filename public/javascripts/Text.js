class Text {
	constructor(ctx,listId,x,y,color,text){
		this.ctx=ctx;
		this.listId=listId;
		this.selected=false;
		this.onElement=false;
		this.fillStyle=color;
		this.fontFamily='Calibri';
		this.fontSize=10;
		this.font=this.fontSize+'px '+this.fontFamily;
		this.textAlign = 'left';
		this.textBaseline = 'top';
		this.text=text;
		this.startPoint={
			x:x,
			y:y
		}
		this.endPoint={
			x:this.startPoint.x+ Math.trunc( this.ctx.measureText(this.text).width),
			y:this.startPoint.y+Math.trunc(this.ctx.measureText('M').width)

		}

		this.ctx.textAlign = this.textAlign
		this.ctx.textBaseline = this.textBaseline; // important!
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.font=this.font;
		this.name ="Text"   //+grapElement.getElementId("Text");
		this.draw();

	}
	updatePoints(){
		this.ctx.font = this.fontSize+'px '+this.fontFamily;
		this.endPoint.x=this.startPoint.x+ Math.trunc( this.ctx.measureText(this.txt).width);
		this.endPoint.y=this.startPoint.y+Math.trunc(this.ctx.measureText('M').width);

	}

  draw(){
    this.updatePoints();

		if (this.selected==true){
		    this.ctx.fillStyle = this.color;
	      this.ctx.fillRect(this.startPoint.x-2, this.startPoint.y-2, 4,4);
		    this.ctx.fillRect(this.endPoint.x-2, this.endPoint.y-2, 4,4);


		}else if(this.onElement==true){

			this.ctx.font = (this.fontSize+1)+'px '+this.fontFamily;

		}else{
			this.ctx.font = this.fontSize+'px '+this.fontFamily;
		}

		this.ctx.textAlign = this.textAlign
		this.ctx.textBaseline = this.textBaseline; // important!
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.fillText(this.text,this.startPoint.x,this.startPoint.y);

	}
	checkcollusionWithRect(rectangle){

    let rx = rectangle.x;
    let ry = rectangle.y;
    let rw = rectangle.w;
    let rh = rectangle.h;

		let tx = this.startPoint.x;
		let ty = this.startPoint.y;
		let tw = this.endPoint.x-this.startPoint.x;
		let th = this.endPoint.y-this.startPoint.y;

  if (rx + rw >= tx &&    // r1 right edge past r2 left
      rx <= tx + tw &&    // r1 left edge past r2 right
      ry + rh >= ty &&    // r1 top edge past r2 bottom
      ry <= ty + th) {    // r1 bottom edge past r2 top
        return true;
  }
  return false;
  }
}

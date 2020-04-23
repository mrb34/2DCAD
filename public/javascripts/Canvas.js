class Canvas {
	constructor(_id, parent, width, height) {

		this.id = _id;
		this.listId = null;
		this.parent = parent;
		this.width = width;
		this.height = height;
		this.ctx = null;

		//this.textLenght=0;
		//this.currentPosX=0;
		//this.currentPosY=0;

	}


////////////////////////////////////////////////////////////////////////////////
	create() {
		if(this.ctx !== null) {
			console.log('Canvas already created!');
			return;
		}else{
			let divWrapper = document.createElement('div');
			let canvasElem = document.createElement('canvas');

			this.parent.appendChild(divWrapper);
			divWrapper.appendChild(canvasElem);
			divWrapper.id = this.id+"div";
			canvasElem.width = this.width;
			canvasElem.height = this.height;
			canvasElem.classList.add("cursorClass");
			canvasElem.id=this.id;

			this.ctx = canvasElem.getContext('2d');

			//let postext=new Text(this.ctx, this.listId,this.width-150,this.height-15,'blue','Mouse Position : ')
		//	postext.fontSize=13;
		//	grapElements.push(postext);

		}
	}
////////////////////////////////////////////////////////////////////////////////
clear(){
	this.ctx.clearRect(0,0,this.width,this.height);
}
////////////////////////////////////////////////////////////////////////////////
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
	//////////////////////////////////////////////////////////////////////////////


}

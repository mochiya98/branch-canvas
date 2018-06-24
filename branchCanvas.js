branchCanvas = function(opts){
	let self = this;
	if(!opts)opts = {};
	if(!opts.container)throw "!opts.container";
	if(!opts.data)throw "!opts.data";
	opts.dtFontSize = opts.dtFontSize ? opts.dtFontSize : 11;
	opts.textFontSize = opts.textFontSize ? opts.textFontSize : 15;
	self.radius = opts.radius ? opts.radius : 13;
	self.margin = opts.margin ? opts.margin : 10;
	self.font = opts.font ? opts.font : "Meiryo,Koruri,Arial";
	self.dtFontSize =
		typeof opts.dtFontSize === "number" ? opts.dtFontSize + "px" : opts.dtFontSize;
	self.textFontSize =
		typeof opts.textFontSize === "number" ? opts.textFontSize + "px" : opts.textFontSize;
	self.data = opts.data;
	self.canvas = opts.container.appendChild(document.createElement("canvas"));
	self.ctx = self.canvas.getContext("2d");
	self.canvas.height = self.draw();
};
branchCanvas.prototype._calcBx = function(depth){
	return this.margin + (this.radius * 2) * depth - this.radius;
};
branchCanvas.prototype.draw = function(){
	let self = this;
	let bd = null;
	let by = -self.radius;
	let maxDepth = Math.max(...self.data.map(c=>c.depth));
	let depthSy = [...new Array(maxDepth)].map(c=>null);
	self.ctx.textBaseline = "top";
	self.ctx.beginPath();
	for(let i = 0, l = self.data.length; i < l; i++){
		let commit = self.data[i];
		let bx = self._calcBx(commit.depth);
		by += (self.radius + self.margin / 2) * 2;
		if(bd !== null && bd !== commit.depth){
			let xs;
			if(bd < commit.depth){
				xs = bx - (self.radius * 2);
			}else{
				xs = bx + (self.radius * 2);
				depthSy[commit.depth] = null;
			}
			self.ctx.moveTo(xs, by - self.margin - self.radius);
			self.ctx.bezierCurveTo(
				xs, by - self.radius + self.margin,
				bx, by - self.radius - self.margin,
				bx, by - self.radius + self.margin
			);
			by += self.margin;
		}
		if(depthSy[commit.depth - 1] !== null){
			self.ctx.moveTo(bx, depthSy[commit.depth - 1]);
			self.ctx.lineTo(bx, by - self.radius);
		}
		self.ctx.moveTo(bx + self.radius, by);
		self.ctx.arc(bx, by, self.radius, 0, 2 * Math.PI, false);
		self.ctx.font = self.dtFontSize + " " + self.font;
		self.ctx.fillStyle = "#888";
		self.ctx.fillText(commit.datetime, self._calcBx(maxDepth) + self.radius + self.margin, by - self.radius);
		self.ctx.font = self.textFontSize + " " + self.font;
		self.ctx.fillStyle = "#333";
		self.ctx.fillText(commit.text, self._calcBx(maxDepth) + self.radius + self.margin, by - self.radius + 13);
		
		bd = commit.depth;
		depthSy[commit.depth - 1] = by + self.radius;
	}
	self.ctx.stroke();
	return by + self.radius + self.margin;
};

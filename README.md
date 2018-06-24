# branch-canvas
draw commit-tree
## how to use
```html
<div id="canv_container"></div>
<script src="branchCanvas.min.js"></script>
```
```javascript
let bc=new branchCanvas({
	container:document.getElementById("canv_container"),
	data:[
		{depth:1,datetime:"2018/03/01 03:12:31",text:"[HEAD]0.1.0"},
		{depth:1,datetime:"2018/03/01 03:12:31",text:"merge pull request #2"},
		{depth:2,datetime:"2018/03/01 03:12:31",text:"fix #3"},
		{depth:2,datetime:"2018/03/01 03:12:31",text:"fix #4"},
		{depth:3,datetime:"2018/03/01 03:12:31",text:"update Modules"},
		{depth:2,datetime:"2018/03/01 03:12:31",text:"fix typo"},
		{depth:1,datetime:"2018/03/01 03:12:31",text:"merge pull request #1"},
		{depth:2,datetime:"2018/03/01 03:12:31",text:"test commit"},
		{depth:1,datetime:"2018/03/01 03:12:31",text:"initial commit"},
	],
});
bc.canvas.width=400;
bc.draw();
```
![example result](https://i.imgur.com/3f2Mirr.png)
## options
```javascript
let bc=new branchCanvas({
	container:canv_container,//HTMLElement
	font:"Meiryo,Arial",//string
	dtFontSize:11,//string or number(px)
	textFontSize:15,//string or number(px)
	radius:13,//number
	margin:10,//number
	data:[
		{depth:1,datetime:"2018/03/01 03:12:31",text:"commit"},
	],
});
bc.canvas.width=400;
bc.draw();
```

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 2

autoCanvasSize(canvas);



/*******/ 
listenToUser(canvas);

/******/
download.onclick = function() {
	var url = canvas.toDataURL("image/png");
	var a = document.createElement('a');
	document.body.appendChild(a);
	a.href = url;
	a.download = '我的画';
	a.target = "_blank";
	a.click();

}

clear.onclick = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

thin.onclick = function() {
	lineWidth = 2
}
middle.onclick = function() {
	lineWidth = 4
}
thick.onclick = function() {
	lineWidth = 6
}
black.onclick = function() {
	context.strokeStyle = 'black';
	black.classList.add('active');
	yellow.classList.remove('active');
	blue.classList.remove('active');
	red.classList.remove('active');
}
red.onclick = function() {
	context.strokeStyle = 'red';
	red.classList.add('active');
	yellow.classList.remove('active');
	blue.classList.remove('active');
	black.classList.remove('active');
}
yellow.onclick = function() {
	context.strokeStyle = 'yellow';
	yellow.classList.add('active');
	red.classList.remove('active');
	blue.classList.remove('active');
	black.classList.remove('active');
}
blue.onclick = function() {
	context.strokeStyle = 'blue';
	blue.classList.add('active');
	red.classList.remove('active');
	yellow.classList.remove('active');
	black.classList.remove('active');
}

var eraserEnabled = false;
pen.onclick = function () {
	eraserEnabled = false;
	pen.classList.add('active');
	eraser.classList.remove('active');
}
eraser.onclick = function() {
	eraserEnabled = true;
	eraser.classList.add('active');
	pen.classList.remove('active');
}
/******/

function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineWidth = lineWidth;
	context.lineTo(x2, y2);
	context.stroke();
	context.closePath();
}


function autoCanvasSize(canvas) {
	setCanvasSize();

	window.onresize = function() {
		setCanvasSize();
	}

	function setCanvasSize() {
		var pageWidth = document.documentElement.clientWidth;
		var pageHeight = document.documentElement.clientHeight;
		canvas.width = pageWidth;
		canvas.height = pageHeight;
	}
}

function listenToUser(canvas) {

	var using = false;
	var lastPoint = {x: undefined, y: undefined};
		//特性检测
	if(document.body.ontouchstart !== undefined) {
		//触屏设备
		canvas.ontouchstart = function(xyz) {
			var x = xyz.touches[0].clientX;
			var y = xyz.touches[0].clientY;
			using = true;
			if (eraserEnabled) {
				context.clearRect(x - 5, y - 5, 10, 10);
			}else {
				lastPoint = {"x": x, "y": y};
			}
		}
		canvas.ontouchmove = function(xyz) {
			var x = xyz.touches[0].clientX;
			var y = xyz.touches[0].clientY;
			if (!using) {return}
			if (eraserEnabled) {
				context.clearRect(x - 5, y - 5, 10, 10);
			}else {
				var newPoint = {"x": x, "y": y};
				drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
				lastPoint = newPoint;
			}
		}
		canvas.ontouchend = function(xyz) {
			using = false;
		}
	}else{
		//非触屏设备
		canvas.onmousedown = function(xyz) {
		var x = xyz.clientX;
		var y = xyz.clientY;
		using = true;
		if (eraserEnabled) {
			context.clearRect(x - 5, y - 5, 10, 10);
		}else {
			lastPoint = {"x": x, "y": y};
		}
	}

	canvas.onmousemove = function(xyz) {
		var x = xyz.clientX;
		var y = xyz.clientY;
		if (!using) {return}
		if (eraserEnabled) {
			context.clearRect(x - 5, y - 5, 10, 10);
		}else {
			var newPoint = {"x": x, "y": y};
			drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
			lastPoint = newPoint;
		}
	}
	canvas.onmouseup = function(xyz) {
		using = false;
	}
	}
}
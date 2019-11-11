// celestialMap.js

// an object of the game

// stores every CP that the ship visits
// stores every CO that the ship encounters

function CelestialMap(xSize, ySize, canvas)
{
	storeCP = function(x, y)
	{
		// gets ship location from canvas, store in visited[]
	}
	storeCO = function(co, radius)
	{
		// invoked by sensor
		// gets ship location from canvas, stores in visited[]
		// makes the CO visible on map
	}
	getCOatCP = function(x, y)
	{
		// returns name of artifact at (x,y);
	}
	getMap = function()
	{
		// returns an array of (coordinate, artifact);
	}

	space = function(xSize, ySize, canvas)
	{
		this.xSize = xSize;
		this.ySize = ySize;
		if(xSize == ySize)
			this.size = xSize;
		else
			this.size = 0;
		this.point = size/32;

		var ctx = canvas.getContext("2d");
		var grd = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
		grd.addColorStop(0, "grey");
		grd.addColorStop(1, "black");

		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, size, size); 

		ctx.strokeStyle = "grey";
		ctx.lineWidth = 0.5;
		for(var i = point; i < size; i+=point)
		{
			ctx.moveTo(i, 0);
			ctx.lineTo(i, size);
			ctx.stroke(); 
		}
		for(var i = point; i < size; i+=point)
		{
			ctx.moveTo(0, i);
			ctx.lineTo(size, i);
			ctx.stroke(); 
		}
	}

	planet = function(xPos, yPos, name, color, visible, canvas)
	{
		this.xPos = xPos;
		this.yPos = yPos;
		this.name = name;
		this.visible = visible;
		this.color = color;

		var innerRadius = 4;
		var outerRadius = 16;
		var radius = 16;
		var ctx = canvas.getContext("2d");
		var grd = ctx.createRadialGradient(xPos, yPos, innerRadius, xPos, yPos, outerRadius);

		if(this.visible == true)
		{
			grd.addColorStop(0, color);
			grd.addColorStop(1, "black");
			ctx.beginPath();
			ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.fillStyle = grd;
			ctx.fill();
			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.fillText(this.name, xPos, yPos);
		}
	}

	CelestialMap.prototype.drawSpace = function()
	{
		space(xSize, ySize, canvas);
	}
	CelestialMap.prototype.drawPlanets = function()
	{
		planet(128, 96, "xeon", "blue", true, canvas);
		planet(0, 0, "moon", "pink", true, canvas);
		planet(32, 32, "eniac", "orange", true, canvas);
		planet(372, 160, "celeron", "yellow", true, canvas);
		planet(16, 496, "ryzen", "red", true, canvas);
		planet(256, 480, "pentium1", "purple", true, canvas);
		planet(256, 480, "pentium2", "purple", false, canvas);
		planet(256, 480, "pentium3", "purple", false, canvas);
		planet(256, 480, "pentium4", "purple", false, canvas);
		planet(256, 480, "pentium5", "purple", false, canvas);
		planet(256, 480, "pentium6", "purple", false, canvas);
		planet(256, 480, "pentium7", "purple", false, canvas);
	}
}

/*
// draw a rect
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);

var game = document.getElementById("theCanvas");
var space = game.getContext('2d');
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);

// draw a line
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke(); 

// draw a circle
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

// space
var game = document.getElementById("theCanvas");
var space = game.getContext("2d");
var grd = space.createRadialGradient(256, 256, 0, 256, 256, 256);
grd.addColorStop(0, "grey");
grd.addColorStop(1, "black");
// Fill with gradient
space.fillStyle = grd;
space.fillRect(0, 0, 512, 512); 

// planet
var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
var grd = ctx.createRadialGradient(256, 256, 5, 256, 256, 70);
grd.addColorStop(0, "grey");
grd.addColorStop(1, "black");
ctx.arc(256, 256, 60, 0, 2 * Math.PI);

ctx.fillStyle = grd;
ctx.fill();
*/
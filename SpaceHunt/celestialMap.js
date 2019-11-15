function Point(xPos, yPos)
{
	this.xPos = xPos;
	this.yPos = yPos;

	return this;
}

function Space(xSize, ySize)
{
	this.xSize = xSize;
	this.ySize = ySize;
	this.size = 0;
	if(xSize == ySize)
		this.size = xSize;

	this.step = this.size/128;

	return this;
}

function Artifact(xPos, yPos, name, color, visible)
{
	this.xPos = xPos;
	this.yPos = yPos;
	this.name = name;
	this.color = color;
	this.visible = visible;

	return this;
}

Artifact.prototype.show = function()
{
	this.visible = true;
}

function Ship(xPos, yPos, energy, supplies)
{
	this.xPos = xPos;
	this.yPos = yPos;
	this.energy = energy;
	this.supplies = supplies;

	return this;
}

function SpaceHunt(canvas, cheat, xStart, yStart, energy, supplies)
{
	this.angle = 0;
	this.canvas = canvas;
	this.cheat = cheat;
	this.space = new Space(canvas.width, canvas.height);
	this.ship = new Ship(xStart, yStart, energy, supplies);
	this.artifactSet = new Array();
	this.visitedPoints = new Array();

	this.artifactSet.push(new Artifact(64, 64, "eniac", "orange", true));
	this.artifactSet.push(new Artifact(0, 0, "moon", "white", true));
	this.artifactSet.push(new Artifact(256, 128, "celeron", "yellow", true));
	this.artifactSet.push(new Artifact(512, 256, "ryzen", "red", true));
	this.artifactSet.push(new Artifact(576, 576, "xeon", "blue", true));

	if(cheat)
	{
		this.artifactSet.push(new Artifact(704, 704, "pentium 1", "purple", true));
		this.artifactSet.push(new Artifact(640, 768, "pentium 2", "purple", true));
		this.artifactSet.push(new Artifact(640, 960, "pentium 3", "purple", true));
		this.artifactSet.push(new Artifact(768, 640, "pentium 4", "purple", true));
		this.artifactSet.push(new Artifact(768, 832, "pentium 5", "purple", true));
		this.artifactSet.push(new Artifact(832, 896, "pentium 6", "purple", true));
		this.artifactSet.push(new Artifact(832, 768, "pentium 7", "purple", true));
		this.artifactSet.push(new Artifact(350, 350, "asteroid 1", "grey", true));
		this.artifactSet.push(new Artifact(150, 450, "asteroid 2", "grey", true));
		this.artifactSet.push(new Artifact(650, 650, "asteroid 3", "grey", true));
		this.artifactSet.push(new Artifact(600, 70, "asteroid 4", "grey", true));
	}
	else
	{
		this.artifactSet.push(new Artifact(118, 700, "pentium 1", "purple", false));
		this.artifactSet.push(new Artifact(128, 600, "pentium 2", "purple", false));
		this.artifactSet.push(new Artifact(186, 650, "pentium 3", "purple", false));
		this.artifactSet.push(new Artifact(200, 700, "pentium 4", "purple", false));
		this.artifactSet.push(new Artifact(220, 550, "pentium 6", "purple", false));
		this.artifactSet.push(new Artifact(190, 525, "pentium 5", "purple", false));
		this.artifactSet.push(new Artifact(240, 625, "pentium 7", "purple", false));
		this.artifactSet.push(new Artifact(350, 350, "asteroid 1", "grey", false));
		this.artifactSet.push(new Artifact(150, 450, "asteroid 2", "grey", false));
		this.artifactSet.push(new Artifact(650, 650, "asteroid 3", "grey", false));
		this.artifactSet.push(new Artifact(600, 70, "asteroid 4", "grey", false));
	}

}

SpaceHunt.prototype.show = function(name)
{
	// searches through artifactSet[] and sets the artifact to visible
	for(var i = 0; i < this.artifactSet.length; i++)
	{
		if(this.artifactSet[i].name == name)
		{
			this.artifactSet[i].visible = true;
			return;
		}
	}
}

SpaceHunt.prototype.mark = function(xPos, yPos)
{
	this.visitedPoints.push(new Point(xPos, yPos));
}


SpaceHunt.prototype.drawSpace = function()
{
	var ctx = this.canvas.getContext("2d");
	var grd = ctx.createRadialGradient(this.space.size/2, this.space.size/2, 0, this.space.size/2, this.space.size/2, this.space.size/2);
	grd.addColorStop(0, "#504D4C");
	grd.addColorStop(1, "black");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, this.space.size, this.space.size); 

	ctx.strokeStyle = "#572C23";
	ctx.lineWidth = 0.5;
	/*for(var i = 0; i < this.space.size; i+=this.space.step)
	{
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, this.space.size);
		ctx.closePath();
		ctx.stroke(); 
	}
	for(var i = 0; i < this.space.size; i+=this.space.step)
	{
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(this.space.size, i);
		ctx.closePath();
		ctx.stroke(); 
	}*/
	for(var i = 0; i < this.space.size; i+= 8 *this.space.step)
	{
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, this.space.size);
		ctx.closePath();
		ctx.stroke(); 
	}
	for(var i = 0; i < this.space.size; i+= 8 * this.space.step)
	{
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(this.space.size, i);
		ctx.closePath();
		ctx.stroke(); 
	}

/*
	ctx.strokeStyle = "white";
	for(var i = 100 * Math.random(); i < this.space.size; i+= (20 * this.space.step * Math.random()))
	{
		for(var j = this.space.step; j < this.space.size; j+= (20 * this.space.step * Math.random()))
		{
			ctx.beginPath();
			ctx.moveTo(i, j);
			ctx.lineTo(i+3, j+3);
			ctx.stroke(); 
			ctx.closePath();
		}
	}
*/	
}

SpaceHunt.prototype.drawArtifactSet = function()
{
	for(var i = 0; i < this.artifactSet.length; i++)
	{
		this.drawArtifact(this.artifactSet[i]);
	}
}

SpaceHunt.prototype.drawArtifact = function(artifact)
{
	if(artifact.visible == true)
	{
		var ctx = this.canvas.getContext("2d");

		if(artifact.name == "meteor shower")
		{

		}
		else if(artifact.name == "black hole")
		{

		}
		else if(artifact.name.startsWith("asteroid"))
		{
			var innerRadius = 6;
			var outerRadius = 16;
			var radius = 6; 
			var grd = ctx.createRadialGradient(artifact.xPos, artifact.yPos, innerRadius, artifact.xPos, artifact.yPos, outerRadius);
			grd.addColorStop(0, artifact.color);
			grd.addColorStop(1, "black");

			ctx.beginPath();
			ctx.ellipse(artifact.xPos, artifact.yPos, innerRadius, outerRadius, Math.random()*Math.PI, 0, 2*Math.PI);
			ctx.closePath();
			ctx.strokeStyle = "silver";
			ctx.stroke();	
			ctx.fillStyle = grd;
			ctx.fill();
		}
		else // it's a planet
		{
			var innerRadius = 0;
			var outerRadius = 18 + 8 * Math.abs(Math.cos(this.angle));
			var radius = 24; 

			var grd = ctx.createRadialGradient(artifact.xPos, artifact.yPos, innerRadius, artifact.xPos, artifact.yPos, outerRadius);
			grd.addColorStop(0, artifact.color);
			grd.addColorStop(1, "black");

			ctx.beginPath();
			ctx.arc(artifact.xPos, artifact.yPos, radius, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.fillStyle = grd;
			ctx.fill();
			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.fillText(artifact.name, artifact.xPos, artifact.yPos);
		}
		this.angle += Math.PI / 1600;
	}
}

SpaceHunt.prototype.drawTrail = function()
{
	var ctx = this.canvas.getContext("2d");
	ctx.strokeStyle = " #f9e79f";


	for(var i = 0; i < this.visitedPoints.length - 1; i++)
	{
		ctx.beginPath();
		ctx.moveTo(this.visitedPoints[i].xPos, this.visitedPoints[i].yPos);
		ctx.lineTo(this.visitedPoints[i+1].xPos, this.visitedPoints[i+1].yPos);
		ctx.closePath();
		ctx.stroke(); 
	}
	ctx.closePath();
}

SpaceHunt.prototype.draw = function()
{
	this.drawSpace();
	this.drawArtifactSet();
	this.drawTrail();
}


function animate()
{
	// draw everything
	spaceHunt.draw();
	// all the time
	requestAnimationFrame(animate);
}

function play()
{
	// button press calculates from input and calls 
	// ship.move(to xPos, and yPos)

	// ship.mark(its xPos, and yPos)	
	// ship.loseTurn()
	// check if xPos and yPos have an artifact around
	// if on xPos, yPos - damage

	// button press to use sensor 
	// ship.sensor(spaceHunt.artifactSet)




	// what should be will be drawn and animated again, and again and ag
	animate();

	// check supplies, gameOver = true if out 
}


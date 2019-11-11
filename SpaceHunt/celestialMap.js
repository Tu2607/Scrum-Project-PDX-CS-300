function Space(xSize, ySize)
{
	this.xSize = xSize;
	this.ySize = ySize;
	this.size = 0;
	if(xSize == ySize)
		this.size = xSize;

	this.step = this.size/32;

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

function drawSpace(space, canvas)
{
	var ctx = canvas.getContext("2d");
	var grd = ctx.createRadialGradient(space.size/2, space.size/2, 0, space.size/2, space.size/2, space.size/2);
	grd.addColorStop(0, "#504D4C");
	grd.addColorStop(1, "black");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, space.size, space.size); 

	ctx.strokeStyle = "#572C23";
	ctx.lineWidth = 0.5;
	for(var i = space.step; i < space.size; i+=space.step)
	{
		ctx.moveTo(i, 0);
		ctx.lineTo(i, space.size);
		ctx.stroke(); 
	}
	for(var i = space.step; i < space.size; i+=space.step)
	{
		ctx.moveTo(0, i);
		ctx.lineTo(space.size, i);
		ctx.stroke(); 
	}
}

function drawArtifact(artifact, canvas)
{
	if(artifact.visible == true)
	{
		var innerRadius = 4;
		var outerRadius = 16;
		var radius = 16;
		var ctx = canvas.getContext("2d");
		var grd = ctx.createRadialGradient(artifact.xPos, artifact.yPos, innerRadius, artifact.xPos, artifact.yPos, outerRadius);
		grd.addColorStop(0, artifact.color);
		grd.addColorStop(1, "black");

		if(artifact.name == "asteroid")
		{
			ctx.beginPath();
			ctx.ellipse(artifact.xPos, artifact.yPos, innerRadius, outerRadius, Math.random()*Math.PI, 0, 2*Math.PI);
			ctx.strokeStyle = "silver";
			ctx.stroke();	
			ctx.fillStyle = grd;
			ctx.fill();
		}
		else if(artifact.name == "meteor shower")
		{

		}
		else // it's a planet
		{
			ctx.beginPath();
			ctx.arc(artifact.xPos, artifact.yPos, radius, 0, 2 * Math.PI);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.fillStyle = grd;
			ctx.fill();
			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.fillText(artifact.name, artifact.xPos, artifact.yPos);
		}
	}
}
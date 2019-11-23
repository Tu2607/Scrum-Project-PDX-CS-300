function drawSpace()
{
	var space = JSON.parse(sessionStorage.getItem("space"));

	var ctx = canvas.getContext("2d");
	var grd = ctx.createRadialGradient(space.size/2, space.size/2, 0, space.size/2, space.size/2, space.size/2);
	grd.addColorStop(0, "#504D4C");
	grd.addColorStop(1, "black");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, space.size, space.size); 

	ctx.strokeStyle = "#572C23";
	ctx.lineWidth = 0.2;
	for(var i = 0; i < space.size; i+=space.step)
	{
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, space.size);
		ctx.closePath();
		ctx.stroke(); 
	}
	for(var i = 0; i < space.size; i+=space.step)
	{
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(space.size, i);
		ctx.closePath();
		ctx.stroke(); 
	}
	for(var i = 0; i < space.size; i+= 8 *space.step)
	{
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, space.size);
		ctx.closePath();
		ctx.stroke(); 
	}
	for(var i = 0; i < space.size; i+= 8 * space.step)
	{
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(space.size, i);
		ctx.closePath();
		ctx.stroke(); 
	}
}

function drawArtifactSet() {

	var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));

	for(var i = 0; i < artifactSet.length; i++) {
		drawArtifact(artifactSet[i]);
	}
}

function drawArtifact(artifact)
{
	if(artifact.visibility)
	{
		var ctx = canvas.getContext("2d");

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
			var innerRadius = 4;
			var outerRadius = 20 + 16 * Math.abs(Math.cos(animateAngle));
			//var outerRadius = 20;
			var radius = 20; 

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
	}
}

function drawTrail() {

	var visitedPoints = JSON.parse(sessionStorage.getItem("visitedPoints"));

	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = " #f9e79f";

	for(var i = 0; i < visitedPoints.length - 1; i++) {
		ctx.beginPath();
		ctx.moveTo(visitedPoints[i].xPos, visitedPoints[i].yPos);
		ctx.lineTo(visitedPoints[i+1].xPos, visitedPoints[i+1].yPos);
		ctx.closePath();
		ctx.stroke(); 
	}
	ctx.closePath();
}

function drawShip() {

	var ship = JSON.parse(sessionStorage.getItem("ship"));

	var x;
	var y;

	if(ship.inOrbit)
	{
		x = ship.xPos + 50 * Math.cos(animateAngle);
		y = ship.yPos + 50 * Math.sin(animateAngle);
	}
	else
	{
		x = ship.xPos + 10 * Math.cos(animateAngle);
		y = ship.yPos + 10 * Math.sin(animateAngle);
	}
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = "pink";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.moveTo(x - 16, y - 16);
	ctx.lineTo(x + 16, y + 16);
	ctx.closePath();
	ctx.stroke(); 
	ctx.beginPath();
	ctx.moveTo(x + 16, y - 16);
	ctx.lineTo(x - 16, y + 16);
	ctx.closePath();
	ctx.stroke(); 
}


function draw() {
	
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	canvas.getContext("2d").save();

	drawSpace();
	drawArtifactSet();
	drawTrail();
	drawShip();

	canvas.getContext("2d").restore();

	animateAngle += Math.PI/100;

	requestAnimationFrame(draw);
}


function writeMessage(canvas, message) {
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = '20pt Arial';
	context.fillStyle = 'black';
	context.fillText(message, 20, 20);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}



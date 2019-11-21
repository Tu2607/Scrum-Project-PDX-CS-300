function drawSpace(canvas, space)
{
	var ctx = canvas.getContext("2d");
	var grd = ctx.createRadialGradient(space.size/2, space.size/2, 0, space.size/2, space.size/2, space.size/2);
	grd.addColorStop(0, "#504D4C");
	grd.addColorStop(1, "black");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, space.size, space.size); 

	ctx.strokeStyle = "#572C23";
	ctx.lineWidth = 0.5;
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

function drawArtifactSet(canvas, artifactSet) {

	var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));

	for(var i = 0; i < artifactSet.length; i++) {
		drawArtifact(canvas, artifactSet[i]);
	}
}

function drawArtifact(canvas, artifact)
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
			var outerRadius = 24;
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

function drawTrail(canvas, visitedPoints) {

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

function drawShip(canvas, xPos, yPos) {

	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = "pink";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.moveTo(xPos - 16, yPos - 16);
	ctx.lineTo(xPos + 16, yPos + 16);
	ctx.closePath();
	ctx.stroke(); 
	ctx.beginPath();
	ctx.moveTo(xPos + 16, yPos - 16);
	ctx.lineTo(xPos - 16, yPos + 16);
	ctx.closePath();
	ctx.stroke(); 
}


function draw(canvas) {
	
	var space = JSON.parse(sessionStorage.getItem("space"));
	var ship = JSON.parse(sessionStorage.getItem("ship"));
	var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));
	var visitedPoints = JSON.parse(sessionStorage.getItem("visitedPoints"));

//	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//	canvas.getContext("2d").save();
//	canvas.getContext("2d").translate(xPos-100, yPos-100);
//	canvas.getContext("2d").scale(3, 3);

	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	canvas.getContext("2d").save();

	drawSpace(canvas, space);
	drawArtifactSet(canvas, artifactSet);
	drawTrail(canvas, visitedPoints);
	drawShip(canvas, ship.xPos, ship.yPos);
	

	canvas.getContext("2d").restore();
}

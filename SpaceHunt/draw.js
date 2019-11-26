
// draws everything on the celestial map
// invoked only once (in config.js)
// animating function calls it repeatedly
function draw() {
	
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	//canvas.getContext("2d").save();

	if(gameOver)
	{
		drawSplashScreen();
	}
	else
	{
		drawSpace();
		drawArtifactSet();
		//drawTrail();
		drawShip();
	}

	//canvas.getContext("2d").restore();

	// since this function is called repeatedly
	// a changing value is needed to differentiate frames
	animateAngle += Math.PI/100;

	requestAnimationFrame(draw);
}


// loads space and draws black/grey gradient with grid
// grid is every 32 pixels (first two loops), again at every 256 pixels (last two loops)
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

// loads artifacts array and calls draw on each one
function drawArtifactSet() {

	var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));

	for(var i = 0; i < artifactSet.length; i++) {
		drawArtifact(artifactSet[i]);
	}
}

// draws artifact by type if its visibility is set to true
function drawArtifact(artifact)
{
	if(artifact.visibility)
	{
		var ctx = canvas.getContext("2d");

		if(artifact.name == "meteor shower")
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
			var outerRadius = 20 + 20 * Math.abs(Math.cos(animateAngle));
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

// loads visitedPoints array
// draws a line between each CP that was saved
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

// loads ship (for position info) and draw
// each frame will draw it in a different position within some radius
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
		x = ship.xPos + 8 * Math.cos(animateAngle);
		y = ship.yPos + 8 * Math.sin(animateAngle);
	}
	var ctx = canvas.getContext("2d");

	var img = new Image();
	img.src = "./oldSpice.png";
	ctx.drawImage(img, x-40, y-40, 80, 80)
}



// start screen called by windows.onload
function drawSplashScreen()
{
	var space = JSON.parse(sessionStorage.getItem("space"));

	var ctx = canvas.getContext("2d");
	var grd = ctx.createRadialGradient(space.size/2, space.size/2, 0, space.size/2, space.size/2, space.size/2);
	grd.addColorStop(0, "black");
	grd.addColorStop(0, "black");
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, space.size, space.size); 
}
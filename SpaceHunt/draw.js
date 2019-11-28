
// draws everything on the celestial map
// invoked only once (in config.js)
// animating function calls it repeatedly
function draw() {
	
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	//canvas.getContext("2d").save();

	drawSpace();
	drawArtifactSet();
	drawTrail();
	drawShip();

	//canvas.getContext("2d").restore();

	// since this function is called repeatedly
	// a changing value is needed to differentiate frames
	animateAngle += Math.PI/100;

	if(!gameOver)
	{
		requestAnimationFrame(draw);
	}
	else
	{
		window.cancelAnimationFrame(draw);
		animateAngle = -1;
		drawSplashScreen();
	}
}

// start screen called by windows.onload
function drawSplashScreen()
{
	var ctx = canvas.getContext("2d");
	var grd = ctx.createRadialGradient(space.size/2, space.size/2, space.size, space.size/2, space.size/2, space.size/2 * Math.abs(Math.sin(animateAngle)));
	grd.addColorStop(0, "purple");
	grd.addColorStop(1, "black");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, space.size, space.size); 

	ctx.save();
	var img = new Image();
	img.src = "./oldSpice.png";

	x = ship.xPos + 12 * Math.cos(animateAngle);
	y = ship.yPos + 12 * Math.sin(animateAngle);
	ctx.drawImage(img, 400, 500, 500*Math.tan(animateAngle), 500*Math.tan(animateAngle));
	ctx.restore();

	if(!gameOver)
	{
		let fontSize = 150; //* Math.abs(Math.sin(animateAngle));
		ctx.font = fontSize + "px Bungee";
		ctx.fillStyle = "pink";
		ctx.fillText("SPACEHUNT", 50, 400);
		//ctx.fillText("SPACEHUNT", 50* Math.abs(Math.cos(animateAngle)), 400* Math.abs(Math.sin(animateAngle)));
	}
	else
	{
		let fontSize = 150;
		ctx.font = fontSize + "px Bungee";
		ctx.fillStyle = "pink";
		ctx.fillText("GAME OVER!", 40, 200);
	}


	if(!gameOver && Math.sin(animateAngle) > 0.99)
	{
		ctx.font = "25px Bungee";
		ctx.fillStyle = "white";
		ctx.fillText("Press the 'Start' button in the command panel to play!", 150, 500);
		return;
	}
	else if(gameOver && Math.sin(animateAngle) > 0)
		return;

	animateAngle += Math.PI/500;
	requestAnimationFrame(drawSplashScreen);
}
function drawBadmax()
{

	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	var ctx = canvas.getContext("2d");

	var img = new Image();
	img.src = "./badmax.png";

	ctx.drawImage(img, 20, 200, 600, 600);
	let fontSize = 50;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "white";
	ctx.fillText("You got robbed boi!", 10, 200);
	ctx.fillText("Sincerely, from the BadMax crew", 20, 800);

	animateAngle += Math.PI/5000000;
	
	if(Math.sin(animateAngle) > 0.999){
	    enableMoveButtons();
		return;
	}
	requestAnimationFrame(drawBadmax);
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
	var ctx = canvas.getContext("2d");
	var img = new Image();
	img.src = "./oldSpice.png";

	var x;
	var y;

	if(ship.inOrbit)
	{
		x = ship.xPos + 40 * Math.cos(animateAngle);
		y = ship.yPos + 60 * Math.sin(animateAngle);
		ctx.drawImage(img, x-40, y-40, 80, 80)
	}
	else if(ship.onLand)	
	{
		x = ship.xPos;
		y = ship.yPos;
		ctx.drawImage(img, x-40, y-40, 50, 50)
	}
	else
	{
		x = ship.xPos + 12 * Math.cos(animateAngle);
		y = ship.yPos + 12 * Math.sin(animateAngle);
		ctx.drawImage(img, x-40, y-40, 80, 80)
	}
}




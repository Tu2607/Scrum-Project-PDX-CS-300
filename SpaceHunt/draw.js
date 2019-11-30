
// draws everything on the celestial map
// invoked only once (in config.js)
// animating function calls it repeatedly
function draw() {
	
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	//canvas.getContext("2d").save();

	drawSpace();
	drawArtifactSet();
	drawTrail();
	drawStats();
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
		// do spash screen draw/animation
		animateAngle = -1;
		drawSplashScreen();
		return;
	}
}

/*
function landPlay()
{
	console.log("doing land play");

	var ship = JSON.parse(sessionStorage.getItem("ship"));

	var ctx = mouseCanvas.getContext("2d");
	ctx.fillRect(0, 0, mouseCanvas.width, mouseCanvas.height); 

	let fontSize = 15;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "yellow";
	ctx.fillText("Energy: 100 for 10 credit", 20, 20);
	ctx.fillText("Supplies: 100% for 20 credit", 20, 40);

	mouseCanvas.addEventListener('click', on_canvas_click, false);

	function on_canvas_click(ev) {
	    var x = ev.clientX - mouseCanvas.offsetLeft;
	    var y = ev.clientY - mouseCanvas.offsetTop;

		console.log(x, y);

	sessionStorage.setItem("ship",JSON.stringify(ship));
}
*/

// start screen called by windows.onload and when game over
function drawSplashScreen()
{
	var ctx = canvas.getContext("2d");

	//purple/black border zooms in
	var grd = ctx.createRadialGradient(space.size/2, space.size/2, space.size, space.size/2, space.size/2, space.size/2 * Math.abs(Math.sin(animateAngle)));
	grd.addColorStop(0, "purple");
	grd.addColorStop(1, "black");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, space.size, space.size); 

	var img = new Image();
	img.src = "./oldSpice.png";

	//ship zooms past
	ctx.drawImage(img, 400, 500, 500*Math.tan(animateAngle), 500*Math.tan(animateAngle));

	if(!gameOver) // intro screen
	{
		let fontSize = 150; 
		//let fontSize = 150 * Math.sin(animateAngle);
		ctx.font = fontSize + "px Bungee";
		ctx.fillStyle = "pink";
		ctx.fillText("SPACEHUNT", 50, 400);
		//ctx.fillText("SPACE", 50, 400);
		//ctx.fillText("HUNT", 550, 400);
		//ctx.fillText("SPACE", 50* Math.sin(animateAngle), 400* Math.sin(animateAngle));
		//ctx.fillText("HUNT", 550* Math.sin(animateAngle), 400* Math.sin(animateAngle));
	}
	else // game over screen
	{
		let fontSize = 150;
		ctx.font = fontSize + "px Bungee";
		ctx.fillStyle = "pink";
		ctx.fillText("GAME OVER!", 40, 200);
		//fontSize = 20;
		//ctx.font = fontSize + "px Bungee";
		//ctx.fillText("drifting ... into ... nothing", 50, 400);
		//ctx.fillText("drifting ... into ... nothing", 50* Math.abs(Math.cos(animateAngle)), 400* Math.abs(Math.cos(animateAngle)));
		disableMoveButtons();
	}


	if(!gameOver && Math.sin(animateAngle) > 0.99) // as soon as the intro screen is done - draw the subtitle
	{
		ctx.font = "25px Bungee";
		ctx.fillStyle = "white";
		ctx.fillText("Press the 'Start' button in the command panel to play!", 150, 500);
		return;
	}
	else if(gameOver && Math.sin(animateAngle) > 0) // as soon as 'game over' screen is done - draw the game as it looked (not animated)
	{
		drawSpace();
		drawArtifactSet();
		drawTrail();
		drawStats();
		drawShip();
		return;
	}

	animateAngle += Math.PI/700;
	requestAnimationFrame(drawSplashScreen);
}

function drawBadmax()
{

	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	var ctx = canvas.getContext("2d");

	var img = new Image();
	img.src = "./badmax.png";

	drawSpace();
	ctx.drawImage(img, 20, 200, 600, 600);
	let fontSize = 50;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "white";
	ctx.fillText("Robbed, -10 credits!", 10, 200);
	ctx.fillText("Sincerely, from the BadMax crew", 20, 800);
	drawShip();
	drawStats();

	animateAngle += Math.PI/5000000;
	
	if(Math.sin(animateAngle) > 0.999){
	    enableMoveButtons();
		return;
	}
	requestAnimationFrame(drawBadmax);
}

function drawMeteorStorm()
{
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	var ctx = canvas.getContext("2d");

	var img = new Image();
	img.src = "./asteroid.png";

	drawSpace();
	drawArtifactSet();
	drawShip();
	drawStats();
	let fontSize = 50;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "white";
	ctx.fillText("Meteors!, -10 health!", 10, 200);
	ctx.drawImage(img, animateAngle*400, animateAngle*400, 40, 40);
	ctx.drawImage(img, 32+animateAngle*400, 32+animateAngle*400, 40, 40);
	ctx.drawImage(img, 48+animateAngle*400, 24+animateAngle*400, 40, 40);
	ctx.drawImage(img, 16+animateAngle*400, 96+animateAngle*400, 40, 40);
	ctx.drawImage(img, 64+animateAngle*400, 64+animateAngle*400, 40, 40);
	ctx.drawImage(img, 96+animateAngle*400, 32+animateAngle*400, 40, 40);
	ctx.drawImage(img, 128+animateAngle*400, 16+animateAngle*400, 40, 40);
	ctx.drawImage(img, 32+animateAngle*400, 128+animateAngle*400, 40, 40);
	ctx.drawImage(img, 48+animateAngle*400, 32+animateAngle*400, 40, 40);
	ctx.drawImage(img, 16+animateAngle*400, 48+animateAngle*400, 40, 40);
	ctx.drawImage(img, 64+animateAngle*400, 96+animateAngle*400, 40, 40);
	ctx.drawImage(img, 96+animateAngle*400, 16+animateAngle*400, 40, 40);
	ctx.drawImage(img, 128+animateAngle*400, 24+animateAngle*400, 40, 40);

	animateAngle += 1/50000000;
	
	if(animateAngle > 4){
	    enableMoveButtons();
		return;
	}

	requestAnimationFrame(drawMeteorStorm);
}

function drawStats()
{
	var ctx = canvas.getContext("2d");

	let fontSize = 20;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "silver";
	ctx.fillText("ENERGY", 10, 1000);
	ctx.fillText("SUPPLIES", 266, 1000);
	ctx.fillText("CREDITS", 522, 1000);
	ctx.fillText("HEALTH", 778, 1000);

	if(UI.energy.value > -1)
	{
		if(UI.energy.value < 101)
		{
			ctx.fillStyle = "red";
			ctx.fillRect(100, 985, UI.energy.value, 10); 
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText(" ENERGETIC", 100, 1000);
		}
	}
	if(UI.supplies.value > -1)
	{
		if(UI.supplies.value < 101)
		{
			ctx.fillStyle = "red";
			ctx.fillRect(376, 985, UI.supplies.value, 10); 
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText(" ENOUGH", 376, 1000);
		}
	}
	if(UI.credits.value > -1)
	{
		if(UI.credits.value < 101)
		{
			ctx.fillStyle = "red";
			ctx.fillRect(622, 985, UI.credits.value, 10); 
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText(" PLENTY", 622, 1000);
		}
	}

	if(UI.health.value > -1)
	{
		if(UI.health.value <= 50)
		{
			ctx.fillStyle = "red";
			ctx.fillText("DAMAGED", 868, 1000);
			//ctx.fillRect(868, 985, 110, 10); 
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText("GOOD", 868, 1000);
		}
	}
	/*
	ctx.fillRect(100, 985, 110, 10); 
	ctx.fillRect(350, 985, 110, 10); 
	ctx.fillRect(600, 985, 110, 10); 
	ctx.fillRect(840, 985, 110, 10); 
	*/
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
			var innerRadius = 12;
			var outerRadius = 24;
			var radius = 8; 
			var grd = ctx.createRadialGradient(artifact.xPos, artifact.yPos, innerRadius, artifact.xPos, artifact.yPos, outerRadius);
			grd.addColorStop(0, artifact.color);
			grd.addColorStop(1, "black");

			ctx.beginPath();
			ctx.ellipse(artifact.xPos, artifact.yPos, innerRadius, outerRadius, animateAngle, 0, 2*Math.PI);
			//ctx.ellipse(artifact.xPos, artifact.yPos, innerRadius, outerRadius, Math.random()*Math.PI, 0, 2*Math.PI);
			ctx.closePath();
			ctx.strokeStyle = "silver";
			ctx.stroke();	
			ctx.fillStyle = grd;
			ctx.fill();
		}
		else // it's a planet
		{
			var innerRadius = 6;
			var outerRadius = 30 + 20 * Math.abs(Math.sin(animateAngle));
			//var outerRadius = 30;
			var radius = 30; 

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
			ctx.font = "13px Bungee";
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
		ctx.drawImage(img, x-40, y-40, 100, 100)
	}
}




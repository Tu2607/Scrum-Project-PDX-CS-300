
// draws everything on the celestial map
// invoked only once (in config.js)
// animating function calls it repeatedly
function draw() {
	
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	//canvas.getContext("2d").save();

	drawSpace();
	drawArtifactSet();
	if(config.seeVisited.checked)
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
		//document.getElementById('outro').play();
		//theme.pause();
		animateAngle = -1;
		drawSplashScreen();
		return;
	}
}

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
	}
	else // game over screen
	{
		let fontSize = 150;
		ctx.font = fontSize + "px Bungee";
		ctx.fillStyle = "pink";
		ctx.fillText("GAME OVER!", 40, 200);
		disableMoveButtons();
		disableCommandButtons();
	}


	if(!gameOver && Math.sin(animateAngle) > 0.99) // as soon as the intro screen is done - draw the subtitle
	{
		ctx.font = "25px Bungee";
		ctx.fillStyle = "white";
		ctx.fillText("Press 'Start' to play! (w-a-s-d keys enabled)", 150, 500);
		return;
	}
	else if(gameOver && Math.sin(animateAngle) > 0) // as soon as 'game over' screen is done - draw the game as it looked (not animated)
	{
		drawSpace();
		drawArtifactSet();
		drawTrail();
		drawStats();
		drawShip();
		//theme.play();
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
	// image from: https://www.clipartmax.com/middle/m2i8b1m2N4i8i8i8_pirate-skull-clip-art-medium-size-greensburg-indiana-high-school-logo/
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

function drawFreighter() 
{
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	var ctx = canvas.getContext("2d");

	var img = new Image();
	// image from: https://starwars.fandom.com/wiki/Freighter/Legends
	img.src = "./freighter.png";

	drawSpace();
	ctx.drawImage(img, 20, 200, 1000, 600);
	let fontSize = 50;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "white"
	ctx.fillText("Abandoned freighter found", 100, 200);
	ctx.fillText("+100 credits!", 300, 800);
	ctx.fillText("+100 supplies!", 300, 875);
	drawShip();
	drawStats();

	animateAngle += Math.PI/5000000;

	if(Math.sin(animateAngle) > 0.999) {
		enableMoveButtons();
		return;
	}
	requestAnimationFrame(drawFreighter);
}

function drawMeteorStorm()
{
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	var ctx = canvas.getContext("2d");

	var img = new Image();
	//image from: https://www.pngix.com/transpng/hbRTRR/
	img.src = "./asteroid.png";

	drawSpace();
	drawShip();
	drawStats();
	let fontSize = 50;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "white";
	ctx.fillText("Meteors! -50 health!", 10, 200);
	ctx.drawImage(img, animateAngle*400, animateAngle*400, 200, 200);
	ctx.drawImage(img, 38+animateAngle*200, 12+animateAngle*200, 50, 50);
	ctx.drawImage(img, 44+animateAngle*200, 424+animateAngle*200, 50, 50);
	ctx.drawImage(img, 16+animateAngle*400, 96+animateAngle*400, 60, 60);
	ctx.drawImage(img, 64+animateAngle*400, 234+animateAngle*400, 60, 60);
	ctx.drawImage(img, 96+animateAngle*400, 992+animateAngle*400, 70, 70);
	ctx.drawImage(img, 12+animateAngle*400, 56+animateAngle*400, 90, 90);
	ctx.drawImage(img, 35+animateAngle*600, 128+animateAngle*600, 200, 200);
	ctx.drawImage(img, 28+animateAngle*600, 512+animateAngle*600, 300, 300);
	ctx.drawImage(img, 96+animateAngle*700, 588+animateAngle*700, 100, 100);
	ctx.drawImage(img, 84+animateAngle*800, 296+animateAngle*800, 400, 400);
	ctx.drawImage(img, 16+animateAngle*800, 136+animateAngle*800, 250, 250);
	ctx.drawImage(img, 128+animateAngle*800, 24+animateAngle*800, 40, 40);

	animateAngle += 1/50000000;
	
	if(animateAngle > 4){
	    enableMoveButtons();
		return;
	}

	requestAnimationFrame(drawMeteorStorm);
}

function drawRecipe() 
{
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	var ctx = canvas.getContext("2d");

	var img = new Image();
	// image from: https://www.cleanpng.com/png-pepsi-montana-expopark-fizzy-drinks-missoula-bottl-1573579/
	img.src = "kola.png";

	drawSpace();
	ctx.drawImage(img, 20, 200, 400, 400);
	let fontSize = 50;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "white"
	ctx.fillText("Koka-Kola recipe on-board!!", 100, 200);
	ctx.fillText("Return it to Eniac!", 300, 800);
	//drawShip();
	drawStats();

	animateAngle += 1/50000000;
	
	if(animateAngle > 4){
		return;
	}

	requestAnimationFrame(drawRecipe);
}

function drawWin() 
{
	var ctx = canvas.getContext("2d");

	// pink/black border zooms in
	var grd = ctx.createRadialGradient(space.size/2, space.size/2, space.size, space.size/2, space.size/2, space.size/2 * Math.abs(Math.sin(animateAngle)));
	grd.addColorStop(0, "pink");
	grd.addColorStop(1, "black");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, space.size, space.size); 
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);


	let fontSize = 150;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "purple";
	ctx.fillText("SUCCESS!", 40, 200);
	drawShip();
	drawStats();

	animateAngle += 1/50000000;
	
	if(animateAngle > 4){
		return;
	}

	requestAnimationFrame(drawWin);
}

function drawStats()
{
	var ctx = canvas.getContext("2d");

	let fontSize = 20;
	ctx.font = fontSize + "px Bungee";
	ctx.fillStyle = "silver";
	ctx.fillText("ENERGY", 10, 20);
	ctx.fillText("SUPPLIES", 266, 20);
	ctx.fillText("CREDITS", 522, 20);
	ctx.fillText("HEALTH", 778, 20);

	if(UI.energy.value > -1)
	{
		if(UI.energy.value < 100)
		{
			ctx.fillStyle = "red";
			ctx.fillRect(100, 5, UI.energy.value, 10); 
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText(" ENERGETIC", 100, 20);
		}
	}
	if(UI.supplies.value > -1)
	{
		if(UI.supplies.value < 100)
		{
			ctx.fillStyle = "red";
			ctx.fillRect(376, 5, UI.supplies.value, 10); 
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText(" ENOUGH", 376, 20);
		}
	}
	if(UI.credits.value > -1)
	{
		if(UI.credits.value < 100)
		{
			ctx.fillStyle = "red";
			ctx.fillRect(622, 5, UI.credits.value, 10); 
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText(" PLENTY", 622, 20);
		}
	}

	if(UI.health.value > -1)
	{
		if(UI.health.value <= 50)
		{
			ctx.fillStyle = "red";
			ctx.fillText("DAMAGED", 868, 20);
			//ctx.fillRect(868, 985, 110, 10); 
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText("GOOD", 868, 20);
		}
	}
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
	ctx.lineWidth = 0.15;

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

		if(artifact.name.startsWith("asteroid"))
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
	ctx.strokeStyle = "yellow";
	ctx.lineWidth = 0.3;

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
	{	// if we want wobble action
		//ctx.save();
		//ctx.rotate(.01 * Math.sin(1.5*animateAngle));
		x = ship.xPos + 12 * Math.cos(animateAngle);
		y = ship.yPos + 12 * Math.sin(animateAngle);
		ctx.drawImage(img, x-40, y-40, 100, 100)
		//ctx.restore();
	}
}




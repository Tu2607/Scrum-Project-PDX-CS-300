

class Point {
	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}
}

class Space {
	constructor(xSize, ySize) {
		this.xSize = xSize;
		this.ySize = ySize;
		this.size = 0;
		if(xSize == ySize)
			this.size = xSize;

		this.step = this.size/32;
	}
}

class Ship { 
  constructor(xPos, yPos, energy, supplies) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.energy = energy;
    this.supplies = supplies;
  }
}

class Artifact {
  constructor(xPos, yPos, name, color, visible) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.name = name;
    this.color = color;
    this.visibility = visible;
  }
}


function updateConfig(config, UI, canvas, space, ship, cheat, artifactSet, visitedPoints) {

	artifactSet = new Array();
	visitedPoints = new Array();
	space = new Space(canvas.width, canvas.height);
	ship = new Ship(8 * eval(config.xout.value), 8 * eval(config.yout.value), eval(config.energy.value), eval(config.supplies.value));
	buildArtifactSet(config.cheatMode.checked, artifactSet);
	addVisitedPoint(visitedPoints, ship.xPos, ship.yPos);

	// save
	sessionStorage.setItem("cheat", cheat);
	sessionStorage.setItem("xPos", ship.xPos);
	sessionStorage.setItem("yPos", ship.yPos);
	sessionStorage.setItem("energy", ship.energy);
	sessionStorage.setItem("supplies", ship.supplies);
	sessionStorage.setItem("artifactSet", JSON.stringify(artifactSet));
	sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
	sessionStorage.setItem("space", JSON.stringify(space));
	sessionStorage.setItem("ship", JSON.stringify(ship));

	updateStatus(UI, ship.xPos, ship.yPos, ship.energy, ship.supplies);

	draw(canvas, space, artifactSet, visitedPoints, ship.xPos, ship.yPos);
}

function updateStatus(UI, xPos, yPos, energy, supplies)
{
	UI.xValue.value = xPos;
	UI.yValue.value = yPos;
	UI.energy.value = energy;
	UI.supplies.value = supplies;

}

function sensor(canvas) {

	var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));
	var ship = JSON.parse(sessionStorage.getItem("ship"));

    console.log(ship.xPos, ship.yPos);

    //removes supplies, and checks supplies ammount
    //removeSupplies(ship);

    //displays celestial objects within 2 Celestial points.
    //hightlight area scanned
    checkArtifacts(ship, artifactSet, canvas)

    return;
}

//iterates through list of CO's checking if any are less then 2 away
function checkArtifacts(ship, artifactSet, canvas) {

    //iterate through each object in artifacts
    for(let i = 0; i < artifactSet.length; i++){
        artifact = artifactSet[i];

        //if distance is <= 2
        if(checkDistance(ship, artifact) <= 2){
            //visiblility set to true so next time it will be drawn
            artifact.visibility = true;
            //testing
            console.log(artifact.name + " Appeared on the sensor")
            //draws artifact on map
            drawArtifact(canvas, artifact);
        }
    }
    return
}

//function to check distance 
//compares artifacts location and players location
function checkDistance(ship, artifact){

    //gets the x and y from ship location and artifact
    let x1 = ship.xPos;
    let x2 = artifact.xPos;
    let y1 = ship.yPos;
    let y2 = artifact.yPos;

    //returns the distance between ship and the artifact
    console.log(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

//waiting on checkSupplies() to be implimented
function removeSupplies(ship){
    //Remove 2% supplies
    ship.supplies -= 2;
	sessionStorage.setItem("ship", JSON.stringify(ship));
    //checks if supplies remain
    ship.checkSupplies();
    return;
}

function addVisitedPoint(visitedPoints, xPos, yPos)
{
	visitedPoints.push(new Point(xPos, yPos));
}

function buildArtifactSet(cheatMode, artifactSet)
{
	artifactSet.push(new Artifact(64, 64, "eniac", "orange", true));
	artifactSet.push(new Artifact(0, 0, "moon", "white", true));
	artifactSet.push(new Artifact(256, 128, "celeron", "yellow", true));
	artifactSet.push(new Artifact(512, 256, "ryzen", "red", true));
	artifactSet.push(new Artifact(576, 576, "xeon", "blue", true));
	if(cheatMode)
	{
		artifactSet.push(new Artifact(704, 704, "pentium 1", "purple", true));
		artifactSet.push(new Artifact(640, 768, "pentium 2", "purple", true));
		artifactSet.push(new Artifact(640, 960, "pentium 3", "purple", true));
		artifactSet.push(new Artifact(768, 640, "pentium 4", "purple", true));
		artifactSet.push(new Artifact(768, 832, "pentium 5", "purple", true));
		artifactSet.push(new Artifact(832, 896, "pentium 6", "purple", true));
		artifactSet.push(new Artifact(832, 768, "pentium 7", "purple", true));
		artifactSet.push(new Artifact(344, 344, "asteroid 1", "grey", true));
		artifactSet.push(new Artifact(152, 448, "asteroid 2", "grey", true));
		artifactSet.push(new Artifact(648, 648, "asteroid 3", "grey", true));
		artifactSet.push(new Artifact(600, 72, "asteroid 4", "grey", true));
	}
	else
	{
		artifactSet.push(new Artifact(704, 704, "pentium 1", "purple", false));
		artifactSet.push(new Artifact(640, 768, "pentium 2", "purple", false));
		artifactSet.push(new Artifact(640, 960, "pentium 3", "purple", false));
		artifactSet.push(new Artifact(768, 640, "pentium 4", "purple", false));
		artifactSet.push(new Artifact(768, 832, "pentium 5", "purple", false));
		artifactSet.push(new Artifact(832, 896, "pentium 6", "purple", false));
		artifactSet.push(new Artifact(832, 896, "pentium 5", "purple", false));
		artifactSet.push(new Artifact(832, 768, "pentium 7", "purple", false));
		artifactSet.push(new Artifact(344, 344, "asteroid 1", "grey", false));
		artifactSet.push(new Artifact(152, 448, "asteroid 2", "grey", false));
		artifactSet.push(new Artifact(648, 648, "asteroid 3", "grey", false));
		artifactSet.push(new Artifact(600, 72, "asteroid 4", "grey", false));
	}
}

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

function draw(canvas, space, artifactSet, visitedPoints, xPos, yPos) {

	drawSpace(canvas, space);
	drawArtifactSet(canvas, artifactSet);
	drawTrail(canvas, visitedPoints);
	drawShip(canvas, xPos, yPos);
}



// TU's ORIGINAL CODE BELOW

function updateConfig(space, ship, cheat, artifactSet, visitedPoints) {

	artifactSet = new Array();
	visitedPoints = new Array();
	/* For the max size*/
	//canvas.width = eval(config.xMax.value);
	//canvas.height = eval(config.yMax.value);

	//create the environment from inputs
	//the size of the game
	space = new Space(8 * eval(config.xMaxOut.value), 8 * eval(config.yMaxOut.value));

	//the ship's starting coordinates and status 
	ship = new Ship(8 * eval(config.xout.value), 8 * (eval(config.xMaxOut.value) - eval(config.yout.value)), eval(config.energy.value), eval(config.supplies.value), eval(config.credits.value), false);

	//set the visibility of artifacts (true for all if cheat mode checked)
	buildArtifactSet(config.cheatMode.checked, artifactSet);

	//add the starting coordinates of ship as visited
	addVisitedPoint(visitedPoints, ship.xPos, ship.yPos);

	//save this new game enviroment 
	//(make sure to update if you change the game state)
	sessionStorage.setItem("space", JSON.stringify(space));
	sessionStorage.setItem("ship", JSON.stringify(ship));
	sessionStorage.setItem("artifactSet", JSON.stringify(artifactSet));
	sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));

	//fill the status fields (UI on index)
	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits);

	draw();  //Tu's note: I'll add in the wormhole
}


//updates status fields (on index page) with game status
function updateStatus(xPos, yPos, energy, supplies, credits) {
	UI.xValue.value = xPos/8
	UI.yValue.value = (eval(config.yMaxOut.value)*8 - yPos)/8;
	UI.energy.value = energy;
	UI.supplies.value = supplies;
	UI.credits.value = credits;
}

//updates supplies in status
//used in sensor
function sensorStatus(supplies){
	UI.supplies.value = supplies;
}


/*
function blackhole(UI)



function activeCheat(){
	if(Ship.energy.value < 0){
		//change setting so that you don't die
	}


}



//function updateConfig (energy,resource,cheat,normal,random,fix,xcord,ycord){

function updateConfig(config){
	var energy = eval(config.energy.value) + 0;
	var resource = eval(config.energy.value) + 0;
	var xcord = eval(config.xcord.value) + 0;
	var ycord = eval(config.ycord.value) + 0;

	if(config.normal){
		//does nothing I guess
	}

	if(config.GodMode){
		// have a flag that mark the game that turned on the cheat
		activeCheat();
	}

	Ship.energy.value = energy;
	Ship.resource.value = resource;	
	Ship.x.value = xcord;

	Ship.y.value = ycord;

}*/


// Original code commented out below


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


function updateStatus(UI, xPos, yPos, energy, supplies) {
	UI.xValue.value = xPos/8;
	UI.yValue.value = yPos/8;
	UI.energy.value = energy;
	UI.supplies.value = supplies;

}




/*
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

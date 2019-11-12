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
	}

	Ship.energy.value = energy;
	Ship.resource.value = resource;	
	Ship.x.value = xcord;
	Ship.y.value = ycord; 
}
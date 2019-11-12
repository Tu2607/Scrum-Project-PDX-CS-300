function activeCheat(){
	if(Ship.energy.value < 0){
		//change setting so that you don't die
	}


}



function updateConfig (energy,resource,cheat,normal,random,fix,xcord,ycord){
	energy = eval(energy) + 0;
	resource = eval(resource) + 0;

	if(cheat){
		// call function to change setting of the game to undying
		activeCheat();
	}

	if(normal){
		alert("You have decided to play normally.");
	}

	Ship.energy.value = energy;
	Ship.resource.value = resource;	
}
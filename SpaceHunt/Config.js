function updateConfig (energy,resource,cheat,normal,random,fix,xcord,ycord){
	energy = eval(energy) + 0;
	resource = eval(resource) + 0;

	if(cheat){
		alert("You have actived cheat mode!");
		// call function to change setting of the game to undying
	}

	if(normal){
		alert("You have decided to play normally.");
	}

	Ship.energy.value = energy;
	Ship.resource.value = resource;	


}
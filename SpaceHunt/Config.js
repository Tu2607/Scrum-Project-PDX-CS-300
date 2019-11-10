function updateConfig (energy,resource,cheat,normal){
	energy = eval(energy) + 0;
	resource = eval(resource) + 0;

	Ship.energy.value = energy;
	Ship.resource.value = resource;	
}
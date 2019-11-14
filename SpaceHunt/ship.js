class Ship {
  constructor(energy, supplies, x, y) {
    this.energy = energy;
    this.supplies = supplies;
    this.x = x;
    this.y = y;
  }
  
  checkSupplies() {
    if (this.supplies < 1) {
      alert("You've run out of supplies! Game over.");
      gameOver = True;
    }
  }
  
  checkEnergy() {
    if (this.energy < 1) {
      alert("You've run out of energy! Game over.");
      gameOver = True;
    }
  }
  
  activeCheat(){
	if(Ship.energy.value < 0){
		//change setting so that you don't die
	}
  }

//function updateConfig (energy,resource,cheat,normal,random,fix,xcord,ycord){
  updateConfig(config){
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

	this.energy. = energy;
	this.resource = resource;	
	this.x = xcord;
	this.y = ycord; 
	
  }
}

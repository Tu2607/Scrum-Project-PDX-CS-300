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

  // ***************************************
  // ************ Ship Movement ************
  // ***************************************
  move(angle, distance)
  {
    // Random Worm Hole Case

    
    // Fixed Worm Hole Case

    // Up
    if(angle == 90)
      this.y += distance

    // Down
    else if(angle == 270)
      this.y -= distance

    // Left
    else if(angle == 180)
      this.x -= distance

    // Right
    else
      this.x += distance

    // Update Energy and Supplies
    this.useSupplies(2)
    this.useEnergy(10 * distance)

    // Check Energy and Supplies
    this.checkEnergy() 
    this.checkSupplies()
  }

  // Use Energy
  useEnergy(amount)
  {
    this.energy -= amount
  }

  // Use Supplies
  useSupplies(amount)
  {
    this.supplies -= amount
  }
  

  // ********************************
  // Functions for Testing Purposes
  // ********************************
  status()
  {
    console.log('Position: ' + this.x + " , " + this.y)
    console.log('Energy: ' + this.energy)
    console.log('Supplies: ' + this.supplies)
  }
}

function updateConfig(config){

  var newEnergy = eval(config.energy.value) + 0;
  var newResource = eval(config.energy.value) + 0;
  var xcord = eval(config.xcord.value) + 0;
  var ycord = eval(config.ycord.value) + 0;


  let newShip = new Ship(newEnergy,newResource,xcord,ycord);  //Initialize a new ship object

  return newShip;

}
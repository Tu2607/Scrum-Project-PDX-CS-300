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
  moveUp(distance)
  {
    this.y += distance

    // Update Energy and Supplies
    useEnergy(10 * distance)
    useSupplies(2)

    // Check Energy and Supplies
    checkEnergy() 
    checkSupplies()
  }

  moveLeft(distance)  
  {
    this.x += distance
    
    // Update Energy and Supplies
    useEnergy(10 * distance)
    useSupplies(2)

    // Check Energy and Supplies
    checkEnergy() 
    checkSupplies()
  }
    
  moveDown(distance)
  {
    this.y -= distance

    // Update Energy and Supplies
    useEnergy(10 * distance)
    useSupplies(2)

    // Check Energy and Supplies
    checkEnergy() 
    checkSupplies()
  }

  moveLeft(distance)
  {
    this.y -= distance

    // Update Energy and Supplies
    useEnergy(10 * distance)
    useSupplies(2)

    // Check Energy and Supplies
    checkEnergy() 
    checkSupplies()
  }

  // Use Energy
  useEnergy(amount)
  {
    this.energy -= amount
  }

  // Use Supplies
  useSupplies(amount)
  {
    this.suplies -= amount
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
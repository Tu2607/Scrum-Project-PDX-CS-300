


// Original code commented out below


class Ship { 
  constructor(xPos, yPos, energy, supplies) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.energy = energy;
    this.supplies = supplies;
  }
}


function checkSupplies(ship) {
  if (ship.supplies < 1) {
    alert("You've run out of supplies! Game over.");
    //gameOver = True;
  }
}

function checkEnergy(ship) {
  if (ship.energy< 1) {
    alert("You've run out of energy! Game over.");
    //gameOver = True;
  }
}

// ***************************************
// ************ Ship Movement ************
// ***************************************
function move(UI, canvas, angle, distance, config) // Tu's note: Pass in config to check wormhole checkbox and wormhole for coordinates
{
  var space = JSON.parse(sessionStorage.getItem("space"));
  var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));
  var visitedPoints = JSON.parse(sessionStorage.getItem("visitedPoints"));
  var ship = JSON.parse(sessionStorage.getItem("ship"));


  // Random Worm Hole Case
  if(config.random){
    if(ship.yPos > space.ySize && ship.yPos < 0 && ship.xPos > space.xSize && ship.xPos < 0){
      ship.yPos = Math.floor(Math.random()*(space.ySize+1));    
      ship.xPos = Math.floor(Math.random()*(space.xSize+1));   
    }  
  }

  // Fixed Worm Hole Case
  if(config.fixed){
    if(ship.yPos > space.ySize && ship.xPos > space.xSize){
      ship.yPos = 50;
      ship.xPos = 50;
    }
  }

  // Up
  if(angle == 90)
    ship.yPos -= distance*8

  // Down
  else if(angle == 270)
    ship.yPos += distance*8

  // Left
  else if(angle == 180)
    ship.xPos -= distance*8

  // Right
  else
    ship.xPos += distance*8


  // Update Energy and Supplies
  useSupplies(ship, 2)
  useEnergy(ship, distance)

if(config.cheatMode == false) {
  // Check Energy and Supplies
  checkEnergy(ship) 
  checkSupplies(ship)
}


  addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
    sessionStorage.setItem("ship", JSON.stringify(ship));
    sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));

  updateStatus(UI, ship.xPos, ship.yPos, ship.energy, ship.supplies);

  draw(canvas, space, artifactSet, visitedPoints, ship.xPos, ship.yPos);
}

// Use Energy
function useEnergy(ship, amount)
{
  ship.energy -= amount
    sessionStorage.setItem("energy", ship.energy);
}

// Use Supplies
function useSupplies(ship, amount)
{
  ship.supplies -= amount
    sessionStorage.setItem("supplies", ship.supplies);
}





/* 
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
*/
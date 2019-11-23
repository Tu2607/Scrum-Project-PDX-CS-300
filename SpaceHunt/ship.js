
// MICHAEL's ORIGINAL CODE BELOW

class Ship { 
  constructor(xPos, yPos, energy, supplies, credits, orbit) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.energy = energy;
    this.supplies = supplies;
    this.credits = credits;
    this.inOrbit = orbit;
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

function getRandom(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//FOR TESTING COLLISION/ORBIT/LANDING ON PLANET
// to be called on each step of move
function checkCollision(ship)
{
	var artifacts = JSON.parse(sessionStorage.getItem("artifactSet"));

    for(var i = 0; i < artifacts.length; i++){
        artifact = artifacts[i];

        //if distance is = 0
        if(checkDistance(ship, artifact) == 0){

        	artifact.visibility = true;

	        //lose health

		    alert("BOOM BANG CRASH!");
        }
    }

  sessionStorage.setItem("ship", JSON.stringify(ship));
  sessionStorage.setItem("artifactSet", JSON.stringify(artifacts));
}


// to be called at the end of a series of moves
function checkOrbitRange(ship)
{
	var artifacts = JSON.parse(sessionStorage.getItem("artifactSet"));

    for(var i = 0; i < artifacts.length; i++){
        artifact = artifacts[i];

        //if distance is = 1
        if(checkDistance(ship, artifact) == 1*8){

        	artifact.visibility = true;

          alert("You're close to " + artifact.name + ", you may enter orbit");

	        //enable orbit button

          //disable movement buttons

        }
    }

  sessionStorage.setItem("ship", JSON.stringify(ship));
  sessionStorage.setItem("artifactSet", JSON.stringify(artifacts));
}


// can be called if orbit button is enabled
function enterOrbit()
{
	var ship = JSON.parse(sessionStorage.getItem("ship"));

  	//if cheat mode enabled, don't check so don't die
  	if(config.cheatMode.checked == false) {

  		checkEnergy(ship);
  	}

    //enable land button

    ship.inOrbit = true;
    useEnergy(ship, 10);

  	sessionStorage.setItem("ship", JSON.stringify(ship));
}


// can be called if de-orbit button is enabled
function leaveOrbit()
{
	var ship = JSON.parse(sessionStorage.getItem("ship"));


  	//if cheat mode enabled, don't check so don't die
  	if(config.cheatMode.checked == false) {

	    checkEnergy(ship) 
	}

	ship.inOrbit = false;
	useEnergy(ship, 10);

	//enable movement buttons
	//enable 'orbit' button
	//disable land button

	sessionStorage.setItem("ship", JSON.stringify(ship));
}


// ***************************************
// ************ Ship Movement ************
// ***************************************
function move(angle, distance) // Tu's note: Pass in config to check wormhole checkbox and wormhole for coordinates
{
  var space = JSON.parse(sessionStorage.getItem("space"));
  var ship = JSON.parse(sessionStorage.getItem("ship"));
  var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));
  var visitedPoints = JSON.parse(sessionStorage.getItem("visitedPoints"));

  // if an object has same CP as ship
  // should be called on every CP move
  checkCollision(ship);
  // if an object is within 1 CP, a
  // shoud be called after a series of CP moves
  checkOrbitRange(ship);

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
  useEnergy(ship, distance * 10)

  //if cheat mode enabled, don't check so don't die
  if(config.cheatMode.checked == false) {
    // Check Energy and Supplies
    checkEnergy(ship) 
    checkSupplies(ship)
  }

  //This is the case where the user move out of bounds and activated the wormhole behavior
  if(ship.yPos > space.ySize || ship.yPos < 0 || ship.xPos > space.xSize || ship.xPos < 0){
    // Random Worm Hole Case
    if(config.wormhole.value == "random"){
      ship.yPos = Math.floor(getRandom(0,15) * 8);    
      ship.xPos = Math.floor(getRandom(0,15) * 8);
    } else if (config.wormhole.value == "fixed"){   //Fixed worm hole case
      ship.yPos = 50 * 8;
      ship.xPos = 50 * 8;
    }
  }

  //save the point just relocated to
  addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)

  //save state
  sessionStorage.setItem("ship", JSON.stringify(ship));
  sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));

  //update the status fields with these changes
  updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits);


}

// Use Energy
function useEnergy(ship, amount)
{
  ship.energy -= amount

  //save ship since energy val updated
  sessionStorage.setItem("ship", JSON.stringify(ship));
}

// Use Supplies
function useSupplies(ship, amount)
{
  ship.supplies -= amount

  //save ship since supplies val updated
  sessionStorage.setItem("ship", JSON.stringify(ship));
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
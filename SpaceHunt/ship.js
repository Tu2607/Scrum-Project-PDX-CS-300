
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

        //if ship position is same position as artifact
        if(checkDistance(ship, artifact) == 0){

          //set to visibible - drawings will show it now
        	artifact.visibility = true;

	        // TODO: lose health

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

        // TODO: disable orbit button

        //if ship position is 1 CP from artifact
        if(checkDistance(ship, artifact) == 1*8){

          //set to visibible - drawings will show it now
          artifact.visibility = true;

          //only planets can be orbited and only if within 1 CP
          if(!artifact.name.startsWith("ast")){

            alert("You're close to " + artifact.name + ", you may enter orbit");
            // TODO: enable orbit button
          }
          else {
            alert("You're close to " + artifact.name + ", you may land");
            // TODO: disable movement buttons
            // TODO: enable orbit button
          }
        }
    }

  sessionStorage.setItem("ship", JSON.stringify(ship));
  sessionStorage.setItem("artifactSet", JSON.stringify(artifacts));
}


// can be called if orbit button is enabled
function enterOrbit()
{
	var ship = JSON.parse(sessionStorage.getItem("ship"));

  	//if cheat mode enabled - don't check so don't die
  	if(config.cheatMode.checked == false) {
  		checkEnergy(ship);
  	}

    // TODO: enable land button

    ship.inOrbit = true;
    useEnergy(ship, 10);
    useSupplies(ship, 2);

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
  useSupplies(ship, 2);

  //disable land button
	//enable movement buttons
	//enable 'orbit' button

	sessionStorage.setItem("ship", JSON.stringify(ship));
}

//Check if the ship's position is the same as the BadMax position
function checkBadMax(ship,BadMax)
{
  if(ship.yPos == BadMax.yPos && ship.xPos == BadMax.xPos){
    //Deduct credits if both the ship and Badmax are at the same x,y coords
    ship.credits -= 10;
    alert("You got robbed boi! Sincerely from the BadMax crew.");
  }
  //Save the ship information 
  sessionStorage.setItem("ship",JSON.stringify(ship));
}


// ***************************************
// ************ Ship Movement ************
// ***************************************
function move(angle, distance,BadMax) 
{
  var space = JSON.parse(sessionStorage.getItem("space"));
  var ship = JSON.parse(sessionStorage.getItem("ship"));
  var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));
  var visitedPoints = JSON.parse(sessionStorage.getItem("visitedPoints"));

  //Randomize BadMax Movement before each movement
  BadMax.xPos = Math.floor(getRandom(0,20)*8);
  BadMax.yPos = Math.floor(getRandom(0,20)*8);

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
  
  // if an object has same CP as ship
  // should be called on every CP move
  checkCollision(ship);
  // if an object is within 1 CP, a
  // shoud be called after a series of CP moves
  checkOrbitRange(ship);

  //Check if the ship has the same CP as BadMax
  //Called after every move
  //BadMax.xPos = ship.xPos;  //  TESTING PURPOSE, UNCOMMENT TO TEST CREDIT DECREASE PROPERLY
  //BadMax.yPos = ship.yPos;  //  TESTING PURPOSE, UNCOMMENT TO TEST CREDIT DECREASE PROPERLY
  checkBadMax(ship,BadMax);

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

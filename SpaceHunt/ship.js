
class Ship { 
  constructor(xPos, yPos, energy, supplies, credits, inOrbit, nearBy, onLand) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.energy = energy;
    this.supplies = supplies;
    this.credits = credits;
    this.inOrbit = inOrbit;
    this.nearBy = nearBy;
    this.onLand = onLand;
  }
}

function checkSupplies(ship) {
  if (ship.supplies < 1) {
    alert("You've run out of supplies! Game over.");
    gameOver = true;
  }
}

function checkEnergy(ship) {
  if (ship.energy< 1) {
    alert("You've run out of energy! Game over.");
    gameOver = true;
  }
}

function getRandom(min,max){
  //return Math.floor(Math.random() * (max - min + 1) + min);
  return (Math.random() * (max - min + 1) + min);
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

          ship.nearBy = artifact.name;

	        // TODO: lose health

		      alert("BOOM BANG CRASH!");
        }
    }

  sessionStorage.setItem("ship", JSON.stringify(ship));
  sessionStorage.setItem("artifactSet", JSON.stringify(artifacts));
}

function disableMoveButtons()
{
    document.getElementById('up').disabled = true;
    document.getElementById('down').disabled = true;
    document.getElementById('left').disabled = true;
    document.getElementById('right').disabled = true;
}
function enableMoveButtons()
{
    document.getElementById('up').disabled = false;
    document.getElementById('down').disabled = false;
    document.getElementById('left').disabled = false;
    document.getElementById('right').disabled = false;
}


// to be called at the end of a series of moves
function checkOrbitRange(ship)
{
    //disable orbit button (in case it was enabled from prior movement)
    document.getElementById('orbitButton').disabled = true;
    //disable land button (in case it was enabled from prior movement)
    document.getElementById('landButton').disabled = true;
    //disable lift-off button (in case it was enabled from prior movement)
    document.getElementById('liftOffButton').disabled = true;

	var artifacts = JSON.parse(sessionStorage.getItem("artifactSet"));

    for(var i = 0; i < artifacts.length; i++){
        artifact = artifacts[i];


        //if ship position is 1 CP from artifact
        if(checkDistance(ship, artifact) == 1*8){

          //set to visibible - drawings will show it now
          artifact.visibility = true;

          ship.nearBy = artifact.name;

          //only planets can be orbited and only if within 1 CP
          if(!artifact.name.startsWith("ast")){

            alert("You're close to " + artifact.name + ", you may enter orbit");
            //enable orbit button
            document.getElementById('orbitButton').disabled = false;
          }
          else {
            alert("You're close to " + artifact.name + ", you can mine it");

            // TODO: enable mine button

            // TODO: disable movement buttons
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

    //enable land button
    document.getElementById('landButton').disabled = false;
    //disable orbit button (because already in orbit)
    document.getElementById('orbitButton').disabled = true;
    //enabled deorbit button 
    document.getElementById('deorbitButton').disabled = false;

    //disable movement buttons
    disableMoveButtons()

    ship.inOrbit = true;
    useEnergy(ship, 10);
    useSupplies(ship, 2);

  	//update the status fields with these changes
  	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits);

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
  document.getElementById('landButton').disabled = true;
	//enable orbit button (because still in orbit range)
	document.getElementById('orbitButton').disabled = false;
  //disable deorbit button
  document.getElementById('deorbitButton').disabled = true;

	//enable movement buttons
  enableMoveButtons();

  //update the status fields with these changes
  updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits);

	sessionStorage.setItem("ship", JSON.stringify(ship));
}

// can be called if ship is in orbit
function landOnPlanet()
{
	var ship = JSON.parse(sessionStorage.getItem("ship"));

    //disable deorbit button
    document.getElementById('deorbitButton').disabled = true;
    //disable land button
    document.getElementById('landButton').disabled = true;
    //enable lift-ff button
    document.getElementById('liftOffButton').disabled = false;

  	//if cheat mode enabled, don't check so don't die
  	if(config.cheatMode.checked == false) {

	    checkEnergy(ship) 
	}

	ship.inOrbit = false;
  ship.onLand = ship.nearBy;
	useEnergy(ship, 10);
  useSupplies(ship, 2);

  // TODO: land code (game play)
  sessionStorage.setItem("ship", JSON.stringify(ship));
  landPlay()
  ship = JSON.parse(sessionStorage.getItem("ship"));

	//update the status fields with these changes
	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits);

	sessionStorage.setItem("ship", JSON.stringify(ship));
}

// can be called if ship is on a planet
function liftOffPlanet()
{
	var ship = JSON.parse(sessionStorage.getItem("ship"));

    //enable deorbit button
    document.getElementById('deorbitButton').disabled = false;
    //enable land button
    document.getElementById('landButton').disabled = false;
    //disable lift-off button 
  	document.getElementById('liftOffButton').disabled = true;

  	//if cheat mode enabled, don't check so don't die
  	if(config.cheatMode.checked == false) {
	    checkEnergy(ship) 
    }

  ship.onLand = "";
	ship.inOrbit = true;
	useEnergy(ship, 10);
  useSupplies(ship, 2);

  // TODO: animation (maybe)

	//update the status fields with these changes
	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits);
  	
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

function chanceEvent(ship)
{
  var chance = (1/getRandom(1,10));

  if(chance > 0.95){
    ship.credits -= 10;

    //for drawing
    animateAngle = -4;

    //because we don't want movement while badmax notification is happening
    disableMoveButtons();
    //the drawBadmax() function enables movement after it finishes

    drawBadmax();
    //alert("You just got robbed boi! Sincerely from the BadMax crew.");
  }

  sessionStorage.setItem("ship",JSON.stringify(ship));
}


// ***************************************
// ************ Ship Movement ************
// ***************************************
function move(angle, distance, BadMax) 
{
  var space = JSON.parse(sessionStorage.getItem("space"));
  var ship = JSON.parse(sessionStorage.getItem("ship"));
  var artifactSet = JSON.parse(sessionStorage.getItem("artifactSet"));
  var visitedPoints = JSON.parse(sessionStorage.getItem("visitedPoints"));

  //Randomize BadMax Movement before each movement
  //BadMax.xPos = getRandom(1,2)*8;
  //BadMax.yPos = getRandom(1,2)*8;

  // Up
  if(angle == 90) {
    var i
    for (i=0; i<distance; ++i) {
      ship.yPos -= 8
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      checkCollision(ship)
    }
  }

  // Down
  else if(angle == 270) {
    var i
    for (i=0; i<distance; ++i) {
      ship.yPos += 8
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      checkCollision(ship)
    }
  }

  // Left
  else if(angle == 180) {
    var i
    for (i=0; i<distance; ++i) {
      ship.xPos -= 8
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      checkCollision(ship)
    }
  }

  // Right
  else {
    var i
    for (i=0; i<distance; ++i) {
      ship.xPos += 8
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      checkCollision(ship)
    }
  }

  // Update Energy and Supplies
  useSupplies(ship, 2);
  useEnergy(ship, distance * 10);

  //if cheat mode enabled, don't check so don't die
  if(config.cheatMode.checked == false) {
  // Check Energy and Supplies
  checkEnergy(ship);
  checkSupplies(ship);
  }
}

  //This is the case where the user move out of bounds and activated the wormhole behavior
  if(ship.yPos > space.ySize || ship.yPos < 0 || ship.xPos > space.xSize || ship.xPos < 0){
    // Random Worm Hole Case
    if(config.wormhole.value == "random"){
      //ship.yPos = Math.floor(getRandom(0,15) * 8);    
      //ship.xPos = Math.floor(getRandom(0,15) * 8);
      
      ship.yPos = getRandom(1,2) * 8;    //The value passed in getRandom is subject to change
      ship.xPos = getRandom(1,2) * 8;
    } else if (config.wormhole.value == "fixed"){   //Fixed worm hole case
      ship.yPos = 50 * 8;
      ship.xPos = 50 * 8;
    }
  }

  ship.nearBy = "";
  ship.onLand = "";

  //save the point just relocated to
  addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
  
  // check if an object has same CP as ship
  // should be called on every CP move
  checkCollision(ship);
  // check if an object is within 1 CP
  // shoud be called after a series of CP moves
  checkOrbitRange(ship);

  //Check if the ship has the same CP as BadMax
  //Called after every move
  //checkBadMax(ship,BadMax);

  chanceEvent(ship);

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

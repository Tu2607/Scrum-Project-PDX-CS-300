
class Ship { 
  constructor(xPos, yPos, energy, supplies, credits, health, inOrbit, nearBy, onLand) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.energy = energy;
    this.supplies = supplies;
    this.credits = credits;
    this.inOrbit = inOrbit;
    this.nearBy = nearBy;
    this.onLand = onLand;
    this.health = health;
  }
}

function checkSupplies(ship) {
  if (ship.supplies < 1) {
    alert("You've run out of supplies! Game over.");
    gameOver = true;
    return false;
  }
}

function checkEnergy(ship) {
  if (ship.energy< 1) {
    alert("You've run out of energy! Game over.");
    gameOver = true;
    return false;
  }
  else return true;
}

function checkHealth(ship){
  if(ship.health < 1){
    alert("The ship blew up! Game over.");
    gameOver = true;
    return false;
  }
}

function getRandom(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
  //return Math.floor((Math.random() * (max - min + 1) + min);
}

function randomEvent(min,max){
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

          ship.health -= 20;
          updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);

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
    document.getElementById('sensor').disabled = true;
}
function enableMoveButtons()
{
    document.getElementById('up').disabled = false;
    document.getElementById('down').disabled = false;
    document.getElementById('left').disabled = false;
    document.getElementById('right').disabled = false;
    document.getElementById('sensor').disabled = false;
}
function disableCommandButtons()
{
    document.getElementById('orbitButton').disabled = true;
    document.getElementById('deorbitButton').disabled = true;
    document.getElementById('landButton').disabled = true;
    document.getElementById('liftOffButton').disabled = true;
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

            updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
            alert("You're close to " + artifact.name + ", you may enter orbit");
            //enable orbit button
            document.getElementById('orbitButton').disabled = false;
          }
          else {
            alert("You're close to " + artifact.name + ", you can mine it");

            ship.supplies = 100;

            updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
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
  	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);

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
  updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);

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
  //landPlay()
  ship = JSON.parse(sessionStorage.getItem("ship"));

	//update the status fields with these changes
	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);

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
	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
  	
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
  var chance = (1/randomEvent(1,10));

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
  else if(chance > 0.9){
    disableMoveButtons();
    animateAngle = 0;
    drawMeteorStorm();
    ship.health -= 50;
  }
  else if(chance > 0.85){
    disableMoveButtons();
    animateAngle = -4;
    drawFreighter();
    ship.credits += 100;
    ship.energy += 100;
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

  // Up
  if(angle == 90) {
    var i
    for (i=0; i<distance; ++i) {
      ship.yPos -= 8
      useSupplies(ship, 2);
      useEnergy(ship, 10);
      if(config.cheatMode.checked == false) {
        if(checkEnergy(ship) == false || checkSupplies(ship) == false) {
		    addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
	    	sessionStorage.setItem("ship", JSON.stringify(ship));
	     	sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
	    	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
        	return;
        }
      }
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      checkCollision(ship)
      chanceEvent(ship)
      if(ship.yPos > space.ySize || ship.yPos < 0 || ship.xPos > space.xSize || ship.xPos < 0){
        // Random Worm Hole Case
        if(config.wormhole.value == "random"){
          //ship.yPos = Math.floor(getRandom(0,15) * 8);    
          //ship.xPos = Math.floor(getRandom(0,15) * 8);
          
          ship.yPos = getRandom(0,128) * 8;    //The value passed in getRandom is subject to change
          ship.xPos = getRandom(0,128) * 8;
        } else if (config.wormhole.value == "fixed"){   //Fixed worm hole case
          ship.yPos = 50 * 8;
          ship.xPos = 50 * 8;
        }
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      }
      ship.nearBy = "";
      ship.onLand = "";
      sessionStorage.setItem("ship", JSON.stringify(ship));
      sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
      updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
    }
  }

  // Down
  else if(angle == 270) {
    var i
    for (i=0; i<distance; ++i) {
      ship.yPos += 8
      useSupplies(ship, 2);
      useEnergy(ship, 10);
      if(config.cheatMode.checked == false) {
        if(checkEnergy(ship) == false || checkSupplies(ship) == false) {
		    addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
	    	sessionStorage.setItem("ship", JSON.stringify(ship));
	     	sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
	    	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
        	return;
        }
      }
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      checkCollision(ship)
      chanceEvent(ship)
      if(ship.yPos > space.ySize || ship.yPos < 0 || ship.xPos > space.xSize || ship.xPos < 0){
        // Random Worm Hole Case
        if(config.wormhole.value == "random"){
          //ship.yPos = Math.floor(getRandom(0,15) * 8);    
          //ship.xPos = Math.floor(getRandom(0,15) * 8);
          
          ship.yPos = getRandom(0,128) * 8;    //The value passed in getRandom is subject to change
          ship.xPos = getRandom(0,128) * 8;
        } else if (config.wormhole.value == "fixed"){   //Fixed worm hole case
          ship.yPos = 50 * 8;
          ship.xPos = 50 * 8;
        }
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      }
      ship.nearBy = "";
      ship.onLand = "";
      sessionStorage.setItem("ship", JSON.stringify(ship));
      sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
      updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
    }
  }

  // Left
  else if(angle == 180) {
    var i
    for (i=0; i<distance; ++i) {
      ship.xPos -= 8
      useSupplies(ship, 2);
      useEnergy(ship, 10);
      if(config.cheatMode.checked == false) {
        if(checkEnergy(ship) == false || checkSupplies(ship) == false) {
		    addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
	    	sessionStorage.setItem("ship", JSON.stringify(ship));
	     	sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
	    	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
        	return;
        }
      }
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      checkCollision(ship)
      chanceEvent(ship)
      if(ship.yPos > space.ySize || ship.yPos < 0 || ship.xPos > space.xSize || ship.xPos < 0){
      // Random Worm Hole Case
        if(config.wormhole.value == "random"){
          //ship.yPos = Math.floor(getRandom(0,15) * 8);    
          //ship.xPos = Math.floor(getRandom(0,15) * 8);
          
          ship.yPos = getRandom(0,128) * 8;    //The value passed in getRandom is subject to change
          ship.xPos = getRandom(0,128) * 8;
        } else if (config.wormhole.value == "fixed"){   //Fixed worm hole case
          ship.yPos = 50 * 8;
          ship.xPos = 50 * 8;
        }
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      }
      ship.nearBy = "";
      ship.onLand = "";
      sessionStorage.setItem("ship", JSON.stringify(ship));
      sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
      updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
    }
  }

  // Right
  else {
    var i
    for (i=0; i<distance; ++i) {
      ship.xPos += 8
      useSupplies(ship, 2);
      useEnergy(ship, 10);
      if(config.cheatMode.checked == false) {
        if(checkEnergy(ship) == false || checkSupplies(ship) == false) {
		    addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
	    	sessionStorage.setItem("ship", JSON.stringify(ship));
	     	sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
	    	updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
        	return;
        }
      }
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      checkCollision(ship)
      chanceEvent(ship)
      if(ship.yPos > space.ySize || ship.yPos < 0 || ship.xPos > space.xSize || ship.xPos < 0){
        // Random Worm Hole Case
        if(config.wormhole.value == "random"){
          //ship.yPos = Math.floor(getRandom(0,15) * 8);    
          //ship.xPos = Math.floor(getRandom(0,15) * 8);
          
          ship.yPos = getRandom(0,128) * 8;    //The value passed in getRandom is subject to change
          ship.xPos = getRandom(0,128) * 8;
        } else if (config.wormhole.value == "fixed"){   //Fixed worm hole case
          ship.yPos = 50 * 8;
          ship.xPos = 50 * 8;
        }
      addVisitedPoint(visitedPoints, ship.xPos, ship.yPos)
      }
      ship.nearBy = "";
      ship.onLand = "";
      sessionStorage.setItem("ship", JSON.stringify(ship));
      sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
      updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits, ship.health);
    }
  }
  checkOrbitRange(ship);
  //save state
  //sessionStorage.setItem("ship", JSON.stringify(ship));
  //sessionStorage.setItem("visitedPoints", JSON.stringify(visitedPoints));
  //update the status fields with these changes
  //updateStatus(ship.xpos, ship.ypos, ship.energy, ship.supplies, ship.credits);
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

/*  ***********************************************
    saveGame.js

    Allows a user to save and load their game.
    These functions store and load game object variables where the player left off.
*/

function saveGame(ship)
{
  console.log("Saving Game Settings...")
  var game =
  {
    // Ship Settings
    shipXpos: ship.xPos ,
    shipYpos: ship.yPos ,
    shipEnergy: ship.energy ,
    shipSupplies: ship.supplies ,
    shipCredits: ship.credits ,
    shipInOrbit: ship.inOrbit ,
    shipOnLand: ship.onLand 
  }

  localStorage.setItem('saveGame', JSON.stringify(game))
  console.log("Your Game Was Successfully Saved")
}

function loadGame(ship)
{
  console.log(ship)
  console.log("Loading Your Game...")
  var game = JSON.parse(localStorage.getItem('saveGame'))

  ship.xPos = game.shipXpos
  ship.yPos = game.shipYpos
  ship.energy = game.shipEnergy
  ship.supplies = game.shipSupplies
  ship.inOrbit = game.shipInOrbit
  ship.onLand = game.shipOnLand

  console.log("Your Game Was Successfully Loaded!")
  console.log(ship)

  //return ship
}
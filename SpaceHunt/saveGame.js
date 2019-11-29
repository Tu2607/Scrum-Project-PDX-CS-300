
/*********************************************************************
CS300 Fall 2019
Space HuntSave Ship Settings

Main Functions
saveGame() copies data from Session Storage into Local Storage.
loadGame() copies data from Local Storage into Session Storage.
clearGame() erases all Local Storage data.

Trouble Shooting Functions
printSessionStorage() displays Session Storage Data in the Console Log
printLocalStorage() displays Local Storage Data in the Console Log
**********************************************************************/


function saveGame() 
{
  // Check That Local Storage is Supported
  if (typeof (Storage) !== "undefined") 
  {
    // Local Storage is Supported
    console.log('Local Storage Supported\n\n')
    
    // Confirm that the Player wants to Save
    var c = confirm("You're about to save your game.\nAny previously saved games will lost.\nAre you sure?")

    if(c == false)
    {
      return ;
    }

    // Copy Session Storage over to Local Storage    
    console.log("Saving Game Settings...\n\n")
    localStorage.setItem('shipState', sessionStorage.getItem("ship")) 
    localStorage.setItem('spaceState', sessionStorage.getItem("space")) 
    localStorage.setItem('artifactState', sessionStorage.getItem("artifactSet")) 
    localStorage.setItem('visitedState', sessionStorage.getItem("visitedPoints"))
 
    console.log("Your Game Was Successfully Saved\n\n")
  }
  
  else 
  {
    // No web storage Support.
    console.log('Local Storage Not Supported')
  }
}


function loadGame()
{
  // Check That there is Local Storage Data
  if(localStorage === null)
  {
    // If Local Storage is null, the player has no Saved Game Data to Load
    window.alert('You do not have a Saved Game!')
    console.log('There is no Saved Game to Load')
    return
  }
 
  else
  {      
    // Confirm that the Player wants to Load a Saved Game
    var c = confirm("Load your previously saved game.\nAre you sure?")

    if (c == false)
    {
      return
    }

    else
    {
      console.log("Loading Your Game...\n\n")
    
      // Copy Local Storage over to Session Storage
      sessionStorage.setItem('ship', localStorage.getItem('shipState'))
      sessionStorage.setItem('space', localStorage.getItem('spaceState'))
      sessionStorage.setItem('artifactSet', localStorage.getItem('artifactState'))
      sessionStorage.setItem('visitedPoints', localStorage.getItem('visitedState'))

      //update the status fields with loaded game data
      updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits);

      alert("Game Loaded!\nHave Fun!")
      console.log("Your Game Was Successfully Loaded!\n\n")
    }
  }
}


function clearGame()
{
  // Confirm that the Player wants to delete all Saved Game Data
  var c = confirm("This will delete all saved game data.\nAre you sure?")

  if(c == false)
  {
    return
  }

  else
  {
    localStorage.clear()
    alert("Save Data has been destroyed")
  }
}


function printLocalStorage()
{
  console.log("\n\nLocalStorage")
  console.log(localStorage)
}


function printSessionStorage()
{
  console.log("\n\nSession Storage")
  console.log(sessionStorage)
}
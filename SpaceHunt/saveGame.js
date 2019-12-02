
/***********************************************************************************
CS300 Fall 2019
Space HuntSave Ship Settings

Main Functions
saveLoadBegin() initializes the Save Game Objects.
showSaveLoad() reveals the Save Load Menu Buttons.
gameData.saveGame() copies data from Session Storage into Local Storage.
gameData.loadGame() copies data from Local Storage into Session Storage.
gameData.clearGame() erases all Local Storage data.

Trouble Shooting Functions
gameData.printSessionStorage() displays Session Storage Data in the Console Log
gameData.printLocalStorage() displays Local Storage Data in the Console Log
************************************************************************************/

function saveLoadBegin()
{
  // Create an Array for the 3 Save Game Slots
  var array = new Array(3)
  
  for(var i=0; i<array.length;++i)          
    array[i] = new gameData

  return array
}

function showSaveLoad(count)
{
  // By default, the save load menu buttons are set to hidden.
  // This is prevent players from saving data before the game even starts
  document.getElementById("saveLoadMenu").style.visibility = "visible"; 

  // Activate All Save Slots  
  for(var i=1; i<=count; ++i)
  {
    // If there is data in the respective dictionary, then that save slot is not empty
    
    // If the text field says 'change me', we can change it to empty
    if(document.getElementById('saveSlot'+i).value === 'change me')
    {
      document.getElementById('saveSlot'+i).value = 'empty'
    }
  }

  // Restore Save Titles
  if(localStorage.saveSlot1 != null)
  {
    var file = JSON.parse(localStorage.getItem('saveSlot1'))
    document.getElementById('saveSlot1').value = file['title']

    saveList[0].title = file['title']
  }

   if(localStorage.saveSlot2 != null)
  {
    var file = JSON.parse(localStorage.getItem('saveSlot2'))
    document.getElementById('saveSlot2').value = file.title
  }

     if(localStorage.saveSlot3 != null)
  {
    var file = JSON.parse(localStorage.getItem('saveSlot3'))
    document.getElementById('saveSlot3').value = file.title
  }
}


class gameData
{
  title = "empty"
  //file = {}

  saveGame(number) 
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

      do
      {
        // Get the Save File Name
        this.title = prompt('Give your Save Game a Name: ')

        // Bug - If a player enters 'empty' as save name, they won't be able to load/delete save data
        // The load/delete check that title isn't 'empty' before they do anything else
        if (this.title === 'empty' || this.title ===' ') 
        	alert('Are you trying to break our game?\nEnter a valid save name my guy!\n(Anything besides "empty")')
      } while(this.title === 'empty')
      
      // Update the Text Field with User Input
      document.getElementById('saveSlot'+number).value = this.title
 
      // Copy Session Storage Data into Dictionary
      var file = 
      {
        ship: sessionStorage.getItem('ship') ,
        space: sessionStorage.getItem("space") ,
        artifactSet: sessionStorage.getItem("artifactSet") ,
        visitedPoints: sessionStorage.getItem("visitedPoints") ,
        slot: number ,
        title: this.title
      }

      // Copy Dictionary into Local Storage
      localStorage.setItem('saveSlot'+number, JSON.stringify(file))

      // Print Data in Console for Debugging
      console.log("Your Game Was Successfully Saved\n\n")
      this.printLocalStorage()
      this.printSessionStorage()
    }
    
    else 
    {
      // No web storage Support.
      console.log('Local Storage Not Supported')
    }
  }


  loadGame(i)
  {  
    // Check That there is Local Storage Data
    this.title = document.getElementById('saveSlot'+i).value
    
    if(this.title === 'empty')
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
        var file = JSON.parse(localStorage.getItem('saveSlot'+i))

        sessionStorage.setItem('ship', file.ship)
        sessionStorage.setItem('space', file.space)
        sessionStorage.setItem('artifactSet', file.artifactSet)
        sessionStorage.setItem('visitedPoints', file.visitedPoints)

        //update the status fields with loaded game data
        updateStatus(ship.xPos, ship.yPos, ship.energy, ship.supplies, ship.credits);

        alert("Game Loaded!\nHave Fun!")
        console.log("Your Game Was Successfully Loaded!\n\n")
	this.printLocalStorage()
	this.printSessionStorage()
      }
    }
  }


  clearGame(i)
  {
    this.title = document.getElementById('saveSlot'+i).value

    // Check That there is Game to Delete
    if(this.title === 'empty')
    {
      // If Local Storage is null, the player has no Saved Game Data to Delete
      window.alert('There is no Saved Game to Delete!')
      console.log('There is no Saved Game to Delete')
      return
    }

    else
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
	this.printLocalStorage()
	this.printSessionStorage()
        // Reset Save Slot Value
        document.getElementById('saveSlot'+i).value = 'empty'
        this.title = document.getElementById('saveSlot'+i).value

        // Erase Cookies
        //eatCookie('saveSlot'+i)
      }
    }
  }


  printLocalStorage()
  {
    console.log("\n\nLocalStorage")
    console.log(localStorage)
  }


  printSessionStorage()
  {
    console.log("\n\nSession Storage")
    console.log(sessionStorage)
  }
}
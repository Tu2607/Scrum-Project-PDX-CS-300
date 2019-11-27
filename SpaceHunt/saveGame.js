
/*  *******************************************************
Save Ship Settings
    ******************************************************* */
function saveGame() {
  if (typeof (Storage) !== "undefined") {
    // Code for localStorage
    console.log('Local Storage Supported\n\n')
  }
  else {
    // No web storage Support.
    console.log('Local Storage Not Supported')
  }
  console.log("Saving Game Settings...\n\n")

  // Copy Session Storage over to Local Storage
  localStorage.setItem('shipState', sessionStorage.getItem("ship")) 
  localStorage.setItem('spaceState', sessionStorage.getItem("space")) 
  localStorage.setItem('artifactState', sessionStorage.getItem("artifactSet")) 
  localStorage.setItem('visitedState', sessionStorage.getItem("visitedPoints"))
 
  console.log("Your Game Was Successfully Saved\n\n")
}

function loadGame()
{
  console.log("Loading Your Game...\n\n")
  
  // Copy Local Storage over to Session Storage
  sessionStorage.setItem('ship', localStorage.getItem('shipState'))
  sessionStorage.setItem('space', localStorage.getItem('spaceState'))
  sessionStorage.setItem('artifactSet', localStorage.getItem('artifactState'))
  sessionStorage.setItem('visitedPoints', localStorage.getItem('visitedState'))

  console.log("Your Game Was Successfully Loaded!\n\n")
}

// Print Functions for Testing Local Storage and Session Storage

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
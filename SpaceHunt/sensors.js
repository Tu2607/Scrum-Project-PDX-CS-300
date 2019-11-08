//sensors.js
//Sensors shows nearby celestial objects

//Player uses sensors
//2% of supplies are consuemed
//all CO's(celestial objects) within two CP(Celestial Points) are displayed
//CO's within two CP are added to Celestial Map



//When the player uses sensors this function is called
//it consumed 2% of supplies, then check if supplies over 0
//if successfull all CO's within 2 CP's are added to the map and displayed
//list of 'celestial artificats' will be passed in also
function sensor(ship, artifacts){

    removeSupplies(ship);

    var artifacts = [ {type: "Xenon", location: {x: 1, y: 1} },
    {type: "Celarion", location: {x: 2, y: 4}},
    {type: "Ryzen", location: {x: 3, y: 2}},
    {type: "astriod", location: {x: 0, y: 0}},
    {type: "astriod", location: {x: 5, y: 6}},
    ]


    checkArtifacts(ship,artifacts)
   
    return
}

//iterates through list of CO's checking if any are less then 2 away
function checkArtifacts(ship, artifacts){

    for(artifact in artifacts){

        if(checkDistance(atrifact) <= 2){
            //displayArtifact(artifact);
        }
    }
}

//function to check distance 
//compares atrifacts location and players location
function checkDistance(ship, artifact){
    // ifship.location - artifact.location <= 2
    //return true

    // else
        //return false
}


function removeSupplies(ship){
    //Remove 2% supplies
    ship.supplies -= 2;

    //checkSupplies function in RunnintOutOfSupplies
    checkSupplies();
    //or do this 
//    if (ship.supplies <= 0){
        //call game over function
        //temporary alert to handle "game over"
  //      alert("GAMEOVER");
 //   }
    return
}
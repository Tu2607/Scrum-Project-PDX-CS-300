
//sensors.js
//Sensors shows nearby celestial objects

//Player uses sensors
//2% of supplies are consuemed
//all CO's(celestial objects) within two CP(Celestial Points) are displayed
//CO's within two CP are added to Celestial Map
//artifacts are celestial objects


//When the player uses sensors this function is called
//it consumed 2% of supplies, then check if supplies over 0
//if successfull all CO's within 2 CP's are added to the map and displayed
//list of 'celestial artificats' will be passed in also
function sensor() {

    //use the most recent status of game
    var ship = JSON.parse(sessionStorage.getItem("ship"));
    var artifacts = JSON.parse(sessionStorage.getItem("artifactSet"));

    //removes supplies, and checks supplies ammount
    if(config.cheatMode.checked == false){
        removeSupplies(ship);
    }
    else {
        //Remove 2% supplies
        //ship.supplies -= 2;
        useSupplies(ship, 2);
        sensorStatus(ship.supplies);
    }
    //displays celestial objects within 2 Celestial points.
    //hightlight area scanned
    checkArtifacts(ship, artifacts)

    draw();
    return;
}

//iterates through list of CO's checking if any are less then 2 away
function checkArtifacts(ship, artifacts) {


    //iterate through each object in artifacts
    for(let i = 0; i < artifacts.length; i++){
        artifact = artifacts[i];

        //if distance is <= 2
        if(checkDistance(ship, artifact) <= 2*8){
            //visiblility set to true so next time it will be drawn
            artifact.visibility = true;
            //testing
            console.log(artifact.name + " Appeared on the sensor")
        }
    }
	
    //in case the visibility of any arfifacts were set to true, save state
	sessionStorage.setItem("artifactSet", JSON.stringify(artifacts));
}

//function to check distance 
//compares artifacts location and players location
function checkDistance(ship, artifact){

    //gets the x and y from ship location and artifact
    let x1 = ship.xPos;
    let x2 = artifact.xPos;
    let y1 = ship.yPos;
    let y2 = artifact.yPos;

    //returns the distance between ship and the artifact
    console.log(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

//waiting on checkSupplies() to be implimented
function removeSupplies(ship){

    //Remove 2% supplies
    //ship.supplies -= 2;
    useSupplies(ship, 2);
    sensorStatus(ship.supplies);

    //checks if supplies remain
    checkSupplies(ship);
    
    return;
}




//sensors.js
//Sensors shows nearby celestial objects

//Player uses sensors
//2% of supplies are consuemed
//all CO's(celestial objects) within two CP(Celestial Points) are displayed
//CO's within two CP are added to Celestial Map
//artifacts are celestial objects

/*------------------------------------------------------------
Missing Functionality:

- Variable
Variable names are just placeholders
Once ship and artifacts/Celestial Objects are created
will need to make sure varables work

- checkArtifact()
Needs a function to add and display celestial object to celestial map

--------------------------------------------------------------*/

/*

//When the player uses sensors this function is called
//it consumed 2% of supplies, then check if supplies over 0
//if successfull all CO's within 2 CP's are added to the map and displayed
//list of 'celestial artificats' will be passed in also
function sensor(ship, artifacts, canvas){

    //removes supplies, and checks supplies ammount
    removeSupplies(ship);

    //displays celestial objects within 2 Celestial points.
    //hightlight area scanned
    checkArtifacts(ship,artifacts, canvas)
   
    return
}

//iterates through list of CO's checking if any are less then 2 away
function checkArtifacts(ship, artifacts, canvas){

    //iterate through each object in artifacts
    for(let i = 0; i < artifacts.length; i++){
        artifact = artifacts[i];

        //if distance is <= 2
        if(checkDistance(ship, artifact) <= 2){
            //visiblility set to true so next time it will be drawn
            artifact.visibility = true;
            //testing
            console.log(artifact.name + " Appeared on the sensor")
            //draws artifact on map
            drawArtifact(artifact, canvas);
            
        }
    }
    return
}

//function to check distance 
//compares artifacts location and players location
function checkDistance(ship, artifact){

    //gets the x and y from ship location and artifact
    let x1 = ship.x;
    let x2 = artifact.xPos;
    let y1 = ship.y;
    let y2 = artifact.yPos;

    //returns the distance between ship and the artifact
    console.log(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

//waiting on checkSupplies() to be implimented
function removeSupplies(ship){
    //Remove 2% supplies
    ship.supplies -= 2;
    //checks if supplies remain
    ship.checkSupplies();
    return
}
*/
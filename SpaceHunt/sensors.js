//Sensors shows nearby celestial objects

//Player uses sensors
//2% of supplies are consuemed
//all CO's(celestial objects) within two CP(Celestial Points) are displayed
//CO's within two CP are added to Celestial Map

//When the player uses sensors this function is called
//it consumed 2% of supplies, then check if supplies over 0
//if successfull all CO's within 2 CP's are added to the map and displayed
function sensor(ship){
    
    //Remove 2% supplies
    ship.supplies -= 2;
    if (ship.supplies <= 0){
        //call game over function
    }
    else{

        //add CO to map and display them
        //check to make sure they are added

    }
    


    return
}
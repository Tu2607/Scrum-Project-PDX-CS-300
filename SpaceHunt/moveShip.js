// Ship Movement Function
// When a Player moves the Ship their location, energy, and supplies are modified

function moveShip(angle, dist)
{
	/*
	Update Location
	*/



	/* 
	Update Energy
	Energy is reduced by 10 * Distance
	*/



	/*
	Update Supplies
	Supplies are reduced by 2% on each move (regardless of distance?)
	*/
}


// Ship Object for Testing
var ship = 
{
	// Variable Starter Pack
	energy: 100 ,
	supplies: 100 ,
	
	status()
        {
		return this.energy + " " this.supplies
        }
} 
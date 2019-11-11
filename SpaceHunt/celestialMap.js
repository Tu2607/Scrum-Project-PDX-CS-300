// celestialMap.js

// an object of the game

// stores every CP that the ship visits
// stores every CO that the ship encounters

function celestialMap
{
	storeCP = function(x, y)
	{
		// gets ship location from canvas, store in visited[]
	}
	storeCO = function(co, radius)
	{
		// invoked by sensor
		// gets ship location from canvas, stores in visited[]
		// makes the CO visible on map
	}
	getCOatCP = function(x, y)
	{
		// returns name of artifact at (x,y);
	}
	getMap = function()
	{
		// returns an array of (coordinate, artifact);
	}
}
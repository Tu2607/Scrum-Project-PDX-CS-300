class Artifact {
  constructor(xPos, yPos, name, color, visible) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.name = name;
    this.color = color;
    this.visibility = visible;
  }
}

/*
class planetCoords {
	constructor(){
		this.xPos = 0;
		this.yPos = 0;
	}
	push(xPos,yPos){
		this.xPos = xPos;
		this.yPos = yPos;
	}
}

function getRandom(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkCoords(array){
	for(var a = 0; i < array.length; ++a){
		for(var b = 0; b <array.length; ++b){
			if (b == a)
				continue;
			while(array[a].xPos == array[b].xPos && array[a].yPos == array[b].yPos){
				array[b].xPos = getRandom(min,max) * 8;
				array[b].yPos = getRandom(min,max) * 8;
			}
		}
	}
	return array;
}

//This function create an array of coordinates for planet
function randomGenerator(min,max){
	var Planets = new planetCoords();

	for(var i = 0; i < 14; ++i){	//Push for 14 planets
		var x = getRandom(min,max) * 8;
		var y = getRandom(min,max) * 8;
		
		Planets.push(x,y);	//Update the coordinate
	}	
	var newPlanet = checkCoords(Planets); // A check for coordinate duplication
	return newPlanet;
}

function buildArtifactSet(cheatMode, artifactSet)
{
	var coordsArray = randomGenerator(space.xSize, space.ySize);

	artifactSet.push(new Artifact(admin.xeniac.value, admin.yeniac.value, "eniac", "orange", true));
	artifactSet.push(new Artifact(coordsArray[0].xPos, coordsArray[0].yPos, "moon", "white", true));
	artifactSet.push(new Artifact(coordsArray[1].xPos, coordsArray[1].yPos, 128, "celeron", "yellow", true));
	artifactSet.push(new Artifact(coordsArray[2].xPos, coordsArray[2].yPos, "ryzen", "red", true));
	artifactSet.push(new Artifact(coordsArray[3].xPos, coordsArray[3].yPos, "xeon", "blue", true));
	if(cheatMode)
	{
		artifactSet.push(new Artifact(coordsArray[4].xPos, coordsArray[4].yPos, "pentium 1", "purple", true));
		artifactSet.push(new Artifact(coordsArray[5].xPos, coordsArray[5].yPos, "pentium 2", "purple", true));
		artifactSet.push(new Artifact(coordsArray[6].xPos, coordsArray[6].yPos, "pentium 3", "purple", true));
		artifactSet.push(new Artifact(coordsArray[7].xPos, coordsArray[7].yPos, "pentium 4", "purple", true));
		artifactSet.push(new Artifact(coordsArray[8].xPos, coordsArray[8].yPos, "pentium 5", "purple", true));
		artifactSet.push(new Artifact(coordsArray[9].xPos, coordsArray[9].yPos, "pentium 6", "purple", true));
		artifactSet.push(new Artifact(coordsArray[10].xPos, coordsArray[10].yPos, "pentium 7", "purple", true));
		artifactSet.push(new Artifact(coordsArray[11].xPos, coordsArray[11].yPos, "asteroid 1", "brown", true));
		artifactSet.push(new Artifact(coordsArray[12].xPos, coordsArray[12].yPos, "asteroid 2", "brown", true));
		artifactSet.push(new Artifact(coordsArray[13].xPos, coordsArray[13].yPos, "asteroid 3", "brown", true));
		artifactSet.push(new Artifact(coordsArray[14].xPos, coordsArray[14].yPos, "asteroid 4", "brown", true));
	}
	else
	{

		artifactSet.push(new Artifact(coordsArray[4].xPos, coordsArray[4].yPos, "pentium 1", "purple", true));
		artifactSet.push(new Artifact(coordsArray[5].xPos, coordsArray[5].yPos, "pentium 2", "purple", true));
		artifactSet.push(new Artifact(coordsArray[6].xPos, coordsArray[6].yPos, "pentium 3", "purple", true));
		artifactSet.push(new Artifact(coordsArray[7].xPos, coordsArray[7].yPos, "pentium 4", "purple", true));
		artifactSet.push(new Artifact(coordsArray[8].xPos, coordsArray[8].yPos, "pentium 5", "purple", true));
		artifactSet.push(new Artifact(coordsArray[9].xPos, coordsArray[9].yPos, "pentium 6", "purple", true));
		artifactSet.push(new Artifact(coordsArray[10].xPos, coordsArray[10].yPos, "pentium 7", "purple", true));
		artifactSet.push(new Artifact(coordsArray[11].xPos, coordsArray[11].yPos, "asteroid 1", "brown", true));
		artifactSet.push(new Artifact(coordsArray[12].xPos, coordsArray[12].yPos, "asteroid 2", "brown", true));
		artifactSet.push(new Artifact(coordsArray[13].xPos, coordsArray[13].yPos, "asteroid 3", "brown", true));
		artifactSet.push(new Artifact(coordsArray[14].xPos, coordsArray[14].yPos, "asteroid 4", "brown", true));
	}
}
*/

function buildArtifacts(artifactSet)
{
    while(artifactSet.pop());   // THIS BECAUSE WE WANT THE OLD ONE OUTTA HERE!!

    artifactSet.push(new Artifact((admin.xeniac.value*8), ( (128 - admin.yeniac.value)*8), "eniac", "orange", true));
    artifactSet.push(new Artifact((admin.xmoon.value*8), ((128 - admin.ymoon.value)*8), "moon", "white", true));
    artifactSet.push(new Artifact((admin.xceleron.value*8), ((128 - admin.yceleron.value)*8), "celeron", "yellow", true));
    artifactSet.push(new Artifact((admin.xryzen.value*8), ((128 - admin.yryzen.value)*8), "ryzen", "red", true));
    artifactSet.push(new Artifact((admin.xxeon.value*8), ((128 - admin.yxeon.value)*8), "xeon", "blue", true));
    artifactSet.push(new Artifact((admin.xpentium1.value*8), ((128 - admin.ypentium1.value)*8), "pentium 1", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium2.value*8), ((128 - admin.ypentium2.value)*8), "pentium 2", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium3.value*8), ((128 - admin.ypentium3.value)*8), "pentium 3", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium4.value*8), ((128 - admin.ypentium4.value)*8), "pentium 4", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium5.value*8), ((128 - admin.ypentium5.value)*8), "pentium 5", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium6.value*8), ((128 - admin.ypentium6.value)*8), "pentium 6", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium7.value*8), ((128 - admin.ypentium7.value)*8), "pentium 7", "purple", false));
    artifactSet.push(new Artifact((admin.xasteroid1.value*8), ((128 - admin.yasteroid1.value)*8), "asteroid 1", "#8B4513", false));
    artifactSet.push(new Artifact((admin.xasteroid2.value*8), ((128 - admin.yasteroid2.value)*8), "asteroid 2", "#8B4513", false));
    artifactSet.push(new Artifact((admin.xasteroid3.value*8), ((128 - admin.yasteroid3.value)*8), "asteroid 3", "#8B4513", false));
    artifactSet.push(new Artifact((admin.xasteroid4.value*8), ((128 - admin.yasteroid4.value)*8), "asteroid 4", "#8B4513", false));
}

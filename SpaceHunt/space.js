class Point {
	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}
}

class Space {
	constructor(xSize, ySize) {
		this.xSize = xSize;
		this.ySize = ySize;
		this.size = 0;
		if(xSize == ySize)
			this.size = xSize;

		this.step = this.size/32;
	}
}

class BaxMax {
	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}
}

function addVisitedPoint(visitedPoints, xPos, yPos)
{
	visitedPoints.push(new Point(xPos, yPos));
}

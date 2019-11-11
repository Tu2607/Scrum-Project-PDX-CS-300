function Space(xSize, ySize)
{
	this.xSize = xSize;
	this.ySize = ySize;
	this.size = 0;
	if(xSize == ySize)
		this.size = xSize;

	this.step = this.size/32;

	return this;
}

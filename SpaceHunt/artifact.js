class Artifact {
  constructor(xPos, yPos, name, color, visible) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.name = name;
    this.color = color;
    this.visibility = visible;
  }
}

function buildArtifactSet(cheatMode, artifactSet)
{
	artifactSet.push(new Artifact(64, 64, "eniac", "orange", true));
	artifactSet.push(new Artifact(0, 0, "moon", "white", true));
	artifactSet.push(new Artifact(256, 128, "celeron", "yellow", true));
	artifactSet.push(new Artifact(512, 256, "ryzen", "red", true));
	artifactSet.push(new Artifact(576, 576, "xeon", "blue", true));
	if(cheatMode)
	{
		artifactSet.push(new Artifact(704, 704, "pentium 1", "purple", true));
		artifactSet.push(new Artifact(640, 768, "pentium 2", "purple", true));
		artifactSet.push(new Artifact(640, 960, "pentium 3", "purple", true));
		artifactSet.push(new Artifact(768, 640, "pentium 4", "purple", true));
		artifactSet.push(new Artifact(768, 832, "pentium 5", "purple", true));
		artifactSet.push(new Artifact(832, 896, "pentium 6", "purple", true));
		artifactSet.push(new Artifact(832, 768, "pentium 7", "purple", true));
		artifactSet.push(new Artifact(344, 344, "asteroid 1", "grey", true));
		artifactSet.push(new Artifact(152, 448, "asteroid 2", "grey", true));
		artifactSet.push(new Artifact(648, 648, "asteroid 3", "grey", true));
		artifactSet.push(new Artifact(600, 72, "asteroid 4", "grey", true));
	}
	else
	{
		artifactSet.push(new Artifact(704, 704, "pentium 1", "purple", false));
		artifactSet.push(new Artifact(640, 768, "pentium 2", "purple", false));
		artifactSet.push(new Artifact(640, 960, "pentium 3", "purple", false));
		artifactSet.push(new Artifact(768, 640, "pentium 4", "purple", false));
		artifactSet.push(new Artifact(768, 832, "pentium 5", "purple", false));
		artifactSet.push(new Artifact(832, 896, "pentium 6", "purple", false));
		artifactSet.push(new Artifact(832, 896, "pentium 5", "purple", false));
		artifactSet.push(new Artifact(832, 768, "pentium 7", "purple", false));
		artifactSet.push(new Artifact(344, 344, "asteroid 1", "grey", false));
		artifactSet.push(new Artifact(152, 448, "asteroid 2", "grey", false));
		artifactSet.push(new Artifact(648, 648, "asteroid 3", "grey", false));
		artifactSet.push(new Artifact(600, 72, "asteroid 4", "grey", false));
	}
}

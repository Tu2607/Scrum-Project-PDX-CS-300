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
	artifactSet.push(new Artifact(admin.xeniac.value, admin.yeniac.value, "eniac", "orange", true));
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
function buildArtifacts(artifactSet)
{
    while(artifactSet.pop());   // THIS BECAUSE WE WANT THE OLD ONE OUTTA HERE!!

    artifactSet.push(new Artifact(admin.xeniac.value, admin.yeniac.value, "eniac", "orange", true));
    artifactSet.push(new Artifact(admin.xmoon.value, admin.ymoon.value, "moon", "white", true));
    artifactSet.push(new Artifact(admin.xceleron.value, admin.yceleron.value, "celeron", "yellow", true));
    artifactSet.push(new Artifact(admin.xryzen.value, admin.yryzen.value, "ryzen", "red", true));
    artifactSet.push(new Artifact(admin.xxeon.value, admin.yxeon.value, "xeon", "blue", true));
    artifactSet.push(new Artifact(admin.xpentium1.value, admin.ypentium1.value, "pentium 1", "purple", false));
    artifactSet.push(new Artifact(admin.xpentium2.value, admin.ypentium2.value, "pentium 2", "purple", false));
    artifactSet.push(new Artifact(admin.xpentium3.value, admin.ypentium3.value, "pentium 3", "purple", false));
    artifactSet.push(new Artifact(admin.xpentium4.value, admin.ypentium4.value, "pentium 4", "purple", false));
    artifactSet.push(new Artifact(admin.xpentium5.value, admin.ypentium5.value, "pentium 5", "purple", false));
    artifactSet.push(new Artifact(admin.xpentium6.value, admin.ypentium6.value, "pentium 6", "purple", false));
    artifactSet.push(new Artifact(admin.xpentium7.value, admin.ypentium7.value, "pentium 7", "purple", false));
    artifactSet.push(new Artifact(admin.xasteroid1.value, admin.yasteroid1.value, "asteroid 1", "grey", false));
    artifactSet.push(new Artifact(admin.xasteroid2.value, admin.yasteroid2.value, "asteroid 2", "grey", false));
    artifactSet.push(new Artifact(admin.xasteroid3.value, admin.yasteroid3.value, "asteroid 3", "grey", false));
    artifactSet.push(new Artifact(admin.xasteroid4.value, admin.yasteroid4.value, "asteroid 4", "grey", false));
}

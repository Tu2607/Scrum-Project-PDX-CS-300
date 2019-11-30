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
		artifactSet.push(new Artifact(344, 344, "asteroid 1", "brown", true));
		artifactSet.push(new Artifact(152, 448, "asteroid 2", "brown", true));
		artifactSet.push(new Artifact(648, 648, "asteroid 3", "brown", true));
		artifactSet.push(new Artifact(600, 72, "asteroid 4", "brown", true));
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
		artifactSet.push(new Artifact(344, 344, "asteroid 1", "brown", false));
		artifactSet.push(new Artifact(152, 448, "asteroid 2", "brown", false));
		artifactSet.push(new Artifact(648, 648, "asteroid 3", "brown", false));
		artifactSet.push(new Artifact(600, 72, "asteroid 4", "brown", false));
	}
}
function buildArtifacts(artifactSet)
{
    while(artifactSet.pop());   // THIS BECAUSE WE WANT THE OLD ONE OUTTA HERE!!

    artifactSet.push(new Artifact((admin.xeniac.value*8), ( admin.yeniac.value*8), "eniac", "orange", true));
    artifactSet.push(new Artifact((admin.xmoon.value*8), ((admin.ymoon.value*8)), "moon", "white", true));
    artifactSet.push(new Artifact((admin.xceleron.value*8), (admin.yceleron.value*8), "celeron", "yellow", true));
    artifactSet.push(new Artifact((admin.xryzen.value*8), (admin.yryzen.value*8), "ryzen", "red", true));
    artifactSet.push(new Artifact((admin.xxeon.value*8), (admin.yxeon.value*8), "xeon", "blue", true));
    artifactSet.push(new Artifact((admin.xpentium1.value*8), (admin.ypentium1.value*8), "pentium 1", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium2.value*8), (admin.ypentium2.value*8), "pentium 2", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium3.value*8), (admin.ypentium3.value*8), "pentium 3", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium4.value*8), (admin.ypentium4.value*8), "pentium 4", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium5.value*8), (admin.ypentium5.value*8), "pentium 5", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium6.value*8), (admin.ypentium6.value*8), "pentium 6", "purple", false));
    artifactSet.push(new Artifact((admin.xpentium7.value*8), (admin.ypentium7.value*8), "pentium 7", "purple", false));
    artifactSet.push(new Artifact((admin.xasteroid1.value*8), (admin.yasteroid1.value*8), "asteroid 1", "#8B4513", false));
    artifactSet.push(new Artifact((admin.xasteroid2.value*8), (admin.yasteroid2.value*8), "asteroid 2", "#8B4513", false));
    artifactSet.push(new Artifact((admin.xasteroid3.value*8), (admin.yasteroid3.value*8), "asteroid 3", "#8B4513", false));
    artifactSet.push(new Artifact((admin.xasteroid4.value*8), (admin.yasteroid4.value*8), "asteroid 4", "#8B4513", false));
}

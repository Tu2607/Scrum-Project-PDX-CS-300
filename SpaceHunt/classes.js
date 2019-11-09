class Ship {
  constructor(energy, supplies) {
    this.energy = energy;
    this.supplies = supplies;
  }
  
  checkSupplies() {
    if (this.supplies < 1) {
      alert("You've run out of supplies! Game over.");
    }
  }
  
  checkEnergy() {
    if (this.energy < 1) {
      alert("You've run out of energy! Game over.");
    }
  }
}

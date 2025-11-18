export class GameState {
  constructor(defaultMapId) {
    this.currentMapId = defaultMapId;
    this.map = null;
    this.player = { x: 0, y: 0 };
    this.keys = {};
    this.lastFrame = null;
    this.dragging = false;
    this.movementEnabled = false;
    this.labelMode = false;
    this.filterIndex = -1;
  }

  setMap(map) {
    this.map = map;
  }

  setPlayerPosition(x, y) {
    this.player.x = x;
    this.player.y = y;
  }

  markDragging(active) {
    this.dragging = active;
  }

  toggleMovement() {
    this.movementEnabled = !this.movementEnabled;
    return this.movementEnabled;
  }

  toggleLabelMode() {
    this.labelMode = !this.labelMode;
    return this.labelMode;
  }

  cycleFilter(totalSuits) {
    if (totalSuits <= 0) {
      this.filterIndex = -1;
      return this.filterIndex;
    }
    this.filterIndex = (this.filterIndex + 1) % (totalSuits + 1);
    if (this.filterIndex === totalSuits) {
      this.filterIndex = -1;
    }
    return this.filterIndex;
  }

  registerKey(key) {
    this.keys[key] = true;
  }

  releaseKey(key) {
    this.keys[key] = false;
  }

  resetLastFrame(ts) {
    this.lastFrame = ts;
  }
}

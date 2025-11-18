import { DETECTION_RADIUS } from "../core/constants.js";

export class HudController {
  constructor(posLabel, mapLabel, locationLabel) {
    this.posLabel = posLabel;
    this.mapLabel = mapLabel;
    this.locationLabel = locationLabel;
    this.isHovering = false;
  }

  updatePosition(player) {
    if (!this.posLabel) return;
    this.posLabel.textContent = `x:${Math.round(player.x)} y:${Math.round(player.y)}`;
  }

  updateMapName(name) {
    if (!this.mapLabel) return;
    this.mapLabel.textContent = name || "";
  }

  updateNearestLocation(locations, player, isDragging) {
    if (!this.locationLabel) return;
    let nearest = null;
    let bestDist = Infinity;
    locations.forEach((loc) => {
      const dist = Math.hypot(player.x - loc.x, player.y - loc.y);
      if (dist < bestDist) {
        bestDist = dist;
        nearest = loc;
      }
    });

    if (nearest && bestDist < DETECTION_RADIUS) {
      this.locationLabel.textContent = nearest.label;
    } else if (!isDragging && !this.isHovering) {
      this.locationLabel.textContent = "";
    }
  }

  showHover(text) {
    if (!this.locationLabel) return;
    this.isHovering = !!text;
    this.locationLabel.textContent = text || "";
  }

  clearHover() {
    this.isHovering = false;
    if (this.locationLabel) {
      this.locationLabel.textContent = "";
    }
  }
}

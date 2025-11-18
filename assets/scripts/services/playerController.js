import { PLAYER_SPEED } from "../core/constants.js";

export class PlayerController {
  constructor(state, mapRenderer, hudController, playerEl) {
    this.state = state;
    this.mapRenderer = mapRenderer;
    this.hud = hudController;
    this.playerEl = playerEl;
    this.dragOffset = { x: 0, y: 0 };
  }

  bindPointerDrag() {
    if (!this.playerEl) return;
    this.playerEl.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      this.playerEl.setPointerCapture(event.pointerId);
      this.state.markDragging(true);
      this.dragOffset.x = event.clientX;
      this.dragOffset.y = event.clientY;
    });

    this.playerEl.addEventListener("pointermove", (event) => {
      if (!this.state.dragging) return;
      const dx = event.clientX - this.dragOffset.x;
      const dy = event.clientY - this.dragOffset.y;
      this.state.player.x += dx;
      this.state.player.y += dy;
      this.dragOffset.x = event.clientX;
      this.dragOffset.y = event.clientY;
      this.mapRenderer.clampPlayer();
      this.mapRenderer.centerOnPlayer();
      this.hud.updatePosition(this.state.player);
    });

    this.playerEl.addEventListener("pointerup", (event) => {
      this.state.markDragging(false);
      try {
        this.playerEl.releasePointerCapture(event.pointerId);
      } catch {
        /* noop */
      }
    });
  }

  update(dt) {
    if (!this.state.movementEnabled) return;
    let dx = 0;
    let dy = 0;
    const keys = this.state.keys;

    if (keys["arrowup"] || keys["w"]) dy -= 1;
    if (keys["arrowdown"] || keys["s"]) dy += 1;
    if (keys["arrowleft"] || keys["a"]) dx -= 1;
    if (keys["arrowright"] || keys["d"]) dx += 1;

    if (!dx && !dy) return;

    const length = Math.hypot(dx, dy) || 1;
    this.state.player.x += (dx / length) * PLAYER_SPEED * dt;
    this.state.player.y += (dy / length) * PLAYER_SPEED * dt;
    this.mapRenderer.clampPlayer();
    this.mapRenderer.centerOnPlayer();
  }

  setMovementVisibility(isVisible) {
    if (!this.playerEl) return;
    this.playerEl.style.display = isVisible ? "block" : "none";
  }
}

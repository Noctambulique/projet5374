export class MapPanController {
  constructor(viewport, mapEl) {
    this.viewport = viewport;
    this.mapEl = mapEl;
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };
    this.mapStart = { x: 0, y: 0 };
  }

  bind() {
    if (!this.viewport || !this.mapEl) return;

    this.viewport.addEventListener("pointerdown", (event) => {
      if (
        event.target.classList.contains("marker") ||
        event.target.classList.contains("label-marker")
      ) {
        return;
      }

      this.isPanning = true;
      this.panStart.x = event.clientX;
      this.panStart.y = event.clientY;

      const style = window.getComputedStyle(this.mapEl);
      const matrix = new DOMMatrixReadOnly(style.transform);
      this.mapStart.x = matrix.m41;
      this.mapStart.y = matrix.m42;

      this.viewport.setPointerCapture(event.pointerId);
    });

    this.viewport.addEventListener("pointermove", (event) => {
      if (!this.isPanning) return;
      const dx = event.clientX - this.panStart.x;
      const dy = event.clientY - this.panStart.y;

      const viewportWidth = this.viewport.clientWidth;
      const viewportHeight = this.viewport.clientHeight;
      const mapWidth = this.mapEl.clientWidth;
      const mapHeight = this.mapEl.clientHeight;

      let newX = this.mapStart.x + dx;
      let newY = this.mapStart.y + dy;

      newX = Math.min(0, Math.max(viewportWidth - mapWidth, newX));
      newY = Math.min(0, Math.max(viewportHeight - mapHeight, newY));

      this.mapEl.style.transform = `translate(${newX}px, ${newY}px)`;
    });

    this.viewport.addEventListener("pointerup", (event) => {
      this.isPanning = false;
      try {
        this.viewport.releasePointerCapture(event.pointerId);
      } catch {
        /* noop */
      }
    });
  }
}

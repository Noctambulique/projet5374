import { CLICK_RADIUS } from "../core/constants.js";

export class MapRenderer {
  constructor({ mapEl, playerEl }, state, config, handlers = {}) {
    this.mapEl = mapEl;
    this.playerEl = playerEl;
    this.state = state;
    this.maps = config.maps;
    this.locations = config.locations;
    this.suits = config.suits;
    this.customCursors = config.customCursors;
    this.handlers = handlers;
  }

  load(mapIdOrObject) {
    const mapObj =
      typeof mapIdOrObject === "string" ? this.maps[mapIdOrObject] : mapIdOrObject;
    if (!mapObj) {
      console.error("Map introuvable :", mapIdOrObject);
      return null;
    }

    this.state.setMap(mapObj);
    this.state.currentMapId = mapObj.id || mapIdOrObject;

    if (this.mapEl) {
      this.mapEl.style.width = `${mapObj.width}px`;
      this.mapEl.style.height = `${mapObj.height}px`;
      this.mapEl.style.backgroundImage = `url("${mapObj.bg}")`;
      this.mapEl.style.backgroundSize = "cover";
    }

    this.renderMarkers();
    this.clampPlayer();
    this.centerOnPlayer();
    return mapObj;
  }

  renderMarkers() {
    if (!this.mapEl) return;

    this.clearMarkers();
    let filtered = this.locations;

    if (this.state.filterIndex >= 0) {
      const suit = this.suits[this.state.filterIndex];
      filtered = this.locations.filter(
        (loc) => loc.label && loc.label.includes(suit)
      );
    }

    filtered.forEach((loc, idx) => {
      const marker = this.state.labelMode
        ? this.createLabelMarker(loc)
        : this.createImageMarker(loc);
      if (!marker) return;

      marker.style.left = `${loc.x}px`;
      marker.style.top = `${loc.y}px`;
      marker.dataset.idx = String(idx);

      marker.addEventListener("click", (event) => {
        event.stopPropagation();
        this.handlers.onLocationSelected?.(loc);
      });

      if (this.handlers.onMarkerHover) {
        marker.addEventListener("mouseenter", () =>
          this.handlers.onMarkerHover(loc.label || "")
        );
        marker.addEventListener("mouseleave", () =>
          this.handlers.onMarkerHover("")
        );
      }

      this.mapEl.appendChild(marker);
    });
  }

  createLabelMarker(loc) {
    const element = document.createElement("div");
    element.className = "label-marker";
    element.textContent = loc.label;
    element.style.position = "absolute";
    element.style.transform = "translate(-50%, -50%)";
    element.style.padding = "4px 8px";
    element.style.borderRadius = "6px";
    element.style.background = "rgba(0,0,0,0.6)";
    element.style.color = "white";
    element.style.fontSize = "14px";
    element.style.whiteSpace = "nowrap";
    return element;
  }

  createImageMarker(loc) {
    const element = document.createElement("img");
    element.src = loc.img;
    element.className = "marker";
    const cssValue = getComputedStyle(document.documentElement).getPropertyValue(
      "--marker-size"
    );
    let size = parseInt(cssValue, 10);
    if (Number.isNaN(size)) {
      size = loc.size || 90;
    } else if (loc.size) {
      size = loc.size;
    }
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.marginLeft = `calc(${size}px / -2)`;
    element.style.marginTop = `calc(${size}px / -2)`;
    element.style.objectFit = "contain";
    return element;
  }

  clearMarkers() {
    if (!this.mapEl) return;
    const oldMarkers = this.mapEl.querySelectorAll(".marker, .label-marker");
    oldMarkers.forEach((node) => node.remove());
  }

  showCustomCursors() {
    if (!this.customCursors?.length) return;
    this.clearMarkers();

    this.customCursors.forEach((cursor, idx) => {
      const el = document.createElement("img");
      el.src = cursor.icon;
      el.className = "marker";
      el.style.width = "48px";
      el.style.height = "48px";
      el.style.marginLeft = "calc(48px / -2)";
      el.style.marginTop = "calc(48px / -2)";
      el.style.left = `${cursor.x}px`;
      el.style.top = `${cursor.y}px`;
      el.dataset.idx = String(idx);

      el.addEventListener("click", (event) => {
        event.stopPropagation();
        this.handlers.onCursorPreview?.(cursor.image);
      });

      if (this.handlers.onMarkerHover) {
        el.addEventListener("mouseenter", () =>
          this.handlers.onMarkerHover(cursor.image)
        );
        el.addEventListener("mouseleave", () =>
          this.handlers.onMarkerHover("")
        );
      }

      this.mapEl?.appendChild(el);
    });
  }

  getClosestLocation(x, y) {
    let best = null;
    let bestDist = Infinity;
    this.locations.forEach((loc) => {
      const dist = Math.hypot(x - loc.x, y - loc.y);
      if (dist < bestDist) {
        bestDist = dist;
        best = loc;
      }
    });
    return { location: best, distance: bestDist };
  }

  handleMapClick(x, y, radius = CLICK_RADIUS) {
    const { location, distance } = this.getClosestLocation(x, y);
    if (location && distance <= radius) {
      this.handlers.onLocationSelected?.(location);
    }
  }

  centerOnPlayer() {
    if (!this.mapEl || !this.state.map) return;
    const viewport = this.mapEl.parentElement;
    if (!viewport) return;

    const vpW = viewport.clientWidth;
    const vpH = viewport.clientHeight;
    const mapW = this.mapEl.clientWidth;
    const mapH = this.mapEl.clientHeight;

    let offsetX = vpW / 2 - this.state.player.x;
    let offsetY = vpH / 2 - this.state.player.y;

    offsetX = Math.min(0, Math.max(vpW - mapW, offsetX));
    offsetY = Math.min(0, Math.max(vpH - mapH, offsetY));

    this.mapEl.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    if (this.playerEl) {
      this.playerEl.style.left = `${this.state.player.x}px`;
      this.playerEl.style.top = `${this.state.player.y}px`;
    }
  }

  clampPlayer() {
    if (!this.state.map) return;
    this.state.player.x = Math.max(
      0,
      Math.min(this.state.map.width, this.state.player.x)
    );
    this.state.player.y = Math.max(
      0,
      Math.min(this.state.map.height, this.state.player.y)
    );
  }
}

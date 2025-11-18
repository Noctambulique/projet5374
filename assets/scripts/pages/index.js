
import { DEFAULT_MAP_ID, MAPS, LOCATIONS, CUSTOM_CURSORS, SUITS } from "../config/mapConfig.js";
import { elements } from "../core/dom.js";
import { GameState } from "../core/state.js";
import { ModalService } from "../services/modalService.js";
import { MapRenderer } from "../services/mapRenderer.js";
import { HudController } from "../services/hudController.js";
import { PlayerController } from "../services/playerController.js";
import { MapPanController } from "../services/mapPanController.js";
import { registerInputShortcuts } from "../services/inputManager.js";

const state = new GameState(DEFAULT_MAP_ID);
const hud = new HudController(elements.posLabel, elements.mapNameLabel, elements.locationLabel);
const modalService = new ModalService(elements.modal, elements.modalImage);
modalService.bindCloseBehaviour();

const mapRenderer = new MapRenderer(
  { mapEl: elements.map, playerEl: elements.player },
  state,
  {
    maps: MAPS,
    locations: LOCATIONS,
    suits: SUITS,
    customCursors: CUSTOM_CURSORS
  },
  {
    onLocationSelected: handleLocationSelection,
    onMarkerHover: (text) => {
      if (text) {
        hud.showHover(text);
      } else {
        hud.clearHover();
      }
    },
    onCursorPreview: (src) => modalService.show(src)
  }
);

const playerController = new PlayerController(state, mapRenderer, hud, elements.player);
const panController = new MapPanController(elements.viewport, elements.map);
registerInputShortcuts({ state, mapRenderer, playerController, suits: SUITS });

if (elements.map) {
  elements.map.addEventListener("click", handleMapClick);
}

panController.bind();
playerController.bindPointerDrag();
playerController.setMovementVisibility(false);

function handleLocationSelection(location) {
  if (!location) return;
  switch (location.type) {
    case "image":
      modalService.show(location.link);
      break;
    case "document":
    case "external":
      window.open(location.link, "_blank", "noopener");
      break;
    case "map":
      if (MAPS[location.link]) {
        const loadedMap = mapRenderer.load(location.link);
        const mapName = loadedMap ? loadedMap.name || loadedMap.id || "" : "";
        hud.updateMapName(mapName);
      } else if (location.link && location.link.endsWith(".html")) {
        window.location.href = location.link;
      } else {
        console.warn("Map cible introuvable :", location.link);
      }
      break;
    default:
      if (location.link) {
        window.location.href = location.link;
      }
  }
}

function handleMapClick(event) {
  if (!elements.map) return;
  const rect = elements.map.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  mapRenderer.handleMapClick(x, y);
}

function animate(timestamp) {
  if (!state.lastFrame) {
    state.resetLastFrame(timestamp);
  }
  const delta = (timestamp - state.lastFrame) / 1000;
  state.resetLastFrame(timestamp);
  playerController.update(delta);
  hud.updatePosition(state.player);
  hud.updateNearestLocation(LOCATIONS, state.player, state.dragging);
  requestAnimationFrame(animate);
}

function init() {
  const initialMap = mapRenderer.load(DEFAULT_MAP_ID);
  if (initialMap) {
    state.setPlayerPosition(initialMap.width / 2, initialMap.height / 2);
    mapRenderer.centerOnPlayer();
    hud.updateMapName(initialMap.name || initialMap.id || "");
  }
  hud.updatePosition(state.player);
  hud.updateNearestLocation(LOCATIONS, state.player, false);
  requestAnimationFrame(animate);
}

init();


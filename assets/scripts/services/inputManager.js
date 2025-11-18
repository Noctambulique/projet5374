export function registerInputShortcuts({
  state,
  mapRenderer,
  playerController,
  suits
}) {
  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();

    if (key === "a") {
      const enabled = state.toggleMovement();
      playerController.setMovementVisibility(enabled);
      return;
    }

    if (key === "b") {
      state.toggleLabelMode();
      mapRenderer.renderMarkers();
      return;
    }

    if (key === "c") {
      state.cycleFilter(suits.length);
      mapRenderer.renderMarkers();
      return;
    }

    if (key === "d") {
      mapRenderer.showCustomCursors();
      return;
    }

    if (state.movementEnabled) {
      state.registerKey(key);
    }
  };

  const handleKeyUp = (event) => {
    const key = event.key.toLowerCase();
    state.releaseKey(key);
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}

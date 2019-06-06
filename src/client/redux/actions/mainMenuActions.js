export function closeDrawer() {
  return {
    type: 'CLOSE_DRAWER',
  };
}
export function openDrawer() {
  return {
    type: 'OPEN_DRAWER',
  };
}

export function setCurrentCards(currentCards) {
  return {
    type: 'SET_CURRENT_CARDS',
    currentCards,
  };
}

export function setLevels(levels) {
  return {
    type: 'SET_LEVELS',
    levels,
  };
}

export function resetGame() {
  return {
    type: 'RESET_GAME',
  };
}

export function toggleSpotifyWidget() {
  return {
    type: 'TOGGLE_SPOTIFY_WIDGET',
  };
}

export function toggleCardMatchCount(cardMatchCount) {
  return {
    type: 'TOGGLE_CARD_MATCH',
    cardMatchCount,
  };
}

export function persistRehydrate(payload) {
  return {
    type: 'PERSIST_REHYDRATE',
    payload,
  };
}

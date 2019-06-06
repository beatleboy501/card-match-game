export function addMatch(match) {
  return {
    type: 'ADD_MATCH',
    match,
  };
}

export function addOpenId(openId) {
  return {
    type: 'ADD_OPEN_ID',
    openId,
  };
}

export function resetMemoryGame() {
  return {
    type: 'RESET_MEMORY_GAME',
  };
}

export function setOpenIds(openIds) {
  return {
    type: 'SET_OPEN_IDS',
    openIds,
  };
}

export function setMatchedCards(matchedCards) {
  return {
    type: 'SET_MATCHED_CARDS',
    matchedCards,
  };
}

export function startGame() {
  return {
    type: 'START_GAME',
  };
}

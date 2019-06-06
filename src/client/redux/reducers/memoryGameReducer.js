import { REHYDRATE } from 'redux-persist/lib/constants';
import {
  ADD_MATCH, ADD_OPEN_ID, RESET_MEMORY_GAME, SET_OPEN_IDS,
  SET_MATCHED_CARDS, START_GAME,
} from '../actions/memoryGameActionTypes';

const initialState = {
  openIds: [],
  matchedCards: [],
  isFirstCard: true,
};

export default function memoryGameReducer(state = initialState, action) {
  const { openIds, matchedCards } = state;
  let newCards;
  let newIds;
  switch (action.type) {
    case REHYDRATE:
      if (action.payload && action.payload.memoryGame) {
        return {
          ...action.payload.memoryGame,
          isFirstCard: true,
        };
      }
      return {
        ...state,
      };

    case START_GAME:
      return {
        ...state,
        isFirstCard: false,
      };
    case ADD_MATCH:
      newCards = matchedCards;
      newCards.push(action.match);
      return {
        ...state,
        matchedCards: newCards,
      };
    case ADD_OPEN_ID:
      newIds = openIds;
      newIds.push(action.openId);
      return {
        ...state,
        openIds: newIds,
      };
    case RESET_MEMORY_GAME:
      return {
        openIds: [],
        matchedCards: [],
      };
    case SET_OPEN_IDS:
      return {
        ...state,
        openIds: action.openIds,
      };
    case SET_MATCHED_CARDS:
      return {
        ...state,
        matchedCards: action.matchedCards,
      };
    default:
      return state;
  }
}

import {
  CLOSE_DRAWER, OPEN_DRAWER, RESET_GAME, SET_CURRENT_CARDS,
  SET_LEVELS, TOGGLE_SPOTIFY_WIDGET, TOGGLE_CARD_MATCH, PERSIST_REHYDRATE,
} from '../actions/mainMenuActionTypes';
import { shuffleCards } from '../../utils';
import CardMatchCounts from '../../constants/CardMatchCounts';

const initialState = {
  levels: [],
  currentCards: null,
  isDrawerDisplayed: false,
  isSpotifyWidgetDisplayed: false,
  cardMatchCount: CardMatchCounts.TWO_CARD_MATCH,
  persistedState: null,
};

function assignSingleId(card) {
  return shuffleCards([card], true)[0];
}

function validateCards(cards, matchCount) {
  const distinctCards = cards.reduce((acc, card) => {
    if (!acc.includes(card.value)) acc.push(card.value);
    return acc;
  }, []);
  distinctCards.forEach((card) => {
    const count = cards.reduce((acc, innerCard) => {
      if (innerCard.value === card) return acc + 1;
      return acc;
    }, 0);
    if (count < matchCount) {
      console.info(`not enough ${card} cards in deck for ${matchCount} card match`);
      for (let i = 0; i < (matchCount - count); i += 1) {
        cards.push(assignSingleId(card));
      }
    } else if (count > matchCount) {
      console.info(`too many ${card} cards in deck for ${matchCount} card match`);
      for (let i = 0; i < (count - matchCount); i += 1) {
        cards.splice(cards.lastIndexOf(card), 1);
      }
    }
  });
  return shuffleCards(cards, false);
}

function assignIds(levels) {
  return levels.map((level) => {
    const newLevel = level;
    newLevel.twoCardMatch = validateCards(
      shuffleCards(level.cards, true),
      CardMatchCounts.TWO_CARD_MATCH,
    );
    newLevel.threeCardMatch = validateCards(
      shuffleCards(level.cards, true),
      CardMatchCounts.THREE_CARD_MATCH,
    );
    return newLevel;
  });
}

export default function mainMenuReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_DRAWER:
      return {
        ...state,
        isDrawerDisplayed: false,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        isDrawerDisplayed: true,
      };
    case RESET_GAME:
      return {
        ...state,
      };
    case SET_LEVELS:
      return {
        ...state,
        levels: assignIds(action.levels),
      };
    case SET_CURRENT_CARDS:
      return {
        ...state,
        currentCards: action.currentCards,
      };
    case TOGGLE_SPOTIFY_WIDGET:
      return {
        ...state,
        isSpotifyWidgetDisplayed: !state.isSpotifyWidgetDisplayed,
      };
    case TOGGLE_CARD_MATCH:
      return {
        ...state,
        cardMatchCount: action.cardMatchCount,
      };
    case PERSIST_REHYDRATE:
      return {
        ...state,
        persistedState: action.payload,
      };
    default:
      return state;
  }
}

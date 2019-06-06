import { combineReducers } from 'redux';
import mainMenu from './mainMenuReducer';
import memoryGame from './memoryGameReducer';
import timer from './timerReducer';

const rootReducer = combineReducers({
  mainMenu,
  memoryGame,
  timer,
});

export default rootReducer;

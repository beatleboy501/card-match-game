import { REHYDRATE } from 'redux-persist/lib/constants';
import {
  START_TIMER, STOP_TIMER, RESET_TIMER, SET_DIFF, TICK,
} from '../actions/timerActionTypes';


const initialState = {
  startTime: 0,
  diff: 0,
  interval: 0,
};

export default function timerReducer(state = initialState, action) {
  let incoming;
  switch (action.type) {
    case REHYDRATE:
      incoming = action.payload ? action.payload.timer : null;
      if (incoming) {
        return {
          ...state,
          startTime: +new Date(incoming.startTime),
          diff: new Date(incoming.diff),
        };
      }
      return { ...state };
    case START_TIMER:
      return {
        ...state,
        startTime: action.startTime,
        interval: action.interval,
      };
    case STOP_TIMER:
      return {
        ...state,
        startTime: null,
      };
    case RESET_TIMER:
      return {
        ...state,
        startTime: null,
        diff: null,
        interval: null,
      };
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      };
    case TICK:
      return {
        ...state,
        diff: action.diff,
        interval: action.interval,
      };
    default:
      return {
        ...state,
      };
  }
}

import {LOADING_INDICATOR_START, LOADING_INDICATOR_SET_PERCENT} from '../actions/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function loadingIndicatorReducer(state = initialState.loadingIndicatorStatus, action) {
  switch (action.type) {
    case LOADING_INDICATOR_START:
      return Object.assign({}, state, {
        percent: 0,
        intervalTime: action.interval
      });

    case LOADING_INDICATOR_SET_PERCENT:
      return Object.assign({}, state, {
        percent: action.percent
      });

    default:
      return state;
  }
}

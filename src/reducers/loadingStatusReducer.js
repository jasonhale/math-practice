import {LOADING, LOADING_COMPLETE} from '../actions/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function loadingStatusReducer(ajaxCallsInProgress = initialState.ajaxCallsInProgress, action) {
  switch (action.type) {
    case LOADING:
      return ajaxCallsInProgress + 1;

    case LOADING_COMPLETE:
      return ajaxCallsInProgress - 1;

    default:
      return ajaxCallsInProgress;
  }
}

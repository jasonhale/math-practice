import {combineReducers} from 'redux';
import loadingIndicatorStatus from './loadingIndicatorReducer';
import loadingStatus from './loadingStatusReducer';

// Note that I chose a shorter name above when importing reducers.
// This keeps the calls to these reducers in our container components
// shorter and more natural. Using ES6 short-hand properties below
// (Don't have to repeat myself on the right-hand side when the prop
// and value match)
const rootReducer = combineReducers({
  loadingStatus,
  loadingIndicatorStatus
});

export default rootReducer;

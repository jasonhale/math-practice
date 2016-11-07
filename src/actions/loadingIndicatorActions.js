import * as types from './actionTypes';

export function loadingIndicatorStart(interval) {
  return { type: types.LOADING_INDICATOR_START, interval };
}

export function loadingIndicatorSetPrecent(percent) {
  return { type: types.LOADING_INDICATOR_SET_PERCENT, percent};
}
import { NEW_ISSUE, UPDATE_ISSUE } from '../actions/types';

const initialState = {
  item: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case NEW_ISSUE:
      return {
        ...state,
        item: action.payload
      }
    case UPDATE_ISSUE:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}

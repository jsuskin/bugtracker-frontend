import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import issueReducer from './issueReducer';

export default combineReducers({
  projects: projectReducer,
  issues: issueReducer
});

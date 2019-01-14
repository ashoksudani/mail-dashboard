import { combineReducers } from 'redux';

import db from './db';
import loading from './loading';
import error from './error';
import success from './success';

const appReducer = combineReducers({
  db,
  loading,
  error,
  success
});

export default appReducer;

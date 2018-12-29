import { combineReducers } from 'redux';

import db from './db';
import loading from './loading';
import error from './error';

const appReducer = combineReducers({
  db,
  loading,
  error
});

export default appReducer;

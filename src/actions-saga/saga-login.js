import { call, put } from 'redux-saga/effects';

import * as actions from 'actions';
import api from 'services';

export default function* login(action) {
  try {
    const user = yield call(api.login, action.payload.user);
    yield put(actions.createLoginSuccess(user));
  } catch (error) {
    yield put(actions.createLoginFailure(error));
  }
}

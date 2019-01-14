import { call, put } from 'redux-saga/effects';

import * as actions from 'actions';
import api from 'services';

export function* login(action) {
  try {
    const user = yield call(api.login, action.payload);
    yield put(actions.createLoginSuccess(user));
  } catch (error) {
    yield put(actions.createLoginFailure(error));
  }
}

export function* logout() {
  try {
    const user = yield call(api.logout);
    yield put(actions.createLogoutSuccess(user));
  } catch (error) {
    yield put(actions.createLogoutFailure(error));
  }
}

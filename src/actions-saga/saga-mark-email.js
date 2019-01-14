import { call, put } from 'redux-saga/effects';

import * as actions from 'actions';
import api from 'services';

export default function* markEmail(action) {
  try {
    const response = yield call(api.markEmail, action.payload);
    yield put(actions.createMarkEmailSuccess(response));
  } catch (error) {
    yield put(actions.createMarkEmailFailure(error));
  }
}

import { call, put } from 'redux-saga/effects';

import * as actions from 'actions';
import api from 'services';

export default function* sendEmail(action) {
  try {
    const response = yield call(api.sendEmail, action.payload.email);
    yield put(actions.createSendEmailSuccess(response));
  } catch (error) {
    yield put(actions.createSendEmailFailure(error));
  }
}

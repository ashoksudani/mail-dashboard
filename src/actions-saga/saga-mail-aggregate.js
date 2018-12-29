import { call, put } from 'redux-saga/effects';

import * as actions from 'actions';
import api from 'services';

export default function* mailAggregate(action) {
  try {
    const response = yield call(api.mailAggregate, action.payload.userId);
    yield put(actions.createMailAggregateSuccess(response));
  } catch (error) {
    yield put(actions.createMailAggregateFailure(error));
  }
}

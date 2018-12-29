import * as actionList from 'constants/actions';
import { takeEvery, all } from 'redux-saga/effects';

import sagaLogin from './saga-login';
import sagaMailAggregate from './saga-mail-aggregate';
import sagaSendEmail from './saga-send-email';

export default function* rootSage() {
  yield all([takeEvery(actionList.LOGIN_REQUEST, sagaLogin)]);
  yield all([takeEvery(actionList.SEND_EMAIL_REQUEST, sagaSendEmail)]);
  yield all([takeEvery(actionList.MAIL_AGGREGATE_REQUEST, sagaMailAggregate)]);
}

import * as actionList from 'constants/actions';
import { takeEvery, all } from 'redux-saga/effects';

import { login, logout } from './saga-login';
import sagaMailAggregate from './saga-mail-aggregate';
import sagaSendEmail from './saga-send-email';
import sagaMarkEmail from './saga-mark-email';

export default function* rootSage() {
  yield all([
    takeEvery(actionList.LOGIN_REQUEST, login),
    takeEvery(actionList.LOGOUT_REQUEST, logout),
    takeEvery(actionList.MAIL_AGGREGATE_REQUEST, sagaMailAggregate),
    takeEvery(actionList.SEND_EMAIL_REQUEST, sagaSendEmail),
    takeEvery(actionList.MARK_EMAIL_REQUEST, sagaMarkEmail)
  ]);
}

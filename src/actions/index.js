import * as actionList from 'constants/actions';

const createSuccessActionFor = (actionType, response) => ({
  type: actionType,
  payload: {
    response: response
  }
});

const createFailureActionFor = (actionType, response) => ({
  type: actionType,
  payload: {
    message: response.message
  }
});

export const createLoginRequest = user => ({
  type: actionList.LOGIN_REQUEST,
  payload: { user: user }
});

export const createLoginSuccess = response =>
  createSuccessActionFor(actionList.LOGIN_SUCCESS, response);

export const createLoginFailure = response =>
  createFailureActionFor(actionList.LOGIN_FAILURE, response);

export const createMailAggregateRequest = userId => ({
  type: actionList.MAIL_AGGREGATE_REQUEST,
  payload: { userId: userId }
});

export const createMailAggregateSuccess = response =>
  createSuccessActionFor(actionList.MAIL_AGGREGATE_SUCCESS, response);

export const createMailAggregateFailure = response =>
  createFailureActionFor(actionList.MAIL_AGGREGATE_FAILURE, response);

export const createSendEmailRequest = email => ({
  type: actionList.SEND_EMAIL_REQUEST,
  payload: { email: email }
});

export const createSendEmailSuccess = response =>
  createSuccessActionFor(actionList.SEND_EMAIL_SUCCESS, response);

export const createSendEmailFailure = response =>
  createFailureActionFor(actionList.SEND_EMAIL_FAILURE, response);

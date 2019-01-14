import * as actionList from 'constants/actions';

const createSuccessActionFor = (actionType, response) => ({
  type: actionType,
  payload: {
    response
  }
});

const createFailureActionFor = (actionType, response) => ({
  type: actionType,
  payload: {
    message: response.message
  }
});

//Login flow actions
export const createLoginRequest = user => ({
  type: actionList.LOGIN_REQUEST,
  payload: { user }
});

export const createLogoutRequest = user => ({
  type: actionList.LOGOUT_REQUEST
});

export const createLoginSuccess = response =>
  createSuccessActionFor(actionList.LOGIN_SUCCESS, response);

export const createLoginFailure = response =>
  createFailureActionFor(actionList.LOGIN_FAILURE, response);

export const createLogoutSuccess = response =>
  createSuccessActionFor(actionList.LOGOUT_SUCCESS, response);

export const createLogoutFailure = response =>
  createFailureActionFor(actionList.LOGOUT_FAILURE, response);

//Mail dashboard aggregate actions
export const createMailAggregateRequest = userId => ({
  type: actionList.MAIL_AGGREGATE_REQUEST,
  payload: { userId }
});
export const createMailAggregateSuccess = response =>
  createSuccessActionFor(actionList.MAIL_AGGREGATE_SUCCESS, response);

export const createMailAggregateFailure = response =>
  createFailureActionFor(actionList.MAIL_AGGREGATE_FAILURE, response);

//Send email actions
export const createSendEmailRequest = email => ({
  type: actionList.SEND_EMAIL_REQUEST,
  payload: { email }
});

export const createSendEmailSuccess = response =>
  createSuccessActionFor(actionList.SEND_EMAIL_SUCCESS, response);

export const createSendEmailFailure = response =>
  createFailureActionFor(actionList.SEND_EMAIL_FAILURE, response);

//Mark email actions
export const createMarkEmailRequest = (emailId, markAs) => ({
  type: actionList.MARK_EMAIL_REQUEST,
  payload: { emailId, markAs }
});

export const createMarkEmailSuccess = response =>
  createSuccessActionFor(actionList.MARK_EMAIL_SUCCESS, response);

export const createMarkEmailFailure = response =>
  createFailureActionFor(actionList.MARK_EMAIL_FAILURE, response);

//clear messages
export const createClearMessages = () => ({
  type: actionList.CLEAR_MESSAGES
});

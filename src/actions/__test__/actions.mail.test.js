import * as actions from '../index';
import * as actionList from 'constants/actions';

const sampleObj = {
  test: 'test'
};

test('createSendEmailRequest should create correct actino payload', () => {
  const actionCreatedPayload = actions.createSendEmailRequest(sampleObj);

  const expectedPayload = {
    type: actionList.SEND_EMAIL_REQUEST,
    payload: {
      email: sampleObj
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createSendEmailSuccess should create correct actino payload', () => {
  const actionCreatedPayload = actions.createSendEmailSuccess(sampleObj);

  const expectedPayload = {
    type: actionList.SEND_EMAIL_SUCCESS,
    payload: {
      response: sampleObj
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createSendEmailFailure should create correct actino payload', () => {
  const actionCreatedPayload = actions.createSendEmailFailure({
    message: 'Failure'
  });

  const expectedPayload = {
    type: actionList.SEND_EMAIL_FAILURE,
    payload: {
      message: 'Failure'
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createMarkEmailRequest should create correct actino payload', () => {
  const actionCreatedPayload = actions.createMarkEmailRequest(
    'sampleEmail',
    'unread'
  );

  const expectedPayload = {
    type: actionList.MARK_EMAIL_REQUEST,
    payload: { emailId: 'sampleEmail', markAs: 'unread' }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createMarkEmailSuccess should create correct actino payload', () => {
  const actionCreatedPayload = actions.createMarkEmailSuccess(sampleObj);

  const expectedPayload = {
    type: actionList.MARK_EMAIL_SUCCESS,
    payload: {
      response: sampleObj
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createMarkEmailFailure should create correct actino payload', () => {
  const actionCreatedPayload = actions.createMarkEmailFailure({
    message: 'Failure'
  });

  const expectedPayload = {
    type: actionList.MARK_EMAIL_FAILURE,
    payload: {
      message: 'Failure'
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createClearMessages should create correct actino payload', () => {
  const actionCreatedPayload = actions.createClearMessages();

  const expectedPayload = {
    type: actionList.CLEAR_MESSAGES
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

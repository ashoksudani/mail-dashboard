import * as actions from '../index';
import * as actionList from 'constants/actions';

const sampleObj = {
  test: 'test'
};

test('createLoginRequest should create correct actino payload', () => {
  expect(actions.createLoginRequest(sampleObj)).toMatchObject({
    type: actionList.LOGIN_REQUEST,
    payload: {
      user: sampleObj
    }
  });
});

test('createLoginSuccess should create correct actino payload', () => {
  const actionCreatedPayload = actions.createLoginSuccess(sampleObj);

  const expectedPayload = {
    type: actionList.LOGIN_SUCCESS,
    payload: {
      response: sampleObj
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createLoginFailure should create correct actino payload', () => {
  const actionCreatedPayload = actions.createLoginFailure({
    message: 'Failure'
  });

  const expectedPayload = {
    type: actionList.LOGIN_FAILURE,
    payload: {
      message: 'Failure'
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createLogoutRequest should create correct actino payload', () => {
  const actionCreatedPayload = actions.createLogoutRequest(sampleObj);

  const expectedPayload = {
    type: actionList.LOGOUT_REQUEST
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createLogoutSuccess should create correct actino payload', () => {
  const actionCreatedPayload = actions.createLogoutSuccess(sampleObj);

  const expectedPayload = {
    type: actionList.LOGOUT_SUCCESS,
    payload: {
      response: sampleObj
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createLogoutFailure should create correct actino payload', () => {
  const actionCreatedPayload = actions.createLogoutFailure({
    message: 'Failure'
  });

  const expectedPayload = {
    type: actionList.LOGOUT_FAILURE,
    payload: {
      message: 'Failure'
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

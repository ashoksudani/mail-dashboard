import { login, logout } from '../saga-login';
import { call, put } from 'redux-saga/effects';

import api from 'services';
import * as actions from 'actions';

jest.mock('services', () => {
  return {
    login: function() {},
    logout: function() {}
  };
});

test('saga login calls right api with passed argument for successfull request', () => {
  const action = { type: 'LOGIN_SAGA', payload: 'payload' };
  const iterator = login(action);

  const expectedRequestResult = iterator.next().value;
  expect(expectedRequestResult).toStrictEqual(call(api.login, action.payload));

  const expectedSuccessResult = iterator.next().value;
  expect(expectedSuccessResult).toStrictEqual(
    put(actions.createLoginSuccess(api.login()))
  );
});

test('saga login calls right api with passed argument for failed request', () => {
  const action = { type: 'LOGIN_SAGA', payload: 'payload' };
  const iterator = login(action);

  iterator.next();

  const expectedFailureResult = iterator.throw(new Error('login failure'))
    .value;
  expect(expectedFailureResult).toStrictEqual(
    put(actions.createLoginFailure(new Error('login failure')))
  );
});

test('saga logout calls right api with passed argument for successfull request', () => {
  const logoutSaga = logout();

  const expectedRequestResult = logoutSaga.next().value;
  expect(expectedRequestResult).toStrictEqual(call(api.logout));

  const expectedSuccessResult = logoutSaga.next().value;
  expect(expectedSuccessResult).toStrictEqual(
    put(actions.createLogoutSuccess(api.logout()))
  );
});

test('saga logout calls right api with passed argument for failed request', () => {
  const iterator = logout();

  iterator.next();

  const expectedFailureResult = iterator.throw(new Error('logout failure'))
    .value;
  expect(expectedFailureResult).toStrictEqual(
    put(actions.createLogoutFailure(new Error('logout failure')))
  );
});

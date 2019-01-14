import sendEmail from '../saga-send-email';
import { call, put } from 'redux-saga/effects';

import api from 'services';
import * as actions from 'actions';

jest.mock('services', () => {
  return {
    sendEmail: function() {}
  };
});

test('saga send email calls right api with passed argument for successfull request', () => {
  const action = { payload: 'payload' };
  const iterator = sendEmail(action);

  const expectedRequestResult = iterator.next().value;
  expect(expectedRequestResult).toStrictEqual(
    call(api.sendEmail, action.payload)
  );

  const expectedSuccessResult = iterator.next().value;
  expect(expectedSuccessResult).toStrictEqual(
    put(actions.createSendEmailSuccess(api.sendEmail()))
  );
});

test('saga send email calls right api with passed argument for failed request', () => {
  const action = { payload: 'payload' };
  const iterator = sendEmail(action);

  iterator.next();

  const expectedFailureResult = iterator.throw(
    new Error('send email request failure')
  ).value;
  expect(expectedFailureResult).toStrictEqual(
    put(actions.createSendEmailFailure(new Error('send email request failure')))
  );
});

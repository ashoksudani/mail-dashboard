import markEmail from '../saga-mark-email';
import { call, put } from 'redux-saga/effects';

import api from 'services';
import * as actions from 'actions';

jest.mock('services', () => {
  return {
    markEmail: function() {}
  };
});

test('saga mark email calls right api with passed argument for successfull request', () => {
  const action = { payload: 'payload' };
  const iterator = markEmail(action);

  const expectedRequestResult = iterator.next().value;
  expect(expectedRequestResult).toStrictEqual(
    call(api.markEmail, action.payload)
  );

  const expectedSuccessResult = iterator.next().value;
  expect(expectedSuccessResult).toStrictEqual(
    put(actions.createMarkEmailSuccess(api.markEmail()))
  );
});

test('saga mark email calls right api with passed argument for failed request', () => {
  const action = { payload: 'payload' };
  const iterator = markEmail(action);

  iterator.next();

  const expectedFailureResult = iterator.throw(
    new Error('mark email request failure')
  ).value;
  expect(expectedFailureResult).toStrictEqual(
    put(actions.createMarkEmailFailure(new Error('mark email request failure')))
  );
});

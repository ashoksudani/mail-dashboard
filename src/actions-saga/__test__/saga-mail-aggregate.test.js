import mailAggregate from '../saga-mail-aggregate';
import { call, put } from 'redux-saga/effects';

import api from 'services';
import * as actions from 'actions';

jest.mock('services', () => {
  return {
    mailAggregate: function() {}
  };
});

test('saga mail aggregate calls right api with passed argument for successfull request', () => {
  const action = { payload: 'payload' };
  const iterator = mailAggregate(action);

  const expectedRequestResult = iterator.next().value;
  expect(expectedRequestResult).toStrictEqual(
    call(api.mailAggregate, action.payload)
  );

  const expectedSuccessResult = iterator.next().value;
  expect(expectedSuccessResult).toStrictEqual(
    put(actions.createMailAggregateSuccess(api.mailAggregate()))
  );
});

test('saga mail aggregate calls right api with passed argument for failed request', () => {
  const action = { payload: 'payload' };
  const iterator = mailAggregate(action);

  iterator.next();

  const expectedFailureResult = iterator.throw(
    new Error('mail aggregate request failure')
  ).value;
  expect(expectedFailureResult).toStrictEqual(
    put(
      actions.createMailAggregateFailure(
        new Error('mail aggregate request failure')
      )
    )
  );
});

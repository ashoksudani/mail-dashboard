import successReducer from '../success';
import * as actions from 'actions';

test('it should clear messages for CLEAR_MESSAGE action', () => {
  const clearMessageAction = actions.createClearMessages();

  const state = {
    SEND_EMAIL: 'Mail sent successfully'
  };

  const newState = successReducer(state, clearMessageAction);

  expect(newState).toEqual({});
});

test('it should not create messages for FAILURE action', () => {
  const failureAction = actions.createSendEmailFailure({
    message: 'send failure'
  });

  const newState = successReducer({}, failureAction);

  expect(newState['SEND_EMAIL']).toEqual('');
});

test('it should create messages for SUCCESS action', () => {
  const successAction = actions.createSendEmailSuccess({
    message: 'send success'
  });

  const newState = successReducer({}, successAction);

  expect(newState['SEND_EMAIL']).toEqual('send success');
});

import errorReducer from '../error';
import * as actions from 'actions';

test('it should clear messages for CLEAR_MESSAGE action', () => {
  const clearMessageAction = actions.createClearMessages();

  const state = {
    SEND_EMAIL: 'Mail sent successfully'
  };

  const newState = errorReducer(state, clearMessageAction);

  expect(newState).toEqual({});
});

test('it should create messages for FAILURE action', () => {
  const failureAction = actions.createSendEmailFailure({
    message: 'send failure'
  });

  const newState = errorReducer({}, failureAction);

  expect(newState['SEND_EMAIL']).toEqual('send failure');
});

test('it should not create messages for SUCCESS action', () => {
  const successAction = actions.createSendEmailSuccess({
    message: 'send success'
  });

  const newState = errorReducer({}, successAction);

  expect(newState['SEND_EMAIL']).toEqual('');
});

import loadingReducer from '../loading';
import * as actions from 'actions';

test('it should not loading to true for REQUEST action', () => {
  const requestAction = actions.createMailAggregateRequest(1);

  const newState = loadingReducer({}, requestAction);

  expect(newState['MAIL_AGGREGATE']).toEqual(true);
});

test('it should not loading to false for SUCCESS action', () => {
  const requestAction = actions.createMailAggregateRequest(1);
  loadingReducer({}, requestAction);

  const successAction = actions.createMailAggregateSuccess({});
  const newState = loadingReducer({}, successAction);

  expect(newState['MAIL_AGGREGATE']).toEqual(false);
});

test('it should not loading to false for FAILURE action', () => {
  const requestAction = actions.createMailAggregateRequest(1);
  loadingReducer({}, requestAction);

  const failureAction = actions.createMailAggregateFailure({});
  const newState = loadingReducer({}, failureAction);

  expect(newState['MAIL_AGGREGATE']).toEqual(false);
});

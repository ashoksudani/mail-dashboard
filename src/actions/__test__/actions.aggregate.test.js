import * as actions from '../index';
import * as actionList from 'constants/actions';

const sampleObj = {
  test: 'test'
};

test('createMailAggregateRequest should create correct actino payload', () => {
  expect(actions.createMailAggregateRequest(1)).toMatchObject({
    type: actionList.MAIL_AGGREGATE_REQUEST,
    payload: {
      userId: 1
    }
  });
});

test('createMailAggregateSuccess should create correct actino payload', () => {
  const actionCreatedPayload = actions.createMailAggregateSuccess(sampleObj);

  const expectedPayload = {
    type: actionList.MAIL_AGGREGATE_SUCCESS,
    payload: {
      response: sampleObj
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

test('createMailAggregateFailure should create correct actino payload', () => {
  const actionCreatedPayload = actions.createMailAggregateFailure({
    message: 'Failure'
  });

  const expectedPayload = {
    type: actionList.MAIL_AGGREGATE_FAILURE,
    payload: {
      message: 'Failure'
    }
  };

  expect(actionCreatedPayload).toMatchObject(expectedPayload);
});

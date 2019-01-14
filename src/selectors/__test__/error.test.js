import createErrorSelector from '../error';

test('it should create error selector for passed a single action', () => {
  const errorSelector = createErrorSelector('SAMPLE_ACTION');
  const state = { error: { SAMPLE_ACTION: 'error 123' } };
  expect(errorSelector(state)).toEqual(['error 123']);
});

test('it should create error selector for passed multiple action', () => {
  const errorSelector = createErrorSelector([
    'SAMPLE_ACTION',
    'SAMPLE_ACTION_2'
  ]);
  const state = {
    error: { SAMPLE_ACTION: 'error 123', SAMPLE_ACTION_2: 'error 222' }
  };
  expect(errorSelector(state)).toEqual(['error 123', 'error 222']);
});

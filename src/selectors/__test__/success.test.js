import createSuccessSelector from '../success';

test('it should create success selector for passed a single action', () => {
  const successSelector = createSuccessSelector('SAMPLE_ACTION');
  const state = { success: { SAMPLE_ACTION: 'success message' } };
  expect(successSelector(state)).toEqual(['success message']);
});

test('it should create success selector for passed multiple action', () => {
  const successSelector = createSuccessSelector([
    'SAMPLE_ACTION',
    'SAMPLE_ACTION_2'
  ]);
  const state = {
    success: {
      SAMPLE_ACTION: 'success 123',
      SAMPLE_ACTION_2: 'success 222'
    }
  };
  expect(successSelector(state)).toEqual(['success 123', 'success 222']);
});

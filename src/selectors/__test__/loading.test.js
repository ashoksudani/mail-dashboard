import createLoadingSelector from '../loading';

test('it should create loading selector for passed a single action', () => {
  const loadingSelector = createLoadingSelector('SAMPLE_ACTION');
  const state = { loading: { SAMPLE_ACTION: false } };
  expect(loadingSelector(state)).toEqual(false);
});

test('it should create loading selector for passed multiple action', () => {
  const loadingSelector = createLoadingSelector([
    'SAMPLE_ACTION',
    'SAMPLE_ACTION_2'
  ]);
  const state = {
    loading: {
      SAMPLE_ACTION: true,
      SAMPLE_ACTION_2: false
    }
  };
  expect(loadingSelector(state)).toEqual(true);
});

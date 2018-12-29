const errorReducer = (state = {}, action) => {
  const matchers = action.type.match(/(.*)_(REQUEST|SUCCESS|FAILURE)/);

  if (!matchers) {
    return state;
  }

  const [, requestName, requestState] = matchers;

  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? action.payload.message : ''
  };
};

export default errorReducer;

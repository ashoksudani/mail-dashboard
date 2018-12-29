const createErrorSelector = action => state => {
  if (Array.isArray(action)) {
    return action.map(action => state.error[action]);
  }

  return state.error[action];
};

export default createErrorSelector;

const createSuccessSelector = action => state => {
  if (Array.isArray(action)) {
    return action.map(action => state.success[action]);
  }

  return [state.success[action]];
};

export default createSuccessSelector;

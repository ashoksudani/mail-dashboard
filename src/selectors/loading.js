const createLoadingSelector = action => state => {
  if (Array.isArray(action)) {
    return action.some(action => state.loading[action]);
  }
  return state.loading[action];
};

export default createLoadingSelector;

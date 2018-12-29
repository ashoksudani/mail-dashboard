import { createStore, applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import appReducer from 'reducers';
import rootSaga from 'actions-saga';
import defaultDBstate from './bootstrap-db';

const sagaMiddleware = createSagaMiddleware();

const configStore = () => {
  const middleware = [sagaMiddleware];
  let appliedMiddleware;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (process.env.NODE_ENV !== -'production') {
    middleware.push(reduxLogger);
    appliedMiddleware = composeEnhancers(applyMiddleware(...middleware));
  } else {
    appliedMiddleware = applyMiddleware(...middleware);
  }

  const store = createStore(
    appReducer,
    { db: defaultDBstate },
    appliedMiddleware
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configStore;

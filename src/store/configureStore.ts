import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();

  const middleware = [sagaMiddleware, logger];
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV === 'development',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(createStore, {
  debug: process.env.NODE_ENV === 'development',
});

const store = createStore();
// "useSelector()"에서 사용하는 타입
export type RootState = ReturnType<typeof store.getState>;

// "_app.ts"에서 "wrapper.withRedux()"로 감싸주면 됨
export default wrapper;

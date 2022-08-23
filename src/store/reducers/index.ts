import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';
import type { AnyAction, CombinedState } from '@reduxjs/toolkit';

// reducers
import testReducer, { TestStateType } from './testReducer';
import asyncReducer, { AsyncStateType } from './asyncReducer';

// actions
export { testActions } from './testReducer';
export { asyncActions } from './asyncReducer';

type ReducerState = {
  test: TestStateType;
  async: AsyncStateType;
};

const rootReducer = (
  state: any,
  action: AnyAction
): CombinedState<ReducerState> => {
  switch (action.type) {
    // SSR을 위해서 사용 ( "next.js"의 "getServerSideProps()" )
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return combineReducers({
        test: testReducer,
        async: asyncReducer,
      })(state, action);
  }
};

export default rootReducer;

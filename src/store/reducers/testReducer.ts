import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TestStateType {
  number: number;
}

const initialState: TestStateType = {
  number: 0,
};

const actionTypes = {
  SET_COUNTER: 'setCounter',
};

/**
 * "createSlice()"는 액션 타입, 액션 크리에이터, 리듀서를 한 번에 만드는 함수입니다.
 * name: 유니크한 액션을 만들 때 사용
 * initialState: 최초 상태
 * reducers: 리듀서들을 정의
 * PayloadAction로 인자의 타입을 정의해주면 자동완성 지원됨
 */
const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    [actionTypes.SET_COUNTER](
      state,
      { payload }: PayloadAction<{ number: number }>
    ) {
      const { number } = payload;
      state.number = number;
    },
  },
});

// 액션 타입과 액션 크리에이터 대신 사용 ( "dispatch()"에서 사용 => ex) dispatch(postActions.loadPostsRequest({ lastId: 0, limit: 10 })) )
export const testActions = slice.actions;
export default slice.reducer;

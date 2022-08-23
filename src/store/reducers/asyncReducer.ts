import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAsyncStateType, IAsyncTypes, ResponseFailure } from '@/types/store';
import {
  ISearchUserParams,
  ISearchUserResponse,
} from '@/types/store/reducers/async';

export interface AsyncStateType extends IAsyncStateType {
  data: ISearchUserResponse | null;
}

const initialState: AsyncStateType = {
  isLoading: false,
  data: null,
  error: false,
};

const actionTypes: {
  [T in IAsyncTypes]: 'request' | 'success' | 'failer';
} = {
  REQUEST: 'request',
  SUCCESS: 'success',
  FAILER: 'failer',
};

const slice = createSlice({
  name: 'async',
  initialState,
  reducers: {
    [actionTypes.REQUEST](
      state,
      action: PayloadAction<
        ISearchUserParams | ISearchUserResponse | ResponseFailure
      >
    ) {
      state.isLoading = true;
      state.error = false;
    },
    [actionTypes.SUCCESS](
      state,
      { payload }: PayloadAction<ISearchUserResponse>
    ) {
      state.data = payload;
      state.isLoading = false;
    },
    [actionTypes.FAILER](state, action: PayloadAction<ResponseFailure>) {
      state.isLoading = true;
      state.error = false;
    },
  },
});

export const asyncActions = slice.actions;
export default slice.reducer;

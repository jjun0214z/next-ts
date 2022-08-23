import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { asyncActions } from '@/store/reducers';
import axiosInstance from '@/utils/axiosInstance';

import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  ISearchUserParams,
  ISearchUserResponse,
} from '@/types/store/reducers/async';

const fetch = ({ q }: ISearchUserParams) => {
  return axiosInstance.request({
    url: '/search/users',
    method: 'get',
    params: {
      q,
    },
  });
};

function* fetchData(action: PayloadAction<ISearchUserParams>) {
  try {
    // api 요청 및 응답 대기
    const { data }: AxiosResponse<ISearchUserResponse> = yield call(
      fetch,
      action.payload
    );
    // 성공한 액션 디스패치
    yield put(asyncActions.success(data));
  } catch (error: any) {
    const message =
      error.name === 'AxiosError'
        ? error.response.data.message
        : '서버측 에러입니다. \n잠시후에 다시 시도해주세요';

    alert(message);

    // 실패한 액션 디스패치
    yield put(
      asyncActions.failer({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchLoadPosts() {
  // "asyncActions.request"의 요청이 오면 "fetchData()" 실행
  yield takeLatest(asyncActions.request, fetchData);
}

export default function* asyncSaga() {
  yield all([fork(watchLoadPosts)]);
}

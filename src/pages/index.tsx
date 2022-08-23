import { Input } from '@/assets/styles/common/form';
import useInput from '@/hooks/useInput';
import wrapper, { RootState } from '@/store/configureStore';
import { asyncActions, testActions } from '@/store/reducers';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Home: NextPage = () => {
  const handleClick = () => {
    const {
      attr: { value },
      utils: { valid },
    } = input;

    if (!valid) {
      dispatch(testActions.setCounter({ number: Number(value) }));
    } else {
      alert('100이상은 입력할수 없습니다.');
    }
  };

  const handleAsyncClick = () => {
    const {
      attr: { value },
    } = asyncInput;

    dispatch(asyncActions.request({ q: String(value) }));
  };

  const handleValidator = function (value: string | number) {
    return value >= 100;
  };

  const dispatch = useDispatch();
  const { number } = useSelector(({ test }: RootState) => test);
  const { isLoading, data } = useSelector(({ async }: RootState) => async);
  const input = useInput({ validator: handleValidator });
  const asyncInput = useInput();

  return (
    <div>
      store: {number}
      <br />
      input validation: {!input.utils.valid ? 'ok' : 'fail'}
      <br />
      <Input.TEXT type="number" {...input.attr} />
      <button type="button" onClick={handleClick}>
        dispatch
      </button>
      <br />
      <br />
      <Input.TEXT type="text" {...asyncInput.attr} />
      <button type="button" onClick={handleAsyncClick}>
        비동기 dispatch
      </button>
      <br />
      {isLoading && '로딩중'}
      <br />
      {data && `조회결과: ${data.total_count}`}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    ({ dispatch }) =>
      async (context: GetServerSidePropsContext) => {
        dispatch(testActions.setCounter({ number: 10 }));
        return {
          props: {},
        };
      }
  );

export default Home;

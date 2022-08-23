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
import TestComponent from '@/componenrts/atoms/TestComponent';
import { END } from 'redux-saga';

interface IProps {
  q: string;
  number: number;
}

const Home: NextPage<IProps> = (props) => {
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

  useEffect(() => {
    if (props.number) {
      input.utils.setValue(props.number);
    }
    if (props.q) {
      asyncInput.utils.setValue('test');
    }
  }, []);

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
      <TestComponent />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    ({ dispatch, sagaTask }) =>
      async (context: GetServerSidePropsContext) => {
        const props = {
          number: 10,
          q: 'test',
        };
        dispatch(testActions.setCounter({ number: props.number }));
        dispatch(asyncActions.request({ q: props.q }));

        // 밑에 두 개는 REQUEST이후 SUCCESS가 될 때까지 기다려주게 해주는 코드
        dispatch(END);
        await sagaTask.toPromise();
        return {
          props,
        };
      }
  );

export default Home;

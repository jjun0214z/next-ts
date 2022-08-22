import useInput from '@/hooks/useInput';
import wrapper, { RootState } from '@/store/configureStore';
import { testActions } from '@/store/reducers';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { useSelector, useDispatch } from 'react-redux';

const Home: NextPage = () => {
  const handleClick = () => {
    dispatch(testActions.setCounter({ number: number + 1 }));
  };

  const handleValidator = function (value: string | number) {
    if (typeof value === 'string') {
      return value.length > 10;
    }
    return false;
  };

  const dispatch = useDispatch();
  const { number } = useSelector(({ test }: RootState) => test);
  const input = useInput({ validator: handleValidator });

  return (
    <div>
      {number}
      {input.utils.valid ? 'ok' : 'fail'}
      <input type="text" {...input.attr} />
      <button type="button" onClick={handleClick}>
        dispatch
      </button>
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

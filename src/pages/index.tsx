import { Input } from '@/assets/styles/common/form';
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

  const handleValidator = function (value: string | number) {
    return value >= 100;
  };

  const dispatch = useDispatch();
  const { number } = useSelector(({ test }: RootState) => test);
  const input = useInput({ validator: handleValidator });

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

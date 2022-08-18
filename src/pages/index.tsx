import wrapper, { RootState } from '@/store/configureStore';
import { testActions } from '@/store/reducers';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { number } = useSelector(({ test }: RootState) => test);

  const handleClick = () => {
    dispatch(testActions.setCounter({ number: number + 1 }));
  };

  return (
    <div>
      1{number}
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

import type { AppProps } from 'next/app';
import wrapper from '@/store/configureStore';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/assets/styles/theme';
import GlobalStyle from '@/assets/styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);

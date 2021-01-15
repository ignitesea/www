import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { theme } from '../theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

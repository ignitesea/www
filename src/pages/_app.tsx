import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {

}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

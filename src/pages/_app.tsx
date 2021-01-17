import { ReactElement } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme, GOOGLE_FONTS_LOAD } from '../theme';

const FONT_FAMILIES_URL = GOOGLE_FONTS_LOAD.map((f) => `family=${encodeURIComponent(f)}`).join('&');

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href={`https://fonts.googleapis.com/css2?${FONT_FAMILIES_URL}&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider theme={extendTheme(theme)}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

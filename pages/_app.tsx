import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';
import { SessionProvider } from 'next-auth/react'


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';
import 'react-big-calendar/lib/sass/styles.scss'

import Palette from "@mui/material/styles/createPalette";

declare module '@mui/material/styles' {
  interface Palette {
    backgroundLight: string;
    backgroundLighter:string;
    backgroundDarker:string;
  }
  interface Custom {
    events:{
      event:string;
      task:string;
      reminder:string;
    }
  }
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

{/* @ts-ignore custom is not part of theme object*/}
let lightTheme = createTheme(lightThemeOptions);
lightTheme = responsiveFontSizes(lightTheme);


const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SessionProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default MyApp;

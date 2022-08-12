import { ThemeOptions } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import { darken, lighten } from '@mui/material/styles';

const customTheme = {
  background: "#0D1321"
}

const lightThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: customTheme.background,
      paper: customTheme.background
    },
    text:{
      primary:"#F1DEDE"
    },
    primary: {
      main: "#73AB84",
    },
    secondary:{
      main:"#577399"
    },
    error: {
      main: "#FE5F55"
    },
    
    backgroundLight: lighten(customTheme.background, 0.15),
    backgroundLighter: lighten(customTheme.background, 0.25),
  },
  
  typography: {
    fontFamily: [
      '"Baloo 2"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  custom: {
    events: {
      event: '#1982c4',
      task: '#ffca3a',
      reminder: '#ff595e'
    },
  }
};

export default lightThemeOptions;

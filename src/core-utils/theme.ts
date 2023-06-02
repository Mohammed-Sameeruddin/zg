import { createTheme } from '@mui/material/styles';

export const pxToRem = (fontSize: number) => {
  return `${fontSize / 16}rem`;
};

export interface ColorMap {
  [name: string]: string;
}

export const COLORS: ColorMap = {};

const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: ['Slate Pro', 'sans-serif'].join(','),
    h1: {
      fontSize: '28px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '30px',
      letterSpacing: '0.2px',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '26px',
      letterSpacing: '0.2px',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '22px',
      letterSpacing: '0.2px',
    },
    h4: {
      fontSize: '18px',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '20px',
      letterSpacing: '0.2px',
    },
    h5: {
      fontSize: '18px',
      fontWeight: 300,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '20px',
      letterSpacing: '0.1px',
    },

    subtitle1: {
      fontSize: '16px',
      fontWeight: 500,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '18px',
      letterSpacing: '0.1px',
    },
    subtitle2: {
      fontSize: '16px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '18px',
      letterSpacing: '0.1px',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 500,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '14px',
      letterSpacing: '0.3px',
    },
    body1: {
      fontSize: '19px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '16px',
      letterSpacing: '0.1px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.1px',
    },
    button: {
      fontSize: '14px',
      fontWeight: 500,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.2px',
    },
    overline: {
      fontFamily: 'Slate Pro',
      fontSize: '11px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '12px',
      letterSpacing: '0.2px',
    },
  },
  components: {
    //for adding custom themes to components
  },
});
export default theme;

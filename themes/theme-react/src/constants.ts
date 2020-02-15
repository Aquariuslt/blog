/**
 * constants for theme styling
 **/
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const THEME_FONT_FAMILY =
  'Roboto, XHei, -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, Microsoft YaHei,\n' +
  '    WenQuanYi Micro Hei, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';
export const DRAWER_WIDTH = 240;
export const CARD_MAX_WIDTH = 800;

export const TYPE_JSON_LD = 'application/ld+json';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#F5F5F5',
      dark: '#C2C2C2',
      contrastText: '#000000'
    },
    background: {
      paper: '#F8F9FA',
      default: '#F5F5F5'
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        fontFamily: THEME_FONT_FAMILY
      },
      body1: {
        fontFamily: THEME_FONT_FAMILY
      },
      body2: {
        fontFamily: THEME_FONT_FAMILY
      },
      h5: {
        fontFamily: THEME_FONT_FAMILY
      }
    }
  }
});

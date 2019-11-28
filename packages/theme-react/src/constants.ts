/**
 * constants for theme styling
 **/
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

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
  }
});

export const DRAWER_WIDTH = 240;
export const CARD_MAX_WIDTH = 800;
export const COVER_HEIGHT = 200;

export const TYPE_JSON_LD = 'application/ld+json';

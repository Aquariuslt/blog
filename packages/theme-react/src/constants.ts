/**
 * constants for theme styling
 **/
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#FAFAFA',
      dark: '#C7C7C7',
      contrastText: '#000000'
    }
  }
});

export const DRAWER_WIDTH = 240;
export const CARD_MAX_WIDTH = 800;
export const COVER_HEIGHT = 200;

export const TYPE_JSON_LD = 'application/ld+json';

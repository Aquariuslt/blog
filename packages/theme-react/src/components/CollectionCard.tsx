import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CARD_MAX_WIDTH, COVER_HEIGHT } from '@theme-react/constants';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

export interface CollectionCardProps {
  id: string;
  label: string;
  link: string;
  total: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1),
      maxWidth: CARD_MAX_WIDTH,
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1, 0, 0, 0)
      }
    },
    media: {
      height: COVER_HEIGHT
    }
  })
);

export const CollectionCard: React.FC<CollectionCardProps> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea component={RouterLink} to={String(props['link'])}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.label}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            <span>Total:</span>
            <span>{props.total}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

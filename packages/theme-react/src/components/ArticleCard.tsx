import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CARD_MAX_WIDTH, COVER_HEIGHT } from '@theme-react/constants';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';

const useStyles = makeStyles({
  card: {
    maxWidth: CARD_MAX_WIDTH
  },
  media: {
    height: COVER_HEIGHT
  }
});

export const ArticleCard: React.FC<Partial<ArticleContext>> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea component={RouterLink} to={String(props['link'])}>
        <CardMedia className={classes.media} image={props.cover} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

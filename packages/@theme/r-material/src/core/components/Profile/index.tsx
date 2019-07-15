import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

interface ProfileProps {
  name: string;
  avatar: string;
  subtitle: string;
  description: string;
}

const useStyles = makeStyles({
  root: {
    position: 'absolute'
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

const Profile: React.ComponentType<ProfileProps> = (props: ProfileProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Avatar component="div" alt={props.name} src={props.avatar} className={classes.avatar} />
    </Grid>
  );
};

export default Profile;

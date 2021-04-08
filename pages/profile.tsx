import ProfileCard from '../components/profile-card';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: 'inherit',
    paddingTop: '5vh',
    paddingBottom: '5vh'
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <ProfileCard/>
    </Grid>
  )
}

import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      // @ts-ignore
      [theme.breakpoints.up('xs')]: {
        paddingTop: '5vh',
        paddingBottom: '5vh',
      },
      // @ts-ignore
      [theme.breakpoints.down('xs')]: {
        paddingTop: '0',
        paddingBottom: '0',
      },
    },
    chatFrame: {
      height: '100%',
    },
    appBar: {
      height: 60,
      display: 'flex',
      alignItems: 'center',
      // @ts-ignore
      backgroundColor: theme.palette.secondary.dark,
    },
    setting: {
      justifySelf: 'end'
    },
    matcherName: {
      margin: 0
    }
  }),
);

export default function Chat() {
  const classes = useStyles();
  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12} sm={10} md={8}>
        <Paper className={classes.chatFrame}>
          <AppBar position='static' className={classes.appBar}>
            <Toolbar>
              <Typography variant='h5' gutterBottom className={classes.matcherName}>
                轟天旅人
              </Typography>
              <IconButton className={classes.setting}>
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Paper>
      </Grid>
    </Grid>
  );
};

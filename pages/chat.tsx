import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AccountCircle } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { useEffect, useRef } from 'react';

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
      height: '8%',
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
    },
    messageContent: {
      height: '84%',
    },
    messageInput: {
      height: '8%',
    },
    test: {
      height: '30px',
      margin: 0,
    },
    container: {
      flexDirection: 'column-reverse',

    },
  }),
);

export default function Chat() {
  const classes = useStyles();
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollToBottom();
  }, []);

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
          <Grid container className={classes.messageContent}>
            <Scrollbars ref={scrollRef} className={classes.messageContent}>
              <Grid container className={classes.container}>
                <Grid xs={12} className={classes.test}>content1</Grid>
                <Grid xs={12} className={classes.test}>content2</Grid>
                <Grid xs={12} className={classes.test}>content3</Grid>
                <Grid xs={12} className={classes.test}>content4</Grid>
                <Grid xs={12} className={classes.test}>content5</Grid>
                <Grid xs={12} className={classes.test}>content6</Grid>
                <Grid xs={12} className={classes.test}>content7</Grid>
                <Grid xs={12} className={classes.test}>content8</Grid>
                <Grid xs={12} className={classes.test}>content9</Grid>
                <Grid xs={12} className={classes.test}>content10</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
                <Grid xs={12} className={classes.test}>content</Grid>
              </Grid>
            </Scrollbars>
          </Grid>
          <Grid container className={classes.messageInput}>
            content
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

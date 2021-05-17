import { AppBar, Grid, IconButton, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AccountCircle, Send } from '@material-ui/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MessageList } from '../state/atoms';

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
      // height: '100%',
    },
    appBar: {
      height: '6vh',
      display: 'flex',
      alignItems: 'center',
      // @ts-ignore
      backgroundColor: theme.palette.secondary.dark,
    },
    setting: {
      justifySelf: 'end'
    },
    matcherName: {
      margin: 0,
    },
    messageContentBox: {
      [theme.breakpoints.up('xs')]: {
        height: 'calc(100vh - 6vh - 6vh - 5vh)',
        maxHeight: 'calc(100vh - 6vh - 6vh - 15vh - 80px)',
      },
      // @ts-ignore
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100vh - 6vh - 6vh)',
        maxHeight: 'calc(100vh - 6vh - 6vh - 80px)',
      },
    },
    messageInput: {
      minHeight: '80px',
      bottom: 0,
      paddingRight: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97bc62ff',
    },
    messageRight: {
      alignItems: 'center',
      minHeight: '70px',
      flexDirection: 'row-reverse',
      padding: '15px',
      paddingLeft: '50px',
      paddingBottom: '0',
    },
    messageLeft: {
      alignItems: 'center',
      minHeight: '70px',
      padding: '15px',
      paddingRight: '50px',
      paddingBottom: '0',
    },
    container: {
      flexDirection: 'column-reverse',
    },
    messageContentRight: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#aadd77ff',
      padding: '10px',
      minHeight: '50px',
      minWidth: '50px',
      borderRadius: '20px 20px 0 15px',
      wordBreak: 'break-all',
      wordWrap: 'break-word',
    },
    messageContentLeft: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#dbdbdb',
      padding: '10px',
      minHeight: '50px',
      minWidth: '50px',
      borderRadius: '15px 20px 20px 0',
      wordBreak: 'break-all',
      wordWrap: 'break-word',
    },
    textField: {
      width: '80%',
      backgroundColor: '#aadd77ff',
    },
    sendMessage: {
      color: '#000000',
      opacity: 0.5,
      cursor: 'pointer',
    },
    bottomRow: {
      display: 'absolute',
    }
  }),
);

function Message ({action, type, content}) {
  const classes = useStyles();
  let messageBody;
  if (type === 'text') {
    messageBody = (<Grid container className={action === 'receive' ? classes.messageLeft : classes.messageRight}>
      <div className={action === 'receive' ? classes.messageContentLeft : classes.messageContentRight}>
        <span>{content}</span>
      </div>
    </Grid>);
  } else if (type === 'image') {
    messageBody = 'image';
  }
  return <>
    {messageBody}
  </>;
}

export default function Chat() {
  const classes = useStyles();
  const scrollRef = useRef();
  const messageList = useRecoilValue(MessageList);
  const setMessageList = useSetRecoilState(MessageList);
  const messageListContent = messageList.map(({timestamp, ...msgProps}) => {
    return <Message key={timestamp} {...msgProps}/>
  });
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    // @ts-ignore
    scrollRef.current.scrollToBottom();
  }, []);

  const sendHandler = () => {
    setInputValue('');
    setMessageList([
      ...messageList,
      {
        timestamp: Date.now(),
        type: 'text',
        action: 'send',
        content: inputValue
      },
    ]);
  };

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12} sm={10} md={6}>
        <Paper className={classes.chatFrame}>
          <AppBar position='static' className={classes.appBar}>
            <Toolbar>
              <Typography gutterBottom className={classes.matcherName}>
                轟天旅人
              </Typography>
              <IconButton className={classes.setting}>
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.messageContentBox}>
            <Scrollbars ref={scrollRef}>
              <Grid className={classes.container}>
                {messageListContent}
              </Grid>
            </Scrollbars>
          </Grid>
          <div className={classes.bottomRow}>
            <Grid container className={classes.messageInput}>
              <Grid item container justify='center' xs={10}>
                <TextField
                  multiline
                  size="small"
                  variant='outlined'
                  label='Type a message...'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item container justify='center' xs={2}>
                <Send
                  className={classes.sendMessage}
                  onClick={sendHandler}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

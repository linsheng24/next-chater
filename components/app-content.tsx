import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MatcherService from'../customer/services/matcher-service';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '94vh'
  },
  inline: {
    display: 'inline',
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%',
    borderRight: '2px solid rgb(244, 244, 244)',
    background: 'white'
  },
  listItem: {
    borderLeft: '5px solid white',
    "&:hover": {
      borderLeft: `5px solid ${theme.palette.secondary.dark}`
    }
  }
}));

function ChatterList() {
  const [matchers, setMatchers] = useState([]);
  const classes = useStyles();

  useEffect(()=>{
    MatcherService.getMatchers().then((data) => {
      setMatchers(data);
    });
  }, []);

  const clickMatcherHandler = id => {
    const newMatchers = matchers.map((matcher) => {
      if (matcher.id === id) {
        return {...matcher, active: true};
      } else {
        return {...matcher, active: false};
      }
    });
    setMatchers(newMatchers);
  };

  const listItems = matchers.map((matcher) => (
    <>
      <ListItem button selected={matcher.active} alignItems='flex-start'  className={classes.listItem} onClick={()=>clickMatcherHandler(matcher.id)}>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src={matcher.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={matcher.name}
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'
              >
              </Typography>
              {matcher.lastMsg}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component='li' />
    </>
  ));
  return (
    <List className={classes.list}>
      <Scrollbars>
        { listItems }
      </Scrollbars>
    </List>
  );
}

export default function AppContent({ children }) {
  console.log(children);
  const classes = useStyles();

  return <>
    <Grid container className={classes.root}>
      <Grid container item xs={3}>
        <ChatterList/>
      </Grid>
      <Grid container item xs={9}>
        {children}
      </Grid>
    </Grid>
  </>;
}

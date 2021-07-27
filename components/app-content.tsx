import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Avatar,
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MatcherService from'../customer/services/matcher-service';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Matchers, MatcherId } from '../state/atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '94vh',
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
  const classes = useStyles();
  const matchers = useRecoilValue(Matchers);
  const setMatchers = useSetRecoilState(Matchers);
  const matcherId = useRecoilValue(MatcherId);
  const setMatcherId = useSetRecoilState(MatcherId);

  useEffect(()=>{
    MatcherService.getMatchers().then((data) => {
      setMatchers(data);
    });
  }, []);

  const listItems = matchers.map((matcher) => (
    <React.Fragment key={matcher.id}>
      <ListItem button selected={matcher.id === matcherId} alignItems='flex-start'  className={classes.listItem} onClick={()=>setMatcherId(matcher.id)}>
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
    </React.Fragment>
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
  const classes = useStyles();

  return <>
    <Grid container className={classes.root}>
      <Hidden xsDown>
        <Grid container item sm={3}>
          <ChatterList/>
        </Grid>
      </Hidden>
      <Grid container item xs={12} sm={9}>
        <Scrollbars>
          {children}
        </Scrollbars>
      </Grid>
    </Grid>
  </>;
}

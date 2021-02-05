import React, { useState } from 'react';
import { AppBar, Avatar, Grid, Menu, MenuItem, Tab, Tabs, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useUser from '../customer/hooks/use-user';
import AuthService from '../customer/services/auth-service';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    height: theme.spacing(7),
    fontSize: theme.spacing(2.5)
  },
  avatar: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  menu: {
    position: 'relative',
  }
}));

export default function AppHeader() {
  const classes = useStyles();
  const { user, mutate } = useUser();
  const router = useRouter();
  let mainPhoto = null;
  if(user.photos.length !== 0) {
    mainPhoto = user.photos[0].url;
  }
  const [tabIndex, setTabIndex] = useState(0);
  const menuData = [
    {
      text: '使用條款',
      route: 'policies',
      action: null
    },
    {
      text: '登出',
      route: null,
      action: 'logout'
    }
  ];

  const tabData = [
    {
      text: '聊天',
      route: 'chat',
      action: null
    },
    {
      text: '個人檔案',
      route: 'profile',
      action: null
    },
    {
      text: '配對',
      route: 'match',
      action: null
    }
  ];

  const tabClickHandler = (item, index) => {
    setTabIndex(index);
    if (item.route !== null) {
      router.push(item.route);
    }
  };

  const menuClickHandler = (item) => {
    if (item.route !== null) {
      router.push(item.route);
    }
    if (item.action === 'logout') {
      router.push('/');
      AuthService.logout();
      mutate();
    }
  };

  const tabs = tabData.map((item, index) => (
    <Tab
      label={item.text}
      onClick={() => tabClickHandler(item, index)}
      className={classes.tab}
    />),
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = menuData.map((item, index) => (
      <MenuItem onClick={() => menuClickHandler(item)}>{item.text}</MenuItem>
    ),
  );
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Grid container justify='space-between'>
          <Grid item container xs={9} md={10}>
            <Tabs value={tabIndex}>
              {tabs}
            </Tabs>
          </Grid>
          <Grid item container xs={3} md={2} justify='center' alignItems='center'>
            <a href='javascript:void(0)' aria-controls='profile-menu' aria-haspopup='true' onClick={handleClick}>
              <Avatar src={'/images/' + mainPhoto} className={classes.avatar} />
            </a>
            <Menu
              id='profile-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menu}
            >
              {menuItems}
            </Menu>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

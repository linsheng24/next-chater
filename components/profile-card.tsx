import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  TextField, Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import useUser from '../customer/hooks/use-user';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 550,
  },
  media: {
    height: 140,
  },
  avatar: {
    position: 'absolute',
    marginTop: 55,
    height: 140,
    width: 140,
  },
  back_img: {
    height: 250,
  },
}));

function CardItem({ payload }) {
  const useStyles = makeStyles(() => ({
    item_input: {
      marginBottom: 3
    },
    editIcon: {
      marginLeft: 5,
      cursor: 'pointer'
    }
  }));

  const [selectedDate, handleDateChange] = useState(new Date());

  const classes = useStyles();
  const { text, type, require, data } = payload;
  let showBlock;
  switch (type) {
    case 'text':
      showBlock = <TextField
        className={classes.item_input}
        defaultValue={data}
        disabled={true}
        InputProps={{
          readOnly: true,
        }}
      />;
      break;
    case 'number':
      showBlock = <TextField
        className={classes.item_input}
        disabled={true}
        defaultValue={data}
        InputProps={{
          readOnly: true,
        }}
      />;
      break;
    case 'date':
      showBlock = <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          disableFuture
          disabled={true}
          openTo='year'
          format='yyyy-MM-dd'
          views={['year', 'month', 'date']}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>;
      break;
    case 'array':
      showBlock = <TextField
        className={classes.item_input}
        disabled={true}
        defaultValue={data}
        InputProps={{
          readOnly: true,
        }}
      />;
      break;
    case 'text_area':
      showBlock = <TextField
        className={classes.item_input}
        disabled={true}
        multiline
        rows={6}
        defaultValue={data}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
      />;
      break;
    default:
      showBlock = null;
  }

  return (
    <ListItem>
      <Grid container direction='row' justify='center'>
        <Grid container item xs={3} md={4} justify='center' alignItems='center'>
          <Typography variant="h6">{text}</Typography><EditOutlinedIcon className={classes.editIcon} fontSize="small" />
        </Grid>
        <Grid container item xs={9} md={8} justify='center'>
          {showBlock}
        </Grid>
      </Grid>
    </ListItem>
  );
}

function ProfileCard() {
  const classes = useStyles();

  const { user, loading, error } = useUser();
  const photos = user.photos.filter(photo => photo.isMain);
  const mainImg = photos.length === 0 ? null : photos[0].url;
  const columns = [
    {
      text: '姓名',
      type: 'text',
      required: true,
      data: '林勝鋒',
    },
    {
      text: '性別',
      type: 'number',
      required: true,
      data: 1,
    },
    {
      text: '生日',
      type: 'date',
      required: true,
      data: '1993-03-31',
    },
    {
      text: '身高',
      type: 'number',
      required: false,
      data: 175,
    },
    {
      text: '體重',
      type: 'number',
      required: false,
      data: 75,
    },
    {
      text: '興趣',
      type: 'array',
      required: true,
      data: [1, 2, 3, 4],
    },
    {
      text: '自我介紹',
      type: 'text_area',
      required: false,
      data: '你好，我叫林勝鋒',
    },
  ];
  const cardItem = columns.map(column => <CardItem payload={column}/>)

  return (
    <Card className={classes.root}>
      <Grid container justify='center'>
        <CardMedia
          component='img'
          className={classes.back_img}
          image='images/pexels-josh-hild-4968510.jpg'
        />
        <Avatar className={classes.avatar} src={'/images/' + mainImg} />
      </Grid>
      <CardContent>
        <List>
          {cardItem}
        </List>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
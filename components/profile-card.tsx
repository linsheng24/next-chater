import { makeStyles } from '@material-ui/styles';
import { Avatar, Card, CardContent, CardMedia, Grid, List } from '@material-ui/core';
import useUser from '../customer/hooks/use-user';
import { CardItem } from './card-item';

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

function ProfileCard() {
  const classes = useStyles();

  const { user, loading, error } = useUser();
  const photos = user.photos.filter(photo => photo.isMain);
  const mainImg = photos.length === 0 ? null : photos[0].url;
  const profileData = user.profileData;

  const cardItem = profileData.map(column => <CardItem payload={column}/>)
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
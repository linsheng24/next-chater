import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import useUser from '../customer/hooks/use-user';
import ProfileService from '../customer/services/profile-service';
import AuthService from '../customer/services/auth-service';
import { Backdrop, Button, Chip, Fade, Grid, ListItem, Modal, TextField, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { DoneOutline } from '@material-ui/icons';
import DoneIcon from '@material-ui/icons/Done';
import { useRecoilValue } from 'recoil';
import { InterestMap } from '../state/atoms';
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles(() => ({
  item_input: {
    marginBottom: 3,
  },
  editIcon: {
    marginLeft: 5,
    cursor: 'pointer',
  },
  chipItem: {
    margin: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    height: '45vh',
    width: 500,
    maxWidth: '100vh',
    backgroundColor: '#699a84',
    borderColor: '#000',
    borderRadius: '5px',
    boxShadow: '2px 2px 4px #3b3b3b',
    outline: 0
  },
  tagContainer: {
    margin: '5vh',
    height: '30vh',
    maxWidth: '100vh',
    width: 400,
    marginBottom: 0,
    backgroundColor: '#c5e8d8',
    borderRadius: '5px',
  },
  button: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  clipItem: {
    margin: 4,
  }
}));

export function CardItem({ payload }) {
	const classes = useStyles();

	const { name, text, type, data, editable, require } = payload;
	const [selectedDate, handleDateChange] = useState(new Date(data));
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(data);
	const { mutate } = useUser();
  const interestMap = useRecoilValue(InterestMap);
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const editHandler = async () => {
		if (editing) {
			const newUser = await ProfileService.editProfile(name, value);
			if (newUser.hasOwnProperty('access_token')) {
				AuthService.refreshToken(newUser.access_token);
				await mutate();
			} else {
				alert('更新失敗');
			}
		}
		setEditing(!editing);
	};

	const inputChangedHandler = (e) => {
		setValue(e.target.value);
	};

	let showBlock;

  const handleDelete = () => {

  };

  switch (type) {
		case 'text':
			showBlock = <TextField
				className={classes.item_input}
				defaultValue={value}
				onChange={inputChangedHandler}
				disabled={!editing}
			/>;
			break;
		case 'number':
			showBlock = <TextField
				className={classes.item_input}
				onChange={inputChangedHandler}
				disabled={!editing}
				defaultValue={value}
			/>;
			break;
		case 'date':
			showBlock = <MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DatePicker
					disableFuture
					disabled={!editing}
					openTo='year'
					format='yyyy-MM-dd'
					views={['year', 'month', 'date']}
					value={selectedDate}
					onChange={handleDateChange}
				/>
			</MuiPickersUtilsProvider>;
			break;
		case 'tags':
		  const interestIds = data.split(',').map(item => Number(item));
      const chipItem = interestMap
        .filter(item => interestIds.includes(item.id))
        .map(item => ({ label: item.text }))
        .map(item => <Chip
          label={item.label}
          className={classes.chipItem}
          deleteIcon={<DoneIcon />}
        />);
      const chipOptions = interestMap.map(item => {
        const selected = interestIds.includes(item.id);
        return selected ? <Chip
            className={classes.clipItem}
            color='primary'
            label={item.text}
            clickable
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          /> :
          <Chip
            className={classes.clipItem}
            label={item.text}
            clickable
            onDelete={handleDelete}
          />;
      })

      showBlock = (<Grid container justify='center'>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          disableBackdropClick
          BackdropComponent={Backdrop}
        >
          <Fade in={open}>
            <Grid container justify='center' className={classes.paper}>
              <Grid container justify='center' className={classes.tagContainer}>
                <Scrollbars>
                  <Grid container justify='center'>
                    {chipOptions}
                  </Grid>
                </Scrollbars>
              </Grid>
              <Button className={classes.button} variant='contained'>取消</Button>
              <Button className={classes.button} variant='contained' color='primary'>修改</Button>
            </Grid>
          </Fade>
        </Modal>
        <Grid item container xs={8}>
          {chipItem}
        </Grid>
      </Grid>);
			break;
		case 'text_area':
			showBlock = <TextField
				className={classes.item_input}
				onChange={inputChangedHandler}
				disabled={!editing}
				multiline
				rows={6}
				defaultValue={value}
				variant='outlined'
			/>;
			break;
		default:
			showBlock = null;
	}

	return (
		<ListItem>
			<Grid container direction='row' justify='center'>
				<Grid container item xs={3} md={4} justify='center' alignItems='center'>
					<Typography variant='h6'>{text}</Typography>
					{
						editable ? (
							<span onClick={editHandler}>
                {
	                !editing ?
		                (<EditOutlinedIcon className={classes.editIcon} fontSize='small' />) :
		                (<DoneOutline className={classes.editIcon} fontSize='small' />)
                }
              </span>) : <span />
					}
				</Grid>
				<Grid container item xs={9} md={8} justify='center'>
					{showBlock}
				</Grid>
			</Grid>
		</ListItem>
	);
}
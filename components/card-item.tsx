import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import useUser from '../customer/hooks/use-user';
import ProfileService from '../customer/services/profile-service';
import AuthService from '../customer/services/auth-service';
import { Backdrop, Button, Chip, Fade, Grid, ListItem, Modal, TextField, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { DoneOutline } from '@material-ui/icons';
import DoneIcon from '@material-ui/icons/Done';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  }
}));

function TagSelectModel({ open, onCancel, onSubmit, options, selectedOptions }) {
  const classes = useStyles();

  const [modelOptions, setOptions] = useState(selectedOptions);
  const cancelHandler = () => {
    setOptions(selectedOptions);
    onCancel();
  };
  const chipOptions = options.map(item => {
    const selected = modelOptions.includes(item.id);
    const toggleSelect = (id) => {
      if (modelOptions.includes(item.id)) {
        const newOptions = modelOptions.filter(item => item !== id);
        setOptions(newOptions);
      } else {
        setOptions([...modelOptions, item.id]);
      }
    }
    return selected ? <Chip
        key={item.id}
        className={classes.clipItem}
        color='primary'
        label={item.text}
        clickable
        onDelete={()=>toggleSelect(item.id)}
      /> :
      <Chip
        key={item.id}
        className={classes.clipItem}
        label={item.text}
        clickable
        deleteIcon={<DoneIcon />}
        onDelete={()=>toggleSelect(item.id)}
      />;
  });

  return <Modal
    className={classes.modal}
    open={open}
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
        <Button className={classes.button} onClick={cancelHandler} variant='contained'>取消</Button>
        <Button className={classes.button} onClick={() => onSubmit(modelOptions)} variant='contained' color='primary'>修改</Button>
      </Grid>
    </Fade>
  </Modal>;
}

export function CardItem({ payload }) {
	const classes = useStyles();

	const { name, text, type, data, editable, require } = payload;
	const [selectedDate, handleDateChange] = useState(new Date(data));
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(data);
	const { mutate } = useUser();
  const interestMap = useRecoilValue(InterestMap);
  const setInterestMap = useSetRecoilState(InterestMap);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (type === 'tags' && interestMap.length === 0) {
      InterestMapFetcher();
    }
  }, [interestMap]);

  const InterestMapFetcher = async () => {
    const data = await ProfileService.getInterestMap();
    setInterestMap(data);
  }

  const submitData = async (name: any, value: any) => {
    const data = Array.isArray(value) ? value.join(',') : value;
    const newUser = await ProfileService.editProfile(name, data);
    if (newUser.hasOwnProperty('access_token')) {
      AuthService.refreshToken(newUser.access_token);
      await mutate();
    } else {
      alert('更新失敗');
    }
  };

  const editHandler = async () => {
    setOpen(true);
		if (editing) {
      await submitData(name, value);
    }
    setEditing(!editing);
  };

	const inputChangedHandler = (e) => {
		setValue(e.target.value);
	};

	let showBlock;

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

      const handleChipCancel = () => {
        setOpen(false);
        setEditing(false);
      };

      const handleChipSubmit = async (value) => {
        await submitData(name, value);
        setOpen(false);
        setEditing(false);
      };

		  const interestIds = data.split(',').map(item => Number(item));
      const chipItem = interestMap
        .filter(item => interestIds.includes(item.id))
        .map(item => ({ id: item.id, label: item.text }))
        .map(item => <Chip
          key={item.id}
          label={item.label}
          className={classes.chipItem}
          deleteIcon={<DoneIcon />}
        />);

      showBlock = (<Grid container justify='center'>
        <TagSelectModel
          open={open}
          options={interestMap}
          selectedOptions={interestIds}
          onCancel={handleChipCancel}
          onSubmit={handleChipSubmit}
        />
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
				<Grid container item xs={2} md={3} justify='center' alignItems='center'>
					<Typography variant='h6'>{text}</Typography>

				</Grid>
				<Grid container item xs={8} md={7} justify='center'>
          <Grid container item xs={1} justify='center' alignItems='center'>
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
          <Grid container item xs={11} justify='center' alignItems='center'>
  					{showBlock}
          </Grid>
				</Grid>
			</Grid>
		</ListItem>
	);
}
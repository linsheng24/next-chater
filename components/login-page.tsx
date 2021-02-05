import { Grid, Hidden, Avatar, Box, Typography, Button, Link, Checkbox, TextField, Paper, FormControlLabel, Theme } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from 'react-hook-form';

import AuthService from "../customer/services/auth-service";
import useUser from '../customer/hooks/use-user';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(images/login-image.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: '80px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: '10px 0 10px',
		background: 'red',
	},
	submit: {
		margin: '15px 0 25px'
	},
}));

function LoginPage() {
	const classes:Record<any, any> = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const { mutate } = useUser();
  const onSubmit = data => {
    AuthService.login(data.email, data.password)
      .then((response) => {
        mutate('login');
      });
  }

  const onForgot = () => {
    // AuthService.logout();
  };

  return (
		<Grid container component='main' className={classes.root}>
			<Hidden xsDown>
				<Grid item sm={4} md={7} className={classes.image} />
			</Hidden>
			<Grid item xs={12} sm={8} md={5} component={Paper}>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
              inputRef={register}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
              inputRef={register({required: true})}
						/>
            {errors.exampleRequired && <span>This field is required</span>}
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
              inputRef={register}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

export default LoginPage;
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {postData} from './FetchServices'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const[email,setEmail]=React.useState({em:''})
  const[password,setPassword]=React.useState({pword:''})
  const[mes,setMes]=React.useState('');
  function HandleSignup(){
    props.history.push({pathname:"/Signup"})
  }
  const HandleLogin=async()=>{
    setMes('')
    if(email.em && password.pword)
    {
    let body={'email':email.em,'password':password.pword}
    let result=await postData('backend/userlogin',body)
    if(result.RESULT!==false)
    {
      setMes('')
      localStorage.setItem('name',result.firstname);
      localStorage.setItem('email',result.email);
      props.history.push({pathname:"/",state:{email:result.email,name:result.firstname}})
    }
    else
    {
      setMes('Wrong Credentials')
      await setEmail({em:''})
      await setPassword({pword:''})
    }
  }
  else if(email.em==='')
  {
    setMes('Please enter email');
  }
  else if(password.pword==='')
  {
    setMes('Please enter password');
  }
  }

  const passwordForget=async()=>{
    setMes('')
    if(email.em)
    {
    let body={'email':email.em};
    let result=await postData('backend/forgotpassword',body)
    if(result.RESULT===true)
    {
      alert("link has been send");
    }
    else if(result.RESULT==='NOT FOUND')
    {
      alert("Email not found, Kindly register")
    }
    else
    {
      alert("try again");
    }
  }
  else
  {
    setMes('Please enter email');
  }
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
                Log In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email.em}
              onChange={event=>setEmail({em:event.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password.pword}
              onChange={event=>setPassword({pword:event.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={HandleLogin}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={passwordForget}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={HandleSignup}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        <Box style={{fontSize:"20px",WebkitTextFillColor:"red"}}>{mes}</Box>
        </div>
      </Grid>
    </Grid>
  );
}
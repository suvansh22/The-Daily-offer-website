import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {postData} from './FetchServices';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OtpInput from 'react-otp-input';
 

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root:{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
    }
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const[fname,setFname]=React.useState({fn:''})
  const[lname,setLname]=React.useState({ln:''})
  const[email,setEmail]=React.useState({em:''})
  const[password,setPassword]=React.useState({pword:''})
  const [open, setOpen] = React.useState(false);
  const [mes,setMes]=React.useState("");
  //const[count,setCount]=React.useState(0);
  const[OTP,setOtp]=React.useState('');
  const[fborcol,setFborcol]=React.useState("")
  const[lborcol,setLborcol]=React.useState("")
  const[eborcol,setEborcol]=React.useState("")
  const[pborcol,setPborcol]=React.useState("")

  function AllClear(){
    setFborcol("")
    setLborcol("")
    setEborcol("")
    setPborcol("")
  }

  const HandleOtp=async()=>{
    AllClear()
    if(fname.fn ==="" )
    {
      await setFborcol(classes.root)
    }
    if( lname.ln ==="")
    {
      await setLborcol(classes.root)
    }
    if(email.em === "")
    {
      await setEborcol(classes.root)
    }
    if(password.pword === "")
    {
      await setPborcol(classes.root)
    }
    if((email.em.lastIndexOf('@')>email.em.lastIndexOf('.')||(email.em.lastIndexOf('@')=== -1)||(email.em.lastIndexOf('.')=== -1)||(email.em.length-email.em.lastIndexOf('.'))<2)||((email.em.lastIndexOf('.')-email.em.lastIndexOf('@'))<2))
    {
      await setMes("invalid email")
      await setEborcol(classes.root)
    }
    else
    {
      let body={'email':email.em}
      let result =await postData('backend/emailcheck',body)
      if(result.RESULT)
      {
        //setCount(120)
        setOpen(true);
        let body={'email':email.em}
        await postData('backend/otp',body)
      }
      else
      {
        await setMes("Email already exits")
        await setEborcol(classes.root)
      }
    }
  }
  
  const HandleSubmit=async()=>{
    let body={'firstname':fname.fn,'lastname':lname.ln,'email':email.em,'password':password.pword,'otp':OTP}
    let result=await postData('backend/signup',body)
    if(result.RESULT){
      localStorage.setItem("name",fname.fn)
      localStorage.setItem("email",email.em)
      props.history.replace({pathname:"/"})
  }
  else
  {
    alert("OTP DOES NOT MATCH");
  }
}

function HandleLoginLink(){
  props.history.push({pathname:"/login"})
}
 const checkEmail=async()=>{
   await setMes("")
   await setEborcol("")
 }

  return (
    <Container component="main" style={{width:"40%",display:"flex",alignItems:"center"}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>
        </Avatar>
         <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                className={fborcol}
                value={fname.fn}
                onChange={event=> setFname({fn:event.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                className={lborcol}
                value={lname.ln}
                onChange={event=> setLname({ln:event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                className={eborcol}
                value={email.em}
                onChange={event=> setEmail({em:event.target.value})}
                onKeyUp={checkEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className={pborcol}
                value={password.pword}
                onChange={event=> setPassword({pword:event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={HandleOtp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={HandleLoginLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <div style={{marginTop:"10px"}}>
        <Grid container>
          <Grid item xs={12} style={{WebkitTextFillColor:"red",width:"5%"}}>
            {mes}
          </Grid>
        </Grid>
        </div>
      <div>
      <Dialog
        open={open}
        keepMounted
      >
        <DialogTitle id="OTP-Alert">ENTER OTP</DialogTitle>
        <DialogContent>
      <OtpInput
        value={OTP}
        onChange={setOtp}
          numInputs={4}
        />
          </DialogContent>
        <DialogActions>
        <Button onClick={HandleOtp} color="primary">
            Resend
          </Button>
          <Button onClick={HandleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </Container>
  );
}
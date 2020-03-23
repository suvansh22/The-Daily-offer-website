import React from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {postData} from './FetchServices';
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
        width: "80%",
    },
  }));

function PasswordForgot(props){

    {props.hideUnhideNave(false)}

    const classes = useStyles();
    const[pass,setPass]=React.useState('');
    const[againpass,setAgainpass]=React.useState('');
    const[showpass,setShowpass]=React.useState(false);
    const[check,setCheck]=React.useState(false);
    const[acheck,setAcheck]=React.useState(false);
    const[message,setMessage]=React.useState('');
    const[amessage,setAmessage]=React.useState('');
    const[bcheck,setBcheck]=React.useState(false);
    const[ccheck,setCcheck]=React.useState(false);
    const[emails,setEmails]=React.useState('');
    const[tok,setTok]=React.useState('');



    React.useEffect(()=>{
        async function fetchData(){
        let tokens=props.match.params.token;
        await setTok(tokens);
        let body={'token':tokens};
        let result=await postData('backend/tokencheck',body)
        console.log("asd",result)
        if(result.RESULT===false)
        {
            props.history.replace({pathname:`/expire/${tokens}`})
        }
        else
        {
        setEmails(result.email);
        }
    }
    fetchData();
    },[props.match.params.token,props.history])

    const HandleDone=async(event)=>{
        if(acheck && ccheck)
        {
            let abody={'email':emails,'password':againpass}
            let aresult=await postData('backend/changepassword',abody)
            if(aresult.RESULT===true)
            {
            props.history.replace({pathname:`/Success/${tok}`})
            }
            else
            {
                alert("not done")
            }
        }
        else
        {
            if(event.target.value==='')
            {
                setMessage('empty');
            }
            alert("no okay")
        }
    }

    const firstCheck=async(event)=>{           
        setMessage('');
        setCheck(false);
        setAcheck(false);
        if(event.target.value==='')
        {
            setAmessage('empty');
            setBcheck(true);
            setCcheck(false);
        }
        if(event.target.value!=='')
        {
            setAmessage('');
            setBcheck(false);
            if(event.target.value.length>10)
            {
                setAmessage('perfet');
                setBcheck(false);
                setCcheck(true);
            }
            else
            {
                setAmessage('not strong enough');
                setBcheck(true);
                setCcheck(false);
            }
        }
    }
    const checkPassword=async(event)=>{
        if(pass==='')
        {
            setMessage('');
            setCheck(false);
            setAcheck(false);
        }
        if(event.target.value!==pass && pass!=='')
        {
            setMessage('incorrect');
            setCheck(true);
            setAcheck(false)
        }
        if(event.target.value===pass && pass!=='')
        {
            setMessage('correct');
            setCheck(false);
            setAcheck(true);
        }
    }

    const handleClickShowPassword = () => {
        setShowpass(!showpass);
      };
    
      const handleMouseDownPassword = event => {
        event.preventDefault();
      };


    return(
        <div style={{width:"25%",marginLeft:"36.5%",marginTop:"5%"}}>
            <div style={{fontSize:"40px",fontFamily:"'Staatliches', cursive"}}>
                RESET PASSWORD
            </div>
            <div>
            <Paper>
                <Grid container spacing={1}>
                    <Grid item xs={12} >
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        onKeyUp={firstCheck}
                        error={bcheck}
                        id="outlined-adornment-password"
                        type={showpass ? 'text' : 'password'}
                        value={pass}
                        onChange={event=>setPass(event.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showpass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                        />
                    </FormControl>
                    <div style={{width:"50%",marginLeft:"10%",textAlign:"left",marginTop:"-10px",WebkitTextFillColor:bcheck? "red":"green"}}>{amessage}</div>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-password-input-2"
                        label="Password"
                        value={againpass}
                        error={check}
                        onChange={event=>setAgainpass(event.target.value)}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        style={{width:"80%"}}
                        onKeyUp={checkPassword}
                        />
                        <div style={{width:"40%",marginLeft:"10%",textAlign:"left",marginTop:"-10px",WebkitTextFillColor:check? "red":"green"}}>{message}</div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        variant="outlined"
                        onClick={HandleDone}
                        >
                        Done
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            </div>
        </div>
    )
}
export default withRouter(PasswordForgot);
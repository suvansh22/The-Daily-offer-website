import React from 'react';
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {postDataAndImage,postData} from './FetchServices'
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom'
import clsx from 'clsx';

const useStyles= makeStyles(theme=>({
      root: {
        flexGrow: 1,
        display:"flex",
        justifyContent:"center"
      },
      input1:{
          display:'none',
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height:"100%",
        width:"73%",
        [theme.breakpoints.between('xs','sm')]: {
          height:"100%",
          width:"100%",
          },
      },
      margin:{
          margin:theme.spacing(1)
      },
      root1: {
        //padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        height:"100%",
        [theme.breakpoints.between('xs','sm')]: {
          height:"60%",
          width:"100%",
          },
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      leftIcon: {
        marginRight: theme.spacing(1),
      },
      rightIcon: {
        marginLeft: theme.spacing(1),
      },
      iconSmall: {
        fontSize: 20,
      },
      fab: {
        margin: theme.spacing(1),
        [theme.breakpoints.between('xs','sm')]: {
          height:"50%",
          width:"20%",
          },
      },
      avatarchange:{
        height:"105%",
        width:"34%",
        [theme.breakpoints.between('sm','md')]: {
          height:"105%",
          width:"60%",
          },
        [theme.breakpoints.between('xs','sm')]: {
          height:"105%",
          width:"90%",
          },
      },
      nameres:{
        fontStyle:"italic",
        fontFamily:"'Teko',sans-serif",
        fontSize:"200%",
        [theme.breakpoints.between('xs','sm')]: {
          fontSize:"150%",
          },
      },
      detailnameres:{
        WebkitTextFillColor:"black",
        fontFamily:"'Teko',sans-serif",
        fontSize:"200%",
        [theme.breakpoints.down('xs')]: {
          textAlign:"left",
          fontSize:"150%",
          },
      }
    }))
export default function Account(props){

    const classes=useStyles();
    const [mail,setMail]=React.useState('');
    const [namevalue,setNamevalue]=React.useState('none');
    const [number,setNumber]=React.useState({nvalue:''});
    const [pic,setPic]=React.useState({icon:"`http://localhost:3010/images/generic.png`",file:""})
    const [username,setUsername]=React.useState('');
    const [pmessage,setPmessage]=React.useState('');
    const [bmessage,setBmessage]=React.useState('');
    const [cmessage,setCmessage]=React.useState('');
    const [numberprop,setNumberprop]=React.useState({nmessage:""});
    const [rang,setRang]=React.useState('');
    const [borcol,setBorcol]=React.useState("2px blue solid")
    const [borcolmail,setBorcolmail]=React.useState("2px blue solid")
    const [pass,setPass]=React.useState(false)
    const callInfo=async()=>{
        let body={'email':localStorage.getItem("email")}
        let result=await postData('backend/callinfo',body)
        if(result)
        {
            await setMail(result.email)
            await setNamevalue(result.firstname+" "+result.lastname)
            await setUsername(result.username);
            await setNumber({nvalue:result.mobile})
            if(result.dp)
            {
            await setPic({icon:`http://localhost:3010/images/${result.dp}`})
            }
            else
            {
              await setPic({icon:`http://localhost:3010/images/generic.png`})
            }
        }
    }
    React.useEffect(()=>{
        if(!localStorage.getItem("name"))
        {
            props.history.push({pathname:"/login"})
        }
    })
    React.useEffect(()=>{
        if(localStorage.getItem("name"))
        {
        callInfo()
        }
    },[])
    const clearInfo=async()=>{
            await setPmessage('')
            await setBmessage('')
            await setCmessage('')
            await setNumberprop({nmessage:""})
    }
    const updateDP=async()=>{
        clearInfo()
        var formData=new FormData();
        console.log("file:",pic.file)
        formData.append('pic',pic.file)
        formData.append('email',localStorage.getItem("email"))
        console.log(formData)
        const config={headers:{'content-type':'multipart/form-data'}};
        const result=await postDataAndImage('backend/updatepic',formData,config);
		if(result){
            await setRang('green')
            await setPmessage('SUCCESSFUL')
            await setBmessage('')
            await setCmessage('')
            await setNumberprop({nmessage:""})
		}
		else{
            await setRang('red')
            await setPmessage('UNSUCCESSFUL')
            await setBmessage('')
            await setCmessage('')
            await setNumberprop({nmessage:""})
		}
    }
    const updateUsername=async()=>{
        clearInfo()
        let body={"username":username,'email':localStorage.getItem("email")}
        let result=await postData('backend/updateinfo',body)
        if(result.RESULT){
            await setRang('green')
            await setBmessage('SUCCESSFUL')
            await setPmessage('')
            await setCmessage('')
            await setNumberprop({nmessage:""})
		}
		else{
            await setRang('red')
            await setBmessage('NOT SUCCESSFUL')
            await setPmessage('')
            await setCmessage('')
            await setNumberprop({nmessage:""})
        }
    }
    const updateMobile=async()=>{
        if(pass)
        {
        clearInfo()
        let body={"mobile":number.nvalue,'email':localStorage.getItem("email")}
        let result=await postData('backend/updateinfo',body)
        if(result.RESULT){
            await setRang('green')
            await setNumberprop({nmessage:"SUCCESSFUL"})
            await setPmessage('')
            await setBmessage('')
            await setCmessage('')
		}
		else{
            await setRang('red')
            await setNumberprop({nmessage:"NOT SUCCESSFUL"})
            await setPmessage('')
            await setBmessage('')
            await setCmessage('')
        }
        }
        else
        {
            await setBorcol("2px red solid")
            await setRang("red")
            await setNumberprop({nmessage:"invalid number"})
        }
    }
    const handleNumberKey=async()=>{
          if(isNaN(number.nvalue)) 
        {
          await setBorcol("2px red solid")
          await setRang("red")
          await setNumberprop({nmessage:"invalid number"});
          await setPass(false)
        }
        if(number.nvalue.length>10)
        {
            await setBorcol("2px red solid")
            await setRang("red")
            await setNumberprop({nmessage:"too long"});
            await setPass(false)
        }
        else if(!isNaN(number.nvalue))
        {
            await setNumberprop({nmessage:""});
            await setBorcol("2px blue solid")
            await setRang("green")
            await setPass(true)
        }
    }
    const updateEmail=async()=>{
      if(pass)
      {
        clearInfo()
        let body={"emailvalue":mail,'email':localStorage.getItem("email")}
        let result=await postData('backend/updateinfo',body)
        if(result.RESULT){
            await setRang('green')
            await setCmessage('SUCCESSFUL')
            await setPmessage('')
            await setBmessage('')
            await setNumberprop({nmessage:""})
		}
		else{
            await setRang('red')
            await setCmessage('NOT SUCCESSFUL')
            await setPmessage('')
            await setBmessage('')
            await setNumberprop({nmessage:""})
    }
  }
  else
  {
    await setCmessage("invalid email")
        await setPass(false)
        await setRang("red")
        await setBorcolmail("2px red solid")
  }
    }

    const handleEmailKey=async()=>{
      if(mail==="")
      {
        await setCmessage("cannot be empty")
        await setPass(false)
        await setRang("red")
        await setBorcolmail("2px red solid")
      }
      else if((mail.lastIndexOf('@')>mail.lastIndexOf('.')||(mail.lastIndexOf('@')=== -1)||(mail.lastIndexOf('.')=== -1)||(mail.length-mail.lastIndexOf('.'))<2)||((mail.lastIndexOf('.')-mail.lastIndexOf('@'))<2))
      {
        await setCmessage("invalid email")
        await setPass(false)
        await setRang("red")
        await setBorcolmail("2px red solid")
      }
      else
      {
        await setCmessage("")
        await setPass(true)
        await setRang("")
        await setBorcolmail("2px blue solid")

      }
    }

    const changePassword=async()=>{
      let body={'email':localStorage.getItem("email")}
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


    return(
        <div className={classes.root}>
        <Paper className={classes.paper} style={{}}>
        <Grid container spacing={3}>
        <Grid item xs={4} style={{paddingLeft:"14%"}}>
        <input
        accept="image/*"
        className={classes.input1}
        id="text-button-file"
        multiple
        type="file"
        onChange={(event)=>setPic({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
      />
      <label htmlFor="text-button-file">
        <Avatar className={classes.avatarchange} alt="DP" src={pic.icon} type="file" />
        </label>
        </Grid>
        <Grid item xs={6} sm={4}>
        <Box >
        <InputBase
        className={clsx(classes.margin,classes.nameres)}
        value={namevalue}
        inputProps={{ 'aria-label': 'naked' ,readOnly:true}}
      />
        </Box>
        </Grid>
        <Grid item xs={2} sm={4}>
      <Box style={{WebkitTextFillColor:rang,fontSize:"130%",fontFamily:"'Oswald',sans-serif"}}>
          {pmessage}
      </Box>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.detailnameres} >
            User Name:
        </Grid>
        <Grid item xs={8} sm={6}>
        <Paper className={classes.root1} style={{border:"2px blue solid"}}>
        <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        value={username}
        onChange={event=> setUsername(event.target.value)}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Fab color="secondary" aria-label="edit" onClick={updateUsername} className={classes.fab}>
        <EditIcon />
      </Fab>
    </Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
        <Box style={{width:"100%",WebkitTextFillColor:rang,fontSize:"100%",fontFamily:"'Oswald',sans-serif"}}>
          {bmessage}
      </Box>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.detailnameres}>
            Email:
        </Grid>
        <Grid item xs={8} sm={6}>
        <Paper className={classes.root1} style={{border:borcolmail}}>
        <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        value={mail}
        onChange={event=> setMail(event.target.value)}
        onKeyUp={handleEmailKey}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Fab color="secondary" aria-label="edit" onClick={updateEmail} className={classes.fab}>
        <EditIcon />
      </Fab>
    </Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
        <Box style={{WebkitTextFillColor:rang,fontSize:"100%",fontFamily:"'Oswald',sans-serif"}}>
          {cmessage}
      </Box>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.detailnameres}>
            Mobile:
        </Grid>
        <Grid item xs={8} sm={6}>
        <Paper className={classes.root1} style={{border:borcol}}>
        <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        value={number.nvalue}
        onChange={event=> setNumber({nvalue:event.target.value})}
        onKeyUp={handleNumberKey}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Fab color="secondary" onClick={updateMobile} aria-label="edit" className={classes.fab}>
        <EditIcon />
      </Fab>
    </Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
        <Box style={{WebkitTextFillColor:rang,fontSize:"100%",fontFamily:"'Oswald',sans-serif"}}>
          {numberprop.nmessage}
      </Box>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.detailnameres}>
            Password:
        </Grid>
        <Grid item xs={8} sm={6} style={{height:"70px"}}>
        <Paper className={classes.root1} style={{border:"2px blue solid"}}>
          <Link onClick={changePassword} style={{textDecoration:"none",color:"black"}}>Click to Change password</Link>
    </Paper>
        </Grid>
        </Grid>
        </Paper>
        </div>
    )
}
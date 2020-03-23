import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {postData} from '../FetchServices';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
      backgroundColor:"violet",
      WebkitTapHighlightColor:"red"
    },
    cssLabel: {
      color : 'white'
    },
  
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: "blue !important",
        borderWidth:'1.5px'
      }
    },
  
    cssFocused: {},
  oneup:{
    height:"50%",
    width:"30%",
    [theme.breakpoints.down('sm')]: {
      paddingTop:"10%",
      height:"70%",
      width:"70%"
    }
  },
    notchedOutline: {
      borderWidth: '1.5px',
      borderColor: 'white !important'
      
    },
  }));

export default function Category(){
    const classes = useStyles();
    const [id,setId]=React.useState('')
    const [name,setName]=React.useState('')

    const HandleSubmit=async()=>{
      let body={'name':name,'id':id}
      let result = await postData('backend/addcategory',body)
      if(result.RESULT)
      {
        await setId('')
        await setName('')
      }
    }



    return(
        <div className={classes.oneup} style={{paddingTop:"10%"}}>
        <Paper className={classes.root} style={{borderColor:"white",borderWidth:"10px",height:"100%",width:"100%",backgroundColor:"greenyellow"}}>
            <Typography variant="h6">ADD CATEGORY</Typography>
            <Grid container>
                <Grid item xs={12}>
            <TextField
        id="outlined-name"
        label="ID"
        className={classes.textField}
        value={id}
        onChange={event=> setId(event.target.value)}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          }
        }}
           />
           </Grid>
           <Grid item xs={12}>
            <TextField
        id="outlined-name"
        label="Name"
        className={classes.textField}
        value={name}
        onChange={event=> setName(event.target.value)}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          }
        }}
           />
           </Grid>
           <Grid item xs={12}>
           <Button variant="contained" className={classes.button} onClick={HandleSubmit}>
        Submit
      </Button>
      </Grid>
           </Grid>
      </Paper>
        </div>
    )
}
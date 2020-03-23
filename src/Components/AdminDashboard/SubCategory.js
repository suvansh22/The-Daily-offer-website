import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import {postData,getData} from '../FetchServices';


const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    button: {
      margin: theme.spacing(1),
      backgroundColor:"violet",
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
    oneup:{
      height:"50%",
      width:"30%",
      [theme.breakpoints.down('sm')]: {
        height:"70%",
        width:"70%",
        paddinTop:"10%",
      }
    },
  
    cssFocused: {},
  
    notchedOutline: {
      borderWidth: '1.5px',
      borderColor: 'white !important'
      
    },
  }));
  

export default function SubCategory(){
    const classes = useStyles();
    const [id,setId]=React.useState('')
    const [name,setName]=React.useState('')
    const inputLabel = React.useRef(null);
    const [categoryid,setCategoryid]=React.useState({num:''});
    const [labelWidth,setLabelWidth] = React.useState(0);
    const [list,setList]=React.useState([]);

    function handleChange(event) {
        setCategoryid(oldValues => ({
          ...oldValues,
          [event.target.name]: event.target.value,
        }));
    }
    const Categoryid=async()=>{
      const data=await getData('backend/categoryid')
      setList(data)
    }

    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
      Categoryid()
    }, []);

    const HandleSubmit=async()=>{
      let body={'name':name,'id':id,'categoryid':categoryid.num}
      let result = await postData('backend/addsubcategory',body)
      if(result.RESULT)
      {
        await setId('')
        await setName('')
        await setCategoryid({num:''})
      }
    }


    return(
        <div className={classes.oneup} style={{paddingTop:"10%"}}>
        <Paper className={classes.root} style={{height:"100%",width:"100%",backgroundColor:"greenyellow"}}>
            <Typography variant="h6">ADD SUBCATEGORY</Typography>
            <Grid container>
                <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl} style={{"border":"1px white solid"}}>
            <InputLabel ref={inputLabel} htmlFor="category-id">
          Category
        </InputLabel>
        <Select
          value={categoryid.num}
          onChange={handleChange}
          input={<OutlinedInput labelWidth={labelWidth} name="num" id="category-id" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {list.map(row => (
          <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
          ))}
        </Select>
        </FormControl>
          </Grid>
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
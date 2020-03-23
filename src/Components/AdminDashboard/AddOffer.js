import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import NativeSelect from '@material-ui/core/NativeSelect';
import Avatar from '@material-ui/core/Avatar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {getData,postData,postDataAndImage} from '../FetchServices'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import 'date-fns';
import Offer from '../../image/offer.png';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import withWidth from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme =>({
    root: {
      padding: theme.spacing(3, 2),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
      }, 
      iconSmall: {
        fontSize: 20,
      },
    bigAvatar: {
        margin: theme.spacing(2,0,0,0) ,
        width: 0,
        height: 0,
        borderRadius: 0
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
      background:"linear-gradient(#a1887f,#1565c0)",
    },
    cssLabel: {
      color : 'white',
    },
  
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: "blue !important",
        borderWidth:'1.5px',
      }
    },
  
    cssFocused: {},
  
    notchedOutline: {
      borderWidth: '1.5px',
      borderColor: 'white'
      
    },
    button2: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
      stepper: {
        padding: theme.spacing(3, 0, 5),
      },
      oneup:{
        height:"30%",
        width:"30%",
        [theme.breakpoints.between('xs','md')]: {
          height:"50%",
          width:"50%",
          paddinTop:"10%",
        },
        [theme.breakpoints.down('xs')]: {
          height:"100%",
          width:"100%",
          paddinTop:"10%",
        }
      },
      control: {
        padding: theme.spacing(0),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      }
  }));

  const steps = ['Step 1', 'Step 2', 'Step 3'];
  let main={
    'category':0,
    'subcategory':0,
    'id':0,
    'disvalue':true,
    'idvalue':'',
    'name':'',
    'city':'',
    'icon':Offer,
    'file':'',
  }
  let second={
    'description':'',
    'location':'',
    'taga':'',
    'tagb':'',
    'tagc':'',
    'tagd':''
  }
  let last={
    'sdate':new Date(),
    'fdate':new Date(),
    'stime':new Date(),
    'ftime':new Date(),
    'start':0,
    'final':0,
    'type':'',
    'price':'',
    'disvaluea':true,
    'disvalueb':true,
    'disvaluec':true,
    'disvalued':false,
    'errora':false,
    'errorb':false,
    'hta':'',
    'htb':'',
  }

function AddOffer(props){
    const classes = useStyles();
    const [activestep,setActivestep]=React.useState(0);
    const [open, setOpen] = React.useState({w:false,e:false});

    const Handlenext=()=>{
      setActivestep(activestep+1);
    }

    function getStepContent(Step){
      switch(Step){
        case 0:
          return <StepperOne data={main}/>;
        case 1:
          return <StepperTwo data={second}/>;
        case 2:
          return <StepperThree data={main} data2={last} data3={second}/>;
        default:
          throw new Error('Unknown step');
      }
    }
    
    const Handleback=()=>{
      setOpen({w:false,e:false});
      setActivestep(activestep-1);
    }


  function StepperOne(props){
    const [data,setData]=React.useState([]);
    const [city,setCity]=React.useState('');
    const [name,setName]=React.useState('');
    const [id,setId]=React.useState('')
    const inputLabel = React.useRef(null);
    const [subcategoryid,setSubCategoryid]=React.useState();
    const [categoryid,setCategoryid]=React.useState();
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [list,setList]=React.useState([]);
    const [alist,setAlist]=React.useState([]);
    const [idvalue,setIdvalue]=React.useState('');
    const [disvalue,setDisvalue]=React.useState(true);
    const [pic,setPic]=React.useState({icon:Offer,file:""})
    const [errs,setErrs]=React.useState({category:false,subcategory:false,id:false,name:false,city:false,file:false});
    const ahandleChange = async(event) => {
      setErrs({...errs,category:false});
      setCategoryid(event.target.value);
      setDisvalue(false)
      setIdvalue(event.target.value)
      data.disvalue=false;
      data.idvalue=event.target.value;
      data.category=event.target.value;
    };
  
    const bhandleChange = event => {
      setErrs({...errs,subcategory:false});
      setSubCategoryid(event.target.value);
      data.subcategory=event.target.value;
    };
  
    const callcategoryid=React.useCallback(async()=>{
      const data=await getData('backend/categoryid');
      setList(data)
      },[setList])

    const callSubcategoryid=React.useCallback(async()=>{
      let body={'id':idvalue}
      const data=await postData('backend/subcategoryid',body);
      setAlist(data)
      },[setAlist,idvalue])

      const idCheck=async()=>{
        let temp=await getData('backend/idcheck');
        let temp1=temp+1;
        setId(temp1);
        data.id=temp1;
      }

      function updateVar(){
        setName(props.data.name)
        setCity(props.data.city)
        setCategoryid(props.data.category)
        setSubCategoryid(props.data.subcategory)
        setDisvalue(props.data.disvalue)
        setIdvalue(props.data.idvalue)
        setPic({icon:props.data.icon,file:props.data.file})
      }
    React.useEffect(() => {
      setData(props.data);
      setLabelWidth(inputLabel.current.offsetWidth);
      callSubcategoryid();
      callcategoryid();
      idCheck();
      updateVar();
    }, [callSubcategoryid,callcategoryid,props.data]);

    function handleNextStepperOne(){
      const temp={}
      var c=false;
      for(var key in data)
      {
        if(data[key]==='')
        {
          temp[key]=true;
          c=true
        }
      }
      setErrs({...errs,...temp});
      if(c===true)
      {
        alert("Please fill require information")
      }
      else
      {
        Handlenext();
      }
    }

    return(
      <Grid>
            <Grid container>
                <Grid item xs={6} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
          category
        </InputLabel>
        <NativeSelect
        error={errs.category}
        style={{width:"100%"}}
          value={categoryid}
          onChange={ahandleChange}
          input={
            <OutlinedInput name="name" labelWidth={labelWidth} id="outlined-age-native-simple" />
          }
        >
        <option value="" />
          {list.map(row => (
            <option key={row.id} value={row.id}>{row.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
        </Grid>
        <Grid item xs={6} md ={6}>
      <FormControl variant="outlined" className={classes.formControl} disabled={disvalue}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
          Subcategory
        </InputLabel>
        <NativeSelect
        style={{width:"100%"}}
        error={errs.subcategory}
          value={subcategoryid}
          onChange={bhandleChange}
          input={
            <OutlinedInput name="name" labelWidth={labelWidth} id="outlined-age-native-simple" />
          }
        >
          <option value="" />
          {alist.map(row => (
            <option key={row.id} value={row.id}>{row.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
           </Grid>
           <Grid container style={{width:"50%"}}>
           <Grid item xs={12} md={12} style={{height:"80%"}}>
           <Avatar src={pic.icon} style={{height:"90%",width:"90%",borderBottom:"3px solid",borderTop:"3px solid",borderLeft:"3px solid",borderRight:"3px solid"}} alt="Remy Sharp" className={classes.bigAvatar} />
           </Grid>
           <Grid item xs={12}>
           <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={event=>{setPic({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]});data.icon=URL.createObjectURL(event.target.files[0]);data.file=event.target.files[0];setErrs({...errs,file:false})}}
            />
           <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
            <CloudUploadIcon className={classes.rightIcon} />
            </Button>
            </label>
            </Grid>
            </Grid>
            <Grid container style={{width:"50%"}}>
            <Grid item xs={12}>
            <TextField
        id="ID"
        label="ID"
        className={classes.textField}
        value={id}
        onChange={event=>setId(event.target.value)}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          readOnly:true,
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
        id="Name"
        label="Name"
        error={errs.name}
        className={classes.textField}
        value={name}
        onChange={event=>{setName(event.target.value);data.name=event.target.value;setErrs({...errs,name:false});}}
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
        id="City"
        label="City"
        error={errs.city}
        className={classes.textField}
        value={city}
        onChange={event=>{setCity(event.target.value);data.city=event.target.value;setErrs({...errs,city:false});}}
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
           </Grid>
           </Grid>
           <Grid item xs={12}>
           <Button variant="contained" className={classes.button} onClick={handleNextStepperOne}>
              Next
          </Button>
           </Grid>
      </Grid>
    )
  }

  function StepperTwo(props){
    const [data,setData]=React.useState([]);
    const [description,setDescription]=React.useState('');
    const [location,setLocation]=React.useState('');
    const [taga,setTaga]=React.useState('');
    const [tagb,setTagb]=React.useState('');
    const [tagc,setTagc]=React.useState('');
    const [tagd,setTagd]=React.useState('');
    const [err,setErr]=React.useState({description:false,location:false});
    function updateVar(){
      setTaga(props.data.taga);
      setTagb(props.data.tagb);
      setTagc(props.data.tagc);
      setTagd(props.data.tagd);
      setDescription(props.data.description);
      setLocation(props.data.location)
    }
    React.useEffect(()=>{
      setData(props.data);
      updateVar();
    },[props.data])

    
    function handleNextStepperTwo(){
      setOpen({...open,w:false});
      const temp={}
      const regex=/^tag/
      var c=false;
      var c1=false;
      for(var key in data)
      {
        if(data[key]===''&& key.search(regex)===-1)
        {
          temp[key]=true;
          c=true
        }
      }
      if(c!==true)
      {
        if(taga==='')
        {
          setOpen({...open,w:true});
          c1=true;
        }
      }
      setErr({...err,...temp});
      if(c===true)
      {
        alert("Please fill require information")
      }
      else if(c!==true && c1!==true)
      {
        Handlenext();
      }
    }

    return(
      <Grid>
        <Grid container>
        <Grid item xs={12} style={{paddingRight:"12px"}}>
            <TextField
            error={err.location}
        id="Location"
        label="Location"
        className={classes.textField}
        value={location}
        onChange={event=> {setLocation(event.target.value);data.location=event.target.value;setErr({...err,location:false})}}
        margin="normal"
        variant="outlined"
        multiline={true}
        fullWidth
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
        <Grid item xs={6}>
            <TextField
        id="Tag#1"
        label="Tag#1"
        className={classes.control}
        value={taga}
        onChange={event=>{setTaga(event.target.value);data.taga=event.target.value}}
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
           <Grid item xs={6}>
            <TextField
        id="Tag#2"
        label="Tag#2"
        className={classes.control}
        value={tagb}
        onChange={event=>{setTagb(event.target.value);data.tagb=event.target.value}}
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
           <Grid item xs={6}>
            <TextField
        id="Tag#3"
        label="Tag#3"
        className={classes.control}
        value={tagc}
        onChange={event=> {setTagc(event.target.value);data.tagc=event.target.value}}
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
           <Grid item xs={6}>
            <TextField
        id="Tag#4"
        label="Tag#4"
        className={classes.control}
        value={tagd}
        onChange={event=>{setTagd(event.target.value);data.tagd=event.target.value}}
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
           <Grid item xs={12} style={{paddingRight:"12px"}}>
            <TextField
        id="Description"
        error={err.description}
        label="Description"
        className={classes.textField}
        value={description}
        onChange={event=> {setDescription(event.target.value);data.description=event.target.value;setErr({...err,description:false})}}
        margin="normal"
        variant="outlined"
        multiline={true}
        fullWidth
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
           <Grid item xs={6}>
           <Button variant="contained" className={classes.button} onClick={Handleback}>
              Back
          </Button>
          </Grid>   
           <Grid item xs={6}>
           <Button variant="contained" className={classes.button} onClick={handleNextStepperTwo}>
              Next
          </Button>
            </Grid>
           </Grid>
      </Grid>
    )
  }

  function StepperThree(props){
    const [data,setData]=React.useState([]);
    const [primary,setPrimary]=React.useState([]);
    const [second,setSecond]=React.useState([]);
    const [sdate,setSdate]=React.useState(new Date());
    const [fdate,setFdate]=React.useState(new Date());
    const [stime,setStime]=React.useState(new Date());
    const [ftime,setFtime]=React.useState(new Date());
    const [disabledvalue,setDisabledvalue]=React.useState({d:props.data2.disvalued,c:props.data2.disvaluec,b:props.data2.disvalueb,a:props.data2.disvaluea});
    const [err,setErr]=React.useState({a:props.data2.errora,b:props.data2.errorb});
    const [ht,setHt]=React.useState({a:props.data2.hta,b:props.data2.htb});
    const [price,setPrice]=React.useState('');
    const [type,setType]=React.useState('');

    const handlesdateChange = date => {
      setSdate(date);
      setDisabledvalue({...disabledvalue,a:false});
      primary.disvaluea=false;
      primary.sdate=date
    };
    const handlefdateChange = date => {
      setFdate(date);
      setDisabledvalue({...disabledvalue,c:false});
      primary.disvaluec=false;
      primary.fdate=date;
    };
    const handlestimeChange = date => {
      date.setYear(sdate.getYear()+1900);
      date.setMonth(sdate.getMonth());
      date.setDate(sdate.getDate());
      setStime(date);
      onErr("stime",date)
    };
    const handleftimeChange = date => {
      date.setYear(fdate.getYear()+1900);
      date.setMonth(fdate.getMonth());
      date.setDate(fdate.getDate());
      setFtime(date);
      onErr("ftime",date)
    };

    function handleDate(data) {
      let newDate=data
      let separator="/";
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let setDate =`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
      return setDate
    }

    function handleTime(data) {
      let newDate = data;
      let colon=":";
      let hour = newDate.getHours();
      let min = newDate.getMinutes();
      let setTime =`${hour}${colon}${min}${colon}00`;
      return setTime
    }
    

    async function DateAndTime(data){
      var d,t,myd,a,b;
      if(data ==='s')
      {
        d=handleDate(sdate);
        t=handleTime(stime);
        myd=`${d} ${t}`;
        a = new Date(myd);
        b = a.getTime();
        primary.start=b;
      }
      else if(data === 'f')
      {
        d=handleDate(fdate);
        t=handleTime(ftime);
        myd=`${d} ${t}`;
        a = new Date(myd);
        b = a.getTime();
        primary.final=b;
      }
    }
    const handleSubmit=async()=>{
      await DateAndTime('s');
      await DateAndTime('f');
        if(primary.disvalued===false)
        {
          setOpen({...open,e:true})
        }
        var formData= new FormData();
    formData.append('id',data.id)
    formData.append("name",data.name)
    formData.append("categoryid",data.category)
    formData.append("subcategoryid",data.subcategory)
    formData.append("tag1",second.taga)
    formData.append("tag2",second.tagb)
    formData.append("tag3",second.tagc)
    formData.append('validfrom',primary.start)
    formData.append('validto',primary.final)
    formData.append('city',data.city)
    formData.append('description',second.description)
    formData.append('pic',data.file)
    formData.append('tag4',second.tagd)
    formData.append('location',second.location)
    console.log(formData)
    let config={headers:{'content-type':'multipart/form-data'}}
    let result=await postDataAndImage('backend/addoffer',formData,config)
    if(result){
        alert('record submitted');
    }
    else
    {
        alert('record not submitted')
    }
    }
    const onErr=(a,b)=>{
      var comptime
      if(a==='stime')
      {
        comptime=new Date().getTime()+3600000;
        if(b.getTime()<comptime)
        {
          setErr({...err,a:true})
          primary.errora=true
          setHt({...ht,a:'you should book alteast 1 hr in advance'})
          primary.hta='you should book alteast 1 hr in advance'
        }
        else
        {
          setDisabledvalue({...disabledvalue,b:false});
          primary.disvalueb=false;
          setErr({...err,a:false})
          primary.errora=false;
          setHt({...ht,a:''})
          primary.hta='';
          primary.stime=b;
        }
      }
      else if(a==='ftime')
      {
        comptime=stime.getTime()+3600000;
        if(b.getTime()<comptime)
        {
          setErr({...err,b:true})
          primary.errorb=true
          setHt({...ht,b:'slot should be of one hour'})
          primary.htb='slot should be of one hour'
          setDisabledvalue({...disabledvalue,d:false});
          primary.disvalued=false
        }
        else
        {
          setErr({...err,b:false})
          primary.errorb=false;
          setHt({...ht,rb:''})
          primary.htb=''
          primary.ftime=b;
          setDisabledvalue({...disabledvalue,d:true});
          primary.disvalued=true;
        }
      }
    }

    const handleType=event=>{
      setType(event.target.value);
      primary.type=event.target.value
      if(event.target.value==='Standard')
      {
        setPrice("Free");
        primary.price="Free";
      }
      else if(event.target.value==='Premium')
      {
        setPrice("1hr = $.5");
        primary.price="1hr = $.5";
      }
    }

    function updateVar(){
      setSdate(new Date(props.data2.sdate))
      setFdate(new Date(props.data2.fdate))
      setStime(new Date(props.data2.stime))
      setFtime(new Date(props.data2.ftime))
      setDisabledvalue({...disabledvalue,a:props.data2.disvaluea});
      setDisabledvalue({...disabledvalue,b:props.data2.disvalueb});
      setDisabledvalue({...disabledvalue,c:props.data2.disvaluec});
      setType(props.data2.type)
      setPrice(props.data2.price)
      setErr({...err,a:props.data2.errora})
      setErr({...err,b:props.data2.errorb})
      setHt({...ht,a:props.data2.hta})
      setHt({...ht,b:props.data2.htb})
    }
    
    React.useEffect(()=>{
      setSecond(props.data3);
      setPrimary(props.data2);
      setData(props.data);
      updateVar();
    },[])
    
    return(
      <Grid>
        <Grid container>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item xs={6}>
      <KeyboardDatePicker
          datepickermode='landscape'
          margin="normal"
          id="sdate-picker-dialog"
          label="Valid From"
          format="MM/dd/yyyy"
          value={sdate}
          onChange={handlesdateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate()+10))}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item xs={6}>
      <KeyboardTimePicker
          margin="normal"
          id="stime-picker"
          label="Time"
          value={stime}
          onChange={handlestimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          disabled={disabledvalue.a}
          helperText={ht.a}
          error={err.a}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item xs={6}>
      <KeyboardDatePicker
          margin="normal"
          id="fdate-picker-dialog"
          label="Valid To"
          format="MM/dd/yyyy"
          value={fdate}
          onChange={handlefdateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          disabled={disabledvalue.b}
          minDate={sdate}
          maxDate={new Date(new Date().setDate(sdate.getDate()+10))}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item xs={6}>
      <KeyboardTimePicker
          margin="normal"
          id="ftime-picker"
          label="Time"
          value={ftime}
          onChange={handleftimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          disabled={disabledvalue.c}
          helperText={ht.b}
          error={err.b}
        />
        </Grid>
        </MuiPickersUtilsProvider>
          <Grid item xs={6}>
          <RadioGroup aria-label="type" name="type" value={type} onChange={handleType} >
          <FormControlLabel value="Standard" control={<Radio />} label="Standard" />
          <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
        </RadioGroup>
            </Grid>
            <Grid item xs={6}>
            <TextField
        id="Price"
        label="Price"
        className={classes.textField}
        value={price}
        onChange={event=>setPrice(event.target.value)}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          readOnly:true,
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          }
        }}
           />
              </Grid>
           <Grid item xs={6}>
           <Button variant="contained" className={classes.button} onClick={Handleback}>
              Back
          </Button>
          </Grid>   
           <Grid item xs={6}>
           <Button variant="contained" className={classes.button} onClick={handleSubmit}>
              Done
          </Button>
          </Grid>
        </Grid>
        </Grid>
    )
  }

    return(
        <div className={classes.oneup} style={{marginTop:"10%"}}>
        <Collapse in={open.w}>
        <Alert 
        variant="filled" 
        severity="warning"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen({...open,w:false});
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
      Fill atleast one tag for better searching
    </Alert>
    </Collapse>
        <Collapse in={open.e}>
        <Alert 
        variant="filled" 
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen({...open,e:false});
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
      Please, fill all information
    </Alert>
    </Collapse>
          <Paper className={classes.root} style={{border:"3px black solid",height:"100%",width:"100%",background:"linear-gradient(#424242 , #90a4ae , #424242)"}}>
        <Typography variant="h6">ADD OFFER</Typography>
          <Stepper activeStep={activestep}  style={{background: "transparent"}} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activestep)}
          </Paper>
        </div>
    )
}
export default withWidth()(AddOffer);
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {getData} from '../FetchServices'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [num,setNum]=React.useState('');
  const [dateval,setDateval]=React.useState();

  function Month(data){
    if(data===1)
    {
      return 'January'
    }
    else if(data===2)
    {
      return 'February'
    }
    else if(data===3)
    {
      return 'March'
    }
    else if(data===4)
    {
      return 'April'
    }
    else if(data===5)
    {
      return 'May'
    }
    else if(data===6)
    {
      return 'June'
    }
    else if(data===7)
    {
      return 'July'
    }
    else if(data===8)
    {
      return 'August'
    }
    else if(data===9)
    {
      return 'September'
    }
    else if(data===10)
    {
      return 'October'
    }
    else if(data===11)
    {
      return 'November'
    }
    else if(data===12)
    {
      return 'December'
    }
  }
  
  const Currentdate=React.useCallback(()=>{
    let newDate=new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let stringmonth=Month(month);
    let year = newDate.getFullYear();
    let setDate=`${date},${stringmonth} ${year}`
    setDateval(setDate);
  },[setDateval])

  const Noofuser=React.useCallback(async()=>{
    let result = await getData('backend/noofuser');
    setNum(result[0].value)
  },[setNum])

  React.useEffect(()=>{
    const abortController = new AbortController();
    Currentdate();
    Noofuser();
    return () => {
      abortController.abort();
    };
  },[Currentdate,Noofuser])

  return (
    <React.Fragment>
      <Title>No of Users</Title>
      <Typography component="p" variant="h4">
        {num}
      </Typography>
      <Typography style={{marginTop:"40px"}} color="textSecondary" className={classes.depositContext}>
        <span>as on<br /></span>
        {dateval}
      </Typography>
    </React.Fragment>
  );
}
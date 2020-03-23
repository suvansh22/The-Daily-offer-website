import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {getData} from '../FetchServices'


const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [list,setList]=React.useState([]);

  const Call=React.useCallback(async()=>{
    let result = await getData('backend/customerinfo');
    setList(result)
  },[setList])

  React.useEffect(()=>{
    Call();
  },[Call])

  return (
    <React.Fragment>
      <Title>Recent Signups</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>Email id</TableCell>
            <TableCell>User id</TableCell>
            <TableCell align="right">Mobile</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(row => (
            <TableRow key={row.email}>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
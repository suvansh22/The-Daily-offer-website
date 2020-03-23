import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Creator from '../image/IMG_20191128_150351.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  img:{
    width:"25%",
    [theme.breakpoints.down('sm')]:{
        width:"75%"
    }
}
}));

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper>
    <Grid container>
        <Grid item xs={6} style={{border:"2px solid rgb(300, 139, 120)"}}>
            <div style={{display:"flex",justifyContent:"center"}}>
            <img src={Creator} className={classes.img}/>
            </div>
        </Grid>
        <Grid item xs={6} style={{border:"2px solid rgb(300, 139, 120)"}}>
          <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Suvansh Agrawal
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Age
                </TableCell>
                <TableCell>
                  Tweenty one
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Education
                </TableCell>
                <TableCell>
                  3rd year Btech
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6} style={{border:"2px solid rgb(300, 139, 120)"}}>
            <div>
            <h1>OUR COMPANY</h1>
            </div>
        </Grid>
        <Grid item xs={6} style={{border:"2px solid rgb(300, 139, 120)"}}>
          <div>
            <span>We at The Daily Offer try to get to customer with all the offers from offline stores to online stores. We try to 
                help reduce the effort and time of those who goes door to door and in difficult tempertare just to advertise or to offer
                to customer
            </span>
            </div>
        </Grid>
    </Grid>
</Paper>
    </div>
  );
}
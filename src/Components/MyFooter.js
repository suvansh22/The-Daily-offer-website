import React from 'react';
import {withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withWidth, { isWidthDown,isWidthUp } from '@material-ui/core/withWidth';
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
    link:{
        textDecoration:"none",
        WebkitTapHighlightColor:"green"
    }
}));

function MyFooter(props){

    const classes=useStyles();
    const [open,setOpen]=React.useState(false)

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };


    function exampleDet(){
        if(isWidthUp('sm',props.width))
        {
            return (
                <div>
                <Grid item sm={4} style={{WebkitTextFillColor:"rgb(300, 139, 120)",whiteSpace:"nowrap"}}>
                    <List>
                        <ListItem>
                            Advertise with us
                    </ListItem>
                    </List>
                </Grid>
                </div>
                )
        }
    }

    function exampleDet2(){
        
        if(isWidthDown('sm',props.width))
        {
            return (
                <div>
                        <ListItem>
                            Advertise with us
                    </ListItem>
                </div>
                )
        }
    }

    return(
        <div>
            <Paper style={{backgroundColor:"white"}}>
            <Grid container>
                <Grid item xs={6} sm={4} style={{WebkitTextFillColor:"rgb(300, 139, 120)",whiteSpace:"nowrap"}}>
                    <List>
                    <ListItem>
                    <Link href="/Aboutus" underline='none' style={{WebkitTextFillColor:"rgb(300, 139, 120)"}}>About us</Link>
                    </ListItem>
                    <ListItem>
                    Customer help
                    </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} sm={4} style={{WebkitTextFillColor:"rgb(300, 139, 120)",whiteSpace:"nowrap"}}>
                    <List>
                    <ListItem button onClick={handleOpen}>
                    Connect with us
                    </ListItem>
                    {exampleDet2()}
                    </List>
                </Grid>
                {exampleDet()}
            </Grid>
            </Paper>
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title" style={{WebkitTextFillColor:"rgb(300, 139, 120)",whiteSpace:"nowrap"}}>Connect with us</DialogTitle>
      <List>
          <ListItem>
          <Link href="/Aboutus" underline='none' style={{WebkitTextFillColor:"#3b5998"}}>Facebook</Link>
          </ListItem>
          <ListItem>
          <Link href="/Aboutus" underline='none' style={{WebkitTextFillColor:"lightcoral"}}>Instagram</Link>
          </ListItem>
      </List>
    </Dialog>
        </div>
    )
}
export default withWidth()(withRouter(MyFooter));
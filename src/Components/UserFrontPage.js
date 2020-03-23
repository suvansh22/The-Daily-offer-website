import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle'; 
import MainListItems from './Drawer';
import Drawer from '@material-ui/core/Drawer';
import {Link,withRouter} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontFamily:'monospace',
    fontSize:"200%",
    color:"rgb(300, 139, 120)",
    [theme.breakpoints.between('xs','sm')]: {
      fontSize:"120%",
      fontFamily:'monospace',
      color:"rgb(300, 139, 120)"
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    //'&:hover': {
      //backgroundColor: fade(theme.palette.common.white, 0.25),
    //},
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    left:"40%",
    backgroundColor:"rgb(255, 139, 120)",
    [theme.breakpoints.down('md')]: {
    left:"30%",
    width:"30%",
    backgroundColor:"rgb(255, 139, 120)"
    },
    [theme.breakpoints.down('xs')]: {
    left:"5%",
    width:"40%",
    backgroundColor:"rgb(255, 139, 120)"
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width:"300px",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  firsttitle:{
    fontSize:"200%",
    color:"rgb(300, 139, 120)",
    [theme.breakpoints.between('xs','sm')]: {
      fontSize:"120%",
      color:"rgb(300, 139, 120)"
    },
  }
}));

function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }
  function Logout(){
    handleMenuClose();
    localStorage.clear();
  }
  function handleMyAccount(){
    handleMenuClose();
  }
  

  const menuId = 'primary-search-account-menu';
  function renderMenu () {
            if(localStorage.getItem("name"))
              {
                return(
                <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
         <Link to="/" style={{textDecoration:"none",color:"black"}}><MenuItem  onClick={Logout}>Logout</MenuItem></Link>
         <Link to="/MyAccount" style={{textDecoration:"none",color:"black"}}><MenuItem  onClick={handleMyAccount}>My Account</MenuItem></Link>
    </Menu>
                )
              }
              else
              {
                return(
                <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                    <Link to="/login" style={{textDecoration:"none",color:"black"}}>     <MenuItem  >Login</MenuItem></Link>
                    <Link to="/Signup" style={{textDecoration:"none",color:"black"}}>     <MenuItem  >Signup</MenuItem></Link>
              </Menu>
                )
              }}
  const [state, setState] = React.useState(false);
  function childChange(data){
    setState(data);
  }
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };


  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{backgroundColor:"white",height:"100%",width:"100%"}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            style={{color:"rgb(300, 139, 120)"}}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        <MainListItems tD={childChange} history={props.history} hideUnhideNave={props.hideUnhideNave}/>
      </Drawer>
      <Link to="/" style={{textDecoration:"none"}}>
          <Typography className={classes.title} variant="h6" noWrap >
          THE DAILY OFFER
          </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
             
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              style={{color:"#40c4ff"}}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
        
        <Typography className={classes.firsttitle}>
            THE BEST WAY TO HUNT DAILY OFFER
          </Typography>
      </AppBar>
      {renderMenu()}
    </div>
  );
}
export default withRouter(PrimarySearchAppBar)
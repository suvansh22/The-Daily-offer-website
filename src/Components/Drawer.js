import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Login from '../image/login.jpg'
import Logout from '../image/logout.png'
import Box from '@material-ui/core/Box'
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import Tableicon from '../image/table.png'
import Groceryicon from '../image/grocery.png'
import Clothingicon from '../image/hanger.svg' 
import Electronicicon from '../image/electronic.png' 
import {postData} from './FetchServices'   
import {withRouter} from 'react-router-dom';

function Drawer(props) {

    const [pic,setPic]=React.useState({icon:`http://localhost:3010/images/generic.png`})
    const HandleDp=async()=>{
      let body={'email':localStorage.getItem("email")}
        let result=await postData('backend/callinfo',body)
        if(result)
        {
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

   const  HandleLogin=()=>{
     props.tD(false)
    props.history.push({pathname:"/login"})
    }
    const  HandleLogout=()=>{
      props.tD(false)
      localStorage.clear();
      props.history.push({pathname:"/"})
      }

    function HandleDashboard(){
      props.history.replace({pathname:"/Dashboard"})
    }

    function LoginCall(){
      return(
      <div onClick={HandleLogin}>
        <ListItem button>
        <ListItemIcon > 
            <img src={Login} alt="Login in" style={{height:"20px",width:"20px"}}/>
        </ListItemIcon>
        <ListItemText primary="Log in"/>
      </ListItem>
        </div>
      )
    }
    function LogoutCall(){
      return(
      <div onClick={HandleLogout}>
        <ListItem button>
        <ListItemIcon > 
            <img src={Logout} alt="Login out" style={{height:"20px",width:"20px"}}/>
        </ListItemIcon>
        <ListItemText primary="Log Out"/>
      </ListItem>
        </div>
      )
    }
    const [namevalue,setName]=React.useState('');
    const [emailvalue,setEmailvalue]=React.useState('');
    React.useEffect(()=>{
      if(localStorage.getItem("name"))
      {
        setName(localStorage.getItem("name"));
        setEmailvalue(localStorage.getItem("email"))
        HandleDp()
      }
    },[])

    function HandleOptions(data){
      props.history.push({pathname:`/categorypage/${data}`})
    }

   return(
   <div style={{width:"250px"}}>
    <div>
        <ListItem>
        <Avatar alt="Remy Sharp" src={pic.icon} style={{margin:"10px",width: "80px",height: "80px",marginLeft:"50px"}} />
        </ListItem>
    </div>
    <div style={{marginLeft:"73px"}}>
    <Box>
    {(() => {
          if (namevalue)
          {
              return(
                "Hi,"+namevalue
              )
          }
          else
          {
            return(
              "Hi,Guest"
            )
          }    
      })()}
    </Box>
    </div>
    {(() => {
          if (namevalue)
          {
              return(
                <LogoutCall />
              )
          }
          else
          {
            return(
              <LoginCall />
            )
          }    
      })()}
        <div style={{marginTop:"100px"}}>    
        {(() => {
          if (emailvalue==="s22ubbu@yahoo.com")
          {
          return(
            <div onClick={HandleDashboard}>
            <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          </div>
          )
          }    
      })()}
      <ListItem button onClick={()=>HandleOptions("Electronics")}>
        <ListItemIcon>
        <img src={Electronicicon} alt="clothing" style={{height:"20px",width:"20px"}}/>
        </ListItemIcon>
        <ListItemText primary="Electronic" />
      </ListItem>
      <ListItem button onClick={()=>HandleOptions("Clothing")}>
        <ListItemIcon>
        <img src={Clothingicon} alt="clothing" style={{height:"20px",width:"20px"}}/>
        </ListItemIcon>
        <ListItemText primary="Clothing" />
      </ListItem>
      <ListItem button onClick={()=>HandleOptions("Grocery")}>
        <ListItemIcon>
        <img src={Groceryicon} alt="Grocery" style={{height:"20px",width:"20px"}}/>
        </ListItemIcon>
        <ListItemText primary="Grocery" />
      </ListItem>
      <ListItem button onClick={()=>HandleOptions("Furniture")}>
        <ListItemIcon>
        <img src={Tableicon} alt="furniture" style={{height:"20px",width:"20px"}}/>
        </ListItemIcon>
        <ListItemText primary="Furtinure" />
      </ListItem>
      <ListItem button onClick={()=>HandleOptions("Sports")}>
        <ListItemIcon>
          <SportsBaseballIcon />
        </ListItemIcon>
        <ListItemText primary="Sports" />
      </ListItem>
    </div>
    </div>)
  }

export default withRouter(Drawer) 
 
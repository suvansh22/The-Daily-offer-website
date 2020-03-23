import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import AC from './Category'
import ASC from './SubCategory'
import AO from './AddOffer'
import storefront from '../../image/frontstore.png'
import Category from '../../image/category.png'
import Subcategory from '../../image/subcategory.png'
import Offer from '../../image/offer.png'

export default function mainListItems(props){
    const HandleAC=(view)=>{
        props.ChangeView(view);
        //props.history.push({pathname:"/Category"})
    }
    function HandleStore(){
      props.hideUnhideNave(true);
      props.history.push({pathname:"/"})
    }
    return(
  <div>
    <ListItem button onClick={HandleStore}>
      <ListItemIcon>
      <img src={storefront} alt="Store" style={{height:"20px",width:"20px"}}/>
      </ListItemIcon>
      <ListItemText primary="Store" />
    </ListItem>
    <ListItem button onClick={()=>HandleAC(<AC />)}>
      <ListItemIcon>
      <img src={Category} alt="Store" style={{height:"20px",width:"20px"}}/>
      </ListItemIcon>
      <ListItemText primary="Add Category" />
    </ListItem>
    <ListItem button onClick={()=>HandleAC(<ASC />)}>
      <ListItemIcon>
      <img src={Subcategory} alt="Store" style={{height:"20px",width:"20px"}}/>
      </ListItemIcon>
      <ListItemText primary="Add SubCategory" />
    </ListItem>
    <ListItem button onClick={()=>HandleAC(<AO />)}>
      <ListItemIcon>
      <img src={Offer} alt="Store" style={{height:"20px",width:"20px"}}/>
      </ListItemIcon>
      <ListItemText primary="Add Offer" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
);
    }

/*export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);*/
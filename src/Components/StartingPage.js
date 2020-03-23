import {BrowserRouter as Router,Route} from 'react-router-dom'
import React from 'react'
import UFP from './UserFrontPage'
import ULP from './UserLoginpage'
import SUP from './Signup'
import AC from './AdminDashboard/Category'
import ASC from './AdminDashboard/SubCategory'
import AO from './AdminDashboard/AddOffer'
import DB from './AdminDashboard/Dashboard'
import MA from './Myaccount'
import OD from './OfferDisplay'
import PF from './Passwordforgot'
import PCS from './PasswordChangeSuccessful'
import OP from './OfferPage'
import COD from './Categoryofferdisplay'
import PCF from './PasswordChangeFail'
import FOO from './MyFooter'
import ABU from './AboutUs'


export default function Dom(props){

    const [state,setState]=React.useState(true)
const hideUnhideNave=(toShow)=>{
    setState(toShow);
}

return(
    <div>
        <Router> 
        {state?<UFP hideUnhideNave={hideUnhideNave} history={props.history}/>:null}
        <div style={{marginTop:".5%"}}>
            <Route exact path="/passwordreset/:token" component={()=><PF hideUnhideNave={(toShow)=>hideUnhideNave(toShow)}/>} history={props.history}/>
            <Route exact path="/success/:token" component={()=><PCS hideUnhideNave={(toShow)=>hideUnhideNave(toShow)}/>} history={props.history}/>
            <Route exact path="/expire/:token" component={()=><PCF hideUnhideNave={(toShow)=>hideUnhideNave(toShow)}/>} history={props.history}/>
            <Route exact path="/" component={OD} history={props.history}/>
            <Route exact path="/login" component={ULP} history={props.history}/>
            <Route exact path="/Signup" component={SUP} history={props.history}/>
            <Route exact path="/Category" component={AC} history={props.history}/>
            <Route exact path="/Subcategory" component={ASC} history={props.history}/>
            <Route exact path="/Offer" component={AO} history={props.history}/>
            <Route exact path="/category/:cName" component={OD} history={props.history}/>
            <Route exact path="/MyAccount" component={MA} history={props.history}/>
            <Route exact path="/Aboutus" component={ABU} history={props.history}/>
            <Route exact path="/categorypage/:categoryname" component={COD} history={props.history}/>
            <Route exact path="/offerpage/:category/:subcategory/:offername" component={OP} history={props.history}/>
            <Route exact path="/Dashboard" component={()=><DB hideUnhideNave={(toShow)=>hideUnhideNave(toShow)}/>} history={props.history}/>
        </div>
        <div style={{marginTop:".5%"}}>
            {state?<FOO hideUnhideNave={hideUnhideNave} history={props.history}/>:null}
        </div>
        </Router>
            </div>

)


}
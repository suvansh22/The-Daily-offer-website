import React from 'react';
import {withRouter} from 'react-router-dom'

function PasswordChangeSuccessful(props){
    function handleChange(){
        props.hideUnhideNave(true);
        props.history.replace({pathname:"/"})
    }
    setTimeout(handleChange,3000);
    return(
        <div style={{marginTop:"20%",fontSize:"40px",fontFamily:"'Staatliches', cursive"}}>Password Change Successful....</div>
    )
}
export default withRouter(PasswordChangeSuccessful)
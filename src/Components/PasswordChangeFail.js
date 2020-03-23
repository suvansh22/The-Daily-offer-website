import React from 'react';
import {withRouter} from 'react-router-dom'

function PasswordChangeFail(props){
    function handleChange(){
        props.hideUnhideNave(true);
        props.history.replace({pathname:"/"})
    }
    setTimeout(handleChange,3000);
    return(
        <div style={{marginTop:"20%",fontSize:"40px",fontFamily:"'Staatliches', cursive"}}>LINK EXPIRED....</div>
    )
}
export default withRouter(PasswordChangeFail)
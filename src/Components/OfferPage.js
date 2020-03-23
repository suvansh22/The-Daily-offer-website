import React from 'react'
import {postData} from './FetchServices'
import Grid from '@material-ui/core/Grid'
import CC from './cardCarousel'

export default function OfferPage(props){
    const [picture,setPicture]=React.useState()
    const [name,setName]=React.useState();
    const [description,setDescription]=React.useState();
    const [validfrom,setValidfrom]=React.useState();
    const [validto,setValidto]=React.useState();
    const [timefrom,setTimefrom]=React.useState();
    const [timeto,setTimeto]=React.useState();
    const [city,setCity]=React.useState();
    const [taga,setTaga]=React.useState();
    const [tagb,setTagb]=React.useState();
    const [tagc,setTagc]=React.useState();
    const [tagd,setTagd]=React.useState();
    const [location,setLocation]=React.useState();

    const handleImage=React.useCallback(async()=>{
        let body={"name":props.match.params.offername}
        let result = await postData('backend/offerpageinfo',body)
        setPicture(result[0].pic)
        setName(result[0].name)
        setDescription(result[0].description)
        setCity(result[0].city);
        setTaga(result[0].tag1);
        setTagb(result[0].tag2);
        setTagc(result[0].tag3);
        setTagd(result[0].tag4);
        setLocation(result[0].location);
        giveDate(result[0].validfrom,'f');
        giveDate(result[0].validto,'s');
        giveTime(result[0].validfrom,'f');
        giveTime(result[0].validto,'s');
    },[props.match.params.offername])

    React.useEffect(()=>{
        handleImage();
        giveTime();
    },[handleImage])

    function giveDate(d,w)
    {
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let i=parseInt(d);
        let n=new Date(new Date().setTime(i));
        let d1=n.getDate()+'-'+months[n.getMonth()]+'-'+n.getFullYear()
        if(w==='f')
        {
            setValidfrom(d1)
        }
        else
        {
            setValidto(d1)
        }
    }

    function giveTime(d,w)
    {
        let i=parseInt(d);
        let n=new Date(new Date().setTime(i));
        let d1=n.getHours()+':'+n.getMinutes()
        if(w==='f')
        {
            setTimefrom(d1)
        }
        else
        {
            setTimeto(d1)
        }
    }
    return(
        <div>
            <CC />
        <div style={{display:"flex",flexWrap:"wrap"}}>
            <div style={{display:"flex",justifyContent:"center",width:"30%"}}>
                <img src={`http://localhost:3010/images/${picture}`} alt={props.match.params.offername} style={{height:"80%",width:"80%"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"center",width:"70%"}}>
                <Grid container style={{}}>
                    <Grid item xs={12} style={{fontFamily:"'Calistoga',cursive"}}>
                        {name}
                    </Grid>
                    <Grid item xs={12}>
                        {description}
                    </Grid>
                    <Grid item xs={6} style={{marginTop:"10px"}}>
                        <div style={{}}>
                        Valid from:{validfrom}
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:"10px"}}>
                    <div style={{}}>
                        Valid to:{validto}
                        </div>
                    </Grid>
                    
                    <Grid item xs={6} style={{marginTop:"10px"}}>
                    <div style={{}}>
                        Time from:{timefrom}
                    </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:"10px"}}>
                    <div style={{}}>
                        Time to:{timeto}
                    </div>
                    </Grid>
                    <Grid item xs={6} style={{marginLeft:"25%",marginTop:"10px"}}>
                    <div style={{}}>
                        Address   :   {location},{city}
                    </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        </div>
    )
}
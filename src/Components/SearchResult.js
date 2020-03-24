import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {postData} from '../Components/FetchServices';
import CC from './cardCarousel';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
});

export default function CategoryMediaCard(props) {
  const classes = useStyles();
  const [list,setList]=React.useState([]);
  const [value,setValue]=React.useState();

  const getInfo=React.useCallback(async(data)=>{
        let body={"id":data}
        let result = await postData('backend/searchresult',body);
        setList(result)
  },[setList])

  React.useEffect(()=>{
      let data=props.location.state.id
      setValue(data);
    getInfo(data);
  },[getInfo,props.location.state.id]);

  async function handleOffer(data){
    let body={"id":data.categoryid};
    let result=await postData('backend/callName',body)
    let bbody={"id":data.subcategoryid}
    let bresult=await postData('backend/callSName',bbody)
    props.history.push({pathname:`/offerpage/${result[0].name}/${bresult[0].name}/${data.name}`})
  }

  function Cards(){
      if(value==-1 || list.length==0)
      {
        return(
            <div  style={{fontSize:"200%"}}>
                NO RESULT WERE FOUND
            </div>
        )
      }
      else
      {
    return list.map(row=>{
      return(
      <Card key={row.id} className={classes.card} style={{marginLeft:"10px",marginTop:"10px"}}>
        <CardActionArea onClick={()=>handleOffer(row)}>
          <CardMedia
            className={classes.media}
            image={`http://localhost:3010/images/${row.pic}`}
            title={row.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {row.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {row.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      )
    })
}
  }
  
  return (
    <div>
      <div>
        <CC />
      </div>
    <div style={{display:"flex",flexWrap:"Wrap"}}>
        {Cards()}
  </div>
  </div>
  );
}
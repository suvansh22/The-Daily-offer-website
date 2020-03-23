import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {getData} from '../Components/FetchServices'
import '@brainhubeu/react-carousel/lib/style.css';
import Carousel from '@brainhubeu/react-carousel';
import {postData} from './FetchServices';
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    //maxWidth: 300,
    width:"100%",
    height:"70%",
  },
  media: {
    height: 140,
  },
});

function CarouselMediaCard(props) {
  const classes = useStyles();
  const [list,setList]=React.useState([]);

  const getInfo=React.useCallback(async()=>{
    let result = await getData('backend/callcarouseloffer');
    setList(result)
  },[setList])

  React.useEffect(()=>{
    getInfo();
  },[getInfo]);

  async function handleOffer(data){
    let body={"id":data.categoryid};
    let result=await postData('backend/callName',body)
    let bbody={"id":data.subcategoryid}
    let bresult=await postData('backend/callSName',bbody)
    props.history.push({pathname:`/offerpage/${result[0].name}/${bresult[0].name}/${data.name}`})
  }
  
  const cards=()=>(
    <Carousel
    slidesPerPage={5}
    slidesPerScroll={1}
    animationSpeed={1500}
    infinite
    offset={10}
    itemWidth={250}
    stopAutoPlayOnHover
    autoPlay={2500}
    centered
   >
    {list.map(row=>{return(
      <Card key={row.id} className={classes.card}>
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
            <Typography variant="body2" color="textSecondary" component="p" style={{overflow:"hidden"}}>
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
      )})} 
      </Carousel>
  )
  
  return (
    <div style={{width:"100%"}}>
      {cards()}
  </div>
  );
}
export default withRouter(CarouselMediaCard)
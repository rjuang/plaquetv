
import './App.css';
import PlaqueView from './PlaqueView';
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch } from 'react-redux'
import {getImages, preprocessPlaques} from './plaques';
import Gallery from 'react-grid-gallery';
import SearchBox from "./SearchBox";
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

function App() {
  const dispatch = useDispatch();
  const autoPlayCarousel=useSelector((state)=>state.autoPlayCarousel);
  const search=useSelector((state)=>state.search);
  const searchResults=useSelector((state)=>state.searchResults);
  const highlightPlaque = useSelector((state) => state.highlightPlaque);

  let rowHeight=(window.innerHeight-2)*0.5
  var scale = rowHeight / 2550;
  var picWidth = 834 * scale;
  var picsPerCol = Math.round(window.innerWidth / picWidth)+1;
  const imagesPerPage=picsPerCol*2;

  useEffect(()=>{
    const allPlaques=preprocessPlaques(picsPerCol);
    const totalPages=Math.round(allPlaques.length/imagesPerPage);
    dispatch({type:"setAllPlaques", payload: 
    {allPlaques, totalPages
  }});
  },[])

  let card = <></>;
  if (highlightPlaque != null) {
    const cardHeight=Math.ceil(window.innerHeight*0.7);
    
    const handleClose=()=>dispatch({type: "closeHighlightPopup"});

    card = <div>
      {/* <Modal open={true}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"> 
    <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: cardHeight,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
  }}>    */}
  <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
        <IconButton color="primary" aria-label="close" onClick={handleClose} sx={{position:"right"}}>
        <CloseIcon />
      </IconButton>
        </DialogTitle>
              
        <DialogContent >
        <Card sx={{ maxHeight: cardHeight }}>
        <CardMedia
          component="img"
          image={highlightPlaque.file}
          sx={{ height: cardHeight }}
        />
      </Card>
        </DialogContent>
      {/* </Box> 
    </Modal> */}
    </Dialog>
    </div>
      ;
  }

  return (
    <div>
  
  <Carousel autoPlay={autoPlayCarousel} infiniteLoop={true} interval={20000} stopOnHover={false} transitionTime={5000}
      // renderItem={customRenderItem}
      onChange={() => dispatch({ type: 'nextPage' })} showThumbs={false} showStatus={false} showIndicators={false}
       >
  <PlaqueView galleryNum={1} rowHeight={rowHeight} picsPerCol={picsPerCol}  />
  <PlaqueView galleryNum={2} rowHeight={rowHeight} picsPerCol={picsPerCol} />
  
      </Carousel>
    <SearchBox/>
    {card}
    </div>
);
}

export default App;

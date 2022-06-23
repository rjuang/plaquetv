
import React, { useState } from 'react';
import Gallery from 'react-grid-gallery';
import { useSelector } from 'react-redux'
import { getImages, getImagesFromMetadata } from './plaques';
import axios from 'axios';
import PlaqueGallery from './PlaqueGallery';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function PlaqueView(props) {
  const searchResults = useSelector((state) => state.searchResults);
  const allPlaques = useSelector((state) => state.allPlaques);
  const gallery1Page = useSelector((state) => state.gallery1Page);
  const gallery2Page = useSelector((state) => state.gallery2Page);
  let page = 0;
  const showHighlightPopup = useSelector((state) => state.showHighlightPopup);
  const highlightPlaque = useSelector((state) => state.highlightPlaque);
  const autoPlayCarousel = useSelector((state) => state.autoPlayCarousel);
  const [toggler, setToggler] = useState(true);

  if (props.galleryNum == 1) {
    page = gallery1Page
  } else {
    page = gallery2Page;
  }

  let rowHeight = props.rowHeight
  var picsPerCol = props.picsPerCol;

  let plaques = [];
  if (searchResults.length != 0) {
    plaques = getImages(allPlaques, picsPerCol, 0);
  } else {
    plaques = getImages(allPlaques, picsPerCol, page);
  }

  let card = <></>;
  if (highlightPlaque != null) {
    const cardHeight=Math.ceil(window.innerHeight*0.7);
    
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
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
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
      <div>
      <PlaqueGallery
        picsPerCol={picsPerCol}
        rowHeight={rowHeight}
        plaques={plaques}
      />
      </div>
      {/* {card} */}
    </div>);
}

export default PlaqueView;
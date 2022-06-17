
import React from 'react';
import Gallery from 'react-grid-gallery';
import { useSelector } from 'react-redux'
import {getImages, getImagesFromMetadata} from './plaques';
import axios from 'axios';


function PlaqueView(props) {
    const gallery1Page=useSelector((state)=>state.gallery1Page);
    const gallery2Page=useSelector((state)=>state.gallery2Page);
    let page=0;

    if (props.galleryNum==1) {
         page=gallery1Page
    } else {
         page=gallery2Page;
    }

  let rowHeight=props.rowHeight
  var picsPerCol = props.picsPerCol;

  let plaques=[];
  if (searchResults.length != 0) {
    plaques=getImages(picsPerCol, 0);
  } else {
    plaques=getImages(picsPerCol, page);
  }         

  return <PlaqueGallery 
        picsPerCol={picsPerCol}
        rowHeight={rowHeight}
        plaques={plaques}
        />;
}

export default PlaqueView;
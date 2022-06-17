
import React from 'react';
import Gallery from 'react-grid-gallery';
import { useSelector } from 'react-redux'
import {getImages, getImagesFromMetadata} from './plaques';
import axios from 'axios';
import PlaqueGallery from './PlaqueGallery';

function PlaqueView(props) {
  const searchResults=useSelector((state)=>state.searchResults);
  const allPlaques=useSelector((state)=>state.allPlaques);
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
    plaques=getImages(allPlaques, picsPerCol, 0);
  } else {
    plaques=getImages(allPlaques, picsPerCol, page);
  }         

  return <PlaqueGallery 
        picsPerCol={picsPerCol}
        rowHeight={rowHeight}
        plaques={plaques}
        />;
}

export default PlaqueView;
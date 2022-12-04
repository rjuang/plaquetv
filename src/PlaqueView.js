
import React, { useState } from 'react';
import Gallery from 'react-grid-gallery';
import { getImages,getSearchView, getGalleryPlaqueInfo } from './plaques';

import { useDispatch,useSelector } from 'react-redux';

const NUM_ROWS = 3;

 function getImagesFromMetadata(picsPerCol, metadata) {
    let images = metadata.map(
      getGalleryPlaqueInfo
    );
  
    let imagesPerPage = picsPerCol * NUM_ROWS;
    for (var i = images.length; i < imagesPerPage; i++) {
      images.push({
        src: "background.png",
        thumbnail: "background.png",
        thumbnailWidth: 834,
        thumbnailHeight: 2550,
      });
    }
  
    return images;
  }

function PlaqueView(props) {
  const dispatch = useDispatch();

  const searchResults = useSelector((state) => state.searchResults);
  const highlightPlaque=useSelector((state) => state.highlightPlaque);
  const allPlaques = useSelector((state) => state.allPlaques);
  const rowHeight = useSelector((state) => state.rowHeight);
  const picsPerCol = useSelector((state) => state.picsPerCol);

  let page = props.page;

  // let plaques = [];
  const  plaques = getImages(allPlaques, picsPerCol, page);

  // if (searchResults.length != 0 && highlightPlaque!=null) {
  //   plaques = getSearchView(allPlaques, picsPerCol, searchResults[0]);
  // } else {
  //   plaques = getImages(allPlaques, picsPerCol, page);
  // }

  const arrangedPlaques=getImagesFromMetadata(picsPerCol, plaques);

  const onClick=(index)=>
    dispatch({
    type:"clickHighlight", payload: arrangedPlaques[index]});

  return (
   <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        border: "1px solid #ddd",
        overflow: "auto"}}>
        <Gallery
images={arrangedPlaques}
enableLightbox={false}
enableImageSelection={false} rowHeight={rowHeight} margin={0} maxRows={NUM_ROWS}
onClickThumbnail={onClick} />
    </div>);
}

export default PlaqueView;

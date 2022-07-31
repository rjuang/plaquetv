
import React, { useState } from 'react';
import Gallery from 'react-grid-gallery';
import { getImages,getSearchView } from './plaques';

import { useDispatch,useSelector } from 'react-redux';

 function getImagesFromMetadata(picsPerCol, metadata) {
    let images = metadata.map(
      (e) => ({
        src: e.file,
        thumbnail: e.previewFile,
        thumbnailWidth: 120,
        thumbnailHeight: 365,
      })
    );
  
    let imagesPerPage = picsPerCol * 2;
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

function arrangeForDisplay(plaques, picsPerCol) {
    let arr=Array(plaques.length);
    let left=0, right=0, i=0;

    if (picsPerCol%2===1) {
        let center=(picsPerCol-1)/2;
        arr[center]=plaques[0];
        arr[center+picsPerCol]=plaques[1];

        left=center-1;
        right=center+1;
        i=2;
    } else {
        right=picsPerCol/2;
        left=right-1;
    }

    for (; i<plaques.length; i=i+4) {
        arr[left]=plaques[i];
        arr[left+picsPerCol]=plaques[i+1];
        arr[right]=plaques[i+2]; 
        arr[right+picsPerCol]=plaques[i+3];

        left=left-1;
        right=right+1;
    }

    return arr;
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

  const arrangedPlaques=arrangeForDisplay(getImagesFromMetadata(picsPerCol,plaques), picsPerCol);

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
enableImageSelection={false} rowHeight={rowHeight} margin={0} maxRows={2}
onClickThumbnail={onClick} />
    </div>);
}

export default PlaqueView;
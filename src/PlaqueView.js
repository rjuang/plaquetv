
import React from 'react';
import Gallery from 'react-grid-gallery';
import { useSelector } from 'react-redux'
import {getImages, getImagesFromMetadata} from './plaques';
import axios from 'axios';

function arrangeForDisplay(plaques, picsPerCol) {
    return plaques;
    let arr=Array(plaques.length);
    let center=0, col=0;

    if (picsPerCol%2===1) {
        center=(picsPerCol-1)/2;
    } else {
        center=picsPerCol/2;
    }

    arr[center]=plaques[0];
    arr[center+picsPerCol]=plaques[1];

    col=center-1;

    for (let i=2; i<plaques.length; i=i+2) {
        arr[col]=plaques[i];
        arr[col+picsPerCol]=plaques[i+1];

        col=center+center-col;
    }

    return arr;
}

function PlaqueView(props) {
    const gallery1Page=useSelector((state)=>state.gallery1Page);
    const gallery2Page=useSelector((state)=>state.gallery2Page);
    let page=0;
    const search=useSelector((state)=>state.search);

    if (props.galleryNum==1) {
         page=gallery1Page
    } else {
         page=gallery2Page;
    }

  let rowHeight=props.rowHeight
  var picsPerCol = props.picsPerCol;

    const screenshots=useSelector((state)=>state.screenshots);

    let view=null;
    if (screenshots[page] != undefined && screenshots[page]) {
        view=<img src={"./viewPage"+page+".jpeg"}></img>
    } else {
        const plaques=getImages(picsPerCol, page);
        const arrangedPlaques=arrangeForDisplay(plaques, picsPerCol);
        view =<Gallery
images={arrangedPlaques}
enableLightbox={false}
enableImageSelection={false} rowHeight={rowHeight} margin={0} maxRows={2} />
    }

  return (
   <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        border: "1px solid #ddd",
        overflow: "auto"}}>
        {view}
    </div>);
}

export default PlaqueView;
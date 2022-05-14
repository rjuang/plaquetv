
import React from 'react';
import Gallery from 'react-grid-gallery';
import { useSelector } from 'react-redux'
import getImages from './plaques';
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

  let rowHeight=(window.innerHeight-2)*0.5
  var scale = rowHeight / 2550;
  var picWidth = 834 * scale;
  var picsPerCol = Math.round(window.innerWidth / picWidth)+1;

    const screenshots=useSelector((state)=>state.screenshots);

    let view=null;
    if (screenshots[page] != undefined && screenshots[page]) {
        view=<img src={"./viewPage"+page+".jpeg"}></img>
    } else {
        const plaques=getImages(picsPerCol, page);
        view =<Gallery
images={plaques}
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